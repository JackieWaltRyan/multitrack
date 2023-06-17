import {createElement, getPosInElement, LogoInfoBlock, mobileCheck, URLparams} from "../utils";
import {setAudio, setSubtitles, setVideo} from "../trackSwitcher";
import {setSpeed} from "../playback";
import {hotkeys, settings_hotkeys} from "./hotkeys";
import {showMobileOverlay, showOverlay} from "./overlay";
import {upcan} from "./media";

let SettingsTimeout;

class SettingsButtons {
    constructor(name = null) {
        this.Name = name;
        this.Buttons = [];
        this.Content = createElement("div");
    }

    appendButton(name, action, checkbox, checkbox_list) {
        let btn = createElement("div", {
            class: !mobileCheck() ? "mt_settings_element" : "mt_settings_element mt_settings_element_mobile"
        });

        btn.innerText = name;
        btn.addEventListener("click", () => {
            action();
        });

        if (checkbox !== undefined) {
            let div = createElement("div", {
                style: "flex: auto"
            });
            btn.appendChild(div);
            let input = createElement("input", {
                type: "checkbox",
                class: "mt_checkbox"
            });

            input.checked = (localStorage.getItem(checkbox) === "true");
            checkbox_list[checkbox] = input;
            btn.appendChild(input);
        }

        this.Buttons.push(btn);
        this.Content.appendChild(btn);
    }

    appendElement(tag, params = {}, actions = () => {
    }) {
        let el = createElement(tag, params, actions);

        this.Content.appendChild(el);
    }
}

class SettingsRadioButtons {
    constructor(name = null) {
        this.Name = name;
        this.Buttons = [];
        this.Content = createElement("div");
    }

    appendButton(name, action) {
        let btn = createElement("div", {
            class: !mobileCheck() ? "mt_settings_element" : "mt_settings_element mt_settings_element_mobile"
        });

        btn.innerText = name;
        btn.addEventListener("click", () => {
            for (let el of this.Buttons) {
                el.removeAttribute("selected");
            }

            btn.setAttribute("selected", "true");
            action();
        });

        this.Buttons.push(btn);
        this.Content.appendChild(btn);
    }
}

class SettingsPage {
    constructor(name) {
        this.Name = name;
        this.Content = createElement("div");
    }
}

function SetSettingsTimeout() {
    let root = this;

    clearTimeout(SettingsTimeout);

    if (localStorage.getItem("mt_set_hidemenu") === "true") {
        SettingsTimeout = setTimeout(() => {
            root._.rootElement.classList.remove("mt_settings_show");
            root._.form.settings.opened = false;
        }, 3000);
    }

    if (mobileCheck()) {
        showMobileOverlay.call(this);
    } else {
        showOverlay.call(this);
    }
}

