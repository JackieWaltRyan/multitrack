import {createElement, getPosInElement, secondsToTime} from "../utils";

let skip_time = {
    "s": null,
    "e": null
};

let GUItimeout;
let OVERtimeout;

function send() {
    return createElement("label", {
        class: "mt_overlay_sts_send"
    }, (el) => {
        el.addEventListener("click", () => {
            if ((skip_time["e"] > skip_time["s"]) && (skip_time["s"] !== null) && (skip_time["e"] !== null)) {
                if (confirm("Время начала: " + secondsToTime(skip_time["s"]) + "\nВремя конца: " + secondsToTime(skip_time["e"]) + "\n\nВсе верно? Отправлять сегмент?")) {
                    let xhr = new XMLHttpRequest();
                    xhr.open("GET", this._.sts_url + "?id=" + decodeURIComponent(location.pathname) + "&start=" + parseInt(skip_time["s"]) + "&end=" + parseInt(skip_time["e"]), false);
                    xhr.send();

                    if (xhr.status === 200) {
                        skip_time = {"s": null, "e": null};

                        this._.form.overlays.overlay_sts.start.innerText = "НАЧАЛО";
                        this._.form.overlays.overlay_sts.end.innerText = "КОНЕЦ";
                    } else {
                        alert("При отправке сегмента произошла ошибка:\n\n" + xhr.status + ": " + xhr.statusText);
                    }
                }
            } else {
                alert("1. Время начала или конца не может быть пустым.\n\n2. Время конца всегда должно быть больше чем начало.");
            }
        });
    })
}

function sts_append() {
    this._.form.overlays.overlay_sts.start.innerText = "НАЧАЛО";
    this._.form.overlays.overlay_sts.root.appendChild(this._.form.overlays.overlay_sts.start);

    this._.form.overlays.overlay_sts.end.innerText = "КОНЕЦ";
    this._.form.overlays.overlay_sts.root.appendChild(this._.form.overlays.overlay_sts.end);

    this._.form.overlays.overlay_sts.send.innerText = "ОТПРАВИТЬ";
    this._.form.overlays.overlay_sts.root.appendChild(this._.form.overlays.overlay_sts.send);
}

function overley_append() {
    this._.form.overlays.bottom.appendChild(this._.form.buttons.copy_url);

    if ("pictureInPictureEnabled" in document) {
        this._.form.overlays.bottom.appendChild(this._.form.buttons.pip);
    }

    this._.form.overlays.bottom.appendChild(this._.form.buttons.menu);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.fullscreen);
    this._.form.overlays._root.appendChild(this._.form.overlays.top);
    this._.form.overlays._root.appendChild(this._.form.overlays.bottom);
    this._.form.overlays._root.appendChild(this._.form.progressbar._root);
}

function show() {
    if ((this._.playing || (localStorage.getItem("mt_set_hidemenu") === "true")) && !this._.form.timeset.open) {
        this._.rootElement.classList.add("mt_overlay_hidden");

        this._.form.overlays.bottom.style.pointerEvents = "none";
        this._.form.progressbar._root.style.pointerEvents = "none";
    }
}

export function showOverlay() {
    this._.form.overlays.bottom.style.pointerEvents = "all";
    this._.form.progressbar._root.style.pointerEvents = "all";

    this._.rootElement.classList.remove("mt_overlay_hidden");

    clearTimeout(GUItimeout);

    GUItimeout = setTimeout(() => {
        show.call(this);
    }, 3100);
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

        if (pos.x > 0 && pos.y > 0 && pos.x < this._.element.offsetWidth && pos.y < this._.element.offsetHeight) {
            return null;
        } else {
            show.call(this);
        }
    });

    this._.form.overlays = {
        _root: createElement("div", {
            class: "mt_overlay"
        }, () => {
        }),

        bottom: createElement("div", {
            class: "mt_overlay_bottom"
        }),

        top: createElement("div", {
            class: "mt_overlay_top"
        })
    };

    this._.form.overlays.top.appendChild(this._.form.title);

    this._.form.overlays.bottom.appendChild(this._.form.buttons.play);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.backward10);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.forward10);

    if (this._.ds_series !== null) {
        let index = this._.ds_series.findIndex((url) => (url === decodeURIComponent(location.pathname)));

        if (index !== -1) {
            if ((index - 1) >= 0) {
                this._.form.overlays.bottom.appendChild(this._.form.buttons.skip_previous);
            }

            if ((index + 1) < this._.ds_series.length) {
                this._.form.overlays.bottom.appendChild(this._.form.buttons.skip_next);
            }
        }
    }

    this._.form.overlays.bottom.appendChild(this._.form.buttons.repeat);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.volume);
    this._.form.overlays.bottom.appendChild(this._.form.volumebar._root);
    this._.form.overlays.bottom.appendChild(this._.form.time);

    this._.form.overlays.bottom.appendChild(createElement("div", {
        style: "flex: auto"
    }));

    this._.form.overlays.overlay_sts = {
        root: createElement("div", {
            class: "mt_overlay_sts_root",
            style: !(localStorage.getItem("mt_set_newsegments") === "true") ? "display: none" : "display: block"
        }),

        start: createElement("label", {
            class: "mt_overlay_sts_start"
        }, (el) => {
            el.addEventListener("click", () => {
                skip_time["s"] = this._.form.video.currentTime;
                el.innerText = secondsToTime(this._.form.video.currentTime);
            });
        }),

        end: createElement("label", {
            class: "mt_overlay_sts_end"
        }, (el) => {
            el.addEventListener("click", () => {
                skip_time["e"] = this._.form.video.currentTime;
                el.innerText = secondsToTime(this._.form.video.currentTime);
            });
        }),

        send: send.call(this)
    }

    sts_append.call(this);

    this._.form.overlays.bottom.appendChild(this._.form.overlays.overlay_sts.root);

    this._.form.overlays.bottom.appendChild(createElement("div", {
        style: "flex: auto"
    }));

    overley_append.call(this);

    this._.form.overlays._root.addEventListener("click", (event) => {
        if (event.target === this._.form.overlays._root) {
            this._.playing ? this.pause() : this.play();
        }
    });
}

