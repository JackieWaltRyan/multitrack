import {gui} from "./gui.js";

export function init(selector, dataArray) {
    this._ = {
        parameters: {
            frames: {
                x: 10,
                y: 10,
            },
        },
        subtitlesDownloader: null,
        videos: dataArray.videos ? dataArray.videos : null,
        audios: dataArray.audios ? dataArray.audios : null,
        subtitles: dataArray.subtitles ? dataArray.subtitles : null,
        preferredVideoName: dataArray.preferredVideoName ? dataArray.preferredVideoName : null,
        playbackRate: 1,
        enable_sync: false,
        ds_series: dataArray.ds_series ? dataArray.ds_series : null,
        ds_times: dataArray.ds_times ? dataArray.ds_times : null,
        sts_url: dataArray.sts_url ? dataArray.sts_url : null,
        playing: false,
        enable_embient: false,
        title: dataArray.title ? dataArray.title : null,
        preview: dataArray.preview ? dataArray.preview : null,
        placeholder: dataArray.placeholder ? dataArray.placeholder : null
    };

    if ((this._.rootElement = document.querySelector(selector))) {
        gui.call(this);

        this._.form.video.poster = this._.placeholder;

        this._.parameters.frames.image = this._.preview;

        this._.form.title.innerText = this._.title;

        this.trySync = true;

        window.addEventListener("resize", () => {
            this.resize();
        });
    } else {
        console.error("Не удается найти" + selector + "элемент.");
    }
}
