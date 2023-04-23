import {createElement, getCookie, secondsToTime} from "../utils";
import {changePlaying, downloadStatusUpdate, setSpeed, setTime, skip} from "../playback";

function appendEvents(element) {
    const root = this;

    // Обработка событий плей/пауза
    function onplaying() {
        changePlaying.call(root, true);
    }

    element.addEventListener("playing", onplaying);
    element.mjs_play = () => {
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
    element.mjs_pause = () => {
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
    element.mjs_setTime = (val) => {
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
    element.mjs_setRate = (val) => {
        element.removeEventListener("ratechange", onratechange);
        element.playbackRate = val;
        setTimeout(() => {
            element.addEventListener("ratechange", onratechange);
        }, 16);
    };

    // Обработка событий загрузки
    function onwaiting() {
        let logo_spiner = document.getElementById("logo_spiner");
        logo_spiner.style.display = "block";

        downloadStatusUpdate.call(root);
    }

    element.addEventListener("waiting", onwaiting);

    function oncanplay() {
        downloadStatusUpdate.call(root);
    }

    element.addEventListener("canplay", oncanplay);

    // Остальные события
    if (element.tagName === "AUDIO") {
        function onloadedmetadata() {
            root._.form.time.innerText = secondsToTime(element.currentTime) + " / " + secondsToTime(root.duration);
        }

        element.addEventListener("loadedmetadata", onloadedmetadata);

        function ontimeupdate() {
            if (!root._.form.progressbar.updateStyle) {
                root._.form.progressbar.played.setAttribute("style", "width:" + ((100 * element.currentTime) / root.duration) + "%");
            }
            root._.form.time.innerText = secondsToTime.call(root, element.currentTime) + " / " + secondsToTime.call(root, root.duration);

            document.cookie = "time=" + encodeURIComponent(element.currentTime) + "; max-age=" + (86400 * 365);

            if (((root.duration - element.currentTime) < 2) && (getCookie("s_anv") === "true")) {
                document.cookie = "time=" + 0 + "; max-age=" + (86400 * 365);
                skip.call(this, true);
            }

            if (getCookie("s_sic") === "true") {
                fetch("ds_times.json").then(function (response) {
                    response.json().then(function (dataset) {
                        let url = decodeURIComponent(window.location.pathname).replace("/стафф/видео/", "");

                        if (dataset[url] !== undefined) {
                            if (dataset[url].length >= 1) {
                                for (let item in dataset[url]) {
                                    if (dataset[url][item].length === 2) {
                                        let start = dataset[url][item][0];
                                        let end = dataset[url][item][1];

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
                    })
                })
            }
        }

        element.addEventListener("timeupdate", ontimeupdate);
    }

    if (element.tagName === "VIDEO") {
        function onprogress() {
            const element2 = root._.form.progressbar.loaded;
            const canvas = root._.form.progressbar.loaded._canvas;
            element2.width = element2.clientWidth;
            canvas.fillStyle = "white";
            canvas.clearRect(0, 0, element2.width, 1);

            for (let i = 0; i < element.buffered.length; i++) {
                const startX = (element.buffered.start(i) * element2.width) / root.duration;
                const endX = (element.buffered.end(i) * element2.width) / root.duration;
                const width = endX - startX;

                canvas.fillRect(Math.floor(startX), 0, Math.floor(width), 1);
            }

            if (getCookie("s_sic") === "true") {
                fetch("ds_times.json").then(function (response) {
                    response.json().then(function (dataset) {
                        let url = decodeURIComponent(window.location.pathname).replace("/стафф/видео/", "");

                        if (dataset[url] !== undefined) {
                            if (dataset[url].length >= 1) {
                                for (let item in dataset[url]) {
                                    if (dataset[url][item].length === 2) {
                                        let start = dataset[url][item][0];
                                        let end = dataset[url][item][1];

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
                    })
                })
            }
        }

        element.addEventListener("progress", onprogress);
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
        }
    );
}
