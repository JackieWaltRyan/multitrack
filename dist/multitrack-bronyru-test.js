class MultitrackJSLoader {
    constructor(data) {
        let xhr = new XMLHttpRequest();
        
        xhr.open("GET", ("//bronyru.info/api/v1/episodes/name/" + encodeURIComponent(data.data.episode_name) + "?" + Math.floor(Math.random() * Date.now())), true);

        xhr.addEventListener("load", () => {
            if (xhr.status === 200) {
                let episodeData = JSON.parse(xhr.responseText);

                let videos = episodeData.videos.sort(function (a, b) {
                    a = parseInt(a, 10);
                    b = parseInt(b, 10);

                    if (a > b) {
                        return -1
                    }

                    if (a < b) {
                        return 1
                    }

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

                let ds_series = null;
                let ds_times = null;

                let xhr_ds_series = new XMLHttpRequest();
                xhr_ds_series.open("GET", ("ds_series.json?" + Math.floor(Math.random() * Date.now())), false);
                xhr_ds_series.send();

                if (xhr_ds_series.status === 200) {
                    ds_series = JSON.parse(xhr_ds_series.responseText);
                }

                let xhr_ds_times = new XMLHttpRequest();
                xhr_ds_times.open("GET", ("ds_times.json?" + Math.floor(Math.random() * Date.now())), false);
                xhr_ds_times.send();

                if (xhr_ds_times.status === 200) {
                    ds_times = JSON.parse(xhr_ds_times.responseText);
                }

                return new MultitrackJS(data.el, {
                    videos: videos,
                    audios: audios,
                    subtitles: subtitles,
                    placeholder: (episodeData.path + "index.webp?" + Math.floor(Math.random() * Date.now())),
                    preview: (episodeData.path + "preview.webp?" + Math.floor(Math.random() * Date.now())),
                    preferredVideoName: preferredVideoName,
                    title: episodeData.title,
                    ds_series: ds_series,
                    ds_times: ds_times,
                    sts_url: "//sts.jwr.pw/api/add",
                    name: data.data.episode_name,
                    stats_url: "//sts.jwr.pw/api/stats/add"
                });
            } else {
                alert("При загрузке базы данных произошла ошибка:\n\n" + xhr.status + ": " + xhr.statusText);
            }
        });

        xhr.addEventListener("error", () => {
            alert("При загрузке базы данных произошла ошибка:\n\n" + xhr.status + ": " + xhr.statusText);
        });

        xhr.send();
    }
}
