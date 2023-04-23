export function getPosInElement(element, event) {
    return {
        x: event.clientX - element.getBoundingClientRect().x,
        y: event.clientY - element.getBoundingClientRect().y,
    };
}

export function logError(text) {
    console.error(this._.name + " | " + text);
}

export function getCookie(name) {
    let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function URLparams() {
    return window.location.search.replace("?", "").split("&").reduce(function (p, e) {
        let a = e.split("=");
        p[decodeURIComponent(a[0])] = decodeURIComponent(a[1]);
        return p;
    }, {});
}

export function secondsToTime(sec) {
    sec = Math.floor(sec);
    let seconds = sec % 60;
    let minutes = Math.floor(sec / 60) % 60;
    let hours = Math.floor(sec / 3600);

    minutes = minutes.toString().padStart(2, "0");
    seconds = seconds.toString().padStart(2, "0");

    return hours > 0 ? hours + ":" + minutes + ":" + seconds : minutes + ":" + seconds;
}

export function createElement(tag, params = {}, actions = () => {
}) {
    const el = document.createElement(tag);
    for (const name in params) el.setAttribute(name, params[name]);
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
