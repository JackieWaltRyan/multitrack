import {getCookie, logError, URLparams} from "./utils";

let ASS;

// Надо ждать, пока загрузится страница, а иначе - ошибка
document.addEventListener("DOMContentLoaded", function () {
    ASS = require("assjs").default;
});

export function setVideo(link) {
    let currentTimeVideo = this.currentTime;

    if ((getCookie("time") !== undefined) && (getCookie("s_tt") === "true")) {
        currentTimeVideo = parseFloat(getCookie("time"));
    }

    if ("t" in URLparams()) {
        currentTimeVideo = parseInt(URLparams()["t"]);
    }

    const playbackRate = this.playbackRate;
    this._.form.video.mjs_pause();
    this._.form.video.src = link;
    this._.form.video.mjs_setTime(currentTimeVideo);
    this._.form.video.mjs_setRate(playbackRate);

    if (this._.playing) {
        this._.form.video.mjs_play();
    }
}

export function setAudio(link, code) {
    let curent_audio = document.getElementById("curent_audio");
    curent_audio.innerText = encodeURIComponent(code.toString());

    let currentTimeAudio = this.currentTime;

    if ((getCookie("time") !== undefined) && (getCookie("s_tt") === "true")) {
        currentTimeAudio = parseFloat(getCookie("time"));
    }

    if ("t" in URLparams()) {
        currentTimeAudio = parseFloat(URLparams()["t"]);
    }

    const playbackRate = this.playbackRate;
    this._.form.audio.mjs_pause();
    this._.form.audio.src = link;
    this._.form.audio.mjs_setTime(currentTimeAudio);
    this._.form.audio.mjs_setRate(playbackRate);

    if ((getCookie("volume") !== undefined) && (getCookie("s_vl") === "true")) {
        this.volume = parseFloat(getCookie("volume"));
    }

    if (this._.playing) {
        this._.form.audio.mjs_play();
    }
}

export function setSubtitles(url, code) {
    let curent_subtitle = document.getElementById("curent_subtitle");
    curent_subtitle.innerText = encodeURIComponent(code.toString());

    clearTimeout(this._.subtitlesDownloader);

    if (this._.ass !== undefined) {
        this._.ass.destroy();
        this._.ass = undefined;
    }

    if (url) {
        this._.subtitlesDownloader = setTimeout(() => {
            let xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send();

            if (xhr.status === 200) {
                try {
                    this._.ass = new ASS(xhr.responseText, this._.form.video, {
                        container: this._.form.subtitles,
                    });

                    this.resize();
                } catch {
                    logError.call(this, "Can't use ASS library");
                }
            }
        });
    }
}
