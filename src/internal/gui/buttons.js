import {createElement} from "../utils";
import {closeSettings, toggleSettings} from "./settings";
import {seek, skip} from "../playback";
import {repeat, set_repeat} from "./media";
import {mute} from "./volume";

export function tooltip(event, trigger, name) {
    if (trigger && !matchMedia("(any-pointer:coarse)").matches) {
        this._.form.tooltip.style.display = "block";
        this._.form.tooltip.innerText = name;

        let offsetLeft = event.srcElement.offsetLeft;
        let offsetWidth = event.srcElement.offsetWidth;

        if (offsetLeft === 0) {
            offsetLeft = event.srcElement.offsetParent.offsetLeft;
            offsetWidth = event.srcElement.offsetParent.offsetWidth;
        }

        let left = (offsetLeft - (this._.form.tooltip.offsetWidth / 2) + (offsetWidth / 2));

        if (left < 0) {
            this._.form.tooltip.style.right = "auto";
            this._.form.tooltip.style.left = "0px";
        } else {
            if ((left + this._.form.tooltip.offsetWidth) > this._.element.offsetWidth) {
                this._.form.tooltip.style.left = "auto";
                this._.form.tooltip.style.right = "0px";
            } else {
                this._.form.tooltip.style.left = (left + "px");
            }
        }
    } else {
        this._.form.tooltip.style.display = "none";
    }
}

export function toggleFullscreen() {
    closeSettings.call(this);

    this._.form.timeset.open = false;
    this._.form.timeset.root.style.display = "none";

    if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) {
        if (document.exitFullscreen) {
            document.exitFullscreen().then(r => r);
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitsExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }

        this._.form.buttons.but_fullscreen.setAttribute("icon", "fullscreenOn");
    } else {
        let element = this._.element;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        } else {
            element = this._.form.video;

            if (element.webkitEnterFullscreen) {
                element.webkitEnterFullscreen();
            }
        }

        this._.form.buttons.but_fullscreen.setAttribute("icon", "fullscreenOff");
    }
}

