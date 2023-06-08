import "./style.scss";
import {init} from "./internal/init";
import {pause, play, setSpeed, setTime, synchronize} from "./internal/playback";
import {mobileCheck, sleep} from "./internal/utils";

export default class {
    get currentTime() {
        return this._.form.audio.currentTime;
    }

    set currentTime(val) {
        setTime.call(this, val);
    }

    get duration() {
        return this._.form.audio.duration;
    }

    get ended() {
        const video = this._.form.video;
        const audio = this._.form.audio;

        return video.ended || audio.ended;
    }

    get paused() {
        return !this._.playing;
    }

    get muted() {
        return this._.form.audio.muted;
    }

    set muted(val) {
        val = val === true;
        const audio = this._.form.audio;
        audio.muted = val;
        let iconNum = Math.ceil(audio.volume * 3);

        if (val) {
            iconNum = 0;
        }

        this._.form.buttons.volume.setAttribute("iconVar", iconNum);
    }

    get playbackRate() {
        return this._.playbackRate;
    }

    set playbackRate(val) {
        setSpeed.call(this, val);
    }

    get volume() {
        if (localStorage.getItem("mt_mark_volume") && (localStorage.getItem("mt_set_volume") === "true")) {
            return parseFloat(localStorage.getItem("mt_mark_volume"));
        } else {
            return this._.form.audio.volume;
        }
    }

    set volume(value) {
        if (typeof value === "number") {
            if (mobileCheck()) {
                this._.form.audio.volume = 1;
            } else {
                if (value < 0) {
                    value = 0;
                }

                if (value > 1) {
                    value = 1;
                }

                const audio = this._.form.audio;
                audio.volume = value;

                localStorage.setItem("mt_mark_volume", encodeURIComponent(value));

                let iconNum = Math.ceil(audio.volume * 3);

                if (audio.muted) {
                    iconNum = 0;
                }

                this._.form.buttons.volume.setAttribute("iconVar", iconNum);
                this._.form.volumebar.selected.setAttribute("style", "width: " + (100 * value) + "%");
            }
        }
    }

    get trySync() {
        return this._.enable_sync;
    }

    set trySync(val) {
        const root = this;

        if (val === true) {
            val = true;
        }

        if (val === false) {
            val = false;
        }

        const old = this._.enable_sync;
        this._.enable_sync = val;

        if ((val === true) && (old !== true)) {
            (async function () {
                let now = Date.now() - 1000;
                while (root._.enable_sync) {
                    if ((Date.now() - now) > 900) {
                        if (root._.playing) {
                            await synchronize(root);
                        }

                        now = Date.now();
                    } else {
                        await sleep(1000);
                    }
                }
            })();
        }
    }

    constructor(selector, dataArray) {
        init.call(this, selector, dataArray);

        return this;
    }

    play() {
        play.call(this);
    }

    pause() {
        pause.call(this);
    }

    resize() {
        if (this._.ass !== undefined) {
            this._.ass.resize();
        }
    }
}
