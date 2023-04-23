import {createElement, getCookie, URLparams} from "../utils";
import {setAudio, setSubtitles, setVideo} from "../trackSwitcher";
import {setSpeed} from "../playback";

class SettingsButtons {
    constructor(name = null) {
        this.Name = name;
        this.Buttons = [];
        this.Content = createElement("div");
    }

    appendButton(name, action, checkbox) {
        let btn = createElement("div", {class: "mjs__settings_element"});
        btn.innerText = name;
        btn.onclick = () => {
            action();
        };

        if (checkbox !== undefined) {
            let div = createElement("div", {style: "flex: auto;"});
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
        let btn = createElement("div", {class: "mjs__settings_element"});
        btn.innerText = name;
        btn.onclick = () => {
            for (let el of this.Buttons) el.removeAttribute("selected");
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

    SettingsTimeout = setTimeout(() => {
        this._.rootElement.classList.remove("mjs__settings_show");
        this._.form.settings.opened = false;
    }, 3000);
}

export function toggleSettings() {
    if (this._.form.settings.opened) {
        this._.rootElement.classList.remove("mjs__settings_show");

        clearTimeout(SettingsTimeout);
    } else {
        resetMenu.call(this);

        this._.rootElement.classList.add("mjs__settings_show");

        set_timeout.call(this);
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
    this._.form.settings.menu.playbackRate = new SettingsRadioButtons("Скорость воспроизведения");
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

    this._.form.settings.menu.info = new SettingsPage("Информация о плеере");
    this._.form.settings.menu.info.Content = createElement("div", {
            blockName: "info"
        }, (el) => {
            let authorBlock = createElement("div", {
                    style: "display: flex; padding-bottom: 12px"
                }, (bl) => {
                    const imageBlock = createElement("img", {
                        src: "https://avatars.githubusercontent.com/u/87809793?s=48",
                        width: 48,
                        height: 48,
                    });
                    bl.appendChild(imageBlock);

                    const infoBlock = createElement("div", {
                            style: "line-height: 20px; padding: 4px 8px"
                        }, (inf) => {
                            inf.innerHTML += 'Исходный код плеера:<br><a href="https://github.com/bronyru/Multitrack.JS" style="color: #ffccff">bronyru/Multitrack.JS</a>';
                        }
                    );
                    bl.appendChild(infoBlock);
                }
            );
            el.appendChild(authorBlock);

            el.innerHTML += "Build date: " + new Date(__TIMESTAMP__).toString();
        }
    );

    this._.form.settings.title = createElement("div", {
        style: "mjs__settingsHeader-title",
    });

    this._.form.settings.header = createElement("div", {
            class: "mjs__settingsHeader"
        }, (el) => {
            el.addEventListener("click", () => {
                resetMenu.call(this);
            });
        }
    );

    this._.form.settings.menuSwitcher = new SettingsButtons();
    this._.form.settings._root = createElement("div", {class: "mjs__settings"});

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
        if (index !== -1) preferredVideoIndex = index;
    }

    if (getCookie("video") !== undefined && getCookie("s_vd") === "true") {
        const index = this._.videos.findIndex((video) => video.name === getCookie("video"));
        if (index !== -1) preferredVideoIndex = index;
    }

    this._.form.settings.menu.quality.Buttons[preferredVideoIndex].click();

    // Добавление аудио
    for (let audio of this._.audios) {
        this._.form.settings.menu.dubs.appendButton(audio.name, () => {
            document.cookie = "audio=" + encodeURIComponent(audio.name) + "; path=/; max-age=" + (86400 * 365);
            setAudio.call(this, audio.path, audio.code);
        });
    }

    let preferredAudioIndex = 0;

    if (getCookie("audio") !== undefined && getCookie("s_au") === "true") {
        const index = this._.audios.findIndex((audio) => audio.name === getCookie("audio"));
        if (index !== -1) preferredAudioIndex = index;
    }

    if ("a" in URLparams()) {
        preferredAudioIndex = this._.audios.findIndex((audio) => audio.code === URLparams()["a"]);
    }

    this._.form.settings.menu.dubs.Buttons[preferredAudioIndex].click();

    // Добавление субтитров
    this._.subtitles.unshift({"name": "Без субтитров", "path": undefined});

    for (let subtitle of this._.subtitles) {
        this._.form.settings.menu.subtitles.appendButton(subtitle.name, () => {
            document.cookie = "subtitle=" + encodeURIComponent(subtitle.name) + "; path=/; max-age=" + (86400 * 365);
            setSubtitles.call(this, subtitle.path, subtitle.code);
        });
    }

    let preferredSubtitleIndex = 0;

    if (getCookie("subtitle") !== undefined && getCookie("s_st") === "true") {
        const index = this._.subtitles.findIndex((subtitle) => subtitle.name === getCookie("subtitle"));
        if (index !== -1) preferredSubtitleIndex = index;
    }

    if ("s" in URLparams()) {
        preferredSubtitleIndex = this._.subtitles.findIndex((subtitle) => subtitle.code === URLparams()["s"]);
    }

    this._.form.settings.menu.subtitles.Buttons[preferredSubtitleIndex].click();

    // Добавление скорости
    for (let speed of [0.5, 1, 1.5, 2]) {
        this._.form.settings.menu.playbackRate.appendButton(speed + "x", () => {
            document.cookie = "speed=" + encodeURIComponent(speed) + "; path=/; max-age=" + (86400 * 365);
            setSpeed.call(this, speed);
        });
    }

    let preferredSpeedIndex = 1;

    if (getCookie("speed") !== undefined && getCookie("s_sp") === "true") {
        const index = [0.5, 1, 1.5, 2].findIndex((speed) => speed === parseFloat(getCookie("speed")));
        if (index !== -1) preferredSpeedIndex = index;
    }

    this._.form.settings.menu.playbackRate.Buttons[preferredSpeedIndex].click();

    for (let menu in this._.form.settings.menu) {
        menu = this._.form.settings.menu[menu];

        this._.form.settings.menuSwitcher.appendButton(menu.Name, () => {
            resetMenu.call(this);
            this._.form.settings.header.setAttribute("showIcon", "true");
            this._.form.settings.title.innerText = menu.Name;
            menu.Content.removeAttribute("style");
            this._.form.settings.menuSwitcher.Content.setAttribute("style", "display: none;");
        });
    }

    // AppendMenus
    this._.form.settings.body = createElement("div", {
        class: "mjs__settingsBody",
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