export function toggleSettings(event) {
    if (this._.form.settings.opened) {
        this._.rootElement.classList.remove("mt_settings_show");

        clearTimeout(SettingsTimeout);
    } else {
        resetMenu.call(this);

        this._.rootElement.classList.add("mt_settings_show");

        SetSettingsTimeout.call(this);

        if (event !== undefined && !mobileCheck()) {
            let pos = getPosInElement(this._.element, event);

            if ((this._.element.offsetWidth - pos.x) >= this._.form.settings._root.offsetWidth) {
                this._.form.settings._root.style.left = (pos.x + "px");
                this._.form.settings._root.style.right = "auto";
            } else {
                this._.form.settings._root.style.right = ((this._.element.offsetWidth - pos.x) + "px");
                this._.form.settings._root.style.left = "auto";
            }

            if ((this._.element.offsetHeight - pos.y) >= this._.form.settings._root.offsetHeight) {
                this._.form.settings._root.style.top = (pos.y + "px");
                this._.form.settings._root.style.bottom = "auto";
            } else if ((this._.element.offsetHeight - (this._.element.offsetHeight - pos.y)) >= this._.form.settings._root.offsetHeight) {
                this._.form.settings._root.style.bottom = ((this._.element.offsetHeight - pos.y) + "px");
                this._.form.settings._root.style.top = "auto";
            } else {
                this._.form.settings._root.style.top = (0 + "px");
                this._.form.settings._root.style.bottom = "auto";
            }

            this._.form.settings._root.addEventListener("click", () => {
                if ((this._.form.settings._root.getBoundingClientRect().top - this._.element.getBoundingClientRect().top) < 0) {
                    this._.form.settings._root.style.top = (0 + "px");
                    this._.form.settings._root.style.bottom = "auto";
                }

                if ((this._.element.getBoundingClientRect().bottom - this._.form.settings._root.getBoundingClientRect().bottom) < 0) {
                    this._.form.settings._root.style.bottom = (0 + "px");
                    this._.form.settings._root.style.top = "auto";
                }

                if ((this._.form.settings._root.getBoundingClientRect().left - this._.element.getBoundingClientRect().left) < 0) {
                    this._.form.settings._root.style.left = (0 + "px");
                    this._.form.settings._root.style.right = "auto";
                }

                if ((this._.element.getBoundingClientRect().right - this._.form.settings._root.getBoundingClientRect().right) < 0) {
                    this._.form.settings._root.style.right = (0 + "px");
                    this._.form.settings._root.style.left = "auto";
                }
            });
        } else {
            this._.form.settings._root.style.bottom = "60px";
            this._.form.settings._root.style.right = "8px";
        }
    }

    this._.form.settings.opened = !this._.form.settings.opened;
}

function resetMenu() {
    this._.form.settings.title.innerText = "Настройки";
    this._.form.settings.header.setAttribute("showIcon", null);

    for (let el in this._.form.settings.menu) {
        el = this._.form.settings.menu[el];
        el.Content.style.display = "none";
    }

    this._.form.settings.menuSwitcher.Content.removeAttribute("style");
}

