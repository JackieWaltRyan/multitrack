import {createElement, LogoInfoBlock, mobileCheck, secondsToTime} from "./utils";
import {hotkeys} from "./gui/hotkeys";
import {gestures} from "./gui/gestures";
import {generateMedia} from "./gui/media";
import {generateVolume} from "./gui/volume";
import {generateSettings} from "./gui/settings";
import {generateProgressbar} from "./gui/progressbar";
import {generateButtons, tooltip} from "./gui/buttons";
import {generateMobileOverlay, generateOverlay, showMobileOverlay, showOverlay} from "./gui/overlay";

let TimesetTimeout;

function SetTimesetTimeout() {
    let root = this;

    clearTimeout(TimesetTimeout);

    if (localStorage.getItem("mt_set_hidemenu") === "true") {
        TimesetTimeout = setTimeout(() => {
            root._.form.timeset.open = false;
            root._.form.timeset.root.style.display = "none";
        }, 3000);
    }

    if (mobileCheck()) {
        showMobileOverlay.call(this);
    } else {
        showOverlay.call(this);
    }
}

export function gui() {
    this._.rootElement.classList.add("mt");

    this._.element = createElement("div", {
        class: "mt_root"
    });

    this._.form = {};

    this._.form.embient = createElement("canvas", {
        class: "mt_embient"
    });

    generateMedia.call(this);

    this._.form.subtitles = createElement("div", {
        class: "mt_subtitles"
    });

    this._.form.timeset = {
        open: false,

        time: {
            hours: 0,
            minutes: 0,
            seconds: 0
        },

        root: createElement("div", {
            class: "mt_timeset"
        }, (el) => {
            el.addEventListener("click", () => {
                SetTimesetTimeout.call(this);
            });

            el.addEventListener("mousemove", () => {
                SetTimesetTimeout.call(this);
            });

            el.addEventListener("touchmove", () => {
                SetTimesetTimeout.call(this);
            });
        }),

        br_1: createElement("br"),

        header: createElement("div", {}, (el) => {
            el.innerText = "Установить время:";
        }),

        br_2: createElement("br"),

        body: {
            root: createElement("div"),

            hours: createElement("input", {
                class: "mt_timeset_input",
                type: "number",
                min: "0",
                max: "1"
            }, (el) => {
                el.addEventListener("change", (event) => {
                    this._.form.timeset.time.hours = (event.target.valueAsNumber * 3600);
                });
            }),

            b_1: createElement("b", {}, (el) => {
                el.innerText = " : ";
            }),

            minutes: createElement("input", {
                class: "mt_timeset_input",
                type: "number",
                min: "0",
                max: "59"
            }, (el) => {
                el.addEventListener("change", (event) => {
                    this._.form.timeset.time.minutes = (event.target.valueAsNumber * 60);
                });
            }),

            b_2: createElement("b", {}, (el) => {
                el.innerText = " : ";
            }),

            seconds: createElement("input", {
                class: "mt_timeset_input",
                type: "number",
                min: "0",
                max: "59"
            }, (el) => {
                el.addEventListener("change", (event) => {
                    this._.form.timeset.time.seconds = event.target.valueAsNumber;
                });
            })
        },

        footer: createElement("input", {
            type: "button",
            value: "Перейти"
        }, (el) => {
            el.addEventListener("click", () => {
                this.currentTime = (this._.form.timeset.time.hours + this._.form.timeset.time.minutes + this._.form.timeset.time.seconds);

                LogoInfoBlock.call(this, secondsToTime(this.currentTime));
            });
        })
    };

    this._.form.timeset.body.root.appendChild(this._.form.timeset.body.hours);
    this._.form.timeset.body.root.appendChild(this._.form.timeset.body.b_1);
    this._.form.timeset.body.root.appendChild(this._.form.timeset.body.minutes);
    this._.form.timeset.body.root.appendChild(this._.form.timeset.body.b_2);
    this._.form.timeset.body.root.appendChild(this._.form.timeset.body.seconds);

    this._.form.timeset.root.appendChild(this._.form.timeset.header);
    this._.form.timeset.root.appendChild(this._.form.timeset.br_1);
    this._.form.timeset.root.appendChild(this._.form.timeset.body.root);
    this._.form.timeset.root.appendChild(this._.form.timeset.br_2);
    this._.form.timeset.root.appendChild(this._.form.timeset.footer);

    this._.form.time = createElement("div", {
        class: "mt_overlay_time"
    }, (el) => {
        el.addEventListener("click", (event) => {
            if (this._.form.timeset.open) {
                this._.form.timeset.open = false;
                this._.form.timeset.root.style.display = "none";
            } else {
                this._.form.timeset.open = true;
                this._.form.timeset.root.style.display = "block";

                SetTimesetTimeout.call(this);

                let offsetLeft = event.srcElement.offsetLeft;
                let offsetWidth = event.srcElement.offsetWidth;

                if (offsetLeft === 0) {
                    offsetLeft = event.srcElement.offsetParent.offsetLeft;
                    offsetWidth = event.srcElement.offsetParent.offsetWidth;
                }

                let left = (offsetLeft - (this._.form.timeset.root.offsetWidth / 2) + (offsetWidth / 2));

                if (left < 0) {
                    this._.form.timeset.root.style.right = "auto";
                    this._.form.timeset.root.style.left = "0px";
                } else {
                    if ((left + this._.form.timeset.root.offsetWidth) > this._.element.offsetWidth) {
                        this._.form.timeset.root.style.left = "auto";
                        this._.form.timeset.root.style.right = "0px";
                    } else {
                        this._.form.timeset.root.style.left = (left + "px");
                    }
                }

                let Time = secondsToTime(this._.form.audio.duration, true);
                let currentTime = secondsToTime(this._.form.audio.currentTime, true);

                this._.form.timeset.time = {
                    hours: (currentTime.length === 3) ? (currentTime[2] * 3600) : 0,
                    minutes: (currentTime[1] * 60),
                    seconds: currentTime[0]
                };

                if (Time.length < 3) {
                    this._.form.timeset.body.hours.setAttribute("disabled", "");
                    this._.form.timeset.body.hours.value = "0";
                } else {
                    this._.form.timeset.body.hours.removeAttribute("disabled");
                    this._.form.timeset.body.hours.max = Time[2];
                    this._.form.timeset.body.hours.value = (currentTime.length === 3) ? currentTime[2] : "0";
                }

                this._.form.timeset.body.minutes.value = currentTime[1];
                this._.form.timeset.body.seconds.value = currentTime[0];
            }
        });

        el.addEventListener("mousemove", (event) => {
            tooltip.call(this, event, true, "Установить время");
        });

        el.addEventListener("mouseout", () => {
            tooltip.call(this, false);
        });
    });

    this._.form.time.innerText = "--:-- / --:--";

    this._.form.title = createElement("div", {
        class: "mt_overlay_title"
    });

    this._.form.logo_spiner = createElement("div", {
        class: !mobileCheck() ? "mt_logo_spiner" : "mt_logo_spiner_mobile"
    });

    this._.form.logo_play = createElement("div", {
        class: !mobileCheck() ? "mt_all_logo mt_logo_play" : "mt_all_logo_mobile mt_logo_play"
    });

    this._.form.logo_pause = createElement("div", {
        class: !mobileCheck() ? "mt_all_logo mt_logo_pause" : "mt_all_logo_mobile mt_logo_pause"
    });

    this._.form.logo_info_block = createElement("div", {
        class: !mobileCheck() ? "mt_all_logo mt_logo_info_block" : "mt_all_logo_mobile mt_logo_info_block_mobile"
    });

    this._.form.tooltip = createElement("div", {
        class: "mt_tooltip"
    });

    generateButtons.call(this);
    generateProgressbar.call(this);

    if (!mobileCheck()) {
        generateVolume.call(this);
    }

    generateSettings.call(this);

    if (mobileCheck()) {
        generateMobileOverlay.call(this);
    } else {
        generateOverlay.call(this);
    }

    this._.element.appendChild(this._.form.embient);
    this._.element.appendChild(this._.form.video);
    this._.element.appendChild(this._.form.audio);
    this._.element.appendChild(this._.form.subtitles);
    this._.element.appendChild(this._.form.overlays._root);
    this._.element.appendChild(this._.form.settings._root);
    this._.element.appendChild(this._.form.logo_spiner);
    this._.element.appendChild(this._.form.logo_play);
    this._.element.appendChild(this._.form.logo_pause);
    this._.element.appendChild(this._.form.logo_info_block);
    this._.element.appendChild(this._.form.tooltip);
    this._.element.appendChild(this._.form.timeset.root);

    gestures.call(this);

    if (!mobileCheck()) {
        hotkeys.call(this);
    }

    this._.rootElement.appendChild(this._.element);
}
