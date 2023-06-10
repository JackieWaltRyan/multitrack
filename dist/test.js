function prikol(i, ii) {
    let video = document.querySelector("video");
    let subs = document.getElementsByClassName("mt_subtitles");

    if (video !== null && subs.length > 0) {
        video.style.transform = "rotate(" + i + "deg);";
        subs[0].style.transform = "rotate(" + ii + "deg);";
    }
    setTimeout(() => {
        prikol(i + 1, ii - 1);
    }, 200);
}

prikol(0, 0);
