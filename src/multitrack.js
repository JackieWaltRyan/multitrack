import "./style.scss";
import {init} from "./internal/init";
import {pause, play, setSpeed, setTime, synchronize} from "./internal/playback";
import {sleep} from "./internal/utils";

export default class {
    get currentTime() {
        let root = this;

        return root._.form.audio.currentTime;
    }

    set currentTime(val) {
        setTime.call(this, val);
    }

    get duration() {
        let root = this;

        return root._.form.audio.duration;
    }

    get ended() {
        let root = this;

        let video = root._.form.video;
        let audio = root._.form.audio;

        return video.ended || audio.ended;
    }

    get paused() {
        let root = this;

        return !root._.playing;
    }

    get muted() {
        let root = this;

        return root._.form.audio.muted;
    }

    set muted(val) {
        let root = this;

        val = val === true;
        let audio = root._.form.audio;
        audio.muted = val;
        let iconNum = Math.ceil(audio.volume * 3);

        if (val) {
            iconNum = 0;
        }

        root._.form.buttons.but_volume.setAttribute("iconVar", iconNum);
    }

    get playbackRate() {
        let root = this;

        return root._.playbackRate;
    }

    set playbackRate(val) {
        setSpeed.call(this, val);
    }

    get volume() {
        let root = this;

        if (localStorage.getItem("mt_mark_volume") && (localStorage.getItem("mt_set_volume") === "true")) {
            return parseFloat(localStorage.getItem("mt_mark_volume"));
        } else {
            return root._.form.audio.volume;
        }
    }

    set volume(value) {
        let root = this;

        if (typeof value === "number") {
            if (matchMedia("(any-pointer:coarse)").matches) {
                root._.form.audio.volume = 1;
            } else {
                if (value < 0) {
                    value = 0;
                }

                if (value > 1) {
                    value = 1;
                }

                let audio = root._.form.audio;
                audio.volume = value;

                localStorage.setItem("mt_mark_volume", encodeURIComponent(value));

                let iconNum = Math.ceil(audio.volume * 3);

                if (audio.muted) {
                    iconNum = 0;
                }

                root._.form.buttons.but_volume.setAttribute("iconVar", iconNum);
                root._.form.volumebar.selected.style.width = ((100 * value) + "%");
            }
        }
    }

    get trySync() {
        let root = this;

        return root._.enable_sync;
    }

    set trySync(val) {
        let root = this;

        if (val === true) {
            val = true;
        }

        if (val === false) {
            val = false;
        }

        let old = root._.enable_sync;
        root._.enable_sync = val;

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
        let root = this;

        if (root._.ass !== undefined) {
            root._.ass.resize();
        }
    }
}
