import {seek, skip} from "./playback";

export function setMediaSession() {
    if ("mediaSession" in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
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

        navigator.mediaSession.setActionHandler("seekto", (event) => {
            this.currentTime = event.seekTime;
        });
    }
}

export function updatePositionState() {
    if (this._.form.audio.duration) {
        navigator.mediaSession.setPositionState({
            duration: this._.form.audio.duration,
            playbackRate: this._.form.audio.playbackRate,
            position: this._.form.audio.currentTime
        });
    }
}
