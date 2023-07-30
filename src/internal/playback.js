import {check_size, LogoInfoBlock, setMediaSession, URLparams} from "./utils";
import {screensaver} from "./gui/media";

let trigger = true;

let old_seek = 0;

let DSUtimeout = null;
let DSUcounter = 0;

export function synchronize(target = null) {
    let root = target ? target : this;

    return new Promise((resolve) => {
        let video = root._.form.video;
        let audio = root._.form.audio;
        let playbackRate = root.playbackRate;
        let diff = video.currentTime - audio.currentTime;

        audio.mt_setRate(playbackRate);
        video.mt_setRate(playbackRate);

        if (video.syncTimeout) {
            clearTimeout(video.syncTimeout);
        }

        video.syncTimeout = null;

        if (root._.playing && (Math.abs(diff) > 1 / 60)) {
            let scale = playbackRate - diff;

            if ((0.25 <= scale) && (scale <= 4)) {
                if (document.hasFocus()) {
                    video.mt_setRate(scale);
                    video.syncTimeout = setTimeout(() => {
                        video.mt_setRate(playbackRate);
                        video.syncTimeout = null;
                    }, 1000);

                    setTimeout(() => {
                        resolve();
                    }, 1050);
                } else {
                    resolve();
                }
            } else {
                video.mt_setTime(audio.currentTime);
                resolve();
            }
        } else {
            resolve();
        }
    });
}

export function downloadStatusUpdate() {
    clearTimeout(DSUtimeout);

    let allowedStates = [3, 4];
    let video = this._.form.video;
    let audio = this._.form.audio;
    let button_play = this._.form.buttons.but_play;

    if (allowedStates.includes(video.readyState) && allowedStates.includes(audio.readyState)) {
        DSUcounter = 0;

        this._.form.logo_spiner.style.display = "none";
    } else {
        DSUtimeout = setTimeout(() => {
            DSUcounter += 1;

            if (DSUcounter >= 15) {
                if (!allowedStates.includes(video.readyState)) {
                    if (localStorage.getItem("mt_mark_quality")) {
                        let index = this._.videos.findIndex((video) => (video.name === localStorage.getItem("mt_mark_quality")));

                        if (index !== -1) {
                            this._.form.settings.menu.quality.Buttons[index].click();
                        }
                    }
                }

                if (!allowedStates.includes(audio.readyState)) {
                    if (localStorage.getItem("mt_mark_dubs")) {
                        let index = this._.audios.findIndex((audio) => (audio.code === localStorage.getItem("mt_mark_dubs")));

                        if (index !== -1) {
                            this._.form.settings.menu.dubs.Buttons[index].click();
                        }
                    }
                }

                DSUcounter = 0;
            }

            downloadStatusUpdate.call(this);
        }, 1000);
    }

    if (this._.playing || (("p" in URLparams()) && trigger)) {
        if (allowedStates.includes(video.readyState) && allowedStates.includes(audio.readyState)) {
            audio.mt_play();
            video.mt_play();

            this._.playing = true;
            this.trySync = true;

            button_play.setAttribute("icon", "pauseBtn");

            trigger = false;
        } else {
            if (!allowedStates.includes(video.readyState) && document.hasFocus()) {
                audio.mt_pause();
            }

            if (!allowedStates.includes(audio.readyState)) {
                video.mt_pause();
            }

            if (allowedStates.includes(audio.readyState) && !document.hasFocus()) {
                audio.mt_play();

                this._.playing = true;
                this.trySync = true;

                button_play.setAttribute("icon", "pauseBtn");

                trigger = false;
            }
        }
    }
}

export function changePlaying(val) {
    if (val) {
        this._.form.video.mt_play();
        this._.form.audio.mt_play();
        this._.form.buttons.but_play.setAttribute("icon", "pauseBtn");

        this._.form.logo_play.style.display = "block";
        this._.form.logo_play.style.animation = "none";

        setTimeout(() => {
            this._.form.logo_play.style.animation = "mt_change_opacity 1s forwards";

            setTimeout(() => {
                this._.form.logo_play.style.display = "none";
            }, 1000);
        }, 100);

        navigator.mediaSession.playbackState = "playing";

        screensaver.call(this, false);

        if (this._.stats_trigger) {
            let xhr = new XMLHttpRequest();

            xhr.open("GET", this._.stats_url + "?id=" + decodeURIComponent(location.pathname) + "&name=" + decodeURIComponent(this._.name) + "&title=" + decodeURIComponent(this._.title) + "&placeholder=" + decodeURIComponent(this._.placeholder), true);

            xhr.addEventListener("load", () => {
                if (xhr.status === 200) {
                    this._.stats_trigger = false;
                } else {
                    console.log("При отправке статистики произошла ошибка:\n\n" + xhr.status + ": " + xhr.statusText);
                }
            });

            xhr.addEventListener("error", () => {
                console.log("При отправке статистики произошла ошибка:\n\n" + xhr.status + ": " + xhr.statusText);
            });

            xhr.send();
        }

        check_size.call(this);
    } else {
        this._.form.video.mt_pause();
        this._.form.audio.mt_pause();
        this._.form.buttons.but_play.setAttribute("icon", "playBtn");

        this._.form.logo_pause.style.display = "block";
        this._.form.logo_pause.style.animation = "none";

        setTimeout(() => {
            this._.form.logo_pause.style.animation = "mt_change_opacity 1s forwards";

            setTimeout(() => {
                this._.form.logo_pause.style.display = "none";
            }, 1000);
        }, 100);

        navigator.mediaSession.playbackState = "paused";

        screensaver.call(this, true);
    }

    this._.playing = val;

    setMediaSession.call(this);
}

export function play() {
    changePlaying.call(this, true);
}

export function pause() {
    changePlaying.call(this, false);
}

export function clear_old_seek() {
    old_seek = 0;
}

export function seek(val) {
    old_seek += val;
    LogoInfoBlock.call(this, ((old_seek > 0) ? ("+" + old_seek) : old_seek).toString().slice(0, 5));

    val += this.currentTime;
    if (val < 0) {
        val = 0;
    }

    this._.form.audio.mt_setTime(val);
    this._.form.video.mt_setTime(val);
}

export function skip(val) {
    if (this._.ds_series !== null) {
        let index = this._.ds_series.findIndex((url) => (url === decodeURIComponent(location.pathname)));

        if (index !== -1) {
            if (val) {
                location.href = decodeURIComponent(location.origin) + this._.ds_series[index + 1] + "?p=1";
            } else {
                location.href = decodeURIComponent(location.origin) + this._.ds_series[index - 1] + "?p=1";
            }
        }
    }
}

export function setTime(val, isVideo = false) {
    this._.form.audio.mt_setTime(val);
    if (!isVideo) {
        this._.form.video.mt_setTime(val);
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
