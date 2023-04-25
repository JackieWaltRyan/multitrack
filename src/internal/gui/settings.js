import {createElement, getCookie, getPosInElement, LogoInfoBlock, URLparams} from "../utils";
import {setAudio, setSubtitles, setVideo} from "../trackSwitcher";
import {setSpeed} from "../playback";
import {hotkeys} from "./hotkeys";

class SettingsButtons {
    constructor(name = null) {
        this.Name = name;
        this.Buttons = [];
        this.Content = createElement("div");
    }

    appendButton(name, action, checkbox) {
        let btn = createElement("div", {
            class: "mjs__settings_element"
        });

        btn.innerText = name;
        btn.onclick = () => {
            action();
        };

        if (checkbox !== undefined) {
            let div = createElement("div", {
                style: "flex: auto"
            });
            btn.appendChild(div);
            let input = createElement("input", {
                id: checkbox,
                type: "checkbox",
                style: "top: 25%; position: relative; display: inline-block;"
            });

            input.checked = (getCookie(checkbox) === "true");
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
            class: "mjs__settings_element"
        });

        btn.innerText = name;
        btn.onclick = () => {
            for (let el of this.Buttons) {
                el.removeAttribute("selected");
            }

            btn.setAttribute("selected", "true");
            action();
        };

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

let SettingsTimeout;

function set_timeout() {
    clearTimeout(SettingsTimeout);

    if (getCookie("s_hsm") === "true") {
        SettingsTimeout = setTimeout(() => {
            this._.rootElement.classList.remove("mjs__settings_show");
            this._.form.settings.opened = false;
        }, 3000);
    }
}

export function toggleSettings(event) {
    if (this._.form.settings.opened) {
        this._.rootElement.classList.remove("mjs__settings_show");

        clearTimeout(SettingsTimeout);
    } else {
        resetMenu.call(this);

        this._.rootElement.classList.add("mjs__settings_show");

        set_timeout.call(this);

        if (event !== undefined) {
            let pos = getPosInElement(this._.element, event);

            if ((this._.element.offsetWidth - pos.x) >= this._.form.settings._root.offsetWidth) {
                this._.form.settings._root.style.left = pos.x + "px";
                this._.form.settings._root.style.right = "auto";
            } else {
                this._.form.settings._root.style.right = (this._.element.offsetWidth - pos.x) + "px";
                this._.form.settings._root.style.left = "auto";
            }

            if ((this._.element.offsetHeight - pos.y) >= this._.form.settings._root.offsetHeight) {
                this._.form.settings._root.style.top = pos.y + "px";
                this._.form.settings._root.style.bottom = "auto";
            } else {
                this._.form.settings._root.style.bottom = (this._.element.offsetHeight - pos.y) + "px";
                this._.form.settings._root.style.top = "auto";
            }
        } else {
            this._.form.settings._root.style = "bottom: 60px; right: 8px;";
        }
    }

    this._.form.settings.opened = !this._.form.settings.opened;
}

function resetMenu() {
    this._.form.settings.title.innerText = "Настройки";
    this._.form.settings.header.setAttribute("showIcon", null);

    for (let el in this._.form.settings.menu) {
        el = this._.form.settings.menu[el];
        el.Content.setAttribute("style", "display: none");
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
    this._.form.settings.menu.settings = new SettingsButtons("Дополнительно");

    this._.form.settings.menu.settings.appendButton("Запоминать позицию", () => {
        let trigger = !(getCookie("s_tt") === "true");
        document.cookie = "s_tt=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_tt");
        input.checked = trigger;
    }, "s_tt");

    this._.form.settings.menu.settings.appendButton("Запоминать громкость", () => {
        let trigger = !(getCookie("s_vl") === "true");
        document.cookie = "s_vl=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_vl");
        input.checked = trigger;
    }, "s_vl");