function showMobile() {
    this._.rootElement.classList.add("mt_overlay_hidden");

    clearTimeout(OVERtimeout);

    this._.form.overlays.mobile.style.pointerEvents = "none";
    this._.form.overlays.bottom.style.pointerEvents = "none";
    this._.form.progressbar._root.style.pointerEvents = "none";

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
            this._.form.progressbar._root.style.pointerEvents = "all";

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

        if (pos.x > 0 && pos.y > 0 && pos.x < this._.element.offsetWidth && pos.y < this._.element.offsetHeight) {
            return null;
        } else {
            if ((this._.playing || (localStorage.getItem("mt_set_hidemenu") === "true")) && !this._.form.timeset.open) {
                showMobile.call(this);
            }
        }
    });

    this._.form.overlays = {
        _root: createElement("div", {
            class: "mt_overlay"
        }, () => {
        }),

        bottom: createElement("div", {
            class: "mt_overlay_bottom"
        }),

        top: createElement("div", {
            class: "mt_overlay_top",
            style: "pointer-events: none"
        }),

        mobile: createElement("div", {
            class: "mt_overlay_mobile"
        })
    };

    this._.form.overlays.top.appendChild(this._.form.title);

    if (this._.ds_series !== null) {
        let index = this._.ds_series.findIndex((url) => (url === decodeURIComponent(location.pathname)));

        if (index !== -1) {
            if ((index - 1) >= 0) {
                this._.form.overlays.mobile.appendChild(this._.form.buttons.skip_previous);
            }
        }
    }

    this._.form.overlays.mobile.appendChild(this._.form.buttons.backward10);
    this._.form.overlays.mobile.appendChild(this._.form.buttons.play);
    this._.form.overlays.mobile.appendChild(this._.form.buttons.forward10);

    if (this._.ds_series !== null) {
        let index = this._.ds_series.findIndex((url) => (url === decodeURIComponent(location.pathname)));

        if (index !== -1) {
            if ((index + 1) < this._.ds_series.length) {
                this._.form.overlays.mobile.appendChild(this._.form.buttons.skip_next);
            }
        }
    }

    this._.form.overlays.bottom.appendChild(this._.form.time);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.repeat);

    this._.form.overlays.bottom.appendChild(createElement("div", {
        style: "flex: auto; pointer-events: none"
    }));

    this._.form.overlays.overlay_sts = {
        root: createElement("div", {
            class: "mt_overlay_sts_root_mobile",
            style: !(localStorage.getItem("mt_set_newsegments") === "true") ? "display: none" : "display: block"
        }),

        start: createElement("label", {
            class: "mt_overlay_sts_start"
        }, (el) => {
            el.addEventListener("click", () => {
                skip_time["s"] = this._.form.video.currentTime;
                el.innerText = secondsToTime(this._.form.video.currentTime);
            });
        }),

        end: createElement("label", {
            class: "mt_overlay_sts_end"
        }, (el) => {
            el.addEventListener("click", () => {
                skip_time["e"] = this._.form.video.currentTime;
                el.innerText = secondsToTime(this._.form.video.currentTime);
            });
        }),

        send: send.call(this)
    }

    sts_append.call(this);

    this._.form.overlays.bottom.appendChild(createElement("div", {
        style: "flex: auto; pointer-events: none"
    }));

    overley_append.call(this);

    this._.form.overlays._root.appendChild(this._.form.overlays.mobile);
    this._.form.overlays._root.appendChild(this._.form.overlays.overlay_sts.root);
}
