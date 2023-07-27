import {createElement, getPosInElement} from "../utils";
import {screensaver} from "./media";

let GUItimeout;
let OVERtimeout;

function show() {
    if ((this._.playing || (localStorage.getItem("mt_set_hidemenu") === "true")) && !this._.form.timeset.open) {
        this._.rootElement.classList.add("mt_overlay_hidden");

        this._.form.overlays.bottom.style.pointerEvents = "none";
        this._.form.progressbar.root.style.pointerEvents = "none";
    }
}

export function showOverlay() {
    this._.form.overlays.bottom.style.pointerEvents = "all";
    this._.form.progressbar.root.style.pointerEvents = "all";

    this._.rootElement.classList.remove("mt_overlay_hidden");

    clearTimeout(GUItimeout);

    GUItimeout = setTimeout(() => {
        show.call(this);
    }, 3100);

    if (this._.playing) {
        screensaver.call(this, false);
    } else {
        screensaver.call(this, true);
    }
}

export function generateOverlay() {
    this._.element.addEventListener("click", () => {
        showOverlay.call(this);
    });

    this._.element.addEventListener("mousemove", () => {
        showOverlay.call(this);
    });

    this._.element.addEventListener("touchmove", () => {
        showOverlay.call(this);
    });

    this._.element.addEventListener("mouseout", (event) => {
        clearTimeout(GUItimeout);

        let pos = getPosInElement(this._.element, event);

        if ((pos.x > 0) && (pos.y > 0) && (pos.x < this._.element.offsetWidth) && (pos.y < this._.element.offsetHeight)) {
            return null;
        } else {
            show.call(this);
        }
    });

    this._.form.overlays = {
        root: createElement("div", {
            class: "mt_overlay"
        }, (el) => {
            el.addEventListener("click", (event) => {
                if (event.target === this._.form.overlays.root) {
                    this._.playing ? this.pause() : this.play();
                }
            })
        }),

        top: createElement("div", {
            class: "mt_overlay_top"
        }, (el) => {
            el.appendChild(this._.form.title);
        }),

        bottom: createElement("div", {
            class: "mt_overlay_bottom"
        }, (el) => {
            el.appendChild(this._.form.buttons.but_play);
            el.appendChild(this._.form.buttons.but_backward_10);
            el.appendChild(this._.form.buttons.but_forward_10);

            if (this._.ds_series !== null) {
                let index = this._.ds_series.findIndex((url) => (url === decodeURIComponent(location.pathname)));

                if (index !== -1) {
                    if ((index - 1) >= 0) {
                        el.appendChild(this._.form.buttons.but_skip_previous);
                    }

                    if ((index + 1) < this._.ds_series.length) {
                        el.appendChild(this._.form.buttons.but_skip_next);
                    }
                }
            }

            el.appendChild(this._.form.buttons.but_repeat);
            el.appendChild(this._.form.buttons.but_volume);
            el.appendChild(this._.form.volumebar.root);
            el.appendChild(this._.form.time);

            el.appendChild(createElement("div", {
                style: "flex: auto"
            }));

            el.appendChild(this._.form.sts.root);

            el.appendChild(createElement("div", {
                style: "flex: auto"
            }));

            el.appendChild(this._.form.buttons.but_copy_url);

            if ("pictureInPictureEnabled" in document) {
                el.appendChild(this._.form.buttons.but_pip);
            }

            el.appendChild(this._.form.buttons.but_menu);
            el.appendChild(this._.form.buttons.but_fullscreen);
        })
    };

    this._.form.overlays.root.appendChild(this._.form.overlays.top);
    this._.form.overlays.root.appendChild(this._.form.overlays.bottom);
    this._.form.overlays.root.appendChild(this._.form.progressbar.root);
}

function showMobile() {
    this._.rootElement.classList.add("mt_overlay_hidden");

    clearTimeout(OVERtimeout);

    this._.form.overlays.mobile.style.pointerEvents = "none";
    this._.form.overlays.bottom.style.pointerEvents = "none";
    this._.form.progressbar.root.style.pointerEvents = "none";

    for (let child of this._.form.overlays.mobile.children) {
        child.style.pointerEvents = "none";
    }
}

