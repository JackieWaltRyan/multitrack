import {createElement, getCookie, secondsToTime} from "../utils";

let skip_time = {"s": 0, "e": 0};

export function generateOverlay() {
    let GUItimeout;

    function showOverlay() {
        let mjs_overlay_bottom = document.getElementById("mjs_overlay_bottom");
        let mjs_overlay_progressBar = document.getElementById("mjs_overlay_progressBar");

        mjs_overlay_bottom.style["pointer-events"] = "all";
        mjs_overlay_progressBar.style["pointer-events"] = "all";

        this._.rootElement.classList.remove("mjs__overlay_hidden");

        clearTimeout(GUItimeout);
        GUItimeout = setTimeout(() => {
            this._.rootElement.classList.add("mjs__overlay_hidden");

            mjs_overlay_bottom.style["pointer-events"] = "none";
            mjs_overlay_progressBar.style["pointer-events"] = "none";
        }, 3000);
    }

    this._.element.addEventListener("mousemove", () => {
        showOverlay.call(this);
    });

    this._.element.addEventListener("touchmove", () => {
        showOverlay.call(this);
    });

    this._.element.addEventListener("mouseout", () => {
        clearTimeout(GUItimeout);

        this._.rootElement.classList.add("mjs__overlay_hidden");

        document.getElementById("mjs_overlay_bottom").style["pointer-events"] = "none";
        document.getElementById("mjs_overlay_progressBar").style["pointer-events"] = "none";
    });

    this._.form.overlays = {
        _root: createElement("div", {
            class: "mjs__overlay",
        }, () => {
        }),
        bottom: createElement("div", {
            id: "mjs_overlay_bottom",
            class: "mjs__overlay-bottom",
        }),
        top: createElement("div", {
            class: "mjs__overlay-top",
        }),
    };

    this._.form.overlays.top.appendChild(this._.form.title);

    this._.form.overlays.bottom.appendChild(this._.form.buttons.play);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.backward10);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.forward10);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.skip_previous);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.skip_next);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.volume);
    this._.form.overlays.bottom.appendChild(this._.form.volumebar._root);
    this._.form.overlays.bottom.appendChild(this._.form.time);

    this._.form.overlays.bottom.appendChild(createElement("div", {
        style: "flex: auto",
    }));

    let overlay_sts = createElement("div", {
        id: "overlay_sts",
        style: (getCookie("s_sts") === "true") ? "display: block; padding-top: 8px;" : "display: none; padding-top: 8px;"
    });

    let start = createElement("label", {
        id: "send_time_start",
        style: "background-color: green; cursor: pointer; padding: 3px 8px; border-radius: 5px; margin-right: 5px;"
    }, (el) => {
        el.onclick = () => {
            skip_time["s"] = this._.form.video.currentTime;
            el.innerText = secondsToTime(this._.form.video.currentTime);
        }
    });
    start.innerText = "НАЧАЛО";
    overlay_sts.appendChild(start);

    let end = createElement("label", {
        id: "send_time_end",
        style: "background-color: orange; cursor: pointer; padding: 3px 8px; border-radius: 5px; margin-right: 5px;"
    }, (el) => {
        el.onclick = () => {
            skip_time["e"] = this._.form.video.currentTime;
            el.innerText = secondsToTime(this._.form.video.currentTime);
        }
    });
    end.innerText = "КОНЕЦ";
    overlay_sts.appendChild(end);

    let send = createElement("label", {
        style: "background-color: blue; cursor: pointer; padding: 3px 8px; border-radius: 5px; margin-right: 5px;"
    }, (el) => {
        el.onclick = () => {
            if ((skip_time["e"] > skip_time["s"]) && (skip_time["s"] > 0) && (skip_time["e"] > 0)) {
                if (confirm("Время начала: " + secondsToTime(skip_time["s"]) + "\nВремя конца: " + secondsToTime(skip_time["e"]) + "\n\nВсе верно? Отправлять сегмент?")) {
                    let url = decodeURIComponent(window.location.pathname);
                    console.log({
                        "sts_url": this._.sts_url,
                        "id": url,
                        "s": parseInt(skip_time["s"]),
                        "e": parseInt(skip_time["e"])
                    });

                    const postData = async (url = "", data = {}) => {
                        try {
                            const response = await fetch(url, {
                                method: "POST",
                                headers: {
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify(data)
                            });
                            return response.json();
                        } catch (e) {
                            alert("Во время отправки сегмента возникла ошибка.\n\n" + e);
                        }
                    }

                    postData(this._.sts_url, {
                        "id": url,
                        "s": parseInt(skip_time["s"]),
                        "e": parseInt(skip_time["e"])
                    }).then(r => r);

                    skip_time = {"s": 0, "e": 0};

                    let send_time_start = document.getElementById("send_time_start");
                    send_time_start.innerText = "НАЧАЛО";

                    let send_time_end = document.getElementById("send_time_end");
                    send_time_end.innerText = "КОНЕЦ";
                }
            } else {
                alert("1. Время начала или конца не может быть пустым.\n\n2. Время конца всегда должно быть больше чем начало.");
            }
        }
    });
    send.innerText = "ОТПРАВИТЬ";
    overlay_sts.appendChild(send);

    this._.form.overlays.bottom.appendChild(overlay_sts);

    this._.form.overlays.bottom.appendChild(createElement("div", {
        style: "flex: auto",
    }));

    this._.form.overlays.bottom.appendChild(this._.form.buttons.copy_url);

    if ("pictureInPictureEnabled" in document) {
        this._.form.overlays.bottom.appendChild(this._.form.buttons.pip);
    }

    this._.form.overlays.bottom.appendChild(this._.form.buttons.menu);
    this._.form.overlays.bottom.appendChild(this._.form.buttons.fullscreen);
    this._.form.overlays._root.appendChild(this._.form.overlays.top);
    this._.form.overlays._root.appendChild(this._.form.overlays.bottom);
    this._.form.overlays._root.appendChild(this._.form.progressbar._root);

    this._.form.overlays._root.addEventListener("click", (event) => {
        if (event.target === this._.form.overlays._root) {
            this._.playing ? this.pause() : this.play();
        }
    });
}
