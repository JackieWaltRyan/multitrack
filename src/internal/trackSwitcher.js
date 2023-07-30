import {setMediaSession, URLparams} from "./utils";

let ASS = null;

document.addEventListener("DOMContentLoaded", () => {
    ASS = require("assjs").default;
});

export function setVideo(link) {
    let currentTimeVideo = this.currentTime;

    if (localStorage.getItem("mt_mark_time_" + decodeURIComponent(location.pathname)) && (localStorage.getItem("mt_set_position") === "true")) {
        currentTimeVideo = parseFloat(localStorage.getItem("mt_mark_time_" + decodeURIComponent(location.pathname)));
    }

    if ("t" in URLparams()) {
        currentTimeVideo = parseInt(URLparams()["t"]);
    }

    let playbackRate = this.playbackRate;

    this._.form.video.mt_pause();
    this._.form.video.src = (link + "?" + Math.floor(Math.random() * Date.now()));
    this._.form.video.mt_setTime(currentTimeVideo);
    this._.form.video.mt_setRate(playbackRate);

    if (this._.playing) {
        this._.form.video.mt_play();
    }

    this._.form.skip_prevent = true;
}

export function setAudio(link) {
    let currentTimeAudio = this.currentTime;

    if (localStorage.getItem("mt_mark_time_" + decodeURIComponent(location.pathname)) && (localStorage.getItem("mt_set_position") === "true")) {
        currentTimeAudio = parseFloat(localStorage.getItem("mt_mark_time_" + decodeURIComponent(location.pathname)));
    }

    if ("t" in URLparams()) {
        currentTimeAudio = parseFloat(URLparams()["t"]);
    }

    let playbackRate = this.playbackRate;

    this._.form.audio.mt_pause();
    this._.form.audio.src = (link + "?" + Math.floor(Math.random() * Date.now()));
    this._.form.audio.mt_setTime(currentTimeAudio);
    this._.form.audio.mt_setRate(playbackRate);

    if (localStorage.getItem("mt_mark_volume") && (localStorage.getItem("mt_set_volume") === "true")) {
        this.volume = parseFloat(localStorage.getItem("mt_mark_volume"));
    }

    if (this._.playing) {
        this._.form.audio.mt_play();
    }

    this._.form.skip_prevent = true;

    if (navigator.mediaSession.playbackState !== "none") {
        setMediaSession.call(this);
    }
}

export function setSubtitles(url) {
    clearTimeout(this._.subtitlesDownloader);

    if (this._.ass !== undefined) {
        this._.ass.destroy();
        this._.ass = undefined;
    }

    if (url) {
        this._.subtitlesDownloader = setTimeout(() => {
            let xhr = new XMLHttpRequest();

            xhr.open("GET", (url + "?" + Math.floor(Math.random() * Date.now())), true);

            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    try {
                        this._.ass = new ASS(xhr.responseText, this._.form.video, {
                            container: this._.form.subtitles,
                        });

                        this.resize();
                    } catch {
                        setTimeout(() => {
                            setSubtitles.call(this, url);
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        setSubtitles.call(this, url);
                    }, 500);
                }
            });

            xhr.addEventListener("error", () => {
                setTimeout(() => {
                    setSubtitles.call(this, url);
                }, 500);
            });

            xhr.send();
        });
    }

    this._.form.skip_prevent = true;

    if (navigator.mediaSession.playbackState !== "none") {
        setMediaSession.call(this);
    }
}
