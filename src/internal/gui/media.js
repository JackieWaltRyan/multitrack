import {createElement, secondsToTime} from "../utils";
import {changePlaying, downloadStatusUpdate, setSpeed, setTime, skip} from "../playback";

let video;
let audio;

function appendEvents(element) {
    const root = this;

    // Обработка событий плей/пауза
    function onplaying() {
        changePlaying.call(root, true);
    }

    element.addEventListener("playing", onplaying);

    element.mt_play = () => {
        element.removeEventListener("playing", onplaying);
        element.play().then(() => {
            element.addEventListener("playing", onplaying);
        }).catch(() => {
            // Заменить костыль с Catch на что-то другое, более нормальное
            // Тут тип "фикс" ошибки "Unhandled Promise Rejection: AbortError: The operation was aborted." на устройства iOS
            element.addEventListener("playing", onplaying);
            changePlaying.call(root, false);
        });
    };

    function onpause() {
        if (element.tagName === "AUDIO" || element === document.pictureInPictureElement || document.hasFocus()) {
            changePlaying.call(root, false);
        }
    }

    element.addEventListener("pause", onpause);

    element.mt_pause = () => {
        element.removeEventListener("pause", onpause);
        element.pause();
        setTimeout(() => {
            element.addEventListener("pause", onpause);
        }, 16);
    };

    function onseeking(event) {
        setTime.call(root, event.target.currentTime, true);
    }

    element.addEventListener("seeking", onseeking);

    element.mt_setTime = (val) => {
        element.removeEventListener("seeking", onseeking);
        element.currentTime = val;
        setTimeout(() => {
            element.addEventListener("seeking", onseeking);
        }, 16);
    };

    function onratechange() {
        setSpeed.call(root, element.playbackRate);
    }

    element.addEventListener("ratechange", onratechange);

    element.mt_setRate = (val) => {
        element.removeEventListener("ratechange", onratechange);
        element.playbackRate = val;
        setTimeout(() => {
            element.addEventListener("ratechange", onratechange);
        }, 16);
    };

    // Обработка событий загрузки
    function onwaiting() {
        root._.form.logo_spiner.style.display = "block";

        downloadStatusUpdate.call(root);
    }

    element.addEventListener("waiting", onwaiting);

    function oncanplay() {
        downloadStatusUpdate.call(root);
    }

    element.addEventListener("canplay", oncanplay);

    function onprogress() {
        let buffered_list = [];

        for (let i = 0; i < audio.buffered.length; i++) {
            for (let i2 = 0; i2 < video.buffered.length; i2++) {
                if (video.buffered.start(i2) >= audio.buffered.start(i) && video.buffered.start(i2) <= audio.buffered.end(i)) {
                    let end = video.buffered.end(i2) <= audio.buffered.end(i) ? video.buffered.end(i2) : audio.buffered.end(i);

                    buffered_list.push(Math.floor(video.buffered.start(i2)));
                    buffered_list.push(Math.floor(end));
                }
            }
        }

        for (let i = 0; i < video.buffered.length; i++) {
            for (let i2 = 0; i2 < audio.buffered.length; i2++) {
                if (audio.buffered.start(i2) >= video.buffered.start(i) && audio.buffered.start(i2) <= video.buffered.end(i)) {
                    let end = audio.buffered.end(i2) <= video.buffered.end(i) ? audio.buffered.end(i2) : video.buffered.end(i);

                    buffered_list.push(Math.floor(audio.buffered.start(i2)));
                    buffered_list.push(Math.floor(end));
                }
            }
        }

        const element2 = root._.form.progressbar.loaded;
        const canvas = root._.form.progressbar.loaded._canvas;
        element2.width = element2.clientWidth;
        canvas.fillStyle = "white";
        canvas.clearRect(0, 0, element2.width, 1);

        for (let i = 0; i < buffered_list.length; i += 2) {
            const startX = (buffered_list[i] * element2.width) / root.duration;
            const endX = (buffered_list[i + 1] * element2.width) / root.duration;
            const width = endX - startX;

            canvas.fillRect(Math.floor(startX), 0, Math.floor(width), 1);
        }

        if (localStorage.getItem("mt_set_skip") === "true") {
            if (root._.ds_times !== null) {
                let time_2 = root._.ds_times[decodeURIComponent(window.location.pathname)];

                if (time_2 !== undefined) {
                    if (time_2.length >= 1) {
                        for (let item in time_2) {
                            if (time_2[item].length === 2) {
                                let start = time_2[item][0];
                                let end = time_2[item][1];

                                if (start < 0) {
                                    start = 0;
                                }

                                if (end > root.duration) {
                                    end = root.duration;
                                }

                                canvas.fillStyle = "lime";
                                const startS = (start * element2.width) / root.duration;
                                const endS = (end * element2.width) / root.duration;
                                const widthS = endS - startS;

                                canvas.fillRect(Math.floor(startS), 0, Math.floor(widthS), 1);
                            }
                        }
                    }
                }
            }
        }
    }

    element.addEventListener("timeupdate", onprogress);

    function ontimeupdate() {
        if (!root._.form.progressbar.updateStyle) {
            root._.form.progressbar.played.setAttribute("style", "width:" + ((100 * element.currentTime) / root.duration) + "%");
        }
        root._.form.time.innerText = secondsToTime.call(root, element.currentTime) + " / " + secondsToTime.call(root, root.duration);

        localStorage.setItem("mt_mark_time_" + decodeURIComponent(window.location.pathname), encodeURIComponent(element.currentTime));

        if (((root.duration - element.currentTime) < 2) && (localStorage.getItem("mt_set_nextvideo") === "true")) {
            localStorage.setItem("mt_mark_time_" + decodeURIComponent(window.location.pathname), encodeURIComponent(0));
            skip.call(root, true);
        }

        if (localStorage.getItem("mt_set_skip") === "true") {
            if (root._.ds_times !== null) {
                let time_1 = root._.ds_times[decodeURIComponent(window.location.pathname)];

                if (time_1 !== undefined) {
                    if (time_1.length >= 1) {
                        for (let item in time_1) {
                            if (time_1[item].length === 2) {
                                let start = time_1[item][0];
                                let end = time_1[item][1];

                                if (start < 0) {
                                    start = 0;
                                }

                                if (end > root.duration) {
                                    end = root.duration;
                                }

                                if ((start <= element.currentTime) && (element.currentTime <= end)) {
                                    setTime.call(root, end + 1);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    function onloadedmetadata() {
        root._.form.time.innerText = secondsToTime(element.currentTime) + " / " + secondsToTime(root.duration);
    }

    if (element.tagName === "AUDIO") {
        audio = element;

        element.addEventListener("loadedmetadata", onloadedmetadata);
        element.addEventListener("timeupdate", ontimeupdate);
    }

    if (element.tagName === "VIDEO") {
        video = element;
    }
}

export function generateMedia() {
    this._.form.audio = createElement("audio", {}, (el) => {
        appendEvents.call(this, el);
    });

    this._.form.video = createElement("video", {
        playsinline: "",
        preload: "metadata",
    }, (el) => {
        appendEvents.call(this, el);
    });
}
