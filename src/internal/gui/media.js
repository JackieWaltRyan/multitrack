import {createElement, secondsToTime} from "../utils";
import {changePlaying, downloadStatusUpdate, setSpeed, setTime, skip} from "../playback";

let video;
let audio;
let repeat_data = [];
let SStimeout;

export function repeat() {
    return repeat_data;
}

export function set_repeat() {
    if (repeat_data.length === 2) {
        repeat_data = [];
    } else {
        repeat_data.push(audio.currentTime);
    }
}

export function upcan() {
    let canvas = this._.form.embient;
    let video = this._.form.video;

    canvas.width = (screen.width / 100);
    canvas.height = (screen.height / 100);

    let ctx = canvas.getContext("2d");

    if (this._.enable_embient) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        setTimeout(() => {
            upcan.call(this);
        }, 50);
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

export function screensaver(trigger) {
    if (trigger) {
        clearTimeout(SStimeout);

        if (this._.form.screensaver) {
            this._.form.screensaver.remove();
        }

        SStimeout = setTimeout(() => {
            this._.rootElement.classList.add("mt_overlay_hidden");

            this._.form.overlays.bottom.style.pointerEvents = "none";
            this._.form.progressbar.root.style.pointerEvents = "none";

            if (this._.form.overlays.mobile) {
                this._.form.overlays.mobile.style.pointerEvents = "none";

                for (let child of this._.form.overlays.mobile.children) {
                    child.style.pointerEvents = "none";
                }
            }

            let root = this._.element;

            this._.form.screensaver = createElement("div", {
                class: "mt_screensaver"
            }, (el) => {
                el.appendChild(createElement("img", {
                    src: "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!-- Generator: Adobe Illustrator 26.5.0  SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' id='%D0%A1%D0%BB%D0%BE%D0%B9_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 192 88' style='enable-background:new 0 0 192 88%3B' xml:space='preserve'%3E%3Cpath d='M131.2 12.9h18.2c0 0 22-1.2 21.4 10.2c-0.9 17.5-27.6 16.2-27.6 16.2l5.2-22.7h-18.2l-7.6 32.9h18.1c0 0 18 0.8 32.9-6.3c15.8-7.6 15.9-21 15.9-21c0-5.5-2.9-10.7-7.8-13.4c-9.3-5.5-21.5-6-21.5-6h-39.8L97.1 33.3L87.2 2.7H18.6l-2.5 10.2h18.2c0 0 22-1.2 21.4 10.2c-0.9 17.4-27.6 16.1-27.6 16.1l5.2-22.7H15.1L7.5 49.4h18.1c0 0 18 0.8 32.9-6.3c15.8-7.6 15.9-21 15.9-21c-0.1-1.8-0.3-3.7-0.7-5.5c-0.4-1.4-1-3.7-1-3.7h0.9L90.4 60L131.2 12.9z'/%3E%3Cpath d='M90.8 60C42 60 2.5 65.7 2.5 72.7S42 85.4 90.8 85.4s88.3-5.7 88.3-12.7S139.6 60 90.8 60z M48.1 79.6h-3.7l-7.8-13.2h5.2l4.5 8l4.5-8H56L48.1 79.6z M69 79.6h-4.8V66.4H69V79.6z M86 79.6h-6.8V66.4H86c5.2 0 9.4 2.9 9.4 6.6S91.1 79.6 86 79.6L86 79.6z M115.2 69.3h-5.7v2.2h5.4v2.9h-5.4v2.3h5.7v2.9h-10.5V66.4h10.5V69.3z M134.4 80.1c-5.9 0-10.2-3-10.2-7.3c0-4 4.9-6.8 10.2-6.8s10.2 2.8 10.2 6.8C144.6 77.1 140.4 80.1 134.4 80.1L134.4 80.1z'/%3E%3Cpath d='M134.4 69.3c2.9 0 5.2 1.7 5.2 3.5c0 2.3-2.4 3.9-5.2 3.9s-5.2-1.7-5.2-3.9C129.2 71 131.6 69.3 134.4 69.3z'/%3E%3Cpath d='M85.1 69.3H84v7.4h1.1c2.9 0 5.3-1.1 5.3-3.7C90.4 70.7 88.2 69.3 85.1 69.3z'/%3E%3C/svg%3E"
                }, (el) => {
                    el.style.transition = "0.1s transform linear";
                    el.style.width = "25%";

                    let filters = [
                        "invert(27%) sepia(77%) saturate(6808%) hue-rotate(278deg) brightness(94%) contrast(136%)",
                        "invert(87%) sepia(76%) saturate(4483%) hue-rotate(111deg) brightness(104%) contrast(109%)",
                        "invert(49%) sepia(98%) saturate(1502%) hue-rotate(0deg) brightness(102%) contrast(106%)",
                        "invert(11%) sepia(100%) saturate(5486%) hue-rotate(237deg) brightness(101%) contrast(126%)",
                        "invert(96%) sepia(81%) saturate(5421%) hue-rotate(353deg) brightness(100%) contrast(103%)",
                        "invert(28%) sepia(67%) saturate(7498%) hue-rotate(9deg) brightness(105%) contrast(110%)",
                        "invert(25%) sepia(91%) saturate(6617%) hue-rotate(318deg) brightness(99%) contrast(114%)",
                        "invert(51%) sepia(83%) saturate(1103%) hue-rotate(71deg) brightness(119%) contrast(117%)"
                    ]

                    function render_screensaver(filter = 0, x = 1, y = 1, reverse_x = false, reverse_y = false) {
                        let shift_x = (reverse_x ? ((root.clientWidth / 50) * -1) : (root.clientWidth / 50));
                        let shift_y = (reverse_y ? ((root.clientWidth / 50) * -1) : (root.clientWidth / 50));

                        if ((x < 0) || ((x + el.width) > root.clientWidth)) {
                            shift_x *= -1;
                            filter += 1;
                            reverse_x = !reverse_x;
                        }

                        if ((y < 0) || ((y + el.height) > root.clientHeight)) {
                            shift_y *= -1;
                            filter += 1;
                            reverse_y = !reverse_y;
                        }

                        if (x < 0) {
                            x = 0;
                        }

                        if (y < 0) {
                            y = 0;
                        }

                        if ((x + el.width) > root.clientWidth) {
                            x = (root.clientWidth - el.width);
                        }

                        if ((y + el.height) > root.clientHeight) {
                            y = (root.clientHeight - el.height);
                        }

                        if ((filter + 1) > filters.length) {
                            filter = 0;
                        }

                        el.style.filter = filters[filter];
                        el.style.transform = "translate(" + x + "px, " + y + "px)";

                        setTimeout(() => {
                            render_screensaver.call(this, filter, (x + shift_x), (y + shift_y), reverse_x, reverse_y);
                        }, 100);
                    }

                    render_screensaver.call(this);
                }));
            });

            this._.element.appendChild(this._.form.screensaver);
        }, ((1000 * 60) * 5));
    } else {
        clearTimeout(SStimeout);

        if (this._.form.screensaver) {
            this._.form.screensaver.remove();
        }
    }
}

function appendEvents(element) {
    let root = this;

    function onplaying() {
        changePlaying.call(root, true);
    }

    element.addEventListener("playing", onplaying);

    element.mt_play = () => {
        element.removeEventListener("playing", onplaying);

        element.play().then(() => {
            element.addEventListener("playing", onplaying);
        }).catch(() => {
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

    function onwaiting() {
        root._.form.logo_spiner.style.display = "block";

        downloadStatusUpdate.call(root);
    }

    element.addEventListener("waiting", onwaiting);

    function oncanplay() {
        downloadStatusUpdate.call(root);
    }

    element.addEventListener("canplay", oncanplay);
    element.addEventListener("progress", oncanplay);

    function onprogress() {
        let buffered_list = [];

        for (let i = 0; i < audio.buffered.length; i++) {
            for (let i2 = 0; i2 < video.buffered.length; i2++) {
                if (video.buffered.start(i2) >= audio.buffered.start(i) && video.buffered.start(i2) <= audio.buffered.end(i)) {
                    let end = (video.buffered.end(i2) <= audio.buffered.end(i)) ? video.buffered.end(i2) : audio.buffered.end(i);

                    buffered_list.push(Math.floor(video.buffered.start(i2)));
                    buffered_list.push(Math.floor(end));
                }
            }
        }

        for (let i = 0; i < video.buffered.length; i++) {
            for (let i2 = 0; i2 < audio.buffered.length; i2++) {
                if (audio.buffered.start(i2) >= video.buffered.start(i) && audio.buffered.start(i2) <= video.buffered.end(i)) {
                    let end = (audio.buffered.end(i2) <= video.buffered.end(i)) ? audio.buffered.end(i2) : video.buffered.end(i);

                    buffered_list.push(Math.floor(audio.buffered.start(i2)));
                    buffered_list.push(Math.floor(end));
                }
            }
        }

        let element2 = root._.form.progressbar.loaded;
        let canvas = root._.form.progressbar.loaded._canvas;

        element2.width = element2.clientWidth;
        canvas.fillStyle = "white";
        canvas.clearRect(0, 0, element2.width, 1);

        for (let i = 0; i < buffered_list.length; i += 2) {
            let startX = (buffered_list[i] * element2.width) / root.duration;
            let endX = (buffered_list[i + 1] * element2.width) / root.duration;
            let width = endX - startX;

            canvas.fillRect(Math.floor(startX), 0, Math.floor(width), 1);
        }

        if (localStorage.getItem("mt_set_skip") === "true") {
            if (root._.ds_times !== null) {
                let time_2 = root._.ds_times[decodeURIComponent(location.pathname)];

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

                                let startS = (start * element2.width) / root.duration;
                                let endS = (end * element2.width) / root.duration;
                                let widthS = endS - startS;

                                canvas.fillRect(Math.floor(startS), 0, Math.floor(widthS), 1);
                            }
                        }
                    }
                }
            }
        }

        if (repeat_data.length === 2) {
            canvas.fillStyle = "orange";

            let startS = (Math.min(...repeat_data) * element2.width) / root.duration;
            let endS = (Math.max(...repeat_data) * element2.width) / root.duration;
            let widthS = endS - startS;

            canvas.fillRect(Math.floor(startS), 0, Math.floor(widthS), 1);

            if ((element.currentTime < Math.min(...repeat_data)) || (element.currentTime > Math.max(...repeat_data))) {
                setTime.call(root, Math.min(...repeat_data));
            }
        }
    }

    element.addEventListener("timeupdate", onprogress);
    element.addEventListener("progress", onprogress);

    function ontimeupdate() {
        if (!root._.form.progressbar.updateStyle) {
            root._.form.progressbar.played.setAttribute("style", "width:" + ((100 * element.currentTime) / root.duration) + "%");
        }

        root._.form.time.innerText = secondsToTime.call(root, element.currentTime) + " / " + secondsToTime.call(root, root.duration);

        localStorage.setItem("mt_mark_time_" + decodeURIComponent(location.pathname), encodeURIComponent(element.currentTime));

        if (((root.duration - element.currentTime) < 2) && (localStorage.getItem("mt_set_nextvideo") === "true")) {
            localStorage.setItem("mt_mark_time_" + decodeURIComponent(location.pathname), encodeURIComponent(0));
            skip.call(root, true);
        }

        if (localStorage.getItem("mt_set_skip") === "true") {
            if (root._.ds_times !== null) {
                let time_1 = root._.ds_times[decodeURIComponent(location.pathname)];

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

                                if ((start <= element.currentTime) && (element.currentTime <= end) && root._.form.skip_prevent) {
                                    setTime.call(root, end + 1);

                                    downloadStatusUpdate.call(root);
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