export function generateSettings() {
    this._.form.settings = {};
    this._.form.settings.opened = false;

    this._.form.settings.menu = {};
    this._.form.settings.menu.quality = new SettingsRadioButtons("Качество");
    this._.form.settings.menu.dubs = new SettingsRadioButtons("Озвучки");
    this._.form.settings.menu.subtitles = new SettingsRadioButtons("Субтитры");
    this._.form.settings.menu.playbackRate = new SettingsRadioButtons("Скорость");
    this._.form.settings.menu.videoSize = new SettingsRadioButtons("Масштаб");
    this._.form.settings.menu.settings = new SettingsButtons("Дополнительно");

    this._.form.checkbox = {
        mt_set_position: null,
        mt_set_volume: null,
        mt_set_quality: null,
        mt_set_voiceovers: null,
        mt_set_subtitles: null,
        mt_set_speed: null,
        mt_set_size: null,
        mt_set_nextvideo: null,
        mt_set_skip: null,
        mt_set_newsegments: null,
        mt_set_hidemenu: null
    };

    this._.form.settings.menu.settings.appendButton("Запоминать позицию", () => {
        let trigger = (localStorage.getItem("mt_set_position") !== "true");
        localStorage.setItem("mt_set_position", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_position.checked = trigger;
    }, "mt_set_position", this._.form.checkbox);

    if (!mobileCheck()) {
        this._.form.settings.menu.settings.appendButton("Запоминать громкость", () => {
            let trigger = (localStorage.getItem("mt_set_volume") !== "true");
            localStorage.setItem("mt_set_volume", encodeURIComponent(trigger));
            this._.form.checkbox.mt_set_volume.checked = trigger;
        }, "mt_set_volume", this._.form.checkbox);
    }

    this._.form.settings.menu.settings.appendButton("Запоминать качество", () => {
        let trigger = (localStorage.getItem("mt_set_quality") !== "true");
        localStorage.setItem("mt_set_quality", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_quality.checked = trigger;
    }, "mt_set_quality", this._.form.checkbox);

    this._.form.settings.menu.settings.appendButton("Запоминать озвучки", () => {
        let trigger = (localStorage.getItem("mt_set_voiceovers") !== "true");
        localStorage.setItem("mt_set_voiceovers", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_voiceovers.checked = trigger;
    }, "mt_set_voiceovers", this._.form.checkbox);

    this._.form.settings.menu.settings.appendButton("Запоминать субтитры", () => {
        let trigger = (localStorage.getItem("mt_set_subtitles") !== "true");
        localStorage.setItem("mt_set_subtitles", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_subtitles.checked = trigger;
    }, "mt_set_subtitles", this._.form.checkbox);

    this._.form.settings.menu.settings.appendButton("Запоминать скорость", () => {
        let trigger = (localStorage.getItem("mt_set_speed") !== "true");
        localStorage.setItem("mt_set_speed", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_speed.checked = trigger;
    }, "mt_set_speed", this._.form.checkbox);

    this._.form.settings.menu.settings.appendButton("Запоминать масштаб", () => {
        let trigger = (localStorage.getItem("mt_set_size") !== "true");
        localStorage.setItem("mt_set_size", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_size.checked = trigger;
    }, "mt_set_size", this._.form.checkbox);

    this._.form.settings.menu.settings.appendElement("hr", {
        class: "mt_hr"
    });

    this._.form.settings.menu.settings.appendButton("Переходить на следующее видео", () => {
        let trigger = (localStorage.getItem("mt_set_nextvideo") !== "true");
        localStorage.setItem("mt_set_nextvideo", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_nextvideo.checked = trigger;
    }, "mt_set_nextvideo", this._.form.checkbox);

    this._.form.settings.menu.settings.appendButton("Пропускать заставку и титры", () => {
        let trigger = (localStorage.getItem("mt_set_skip") !== "true");
        localStorage.setItem("mt_set_skip", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_skip.checked = trigger;
        this._.form.video.dispatchEvent(new ProgressEvent("timeupdate"));
    }, "mt_set_skip", this._.form.checkbox);

    this._.form.settings.menu.settings.appendElement("hr", {
        class: "mt_hr"
    });

    this._.form.settings.menu.settings.appendButton("Добавление новых сегментов", () => {
        let trigger = (localStorage.getItem("mt_set_newsegments") !== "true");
        localStorage.setItem("mt_set_newsegments", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_newsegments.checked = trigger;

        if (trigger) {
            this._.form.overlays.overlay_sts.root.style.display = "block";
        } else {
            this._.form.overlays.overlay_sts.root.style.display = "none";
        }
    }, "mt_set_newsegments", this._.form.checkbox);

    this._.form.settings.menu.settings.appendButton("Скрывать меню при неактивности", () => {
        let trigger = (localStorage.getItem("mt_set_hidemenu") !== "true");
        localStorage.setItem("mt_set_hidemenu", encodeURIComponent(trigger));
        this._.form.checkbox.mt_set_hidemenu.checked = trigger;
    }, "mt_set_hidemenu", this._.form.checkbox);

    if (!mobileCheck()) {
        this._.form.settings.menu.hotkeys = new SettingsPage("Управление");
        this._.form.settings.menu.hotkeys.Content = createElement("div", {
            blockName: "hotkeys"
        }, (el) => {
            settings_hotkeys.call(this, el);
        });
    }

    this._.form.settings.menu.info = new SettingsPage("Информация о плеере");
    this._.form.settings.menu.info.Content = createElement("div", {
        blockName: "info"
    }, (el) => {
        el.appendChild(createElement("div", {
            style: "display: flex; padding-bottom: 12px"
        }, (el) => {
            el.appendChild(createElement("img", {
                src: "https://avatars.githubusercontent.com/u/79658863?s=48",
                width: 48,
                height: 48
            }));

            el.appendChild(createElement("div", {
                style: "line-height: 20px; padding: 4px 8px"
            }, (el) => {
                el.appendChild(createElement("b", {
                    style: "font-weight: normal"
                }, (el) => {
                    el.innerText = "Версия: " + require("/package.json").version;
                }));

                el.appendChild(createElement("br"));

                el.appendChild(createElement("b", {
                    style: "font-weight: normal"
                }, (el) => {
                    el.innerText = "Дата сборки: " + new Date(__TIMESTAMP__).toLocaleString("ru");
                }));
            }));
        }));

        el.appendChild(createElement("b", {
            style: "font-weight: normal"
        }, (el) => {
            el.innerText = "Исходный код плеера: ";
        }));

        el.appendChild(createElement("a", {
            href: require("/package.json").homepage,
            target: "_blank",
            style: "color: #ffccff"
        }, (el) => {
            el.innerText = "JackieWaltRyan/multitrack";
        }));

        el.appendChild(createElement("br"));

        el.appendChild(createElement("b", {
            style: "font-weight: normal"
        }, (el) => {
            el.innerText = "Баги и предложения: ";
        }));

        el.appendChild(createElement("a", {
            href: require("/package.json").bugs.url,
            target: "_blank",
            style: "color: #ffccff"
        }, (el) => {
            el.innerText = "GitHub Issues";
        }));
    });

    this._.form.settings.title = createElement("div");

    this._.form.settings.header = createElement("div", {
        class: "mt_settings_header"
    }, (el) => {
        el.addEventListener("click", () => {
            resetMenu.call(this);
        });
    });

    this._.form.settings.menuSwitcher = new SettingsButtons();
    this._.form.settings._root = createElement("div", {
        class: "mt_settings"
    }, (el) => {
        el.addEventListener("click", () => {
            SetSettingsTimeout.call(this);
        });

        el.addEventListener("mousemove", () => {
            SetSettingsTimeout.call(this);
        });

        el.addEventListener("touchmove", () => {
            SetSettingsTimeout.call(this);
        });
    });

    for (let video of this._.videos) {
        this._.form.settings.menu.quality.appendButton(video.name, () => {
            localStorage.setItem("mt_mark_quality", encodeURIComponent(video.name));
            setVideo.call(this, video.path);
        });
    }

    let preferredVideoIndex = 0;

    if (this._.preferredVideoName) {
        let index = this._.videos.findIndex((video) => (video.name === this._.preferredVideoName));
        if (index !== -1) {
            preferredVideoIndex = index;
        }
    }

    if (localStorage.getItem("mt_mark_quality") && (localStorage.getItem("mt_set_quality") === "true")) {
        let index = this._.videos.findIndex((video) => (video.name === localStorage.getItem("mt_mark_quality")));
        if (index !== -1) {
            preferredVideoIndex = index;
        }
    }

    this._.form.settings.menu.quality.Buttons[preferredVideoIndex].click();

    for (let audio of this._.audios) {
        this._.form.settings.menu.dubs.appendButton(audio.name, () => {
            localStorage.setItem("mt_mark_dubs", encodeURIComponent(audio.code));
            setAudio.call(this, audio.path, audio.code);
        });
    }

    let preferredAudioIndex = 0;

    if (localStorage.getItem("mt_mark_dubs") && (localStorage.getItem("mt_set_voiceovers") === "true")) {
        let index = this._.audios.findIndex((audio) => (audio.code === localStorage.getItem("mt_mark_dubs")));
        if (index !== -1) {
            preferredAudioIndex = index;
        }
    }

    if ("a" in URLparams()) {
        let index = this._.audios.findIndex((audio) => (audio.code === URLparams()["a"]));
        if (index !== -1) {
            preferredAudioIndex = index;
        }
    }

    this._.form.settings.menu.dubs.Buttons[preferredAudioIndex].click();

    this._.subtitles.unshift({
        "name": "Без субтитров",
        "code": "none",
        "path": undefined
    });

    for (let subtitle of this._.subtitles) {
        this._.form.settings.menu.subtitles.appendButton(subtitle.name, () => {
            localStorage.setItem("mt_mark_subtitles", encodeURIComponent(subtitle.code));
            setSubtitles.call(this, subtitle.path, subtitle.code);
        });
    }

    let preferredSubtitleIndex = 0;

    if (localStorage.getItem("mt_mark_subtitles") && (localStorage.getItem("mt_set_subtitles") === "true")) {
        let index = this._.subtitles.findIndex((subtitle) => (subtitle.code === localStorage.getItem("mt_mark_subtitles")));
        if (index !== -1) {
            preferredSubtitleIndex = index;
        }
    }

    if ("s" in URLparams()) {
        let index = this._.subtitles.findIndex((subtitle) => (subtitle.code === URLparams()["s"]));
        if (index !== -1) {
            preferredSubtitleIndex = index;
        }
    }

    this._.form.settings.menu.subtitles.Buttons[preferredSubtitleIndex].click();

    this._.form.settings.menu.playbackRate.appendButton(1 + "x", () => {
        let val = 1;

        this._.form.settings.menu.playbackRate.selected.style.width = ((85 * ((val - 0.25) / (2 - 0.25))) + "%");

        LogoInfoBlock.call(this, val);

        setSpeed.call(this, val);
    });

    this._.form.settings.menu.playbackRate.speed_root = createElement("div", {
        class: "mt_speed_root"
    }, (el) => {
        let release = (event) => {
            this._.form.settings.menu.playbackRate.updateStyle = false;
            let element_1 = this._.form.settings.menu.playbackRate.speed_root_background;
            let pos_1 = getPosInElement(element_1, event).x / element_1.clientWidth;

            if (pos_1 < 0) {
                pos_1 = 0;
            }

            if (pos_1 > 1) {
                pos_1 = 1;
            }

            this._.form.settings.menu.playbackRate.selected.style.width = ((85 * pos_1) + "%");

            let convert = ((2 - 0.25) * pos_1) + 0.25;

            LogoInfoBlock.call(this, convert.toString().slice(0, 4));
            setSpeed.call(this, convert);
        };

        let move = (event) => {
            if (this._.form.settings.menu.playbackRate.updateStyle) {
                let element_2 = this._.form.settings.menu.playbackRate.speed_root_background;
                let pos_2 = getPosInElement(element_2, event).x / element_2.clientWidth;

                if (pos_2 < 0) {
                    pos_2 = 0;
                }

                if (pos_2 > 1) {
                    pos_2 = 1;
                }

                this._.form.settings.menu.playbackRate.selected.style.width = ((85 * pos_2) + "%");

                let convert = ((2 - 0.25) * pos_2) + 0.25;

                LogoInfoBlock.call(this, convert.toString().slice(0, 4));
                setSpeed.call(this, convert);
            }
        };

        el.addEventListener("mousedown", () => {
            this._.form.settings.menu.playbackRate.updateStyle = true;
            Object(this._.moveEvents).push({
                move: move,
                release: release,
            });
        });

        el.addEventListener("touchstart", () => {
            this._.form.settings.menu.playbackRate.updateStyle = true;
            Object(this._.moveEvents).push({
                move: move,
                release: release,
            });
        });
    });

    this._.form.settings.menu.playbackRate.min = createElement("div", {
        class: "mt_speed_root_min"
    });
    this._.form.settings.menu.playbackRate.min.innerText = "0.25";
    this._.form.settings.menu.playbackRate.speed_root.appendChild(this._.form.settings.menu.playbackRate.min);

    this._.form.settings.menu.playbackRate.speed_root_background = createElement("div", {
        class: "mt_speed_root_background"
    });
    this._.form.settings.menu.playbackRate.speed_root.appendChild(this._.form.settings.menu.playbackRate.speed_root_background);

    this._.form.settings.menu.playbackRate.selected = createElement("div", {
        class: "mt_speed_root_selected"
    });
    this._.form.settings.menu.playbackRate.speed_root.appendChild(this._.form.settings.menu.playbackRate.selected);

    this._.form.settings.menu.playbackRate.max = createElement("div", {
        class: "mt_speed_root_max"
    });
    this._.form.settings.menu.playbackRate.max.innerText = "2";
    this._.form.settings.menu.playbackRate.speed_root.appendChild(this._.form.settings.menu.playbackRate.max);

    this._.form.settings.menu.playbackRate.Content.appendChild(this._.form.settings.menu.playbackRate.speed_root);

    if (localStorage.getItem("mt_mark_speed") && (localStorage.getItem("mt_set_speed") === "true")) {
        this._.form.settings.menu.playbackRate.selected.style.width = ((85 * ((parseFloat(localStorage.getItem("mt_mark_speed")) - 0.25) / (2 - 0.25))) + "%");

        setSpeed.call(this, parseFloat(localStorage.getItem("mt_mark_speed")));
    } else {
        this._.form.settings.menu.playbackRate.Buttons[0].click();
    }

    this._.form.settings.menu.videoSize.appendButton("По размеру экрана", () => {
        localStorage.setItem("mt_mark_size", encodeURIComponent(0));
        this._.form.video.style.objectFit = "contain";
        this._.enable_embient = false;
    });

    this._.form.settings.menu.videoSize.appendButton("Эмбилайт", () => {
        localStorage.setItem("mt_mark_size", encodeURIComponent(1));
        this._.form.video.style.objectFit = "contain";
        this._.enable_embient = true;

        upcan.call(this);
    });

    this._.form.settings.menu.videoSize.appendButton("Растянуть", () => {
        localStorage.setItem("mt_mark_size", encodeURIComponent(2));
        this._.form.video.style.objectFit = "fill";
        this._.enable_embient = false;
    });

    this._.form.settings.menu.videoSize.appendButton("Обрезать", () => {
        localStorage.setItem("mt_mark_size", encodeURIComponent(3));
        this._.form.video.style.objectFit = "cover";
        this._.enable_embient = false;
    });

    this._.form.settings.menu.videoSize.appendButton("Реальный размер", () => {
        localStorage.setItem("mt_mark_size", encodeURIComponent(4));
        this._.form.video.style.objectFit = "none";
        this._.enable_embient = false;
    });

    let preferredSizeIndex = 0;

    if (localStorage.getItem("mt_mark_size") && (localStorage.getItem("mt_set_size") === "true")) {
        preferredSizeIndex = parseInt(localStorage.getItem("mt_mark_size"));
    }

    this._.form.settings.menu.videoSize.Buttons[preferredSizeIndex].click();

    for (let menu in this._.form.settings.menu) {
        menu = this._.form.settings.menu[menu];

        this._.form.settings.menuSwitcher.appendButton(menu.Name, () => {
            resetMenu.call(this);

            this._.form.settings.header.setAttribute("showIcon", "true");
            this._.form.settings.title.innerText = menu.Name;
            menu.Content.removeAttribute("style");
            this._.form.settings.menuSwitcher.Content.style.display = "none";
        });
    }

    this._.form.settings.body = createElement("div", {
        class: "mt_settings_body"
    });

    this._.form.settings.body.appendChild(this._.form.settings.menuSwitcher.Content);

    for (let menu in this._.form.settings.menu) {
        menu = this._.form.settings.menu[menu];
        this._.form.settings.body.appendChild(menu.Content);
    }

    resetMenu.call(this);

    this._.form.settings.header.appendChild(this._.form.settings.title);
    this._.form.settings._root.appendChild(this._.form.settings.header);
    this._.form.settings._root.appendChild(this._.form.settings.body);
}