export function showMobileOverlay(event) {
    if (event !== undefined && event.target === this._.form.overlays.mobile) {
        clearTimeout(GUItimeout);

        showMobile.call(this);
    } else {
        this._.rootElement.classList.remove("mt_overlay_hidden");

        this._.form.overlays.mobile.style.pointerEvents = "all";

        clearTimeout(OVERtimeout);

        OVERtimeout = setTimeout(() => {
            this._.form.overlays.bottom.style.pointerEvents = "all";
            this._.form.progressbar.root.style.pointerEvents = "all";

            for (let child of this._.form.overlays.mobile.children) {
                child.style.pointerEvents = "all";
            }
        }, 300);

        clearTimeout(GUItimeout);

        GUItimeout = setTimeout(() => {
            if ((this._.playing || (localStorage.getItem("mt_set_hidemenu") === "true")) && !this._.form.timeset.open) {
                showMobile.call(this);
            }
        }, 3100);
    }

    if (this._.playing) {
        screensaver.call(this, false);
    } else {
        screensaver.call(this, true);
    }
}

export function generateMobileOverlay() {
    this._.element.addEventListener("click", (event) => {
        showMobileOverlay.call(this, event);
    });

    this._.element.addEventListener("touchmove", () => {
        showMobileOverlay.call(this);
    });

    this._.element.addEventListener("mouseout", (event) => {
        clearTimeout(GUItimeout);

        let pos = getPosInElement(this._.element, event);

        if ((pos.x > 0) && (pos.y > 0) && (pos.x < this._.element.offsetWidth) && (pos.y < this._.element.offsetHeight)) {
            return null;
        } else {
            if ((this._.playing || (localStorage.getItem("mt_set_hidemenu") === "true")) && !this._.form.timeset.open) {
                showMobile.call(this);
            }
        }
    });

    this._.form.overlays = {
        root: createElement("div", {
            class: "mt_overlay"
        }),

        top: createElement("div", {
            class: "mt_overlay_top",
            style: "pointer-events: none"
        }, (el) => {
            el.appendChild(this._.form.title);
        }),

        bottom: createElement("div", {
            class: "mt_overlay_bottom"
        }, (el) => {
            el.appendChild(this._.form.time);
            el.appendChild(this._.form.buttons.but_repeat);

            el.appendChild(createElement("div", {
                style: "flex: auto; pointer-events: none"
            }));

            el.appendChild(createElement("div", {
                style: "flex: auto; pointer-events: none"
            }));

            el.appendChild(this._.form.buttons.but_copy_url);

            if ("pictureInPictureEnabled" in document) {
                el.appendChild(this._.form.buttons.but_pip);
            }

            el.appendChild(this._.form.buttons.but_menu);
            el.appendChild(this._.form.buttons.but_fullscreen);
        }),

        mobile: createElement("div", {
            class: "mt_overlay_mobile"
        }, (el) => {
            if (this._.ds_series !== null) {
                let index = this._.ds_series.findIndex((url) => (url === decodeURIComponent(location.pathname)));

                if (index !== -1) {
                    if ((index - 1) >= 0) {
                        el.appendChild(this._.form.buttons.but_skip_previous);
                    }
                }
            }

            el.appendChild(this._.form.buttons.but_backward_10);
            el.appendChild(this._.form.buttons.but_play);
            el.appendChild(this._.form.buttons.but_forward_10);

            if (this._.ds_series !== null) {
                let index = this._.ds_series.findIndex((url) => (url === decodeURIComponent(location.pathname)));

                if (index !== -1) {
                    if ((index + 1) < this._.ds_series.length) {
                        el.appendChild(this._.form.buttons.but_skip_next);
                    }
                }
            }
        })
    };

    this._.form.overlays.root.appendChild(this._.form.overlays.top);
    this._.form.overlays.root.appendChild(this._.form.overlays.bottom);
    this._.form.overlays.root.appendChild(this._.form.progressbar.root);
    this._.form.overlays.root.appendChild(this._.form.overlays.mobile);
    this._.form.overlays.root.appendChild(this._.form.sts.root);
}
