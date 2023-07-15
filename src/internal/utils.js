import {changePlaying, clear_old_seek, seek, skip} from "./playback";

let LIBtimeout;

export function getPosInElement(element, event) {
    return {
        x: event.clientX - element.getBoundingClientRect().x,
        y: event.clientY - element.getBoundingClientRect().y,
    };
}

export function URLparams() {
    return location.search.replace("?", "").split("&").reduce(function (p, e) {
        let a = e.split("=");

        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);

        return p;
    }, {});
}

export function LogoInfoBlock(text) {
    let root = this;

    if (root._.form.logo_info_block !== null) {
        root._.form.logo_info_block.innerText = text.toString();
        root._.form.logo_info_block.style.display = "flex";
        root._.form.logo_info_block.style.animation = "none";

        clearTimeout(LIBtimeout);
        LIBtimeout = setTimeout(() => {
            root._.form.logo_info_block.style.animation = "mt_change_opacity 1s forwards";

            LIBtimeout = setTimeout(() => {
                root._.form.logo_info_block.style.display = "none";

                clear_old_seek();
            }, 1000);
        }, 100);
    }
}

export function secondsToTime(sec, clear = false) {
    sec = Math.floor(sec);
    let seconds = sec % 60;
    let minutes = Math.floor(sec / 60) % 60;
    let hours = Math.floor(sec / 3600);

    let Sminutes = minutes.toString().padStart(2, "0");
    let Sseconds = seconds.toString().padStart(2, "0");

    if (clear) {
        return (hours > 0) ? [seconds, minutes, hours] : [seconds, minutes];
    } else {
        return (hours > 0) ? (hours + ":" + Sminutes + ":" + Sseconds) : (Sminutes + ":" + Sseconds);
    }
}

export function setMediaSession() {
    if ("mediaSession" in navigator) {
        let metadata = new MediaMetadata({
            title: this._.title,
            artist: this._.form.currentAudios + " " + this._.form.currentSubtitles,
            artwork: [
                {
                    src: this._.placeholder,
                    sizes: "96x96",
                    type: "image/png"
                },
                {
                    src: this._.placeholder,
                    sizes: "128x128",
                    type: "image/png"
                },
                {
                    src: this._.placeholder,
                    sizes: "192x192",
                    type: "image/png"
                },
                {
                    src: this._.placeholder,
                    sizes: "256x256",
                    type: "image/png"
                },
                {
                    src: this._.placeholder,
                    sizes: "384x384",
                    type: "image/png"
                },
                {
                    src: this._.placeholder,
                    sizes: "512x512",
                    type: "image/png"
                }
            ]
        });

        if (navigator.mediaSession.metadata !== metadata) {
            navigator.mediaSession.metadata = metadata;
        }

        navigator.mediaSession.setActionHandler("play", () => {
            changePlaying.call(this, true);
        });

        navigator.mediaSession.setActionHandler("pause", () => {
            changePlaying.call(this, false);
        });

        navigator.mediaSession.setActionHandler("seekbackward", () => {
            seek.call(this, -10);
        });

        navigator.mediaSession.setActionHandler("seekforward", () => {
            seek.call(this, 10);
        });

        if (this._.ds_series !== null) {
            let index = this._.ds_series.findIndex((url) => (url === decodeURIComponent(location.pathname)));

            if (index !== -1) {
                if ((index - 1) >= 0) {
                    navigator.mediaSession.setActionHandler("previoustrack", () => {
                        skip.call(this, false);
                    });
                }

                if ((index + 1) < this._.ds_series.length) {
                    navigator.mediaSession.setActionHandler("nexttrack", () => {
                        skip.call(this, true);
                    });
                }
            }
        }
    }
}

export function createElement(tag, params = {}, actions = () => {
}) {
    let el = document.createElement(tag);

    for (let name in params) {
        el.setAttribute(name, params[name]);
    }

    actions(el);

    return el;
}

export function sleep(ms) {
    return new Promise((reject) => {
        setTimeout(() => {
            reject();
        }, ms);
    });
}
