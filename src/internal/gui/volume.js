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
    this._.form.volumebar = {
        line: createElement("div", {
            class: "mt_overlay_volume_bar_background"
        }, (el) => {
            el.addEventListener("mousemove", (event) => {
                tooltip.call(this, event, true, "Громкость");
            });

            el.addEventListener("mouseout", () => {
                tooltip.call(this, false);
            });
        }),

        selected: createElement("div", {
            class: "mt_overlay_volume_bar_selected"
        }, (el) => {
            el.addEventListener("mousemove", (event) => {
                tooltip.call(this, event, true, "Громкость");
            });

            el.addEventListener("mouseout", () => {
                tooltip.call(this, false);
            });
        }),

        root: createElement("div", {
            class: "mt_overlay_volume_bar"
        }, (el) => {
            let vol_val;

            let release = (event) => {
                this._.form.volumebar.updateStyle = false;
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
                    let cursorX = getPosInElement(el, event).x;
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

            el.addEventListener("mousemove", (event) => {
                tooltip.call(this, event, true, "Громкость");
            });

            el.addEventListener("mouseout", () => {
                tooltip.call(this, false);
            });
        }),
    };

    if (!matchMedia("(any-pointer:coarse)").matches) {
        this._.form.volumebar.root.appendChild(this._.form.volumebar.line);
        this._.form.volumebar.root.appendChild(this._.form.volumebar.selected);
    }
}
