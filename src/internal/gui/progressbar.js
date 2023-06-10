import {createElement, getPosInElement, LogoInfoBlock, secondsToTime} from "../utils";

export function generateProgressbar() {
    this._.form.progressbar = {
        line: createElement("div", {
            class: "mt_overlay_progress_bar_background",
        }),

        loaded: createElement("canvas", {
                class: "mt_overlay_progress_bar_loaded",
                height: 1,
            }, (el) => {
                el._canvas = el.getContext("2d");
            }
        ),

        played: createElement("div", {
            class: "mt_overlay_progress_bar_played",
        }),

        popup: createElement("div", {
                class: "mt_overlay_progress_popup",
            }, (el) => {
                el.text = createElement("div", {
                    class: "mt_overlay_progress_popup_time",
                });
                el.image = createElement("div", {
                    class: "mt_overlay_progress_popup_image",
                });
            }
        ),

        _root: createElement("div", {
                class: "mt_overlay_progress_bar",
            }, (el) => {
                let updatePopup = (cursorX, position) => {
                    this._.form.progressbar.popup.text.innerText = secondsToTime(this.duration * position);
                    this._.form.progressbar.popup.classList.add("mt_overlay_progress_popup_show");

                    if (this._.form.progressbar.popup.clientWidth !== 0) {
                        this._.form.progressbar.popup.halfWidth = this._.form.progressbar.popup.clientWidth / 2;
                    }

                    if (cursorX < this._.form.progressbar.popup.halfWidth) {
                        this._.form.progressbar.popup.style.left = "0px";
                    } else if (cursorX < (el.clientWidth - this._.form.progressbar.popup.halfWidth)) {
                        this._.form.progressbar.popup.style.left = ((cursorX - this._.form.progressbar.popup.halfWidth) + "px");
                    } else {
                        this._.form.progressbar.popup.style.left = ((el.clientWidth - this._.form.progressbar.popup.halfWidth * 2) + "px");
                    }

                    if (this._.parameters.frames.image) {
                        let framesAll = this._.parameters.frames.x * this._.parameters.frames.y;
                        let frame = Math.floor(position * framesAll);

                        if (frame >= framesAll) {
                            frame = framesAll - 1;
                        }

                        let offsetX = (frame % this._.parameters.frames.x) / (this._.parameters.frames.x - 1);
                        let offsetY = Math.floor(frame / this._.parameters.frames.x) / (this._.parameters.frames.y - 1);
                        this._.form.progressbar.popup.image.style.backgroundPosition = (offsetX * 100) + "% " + (offsetY * 100) + "%";
                        this._.form.progressbar.popup.image.style.backgroundSize = (this._.parameters.frames.x * 100) + "%";
                        this._.form.progressbar.popup.image.style.backgroundImage = "url(" + this._.parameters.frames.image + ")";
                    } else {
                        this._.form.progressbar.popup.image.style.display = "none";
                    }
                };

                let move = (event) => {
                    let cursor = getPosInElement(el, event);
                    let position = cursor.x / el.clientWidth;

                    if (position < 0) {
                        position = 0;
                    }

                    if (position > 1) {
                        position = 1;
                    }

                    if (this._.form.progressbar.updateStyle) {
                        this._.form.progressbar.played.style.width = (100 * position) + "%";
                    }

                    updatePopup(cursor.x, position);

                    LogoInfoBlock.call(this, secondsToTime(this.duration * position));
                };

                let release = (event) => {
                    this._.form.progressbar.updateStyle = false;
                    this._.form.progressbar.popup.classList.remove("mt_overlay_progress_popup_show");
                    this.currentTime = (this.duration * getPosInElement(el, event).x) / el.clientWidth;

                    LogoInfoBlock.call(this, secondsToTime(this.currentTime));
                };

                el.addEventListener("mousedown", () => {
                    this._.form.progressbar.updateStyle = true;
                    Object(this._.moveEvents).push({
                        move: move,
                        release: release,
                    });
                });

                el.addEventListener("touchstart", () => {
                    this._.form.progressbar.updateStyle = true;
                    Object(this._.moveEvents).push({
                        move: move,
                        release: release,
                    });
                });

                el.addEventListener("mousemove", (event) => {
                    let cursor = getPosInElement(el, event);
                    let position = cursor.x / el.clientWidth;

                    if (position < 0) {
                        position = 0;
                    }

                    if (position > 1) {
                        position = 1;
                    }

                    if (this._.form.progressbar.updateStyle || (cursor.y > 0)) {
                        updatePopup(cursor.x, position);
                    } else {
                        this._.form.progressbar.popup.classList.remove("mt_overlay_progress_popup_show");
                    }
                });

                el.addEventListener("mouseout", () => {
                    this._.form.progressbar.popup.classList.remove("mt_overlay_progress_popup_show");
                });
            }
        ),
    };

    this._.form.progressbar.popup.appendChild(this._.form.progressbar.popup.image);
    this._.form.progressbar.popup.appendChild(this._.form.progressbar.popup.text);

    this._.form.progressbar._root.appendChild(this._.form.progressbar.popup);
    this._.form.progressbar._root.appendChild(this._.form.progressbar.line);
    this._.form.progressbar._root.appendChild(this._.form.progressbar.loaded);
    this._.form.progressbar._root.appendChild(this._.form.progressbar.played);
}