    this._.form.settings.menu.settings.appendButton("Запоминать качество", () => {
        let trigger = !(getCookie("s_vd") === "true");
        document.cookie = "s_vd=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_vd");
        input.checked = trigger;
    }, "s_vd");

    this._.form.settings.menu.settings.appendButton("Запоминать озвучки", () => {
        let trigger = !(getCookie("s_au") === "true");
        document.cookie = "s_au=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_au");
        input.checked = trigger;
    }, "s_au");

    this._.form.settings.menu.settings.appendButton("Запоминать субтитры", () => {
        let trigger = !(getCookie("s_st") === "true");
        document.cookie = "s_st=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_st");
        input.checked = trigger;
    }, "s_st");

    this._.form.settings.menu.settings.appendButton("Запоминать скорость", () => {
        let trigger = !(getCookie("s_sp") === "true");
        document.cookie = "s_sp=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_sp");
        input.checked = trigger;
    }, "s_sp");

    this._.form.settings.menu.settings.appendElement("hr", {
        id: "hr1",
        style: "border-style: inset; border-width: 1px;"
    });

    this._.form.settings.menu.settings.appendButton("Переходить на следующее видео", () => {
        let trigger = !(getCookie("s_anv") === "true");
        document.cookie = "s_anv=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_anv");
        input.checked = trigger;
    }, "s_anv");

    this._.form.settings.menu.settings.appendButton("Пропускать заставку и титры", () => {
        let trigger = !(getCookie("s_sic") === "true");
        document.cookie = "s_sic=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_sic");
        input.checked = trigger;
        this._.form.video.dispatchEvent(new ProgressEvent("progress"));
    }, "s_sic");

    this._.form.settings.menu.settings.appendElement("hr", {
        id: "hr2",
        style: "border-style: inset; border-width: 1px;"
    });

    this._.form.settings.menu.settings.appendButton("Добавление новых сегментов", () => {
        let trigger = !(getCookie("s_sts") === "true");
        document.cookie = "s_sts=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_sts");
        input.checked = trigger;
        let overlay_sts = document.getElementById("overlay_sts");

        if (trigger) {
            overlay_sts.style.display = "block";
        } else {
            overlay_sts.style.display = "none";
        }
    }, "s_sts");

    this._.form.settings.menu.settings.appendButton("Скрывать меню при неактивности", () => {
        let trigger = !(getCookie("s_hsm") === "true");
        document.cookie = "s_hsm=" + encodeURIComponent(trigger) + "; path=/; max-age=" + (86400 * 365);
        let input = document.getElementById("s_hsm");
        input.checked = trigger;
    }, "s_hsm");

    this._.form.settings.menu.hotkeys = new SettingsPage("Управление");
    this._.form.settings.menu.hotkeys.Content = createElement("div", {
        blockName: "hotkeys"
    }, (el) => {
        console.log(el);
    });

    this._.form.settings.menu.info = new SettingsPage("Информация о плеере");
    this._.form.settings.menu.info.Content = createElement("div", {
        blockName: "info"
    }, (el) => {
        let authorBlock = createElement("div", {
            style: "display: flex; padding-bottom: 12px;"
        }, (bl) => {
            const imageBlock = createElement("img", {
                src: "https://avatars.githubusercontent.com/u/79658863?s=48",
                width: 48,
                height: 48
            });
            bl.appendChild(imageBlock);

            const infoBlock = createElement("div", {
                style: "line-height: 20px; padding: 4px 8px;"
            }, (inf) => {
                inf.innerHTML += "Версия: " + require("/package.json").version + "<br>Исходный код плеера: <a href='https://github.com/JackieWaltRyan/multitrack' style='color: #ffccff' target='_blank'>JackieWaltRyan/multitrack</a>";
            });

            bl.appendChild(infoBlock);
        });

        el.appendChild(authorBlock);

        el.innerHTML += "Дата сборки: " + new Date(__TIMESTAMP__).toLocaleString("ru").toString();
    });

    this._.form.settings.title = createElement("div", {
        class: "mjs__settingsHeader-title"
    });

    this._.form.settings.header = createElement("div", {
        class: "mjs__settingsHeader"
    }, (el) => {
        el.addEventListener("click", () => {
            resetMenu.call(this);
        });
    });

    this._.form.settings.menuSwitcher = new SettingsButtons();
    this._.form.settings._root = createElement("div", {
        id: "mjs_settings",
        class: "mjs__settings"
    });

    // Добавление видео
    for (let video of this._.videos) {
        this._.form.settings.menu.quality.appendButton(video.name, () => {
            document.cookie = "video=" + encodeURIComponent(video.name) + "; path=/; max-age=" + (86400 * 365);
            setVideo.call(this, video.path);
        });
    }

    let preferredVideoIndex = 0;

    if (this._.preferredVideoName) {
        const index = this._.videos.findIndex((video) => video.name === this._.preferredVideoName);
        if (index !== -1) {
            preferredVideoIndex = index;
        }
    }

    if ((getCookie("video") !== undefined) && (getCookie("s_vd") === "true")) {
        const index = this._.videos.findIndex((video) => video.name === getCookie("video"));
        if (index !== -1) {
            preferredVideoIndex = index;
        }
    }

    this._.form.settings.menu.quality.Buttons[preferredVideoIndex].click();

    // Добавление аудио
    for (let audio of this._.audios) {
        this._.form.settings.menu.dubs.appendButton(audio.name, () => {
            document.cookie = "audio=" + encodeURIComponent(audio.code) + "; path=/; max-age=" + (86400 * 365);
            setAudio.call(this, audio.path, audio.code);
        });
    }

    let preferredAudioIndex = 0;

    if ((getCookie("audio") !== undefined) && (getCookie("s_au") === "true")) {
        const index = this._.audios.findIndex((audio) => audio.code === getCookie("audio"));
        if (index !== -1) {
            preferredAudioIndex = index;
        }
    }

    if ("a" in URLparams()) {
        const index = this._.audios.findIndex((audio) => audio.code === URLparams()["a"]);
        if (index !== -1) {
            preferredAudioIndex = index;
        }
    }

    this._.form.settings.menu.dubs.Buttons[preferredAudioIndex].click();

    // Добавление субтитров
    this._.subtitles.unshift({
        "name": "Без субтитров",
        "code": "none",
        "path": undefined
    });

    for (let subtitle of this._.subtitles) {
        this._.form.settings.menu.subtitles.appendButton(subtitle.name, () => {
            document.cookie = "subtitle=" + encodeURIComponent(subtitle.code) + "; path=/; max-age=" + (86400 * 365);
            setSubtitles.call(this, subtitle.path, subtitle.code);
        });
    }

    let preferredSubtitleIndex = 0;

    if ((getCookie("subtitle") !== undefined) && (getCookie("s_st") === "true")) {
        const index = this._.subtitles.findIndex((subtitle) => subtitle.code === getCookie("subtitle"));
        if (index !== -1) {
            preferredSubtitleIndex = index;
        }
    }

    if ("s" in URLparams()) {
        const index = this._.subtitles.findIndex((subtitle) => subtitle.code === URLparams()["s"]);
        if (index !== -1) {
            preferredSubtitleIndex = index;
        }
    }

    this._.form.settings.menu.subtitles.Buttons[preferredSubtitleIndex].click();

    // Добавление скорости
    this._.form.settings.menu.playbackRate.appendButton(1 + "x", () => {
        let val = 1;

        this._.form.settings.menu.playbackRate.selected.setAttribute("style", "width: " + (85 * ((val - 0.25) / (2 - 0.25))) + "%");

        LogoInfoBlock(val);

        setSpeed.call(this, val);
    });

    this._.form.settings.menu.playbackRate.speed_root = createElement("div", {
        class: "speed_root"
    }, (el) => {
        let release = (event) => {
            this._.form.settings.menu.playbackRate.updateStyle = false;
            // Получение координаты и вычисление позиции (от 0 до 1)
            let element_1 = document.getElementById("speed_root_background");
            let pos_1 = getPosInElement(element_1, event).x / element_1.clientWidth;

            if (pos_1 < 0) {
                pos_1 = 0;
            }

            if (pos_1 > 1) {
                pos_1 = 1;
            }

            this._.form.settings.menu.playbackRate.selected.setAttribute("style", "width: " + (85 * pos_1) + "%");

            let convert = ((2 - 0.25) * pos_1) + 0.25;

            LogoInfoBlock(convert.toString().slice(0, 4));
            setSpeed.call(this, convert);
        };

        let move = (event) => {
            if (this._.form.settings.menu.playbackRate.updateStyle) {
                // Получение координаты и вычисление позиции (от 0 до 1)
                let element_2 = document.getElementById("speed_root_background");
                let pos_2 = getPosInElement(element_2, event).x / element_2.clientWidth;

                if (pos_2 < 0) {
                    pos_2 = 0;
                }

                if (pos_2 > 1) {
                    pos_2 = 1;
                }

                this._.form.settings.menu.playbackRate.selected.setAttribute("style", "width: " + (85 * pos_2) + "%");

                let convert = ((2 - 0.25) * pos_2) + 0.25;

                LogoInfoBlock(convert.toString().slice(0, 4));
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
        class: "speed_root-min"
    });
    this._.form.settings.menu.playbackRate.min.innerText = "0.25";
    this._.form.settings.menu.playbackRate.speed_root.appendChild(this._.form.settings.menu.playbackRate.min);

    this._.form.settings.menu.playbackRate.speed_root.appendChild(createElement("div", {
        id: "speed_root_background",
        class: "speed_root-background"
    }));

    this._.form.settings.menu.playbackRate.selected = createElement("div", {
        class: "speed_root-selected"
    });
    this._.form.settings.menu.playbackRate.speed_root.appendChild(this._.form.settings.menu.playbackRate.selected);

    this._.form.settings.menu.playbackRate.max = createElement("div", {
        class: "speed_root-max"
    });
    this._.form.settings.menu.playbackRate.max.innerText = "2";
    this._.form.settings.menu.playbackRate.speed_root.appendChild(this._.form.settings.menu.playbackRate.max);

    this._.form.settings.menu.playbackRate.Content.appendChild(this._.form.settings.menu.playbackRate.speed_root);

    if ((getCookie("speed") !== undefined) && (getCookie("s_sp") === "true")) {
        this._.form.settings.menu.playbackRate.selected.setAttribute("style", "width: " + (85 * ((parseFloat(getCookie("speed")) - 0.25) / (2 - 0.25))) + "%");

        setSpeed.call(this, parseFloat(getCookie("speed")));
    } else {
        this._.form.settings.menu.playbackRate.Buttons[0].click();
    }

    // Остальная непонятная хрень
    for (let menu in this._.form.settings.menu) {
        menu = this._.form.settings.menu[menu];

        this._.form.settings.menuSwitcher.appendButton(menu.Name, () => {
            resetMenu.call(this);
            this._.form.settings.header.setAttribute("showIcon", "true");
            this._.form.settings.title.innerText = menu.Name;
            menu.Content.removeAttribute("style");
            this._.form.settings.menuSwitcher.Content.setAttribute("style", "display: none");
        });
    }

    // AppendMenus
    this._.form.settings.body = createElement("div", {
        class: "mjs__settingsBody"
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

    this._.form.settings._root.addEventListener("mousemove", () => {
        set_timeout.call(this);
    });

    this._.form.settings._root.addEventListener("touchmove", () => {
        set_timeout.call(this);
    });
}
