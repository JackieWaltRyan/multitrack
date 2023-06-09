import {createElement, logError, mobileCheck} from "../utils";
import {toggleSettings} from "./settings";
import {seek, skip} from "../playback";

export function tooltip(event, trigger, name) {
    if (trigger && !mobileCheck()) {
        this._.form.tooltip.style.display = "block";
        this._.form.tooltip.innerHTML = name;

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
                this._.form.tooltip.style.left = left + "px";
            }
        }
    } else {
        this._.form.tooltip.style.display = "none";
    }
}

export function toggleFullscreen() {
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

        this._.form.buttons.fullscreen.setAttribute("icon", "fullscreenOn");
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
            // For stupid users with iPhone
            element = this._.form.video;
            if (element.webkitEnterFullscreen) {
                element.webkitEnterFullscreen();
            }
        }

        this._.form.buttons.fullscreen.setAttribute("icon", "fullscreenOff");
    }
}

export function generateButtons() {
    this._.form.buttons = {
        // Плей/пауза
        play: createElement("button", {
                icon: "playBtn",
                class: !mobileCheck() ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile",
                style: !mobileCheck() ? "" : "background-size: 20vw; height: 20vw;"
            }, (el) => {
                el.onclick = (event) => {
                    this._.playing ? this.pause() : this.play();
                    this._.playing ? tooltip.call(this, event, true, "Пауза") : tooltip.call(this, event, true, "Воспроизведение");
                };

                el.onmousemove = (event) => {
                    this._.playing ? tooltip.call(this, event, true, "Пауза") : tooltip.call(this, event, true, "Воспроизведение");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
        // Отмотать на 10 секунд
        backward10: createElement("button", {
                icon: "backward10",
                class: !mobileCheck() ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile"
            }, (el) => {
                el.onclick = () => {
                    seek.call(this, -10);
                };

                el.onmousemove = (event) => {
                    tooltip.call(this, event, true, "Изменить позицию на  -10 секунд");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
        // Перемотать на 10 секунд
        forward10: createElement("button", {
                icon: "forward10",
                class: !mobileCheck() ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile"
            }, (el) => {
                el.onclick = () => {
                    seek.call(this, 10);
                };

                el.onmousemove = (event) => {
                    tooltip.call(this, event, true, "Изменить позицию на +10 секунд");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
        // Предыдущий трек
        skip_previous: createElement("button", {
                icon: "skip_previous",
                class: !mobileCheck() ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile"
            }, (el) => {
                el.onclick = () => {
                    skip.call(this, false);
                };

                el.onmousemove = (event) => {
                    tooltip.call(this, event, true, "Предыдущая серия");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
        // Следующий трек
        skip_next: createElement("button", {
                icon: "skip_next",
                class: !mobileCheck() ? "mt_overlay_button" : "mt_overlay_button mt_overlay_button_mobile"
            }, (el) => {
                el.onclick = () => {
                    skip.call(this, true);
                };

                el.onmousemove = (event) => {
                    tooltip.call(this, event, true, "Следующая серия");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
        // Кнопка полного экрана
        fullscreen: createElement("button", {
                icon: "fullscreenOn",
                class: "mt_overlay_button"
            }, (el) => {
                el.onclick = (event) => {
                    toggleFullscreen.call(this);
                    (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) ? tooltip.call(this, event, true, "Отключить полноэкранный режим") : tooltip.call(this, event, true, "Включить полноэкранный режим");
                };

                el.onmousemove = (event) => {
                    (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) ? tooltip.call(this, event, true, "Отключить полноэкранный режим") : tooltip.call(this, event, true, "Включить полноэкранный режим");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
        // Кнопка "Скопировать"
        copy_url: createElement("button", {
                icon: "copy",
                class: "mt_overlay_button"
            }, (el) => {
                el.onclick = () => {
                    try {
                        if (window.isSecureContext && navigator.clipboard) {
                            navigator.clipboard.writeText(decodeURIComponent(window.location.origin + window.location.pathname) + "?p=1&t=" + encodeURIComponent(parseInt(this._.form.video.currentTime)) + "&a=" + localStorage.getItem("mt_mark_dubs") + "&s=" + localStorage.getItem("mt_mark_subtitles")).then(r => r);
                        } else {
                            let input = document.createElement("input");
                            this._.rootElement.appendChild(input);
                            input.value = decodeURIComponent(window.location.origin + window.location.pathname) + "?p=1&t=" + encodeURIComponent(parseInt(this._.form.video.currentTime)) + "&a=" + localStorage.getItem("mt_mark_dubs") + "&s=" + localStorage.getItem("mt_mark_subtitles");
                            input.select();
                            document.execCommand("copy");
                            input.remove();
                        }
                    } catch {
                        logError.call(this, "Извините, при создании ссылки произошла ошибка.");
                    }
                };

                el.onmousemove = (event) => {
                    tooltip.call(this, event, true, "Скопировать ссылку с временем, озвучкой и субтитрами");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
        pip: createElement("button", {
                icon: "pipOn",
                class: "mt_overlay_button"
            }, (el) => {
                el.onclick = (event) => {
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
                        logError.call(this, "К сожалению, ваш браузер не поддерживает функцию «картинка в картинке».");
                    }
                };

                el.onmousemove = (event) => {
                    this._.form.video !== document.pictureInPictureElement ? tooltip.call(this, event, true, "Включить режим «картинка в картинке»") : tooltip.call(this, event, true, "Отключить режим «картинка в картинке»");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
        // Открыть меню
        menu: createElement("button", {
                icon: "menu",
                class: "mt_overlay_button"
            }, (el) => {
                el.onclick = () => {
                    toggleSettings.call(this);
                };

                el.onmousemove = (event) => {
                    tooltip.call(this, event, true, "Настройки");
                };

                el.onmouseout = () => {
                    tooltip.call(this, false);
                };
            }
        ),
    };
}
