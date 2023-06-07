import {createElement, getPosInElement, LogoInfoBlock} from "../utils";
import {tooltip} from "./buttons";

export function mute(undoLast = false) {
    this.muted = !(undoLast && this.muted);

    if (this.muted) {
        LogoInfoBlock.call(this, 0);
    } else {
        LogoInfoBlock.call(this, parseInt((this.volume * 100).toString()));
    }
}

export function generateVolume() {
    (this._.form.buttons.volume = createElement("button", {
        class: "mjs__overlay-button",
        icon: "volume",
        iconVar: 3
    }, (el) => {
        el.onclick = (event) => {
            mute.call(this, true);
            this.muted ? tooltip.call(this, event, true, "Включить звук") : tooltip.call(this, event, true, "Отключить звук");
        };

        el.onmousemove = (event) => {
            this.muted ? tooltip.call(this, event, true, "Включить звук") : tooltip.call(this, event, true, "Отключить звук");
        };

        el.onmouseout = () => {
            tooltip.call(this, false);
        };
    }));

    (this._.form.volumebar = {
        line: createElement("div", {
            class: "mjs__overlay-volumeBar-background"
        }, (el) => {
            el.onmousemove = (event) => {
                tooltip.call(this, event, true, "Громкость");
            };

            el.onmouseout = () => {
                tooltip.call(this, false);
            };
        }),
        selected: createElement("div", {
            class: "mjs__overlay-volumeBar-selected"
        }, (el) => {
            el.onmousemove = (event) => {
                tooltip.call(this, event, true, "Громкость");
            };

            el.onmouseout = () => {
                tooltip.call(this, false);
            };
        }),
        _root: createElement("div", {
            class: "mjs__overlay-volumeBar"
        }, (el) => {
            let vol_val;

            let release = (event) => {
                this._.form.volumebar.updateStyle = false;
                // Получение координаты и вычисление позиции (от 0 до 1)
                this.volume = getPosInElement(el, event).x / el.clientWidth;

                if ((getPosInElement(el, event).x / el.clientWidth) > 1) {
                    vol_val = 100;
                } else if ((getPosInElement(el, event).x / el.clientWidth) < 0) {
                    vol_val = 0;
                } else {
                    vol_val = parseInt(((getPosInElement(el, event).x / el.clientWidth) * 100).toString());
                }

                LogoInfoBlock.call(this, vol_val);
            };

            let move = (event) => {
                if (this._.form.volumebar.updateStyle) {
                    // Получение координаты и вычисление позиции (от 0 до 1)
                    const cursorX = getPosInElement(el, event).x;
                    this.volume = cursorX / el.clientWidth;

                    if ((cursorX / el.clientWidth) > 1) {
                        vol_val = 100;
                    } else if ((cursorX / el.clientWidth) < 0) {
                        vol_val = 0;
                    } else {
                        vol_val = parseInt(((cursorX / el.clientWidth) * 100).toString());
                    }

                    LogoInfoBlock.call(this, vol_val);
                }
            };

            el.onmousedown = () => {
                this._.form.volumebar.updateStyle = true;
                this._.form.audio.lastVolume = this._.form.audio.volume;
                Object(this._.moveEvents).push({
                    move: move,
                    release: release,
                });
            };

            el.ontouchstart = () => {
                this._.form.volumebar.updateStyle = true;
                this._.form.audio.lastVolume = this._.form.audio.volume;
                Object(this._.moveEvents).push({
                    move: move,
                    release: release,
                });
            };

            el.onmousemove = (event) => {
                tooltip.call(this, event, true, "Громкость");
            };

            el.onmouseout = () => {
                tooltip.call(this, false);
            };
        }),
    });

    this._.form.volumebar._root.appendChild(this._.form.volumebar.line);
    this._.form.volumebar._root.appendChild(this._.form.volumebar.selected);
}
