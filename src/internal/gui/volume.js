import {createElement, getPosInElement} from "../utils";
import {mute} from "../volume";

export function generateVolume() {
    (this._.form.buttons.volume = createElement("button", {
            class: "mjs__overlay-button",
            icon: "volume",
            iconVar: 3,
        }, (el) => {
            el.addEventListener("click", () => {
                mute.call(this, true);
            });
        }
    ));

    (this._.form.volumebar = {
        line: createElement("div", {
            class: "mjs__overlay-volumeBar-background",
        }),
        selected: createElement("div", {
            class: "mjs__overlay-volumeBar-selected",
        }),
        _root: createElement("div", {
                class: "mjs__overlay-volumeBar",
            }, (el) => {
                let release = (event) => {
                    this._.form.volumebar.updateStyle = false;
                    // Получение координаты и вычисление позиции (от 0 до 1)
                    this.volume = getPosInElement(el, event).x / el.clientWidth;
                };

                let move = (event) => {
                    if (this._.form.volumebar.updateStyle) {
                        // Получение координаты и вычисление позиции (от 0 до 1)
                        const cursorX = getPosInElement(el, event).x;
                        this.volume = cursorX / el.clientWidth;
                    }
                };

                el.addEventListener("mousedown", () => {
                    this._.form.volumebar.updateStyle = true;
                    this._.form.audio.lastVolume = this._.form.audio.volume;
                    Object(this._.moveEvents).push({
                        move: move,
                        release: release,
                    });
                });

                el.addEventListener("touchstart", () => {
                    this._.form.volumebar.updateStyle = true;
                    this._.form.audio.lastVolume = this._.form.audio.volume;
                    Object(this._.moveEvents).push({
                        move: move,
                        release: release,
                    });
                });
            }
        ),
    });

    this._.form.volumebar._root.appendChild(this._.form.volumebar.line);
    this._.form.volumebar._root.appendChild(this._.form.volumebar.selected);
}
