class MultitrackJSLoader {
    constructor(data) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", "https://bronyru.info/api/v1/episodes/name/" + encodeURIComponent(data.data.episode_name), false);
        xhr.send();

        if (xhr.status === 200) {
            let episodeData = JSON.parse(xhr.responseText);

            let videos = episodeData.videos.sort(function (a, b) {
                a = parseInt(a, 10);
                b = parseInt(b, 10);
                if (a > b) return -1;
                if (a < b) return 1;
                return 0;
            }).map(function (video) {
                if (parseInt(video, 10) > 1080) {
                    return {
                        name: video + "p",
                        path: episodeData.path + video + ".webm"
                    };
                } else {
                    return {
                        name: video + "p",
                        path: episodeData.path + video + ".mp4"
                    };
                }
            });

            let audios = episodeData.dubs.map(function (dub) {
                return {
                    name: "[" + dub.lang.toUpperCase() + "] " + dub.name,
                    code: dub.code,
                    path: episodeData.path + dub.code + ".mp4"
                };
            });

            let subtitles = episodeData["subs"].map(function (sub) {
                return {
                    name: "[" + sub.lang.toUpperCase() + "] " + sub.name,
                    code: sub.code,
                    path: episodeData.path + sub.code + ".ass"
                };
            });

            const preferredQuality = episodeData.videos.find((video) => parseInt(video, 10) <= 1080);
            const preferredVideoName = preferredQuality ? preferredQuality + "p" : null;

            let ds_series;
            let ds_times;

            let xhr_ds_series = new XMLHttpRequest();
            xhr_ds_series.open("GET", "ds_series.json", false);
            xhr_ds_series.send();

            if (xhr_ds_series.status === 200) {
                ds_series = JSON.parse(xhr_ds_series.responseText);
            } else {
                ds_series = null;
            }

            let xhr_ds_times = new XMLHttpRequest();
            xhr_ds_times.open("GET", "ds_times.json", false);
            xhr_ds_times.send();

            if (xhr_ds_times.status === 200) {
                ds_times = JSON.parse(xhr_ds_times.responseText);
            } else {
                ds_times = null;
            }
            
            return new MultitrackJS(data.el, {
                videos: videos,
                audios: audios,
                subtitles: subtitles,
                placeholder: episodeData.path + "index.jpg",
                preview: episodeData.path + "preview.webp",
                preferredVideoName: preferredVideoName,
                title: episodeData.title,
                ds_series: ds_series,
                ds_times: ds_times,
                sts_url: "https://sts.jwr.pw/sts"
            });
        } else {
            alert(xhr.status + ": " + xhr.statusText);
        }
    }
}