export function generateButtons() {
    this._.form.buttons = {
        but_play: createElement("button", {
                icon: "playBtn",
                class: !matchMedia("(any-pointer:coarse)").matches ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile",
                style: !matchMedia("(any-pointer:coarse)").matches ? "" : "background-size: 20vw; height: 20vw"
            }, (el) => {
                el.addEventListener("click", (event) => {
                    this._.playing ? this.pause() : this.play();
                    this._.playing ? tooltip.call(this, event, true, "Пауза") : tooltip.call(this, event, true, "Воспроизведение");
                });

                el.addEventListener("mousemove", (event) => {
                    this._.playing ? tooltip.call(this, event, true, "Пауза") : tooltip.call(this, event, true, "Воспроизведение");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_backward_10: createElement("button", {
                icon: "backward10",
                class: !matchMedia("(any-pointer:coarse)").matches ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile"
            }, (el) => {
                el.addEventListener("click", () => {
                    seek.call(this, -10);
                });

                el.addEventListener("mousemove", (event) => {
                    tooltip.call(this, event, true, "Изменить позицию на  -10 секунд");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_forward_10: createElement("button", {
                icon: "forward10",
                class: !matchMedia("(any-pointer:coarse)").matches ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile"
            }, (el) => {
                el.addEventListener("click", () => {
                    seek.call(this, 10);
                });

                el.addEventListener("mousemove", (event) => {
                    tooltip.call(this, event, true, "Изменить позицию на +10 секунд");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_skip_previous: createElement("button", {
                icon: "skip_previous",
                class: !matchMedia("(any-pointer:coarse)").matches ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile"
            }, (el) => {
                el.addEventListener("click", () => {
                    skip.call(this, false);
                });

                el.addEventListener("mousemove", (event) => {
                    tooltip.call(this, event, true, "Предыдущая серия");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_skip_next: createElement("button", {
                icon: "skip_next",
                class: !matchMedia("(any-pointer:coarse)").matches ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile"
            }, (el) => {
                el.addEventListener("click", () => {
                    skip.call(this, true);
                });

                el.addEventListener("mousemove", (event) => {
                    tooltip.call(this, event, true, "Следующая серия");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_repeat: createElement("button", {
                icon: "repeatOff",
                class: "mt_overlay_button"
            }, (el) => {
                el.addEventListener("click", (event) => {
                    set_repeat.call(this);

                    let text = (repeat().length === 0) ? "Установить начало повтора" : ((repeat().length === 1) ? "Установить конец повтора" : "Отключить повтор");
                    tooltip.call(this, event, true, text);

                    let icon = (repeat().length === 0) ? "repeatOff" : ((repeat().length === 1) ? "repeatA" : "repeatB");
                    this._.form.buttons.but_repeat.setAttribute("icon", icon);

                    this._.form.video.dispatchEvent(new ProgressEvent("timeupdate"));
                });

                el.addEventListener("mousemove", (event) => {
                    let text = (repeat().length === 0) ? "Установить начало повтора" : ((repeat().length === 1) ? "Установить конец повтора" : "Отключить повтор");
                    tooltip.call(this, event, true, text);
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_volume: createElement("button", {
            class: "mt_overlay_button",
            icon: "volume",
            iconVar: 3
        }, (el) => {
            el.addEventListener("click", (event) => {
                mute.call(this, true);
                this.muted ? tooltip.call(this, event, true, "Включить звук") : tooltip.call(this, event, true, "Отключить звук");
            });

            el.addEventListener("mousemove", (event) => {
                this.muted ? tooltip.call(this, event, true, "Включить звук") : tooltip.call(this, event, true, "Отключить звук");
            });

            el.addEventListener("mouseout", () => {
                tooltip.call(this, false);
            });
        }),

        but_copy_url: createElement("button", {
                icon: "copy",
                class: "mt_overlay_button"
            }, (el) => {
                el.addEventListener("click", () => {
                    try {
                        if (isSecureContext && navigator.clipboard) {
                            navigator.clipboard.writeText(location.origin + location.pathname + "?p=1&t=" + encodeURIComponent(parseInt(this._.form.video.currentTime)) + "&a=" + localStorage.getItem("mt_mark_dubs") + "&s=" + localStorage.getItem("mt_mark_subtitles")).then(r => r);
                        } else {
                            let input = document.createElement("input");
                            this._.rootElement.appendChild(input);
                            input.value = location.origin + location.pathname + "?p=1&t=" + encodeURIComponent(parseInt(this._.form.video.currentTime)) + "&a=" + localStorage.getItem("mt_mark_dubs") + "&s=" + localStorage.getItem("mt_mark_subtitles");
                            input.select();
                            document.execCommand("copy");
                            input.remove();
                        }
                    } catch {
                        alert("Извините, при создании ссылки произошла ошибка.");
                    }
                });

                el.addEventListener("mousemove", (event) => {
                    tooltip.call(this, event, true, "Скопировать ссылку с временем, озвучкой и субтитрами");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_pip: createElement("button", {
                icon: "pipOn",
                class: "mt_overlay_button"
            }, (el) => {
                el.addEventListener("click", (event) => {
                    if ("pictureInPictureEnabled" in document) {
                        if (this._.form.video !== document.pictureInPictureElement) {
                            this._.form.video.requestPictureInPicture().then(r => r);
                            el.setAttribute("icon", "pipOff");
                            tooltip.call(this, event, true, "Отключить режим «картинка в картинке»")
                        } else {
                            document.exitPictureInPicture().then(r => r);
                            el.setAttribute("icon", "pipOn");
                            tooltip.call(this, event, true, "Включить режим «картинка в картинке»")
                        }
                    } else {
                        alert("К сожалению, ваш браузер не поддерживает функцию «картинка в картинке».");
                    }
                });

                el.addEventListener("mousemove", (event) => {
                    (this._.form.video !== document.pictureInPictureElement) ? tooltip.call(this, event, true, "Включить режим «картинка в картинке»") : tooltip.call(this, event, true, "Отключить режим «картинка в картинке»");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_menu: createElement("button", {
                icon: "menu",
                class: "mt_overlay_button"
            }, (el) => {
                el.addEventListener("click", () => {
                    toggleSettings.call(this);
                });

                el.addEventListener("mousemove", (event) => {
                    tooltip.call(this, event, true, "Настройки");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        ),

        but_fullscreen: createElement("button", {
                icon: "fullscreenOn",
                class: "mt_overlay_button"
            }, (el) => {
                el.addEventListener("click", (event) => {
                    toggleFullscreen.call(this);
                    (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) ? tooltip.call(this, event, true, "Отключить полноэкранный режим") : tooltip.call(this, event, true, "Включить полноэкранный режим");
                });

                el.addEventListener("mousemove", (event) => {
                    (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) ? tooltip.call(this, event, true, "Отключить полноэкранный режим") : tooltip.call(this, event, true, "Включить полноэкранный режим");
                });

                el.addEventListener("mouseout", () => {
                    tooltip.call(this, false);
                });
            }
        )
    };
}
