import {logError} from "./utils";

let URL_params = window.location.search.replace("?", "").split("&").reduce(function (p, e) {
    let a = e.split("=");
    p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
    return p;
}, {});

// Надо ждать, пока загрузится страница, а иначе - ошибка
let ASS;
document.addEventListener("DOMContentLoaded", function () {
    ASS = require("assjs").default;
});

function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setVideo(link, name) {

    document.cookie = "video=" + encodeURIComponent(name) + "; path=/; max-age=" + (86400 * 365);

    let currentTimeVideo = this.currentTime;

    if (getCookie("time") !== undefined && getCookie("s_tt") === "true") {
        currentTimeVideo = parseFloat(getCookie("time"));
    }

    if ("t" in URL_params) {
        currentTimeVideo = parseFloat(URL_params["t"]);
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

export function setAudio(link, name, index) {

    document.cookie = "audio=" + encodeURIComponent(name) + "; path=/; max-age=" + (86400 * 365);

    let curent_audio = document.getElementById("curent_audio");
    curent_audio.innerText = index.toString();

    let currentTimeAudio = this.currentTime;

    if (getCookie("time") !== undefined && getCookie("s_tt") === "true") {
        currentTimeAudio = parseFloat(getCookie("time"));
    }

    if ("t" in URL_params) {
        currentTimeAudio = parseFloat(URL_params["t"]);
    }

    const playbackRate = this.playbackRate;
    this._.form.audio.mjs_pause();
    this._.form.audio.src = link;
    this._.form.audio.mjs_setTime(currentTimeAudio);
    this._.form.audio.mjs_setRate(playbackRate);

    if (getCookie("volume") !== undefined && getCookie("s_vl") === "true") {
        this.volume = parseFloat(getCookie("volume"));
    }

    if (this._.playing) {
        this._.form.audio.mjs_play();
    }
}

export function setSubtitles(url, name, index) {

    document.cookie = "subtitle=" + encodeURIComponent(name) + "; path=/; max-age=" + (86400 * 365);

    let curent_subtitle = document.getElementById("curent_subtitle");
    curent_subtitle.innerText = index.toString();

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
