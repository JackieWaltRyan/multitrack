import {load_ds, LogoInfoBlock, URLparams} from "./utils";

export function synchronize(target = null) {
    if (process.env.NODE_ENV !== "production") {
        console.log("Sync: Call");
    }

    const root = target ? target : this;

    return new Promise((resolve) => {
        const video = root._.form.video;
        const audio = root._.form.audio;
        const playbackRate = root.playbackRate;
        const diff = video.currentTime - audio.currentTime;

        audio.mjs_setRate(playbackRate);
        video.mjs_setRate(playbackRate);

        if (video.syncTimeout) {
            clearTimeout(video.syncTimeout);
        }

        video.syncTimeout = null;

        if (root._.playing && (Math.abs(diff) > 1 / 60)) {
            if (process.env.NODE_ENV !== "production") {
                console.log("Sync: Need to sync");
            }

            let scale = playbackRate - diff;

            if ((0.25 <= scale) && (scale <= 4)) {
                if (document.hasFocus()) {
                    if (process.env.NODE_ENV !== "production") {
                        console.log("Sync: Rate changed to " + scale);
                    }

                    video.mjs_setRate(scale);
                    video.syncTimeout = setTimeout(() => {
                        if (process.env.NODE_ENV !== "production") {
                            console.log("Sync: Rate changed back");
                        }

                        video.mjs_setRate(playbackRate);
                        video.syncTimeout = null;
                    }, 1000);

                    setTimeout(() => {
                        resolve();
                    }, 1050);
                } else {
                    resolve();
                }
            } else {
                if (process.env.NODE_ENV !== "production") {
                    console.log("Sync: Seeked to " + audio.currentTime);
                }

                video.mjs_setTime(audio.currentTime);
                resolve();
            }
        } else {
            resolve();
        }
    });
}

let trigger = true;

export function downloadStatusUpdate() {
    const allowedStates = [3, 4];
    const video = this._.form.video;
    const audio = this._.form.audio;
    const button_play = this._.form.buttons.play;

    if (allowedStates.includes(video.readyState) && allowedStates.includes(audio.readyState)) {
        let logo_spiner = document.getElementById("logo_spiner");
        logo_spiner.style.display = "none";
    }

    if (this._.playing || (("p" in URLparams()) && trigger)) {
        if (allowedStates.includes(video.readyState) && allowedStates.includes(audio.readyState)) {
            audio.mjs_play();
            video.mjs_play();

            this._.playing = true;
            this.trySync = true;

            button_play.setAttribute("icon", "pauseBtn");

            trigger = false;
        } else {
            if (!allowedStates.includes(video.readyState) && document.hasFocus()) {
                audio.mjs_pause();
            }

            if (!allowedStates.includes(audio.readyState)) {
                video.mjs_pause();
            }
        }
    }
}

export function changePlaying(val) {
    if (val) {
        this._.form.video.mjs_play();
        this._.form.audio.mjs_play();
        this._.form.buttons.play.setAttribute("icon", "pauseBtn");

        let logo_play = document.getElementById("logo_play");
        logo_play.style.display = "block";
        logo_play.style.animation = "none";

        setTimeout(() => {
            logo_play.style.animation = "change_opacity 1s forwards";

            setTimeout(() => {
                logo_play.style.display = "none";
            }, 1000);
        }, 100);
    } else {
        this._.form.video.mjs_pause();
        this._.form.audio.mjs_pause();
        this._.form.buttons.play.setAttribute("icon", "playBtn");

        let logo_pause = document.getElementById("logo_pause");
        logo_pause.style.display = "block";
        logo_pause.style.animation = "none";

        setTimeout(() => {
            logo_pause.style.animation = "change_opacity 1s forwards";

            setTimeout(() => {
                logo_pause.style.display = "none";
            }, 1000);
        }, 100);
    }

    this._.playing = val;
}

export function play() {
    changePlaying.call(this, true);
}

export function pause() {
    changePlaying.call(this, false);
}

let old_seek = 0;

export function clear_old_seek() {
    old_seek = 0;
}

export function seek(val) {
    old_seek += val;
    LogoInfoBlock(((old_seek > 0) ? ("+" + old_seek) : old_seek).toString().slice(0, 5));

    val += this.currentTime;
    if (val < 0) {
        val = 0;
    }

    this._.form.audio.mjs_setTime(val);
    this._.form.video.mjs_setTime(val);
}

export function skip(val) {
    let dataset = load_ds.call(this, "ds_series.json");

    if (dataset !== null) {
        let index = dataset.findIndex((url) => url === decodeURIComponent(window.location.pathname));

        if (val) {
            location.href = window.location.origin + dataset[index + 1] + "?p=1";
        } else {
            location.href = window.location.origin + dataset[index - 1] + "?p=1";
        }
    }
}

export function setTime(val, isVideo = false) {
    this._.form.audio.mjs_setTime(val);
    if (!isVideo) {
        this._.form.video.mjs_setTime(val);
    }
}

export function setSpeed(val) {
    if (val < 0.25) {
        val = 0.25;
    }

    if (val > 2) {
        val = 2;
    }

    this._.playbackRate = val;
    synchronize.call(this).then(r => r);

    localStorage.setItem("mt_mark_speed", encodeURIComponent(val));

    if (val === 1) {
        this._.form.settings.menu.playbackRate.Buttons[0].setAttribute("selected", "true");
    } else {
        this._.form.settings.menu.playbackRate.Buttons[0].removeAttribute("selected");
    }
}
