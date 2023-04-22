var MultitrackJS = function (t) {
    var e = {};

    function s(i) {
        if (e[i]) return e[i].exports;
        var r = e[i] = {i: i, l: !1, exports: {}};
        return t[i].call(r.exports, r, r.exports, s), r.l = !0, r.exports
    }

    return s.m = t, s.c = e, s.d = function (t, e, i) {
        s.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: i})
    }, s.r = function (t) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
    }, s.t = function (t, e) {
        if (1 & e && (t = s(t)), 8 & e) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var i = Object.create(null);
        if (s.r(i), Object.defineProperty(i, "default", {
            enumerable: !0,
            value: t
        }), 2 & e && "string" != typeof t) for (var r in t) s.d(i, r, function (e) {
            return t[e]
        }.bind(null, r));
        return i
    }, s.n = function (t) {
        var e = t && t.__esModule ? function () {
            return t.default
        } : function () {
            return t
        };
        return s.d(e, "a", e), e
    }, s.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e)
    }, s.p = "", s(s.s = 0)
}([function (t, e, s) {
    const i = s(6).default;
    t.exports = i
}, function (t, e, s) {
    var i = s(2), r = s(3);
    "string" == typeof (r = r.__esModule ? r.default : r) && (r = [[t.i, r, ""]]);
    var a = {insert: "head", singleton: !1};
    i(r, a);
    t.exports = r.locals || {}
}, function (t, e, s) {
    "use strict";
    var i, r = function () {
        return void 0 === i && (i = Boolean(window && document && document.all && !window.atob)), i
    }, a = function () {
        var t = {};
        return function (e) {
            if (void 0 === t[e]) {
                var s = document.querySelector(e);
                if (window.HTMLIFrameElement && s instanceof window.HTMLIFrameElement) try {
                    s = s.contentDocument.head
                } catch (t) {
                    s = null
                }
                t[e] = s
            }
            return t[e]
        }
    }(), n = [];

    function o(t) {
        for (var e = -1, s = 0; s < n.length; s++) if (n[s].identifier === t) {
            e = s;
            break
        }
        return e
    }

    function l(t, e) {
        for (var s = {}, i = [], r = 0; r < t.length; r++) {
            var a = t[r], l = e.base ? a[0] + e.base : a[0], h = s[l] || 0, c = "".concat(l, " ").concat(h);
            s[l] = h + 1;
            var d = o(c), u = {css: a[1], media: a[2], sourceMap: a[3]};
            -1 !== d ? (n[d].references++, n[d].updater(u)) : n.push({
                identifier: c,
                updater: g(u, e),
                references: 1
            }), i.push(c)
        }
        return i
    }

    function h(t) {
        var e = document.createElement("style"), i = t.attributes || {};
        if (void 0 === i.nonce) {
            var r = s.nc;
            r && (i.nonce = r)
        }
        if (Object.keys(i).forEach((function (t) {
            e.setAttribute(t, i[t])
        })), "function" == typeof t.insert) t.insert(e); else {
            var n = a(t.insert || "head");
            if (!n) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            n.appendChild(e)
        }
        return e
    }

    var c, d = (c = [], function (t, e) {
        return c[t] = e, c.filter(Boolean).join("\n")
    });

    function u(t, e, s, i) {
        var r = s ? "" : i.media ? "@media ".concat(i.media, " {").concat(i.css, "}") : i.css;
        if (t.styleSheet) t.styleSheet.cssText = d(e, r); else {
            var a = document.createTextNode(r), n = t.childNodes;
            n[e] && t.removeChild(n[e]), n.length ? t.insertBefore(a, n[e]) : t.appendChild(a)
        }
    }

    function m(t, e, s) {
        var i = s.css, r = s.media, a = s.sourceMap;
        if (r ? t.setAttribute("media", r) : t.removeAttribute("media"), a && "undefined" != typeof btoa && (i += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a)))), " */")), t.styleSheet) t.styleSheet.cssText = i; else {
            for (; t.firstChild;) t.removeChild(t.firstChild);
            t.appendChild(document.createTextNode(i))
        }
    }

    var p = null, f = 0;

    function g(t, e) {
        var s, i, r;
        if (e.singleton) {
            var a = f++;
            s = p || (p = h(e)), i = u.bind(null, s, a, !1), r = u.bind(null, s, a, !0)
        } else s = h(e), i = m.bind(null, s, e), r = function () {
            !function (t) {
                if (null === t.parentNode) return !1;
                t.parentNode.removeChild(t)
            }(s)
        };
        return i(t), function (e) {
            if (e) {
                if (e.css === t.css && e.media === t.media && e.sourceMap === t.sourceMap) return;
                i(t = e)
            } else r()
        }
    }

    t.exports = function (t, e) {
        (e = e || {}).singleton || "boolean" == typeof e.singleton || (e.singleton = r());
        var s = l(t = t || [], e);
        return function (t) {
            if (t = t || [], "[object Array]" === Object.prototype.toString.call(t)) {
                for (var i = 0; i < s.length; i++) {
                    var r = o(s[i]);
                    n[r].references--
                }
                for (var a = l(t, e), h = 0; h < s.length; h++) {
                    var c = o(s[h]);
                    0 === n[c].references && (n[c].updater(), n.splice(c, 1))
                }
                s = a
            }
        }
    }
}, function (t, e, s) {
    (e = s(4)(!1)).push([t.i, ".mjs{--mjs--accent-color: #ced4da;--mjs--accent-text: black;display:block;width:854px;height:480px;font-family:-apple-system,BlinkMacSystemFont,Roboto,Open Sans,Helvetica Neue,\"Noto Sans Armenian\",\"Noto Sans Bengali\",\"Noto Sans Cherokee\",\"Noto Sans Devanagari\",\"Noto Sans Ethiopic\",\"Noto Sans Georgian\",\"Noto Sans Hebrew\",\"Noto Sans Kannada\",\"Noto Sans Khmer\",\"Noto Sans Lao\",\"Noto Sans Osmanya\",\"Noto Sans Tamil\",\"Noto Sans Telugu\",\"Noto Sans Thai\",sans-serif;font-size:1rem;position:relative;background:#000;color:#fff;user-select:none;-moz-user-select:none;-webkit-user-select:none}.mjs .mjs__root{width:100%;height:100%}.mjs video,.mjs .mjs__subtitles{position:absolute;top:0;left:0;width:100%;height:100%}.mjs .mjs__settings{display:none;font-size:.75em;position:absolute;bottom:60px;right:8px;min-width:300px;max-height:calc(100% - 64px);background-color:#212529;color:#fff;border:1px solid #343a40;overflow:auto}.mjs .mjs__settings .mjs__settingsHeader{display:flex;background:var(--mjs--accent-color, white);color:var(--mjs--accent-text, black);padding:0px 12px;width:100%;line-height:32px;font-size:1.25em;height:32px;overflow:hidden;box-sizing:border-box}.mjs .mjs__settings .mjs__settingsHeader[showicon=true]::before{content:\"\";display:block;width:18px;height:18px;font-weight:bold;margin:auto 1em auto 0;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='18px' viewBox='0 0 24 24' width='18px' fill='%23000000'%3E%3Cpath d='M0 0h24v24H0V0z' fill='none'/%3E%3Cpath d='M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z'/%3E%3C/svg%3E\")}.mjs .mjs__settings .mjs__settingsHeader[showicon=true]{cursor:pointer}.mjs .mjs__settings .mjs__settingsBody>div{padding:8px 0px}.mjs .mjs__settings .mjs__settingsBody .mjs__settings_element{display:block;width:100%;height:32px;box-sizing:border-box;display:flex;padding:0px 12px;line-height:32px;text-decoration:none;font-size:1.25em;cursor:pointer;transition:.3s background;overflow:hidden;word-break:break-all}.mjs .mjs__settings .mjs__settingsBody .mjs__settings_element:hover{background-color:#343a40}.mjs .mjs__settings .mjs__settingsBody .mjs__settings_element:active{background-color:#495057;transform:scale(0.99)}.mjs .mjs__settings .mjs__settingsBody .mjs__settings_element[selected=true]{background-color:var(--mjs--accent-color, rgba(255, 255, 255, 0.5));color:var(--mjs--accent-text, black)}.mjs .mjs__settings .mjs__settingsBody div[blockname=info]{padding:12px}.mjs .mjs__overlay{position:absolute;top:0;left:0;width:100%;height:100%;background:linear-gradient(to top, rgba(0, 0, 0, 0.75) 0px, rgba(0, 0, 0, 0) 96px),linear-gradient(to bottom, rgba(0, 0, 0, 0.75) 0px, rgba(0, 0, 0, 0) 96px);transition:.3s opacity,.3s visibility}.mjs .mjs__overlay .mjs__overlay-progressBar{position:absolute;left:0;bottom:36px;width:-webkit-fill-available;width:-moz-available;width:fill-available;height:16px;margin:0px 8px;box-sizing:border-box;cursor:pointer}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressPopup{transition:.3s opacity;position:absolute;bottom:16px;padding:2px;border-radius:2px;background-color:rgba(0,0,0,.5);opacity:0;transform:scale(0) translateY(50%);transition:.3s transform,.3s opacity}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressPopup .mjs__overlay-progressPopup-image{width:128px;height:72px}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressPopup .mjs__overlay-progressPopup-time{width:max-content;font-size:12px;margin:0 auto;padding:4px}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressPopup-show{opacity:1;transform:scale(1)}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressBar-played::before{display:block;content:\" \";width:12px;height:12px;border-radius:50%;position:absolute;top:50%;right:0;transform:translateX(50%) translateY(-50%);background-color:#fff}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressBar-background,.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressBar-loaded,.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressBar-played{position:absolute;transform:translateY(-50%);top:50%;left:0;height:4px;width:100%;border-radius:2px}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressBar-played{width:0%}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressBar-background{background-color:rgba(255,255,255,.25)}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressBar-loaded{opacity:.5}.mjs .mjs__overlay .mjs__overlay-progressBar .mjs__overlay-progressBar-played{background-color:var(--mjs--accent-color, white)}.mjs .mjs__overlay .mjs__overlay-volumeBar{position:relative;width:60px;height:100%;margin:0 4px;box-sizing:border-box;cursor:pointer}.mjs .mjs__overlay .mjs__overlay-volumeBar .mjs__overlay-volumeBar-background,.mjs .mjs__overlay .mjs__overlay-volumeBar .mjs__overlay-volumeBar-selected{position:absolute;transform:translateY(-50%);top:50%;left:0;height:4px;width:100%}.mjs .mjs__overlay .mjs__overlay-volumeBar .mjs__overlay-volumeBar-background{background-color:rgba(255,255,255,.25)}.mjs .mjs__overlay .mjs__overlay-volumeBar .mjs__overlay-volumeBar-selected{background-color:var(--mjs--accent-color, white)}.mjs .mjs__overlay .mjs__overlay-volumeBar .mjs__overlay-volumeBar-selected::before{display:block;content:\" \";width:12px;height:12px;border-radius:50%;position:absolute;top:50%;right:0;transform:translateX(50%) translateY(-50%);background-color:#fff}.mjs .mjs__overlay .mjs__overlay-top,.mjs .mjs__overlay .mjs__overlay-bottom{display:flex;position:absolute;left:0;width:100%;height:40px;padding:2px 12px;box-sizing:border-box}.mjs .mjs__overlay .mjs__overlay-top{top:0}.mjs .mjs__overlay .mjs__overlay-bottom{bottom:0}.mjs .mjs__overlay .mjs__overlay-title{flex:auto;line-height:36px;padding:0 8px;box-sizing:border-box}.mjs .mjs__overlay .mjs__overlay-time{padding:0px 8px;line-height:36px;font-size:12px}.mjs.mjs__overlay_hidden .mjs__overlay{opacity:0}.mjs.mjs__overlay_hidden{cursor:none}.mjs.mjs__settings_show .mjs__overlay{opacity:1}.mjs.mjs__settings_show .mjs__settings{display:block}.mjs .mjs__overlay-button{display:block;border:none;border-radius:4px;padding:4px;margin:2px;width:24px;height:24px;box-sizing:content-box;background-color:transparent;background-position:50%;background-repeat:no-repeat;transition:.3s background;cursor:pointer}.mjs .mjs__overlay-button[hidden]{display:none}.mjs .mjs__overlay-button[icon=playBtn]{padding:4px 9px;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M8 5v14l11-7z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=pauseBtn]{padding:4px 9px;background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=backward10]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24' viewBox='0 0 24 24' width='24'%3E%3Cg%3E%3Cg%3E%3Cpath d='M11.99,5V1l-5,5l5,5V7c3.31,0,6,2.69,6,6s-2.69,6-6,6s-6-2.69-6-6h-2c0,4.42,3.58,8,8,8s8-3.58,8-8S16.41,5,11.99,5z' fill='white'/%3E%3Cg%3E%3Cpath d='M10.89,16h-0.85v-3.26l-1.01,0.31v-0.69l1.77-0.63h0.09V16z' fill='white'/%3E%3Cpath d='M15.17,14.24c0,0.32-0.03,0.6-0.1,0.82s-0.17,0.42-0.29,0.57s-0.28,0.26-0.45,0.33s-0.37,0.1-0.59,0.1 s-0.41-0.03-0.59-0.1s-0.33-0.18-0.46-0.33s-0.23-0.34-0.3-0.57s-0.11-0.5-0.11-0.82V13.5c0-0.32,0.03-0.6,0.1-0.82 s0.17-0.42,0.29-0.57s0.28-0.26,0.45-0.33s0.37-0.1,0.59-0.1s0.41,0.03,0.59,0.1c0.18,0.07,0.33,0.18,0.46,0.33 s0.23,0.34,0.3,0.57s0.11,0.5,0.11,0.82V14.24z M14.32,13.38c0-0.19-0.01-0.35-0.04-0.48s-0.07-0.23-0.12-0.31 s-0.11-0.14-0.19-0.17s-0.16-0.05-0.25-0.05s-0.18,0.02-0.25,0.05s-0.14,0.09-0.19,0.17s-0.09,0.18-0.12,0.31 s-0.04,0.29-0.04,0.48v0.97c0,0.19,0.01,0.35,0.04,0.48s0.07,0.24,0.12,0.32s0.11,0.14,0.19,0.17s0.16,0.05,0.25,0.05 s0.18-0.02,0.25-0.05s0.14-0.09,0.19-0.17s0.09-0.19,0.11-0.32s0.04-0.29,0.04-0.48V13.38z' fill='white'/%3E%3C/g%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=forward10]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24' viewBox='0 0 24 24' width='24'%3E%3Cg%3E%3Cg%3E%3Cpath fill='white' d='M18,13c0,3.31-2.69,6-6,6s-6-2.69-6-6s2.69-6,6-6v4l5-5l-5-5v4c-4.42,0-8,3.58-8,8c0,4.42,3.58,8,8,8s8-3.58,8-8H18z'/%3E%3Cpolygon points='10.86,15.94 10.86,11.67 10.77,11.67 9,12.3 9,12.99 10.01,12.68 10.01,15.94' fill='white'/%3E%3Cpath d='M12.25,13.44v0.74c0,1.9,1.31,1.82,1.44,1.82c0.14,0,1.44,0.09,1.44-1.82v-0.74c0-1.9-1.31-1.82-1.44-1.82 C13.55,11.62,12.25,11.53,12.25,13.44z M14.29,13.32v0.97c0,0.77-0.21,1.03-0.59,1.03c-0.38,0-0.6-0.26-0.6-1.03v-0.97 c0-0.75,0.22-1.01,0.59-1.01C14.07,12.3,14.29,12.57,14.29,13.32z' fill='white'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=fullscreenOn]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=fullscreenOff]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=pipOn]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M19 7h-8v6h8V7zm2-4H3c-1.1 0-2 .9-2 2v14c0 1.1.9 1.98 2 1.98h18c1.1 0 2-.88 2-1.98V5c0-1.1-.9-2-2-2zm0 16.01H3V4.98h18v14.03z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=pipOff]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M19 12h-2v3h-3v2h5v-5zM7 9h3V7H5v5h2V9zm14-6H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16.01H3V4.99h18v14.02z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=volume][iconVar=\"0\"]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=volume][iconVar=\"1\"]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='m 3,9 v 6 h 4 l 5,5 V 4 L 7,9 Z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=volume][iconVar=\"2\"]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='m 3,9 v 6 h 4 l 5,5 V 4 L 7,9 Z m 13.5,3 C 16.5,10.23 15.48,8.71 14,7.97 v 8.05 c 1.48,-0.73 2.5,-2.25 2.5,-4.02 z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=volume][iconVar=\"3\"]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='24' viewBox='0 0 24 24' width='24'%3E%3Cpath d='M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' fill='white'/%3E%3C/svg%3E\")}.mjs .mjs__overlay-button[icon=menu]{background-image:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' enable-background='new 0 0 24 24' height='24' viewBox='0 0 24 24' width='24'%3E%3Cg%3E%3Cpath d='M19.14,12.94c0.04-0.3,0.06-0.61,0.06-0.94c0-0.32-0.02-0.64-0.07-0.94l2.03-1.58c0.18-0.14,0.23-0.41,0.12-0.61 l-1.92-3.32c-0.12-0.22-0.37-0.29-0.59-0.22l-2.39,0.96c-0.5-0.38-1.03-0.7-1.62-0.94L14.4,2.81c-0.04-0.24-0.24-0.41-0.48-0.41 h-3.84c-0.24,0-0.43,0.17-0.47,0.41L9.25,5.35C8.66,5.59,8.12,5.92,7.63,6.29L5.24,5.33c-0.22-0.08-0.47,0-0.59,0.22L2.74,8.87 C2.62,9.08,2.66,9.34,2.86,9.48l2.03,1.58C4.84,11.36,4.8,11.69,4.8,12s0.02,0.64,0.07,0.94l-2.03,1.58 c-0.18,0.14-0.23,0.41-0.12,0.61l1.92,3.32c0.12,0.22,0.37,0.29,0.59,0.22l2.39-0.96c0.5,0.38,1.03,0.7,1.62,0.94l0.36,2.54 c0.05,0.24,0.24,0.41,0.48,0.41h3.84c0.24,0,0.44-0.17,0.47-0.41l0.36-2.54c0.59-0.24,1.13-0.56,1.62-0.94l2.39,0.96 c0.22,0.08,0.47,0,0.59-0.22l1.92-3.32c0.12-0.22,0.07-0.47-0.12-0.61L19.14,12.94z M12,15.6c-1.98,0-3.6-1.62-3.6-3.6 s1.62-3.6,3.6-3.6s3.6,1.62,3.6,3.6S13.98,15.6,12,15.6z' fill='white'/%3E%3C/g%3E%3C/svg%3E\")}", ""]), t.exports = e
}, function (t, e, s) {
    "use strict";
    t.exports = function (t) {
        var e = [];
        return e.toString = function () {
            return this.map((function (e) {
                var s = function (t, e) {
                    var s = t[1] || "", i = t[3];
                    if (!i) return s;
                    if (e && "function" == typeof btoa) {
                        var r = (n = i, o = btoa(unescape(encodeURIComponent(JSON.stringify(n)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(o), "/*# ".concat(l, " */")),
                            a = i.sources.map((function (t) {
                                return "/*# sourceURL=".concat(i.sourceRoot || "").concat(t, " */")
                            }));
                        return [s].concat(a).concat([r]).join("\n")
                    }
                    var n, o, l;
                    return [s].join("\n")
                }(e, t);
                return e[2] ? "@media ".concat(e[2], " {").concat(s, "}") : s
            })).join("")
        }, e.i = function (t, s, i) {
            "string" == typeof t && (t = [[null, t, ""]]);
            var r = {};
            if (i) for (var a = 0; a < this.length; a++) {
                var n = this[a][0];
                null != n && (r[n] = !0)
            }
            for (var o = 0; o < t.length; o++) {
                var l = [].concat(t[o]);
                i && r[l[0]] || (s && (l[2] ? l[2] = "".concat(s, " and ").concat(l[2]) : l[2] = s), e.push(l))
            }
        }, e
    }
}, function (t, e, s) {
    "use strict";

    function i(t) {
        var e = t.toLowerCase().trim().split(/\s*;\s*/);
        return "banner" === e[0] ? {
            name: e[0],
            delay: 1 * e[1] || 0,
            leftToRight: 1 * e[2] || 0,
            fadeAwayWidth: 1 * e[3] || 0
        } : /^scroll\s/.test(e[0]) ? {
            name: e[0],
            y1: Math.min(1 * e[1], 1 * e[2]),
            y2: Math.max(1 * e[1], 1 * e[2]),
            delay: 1 * e[3] || 0,
            fadeAwayHeight: 1 * e[4] || 0
        } : null
    }

    function r(t) {
        return t.toLowerCase().replace(/([+-]?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?)/g, " $1 ").replace(/([mnlbspc])/g, " $1 ").trim().replace(/\s+/g, " ").split(/\s(?=[mnlbspc])/).map((function (t) {
            return t.split(" ").filter((function (t, e) {
                return !(e && Number.isNaN(1 * t))
            }))
        }))
    }

    s.r(e);
    var a = ["b", "i", "u", "s", "fsp", "k", "K", "kf", "ko", "kt", "fe", "q", "p", "pbo", "a", "an", "fscx", "fscy", "fax", "fay", "frx", "fry", "frz", "fr", "be", "blur", "bord", "xbord", "ybord", "shad", "xshad", "yshad"].map((function (t) {
        return {name: t, regex: new RegExp("^" + t + "-?\\d")}
    }));

    function n(t) {
        for (var e, s = {}, i = 0; i < a.length; i++) {
            var o = a[i], l = o.name;
            if (o.regex.test(t)) return s[l] = 1 * t.slice(l.length), s
        }
        if (/^fn/.test(t)) s.fn = t.slice(2); else if (/^r/.test(t)) s.r = t.slice(1); else if (/^fs[\d+-]/.test(t)) s.fs = t.slice(2); else if (/^\d?c&?H?[0-9a-f]+|^\d?c$/i.test(t)) {
            var h = t.match(/^(\d?)c&?H?(\w*)/), c = h[1], d = h[2];
            s["c" + (c || 1)] = d && ("000000" + d).slice(-6)
        } else if (/^\da&?H?[0-9a-f]+/i.test(t)) {
            var u = t.match(/^(\d)a&?H?(\w\w)/), m = u[1], p = u[2];
            s["a" + m] = p
        } else if (/^alpha&?H?[0-9a-f]+/i.test(t)) e = t.match(/^alpha&?H?([0-9a-f]+)/i), s.alpha = e[1], s.alpha = ("00" + s.alpha).slice(-2); else if (/^(?:pos|org|move|fad|fade)\(/.test(t)) {
            var f = t.match(/^(\w+)\((.*?)\)?$/), g = f[1], v = f[2];
            s[g] = v.trim().split(/\s*,\s*/).map(Number)
        } else if (/^i?clip/.test(t)) {
            var _ = t.match(/^i?clip\((.*?)\)?$/)[1].trim().split(/\s*,\s*/);
            s.clip = {
                inverse: /iclip/.test(t),
                scale: 1,
                drawing: null,
                dots: null
            }, 1 === _.length && (s.clip.drawing = r(_[0])), 2 === _.length && (s.clip.scale = 1 * _[0], s.clip.drawing = r(_[1])), 4 === _.length && (s.clip.dots = _.map(Number))
        } else if (/^t\(/.test(t)) {
            var y = t.match(/^t\((.*?)\)?$/)[1].trim().replace(/\\.*/, (function (t) {
                return t.replace(/,/g, "\n")
            })).split(/\s*,\s*/);
            if (!y[0]) return s;
            s.t = {
                t1: 0,
                t2: 0,
                accel: 1,
                tags: y[y.length - 1].replace(/\n/g, ",").split("\\").slice(1).map(n)
            }, 2 === y.length && (s.t.accel = 1 * y[0]), 3 === y.length && (s.t.t1 = 1 * y[0], s.t.t2 = 1 * y[1]), 4 === y.length && (s.t.t1 = 1 * y[0], s.t.t2 = 1 * y[1], s.t.accel = 1 * y[2])
        }
        return s
    }

    function o(t) {
        for (var e = [], s = 0, i = "", r = 0; r < t.length; r++) {
            var a = t[r];
            "(" === a && s++, ")" === a && s--, s < 0 && (s = 0), s || "\\" !== a ? i += a : (i && e.push(i), i = "")
        }
        return e.push(i), e.map(n)
    }

    function l(t) {
        var e = t.split(/{([^{}]*?)}/), s = [];
        e[0].length && s.push({tags: [], text: e[0], drawing: []});
        for (var i = 1; i < e.length; i += 2) {
            var a = o(e[i]), n = a.reduce((function (t, e) {
                return void 0 === e.p ? t : !!e.p
            }), !1);
            s.push({tags: a, text: n ? "" : e[i + 1], drawing: n ? r(e[i + 1]) : []})
        }
        return {
            raw: t, combined: s.map((function (t) {
                return t.text
            })).join(""), parsed: s
        }
    }

    function h(t, e) {
        var s = t.split(",");
        if (s.length > e.length) {
            var r = s.slice(e.length - 1).join();
            (s = s.slice(0, e.length - 1)).push(r)
        }
        for (var a, n = {}, o = 0; o < s.length; o++) {
            var h = e[o], c = s[o].trim();
            switch (h) {
                case"Layer":
                case"MarginL":
                case"MarginR":
                case"MarginV":
                    n[h] = 1 * c;
                    break;
                case"Start":
                case"End":
                    n[h] = (a = void 0, 3600 * (a = c.split(":"))[0] + 60 * a[1] + 1 * a[2]);
                    break;
                case"Effect":
                    n[h] = i(c);
                    break;
                case"Text":
                    n[h] = l(c);
                    break;
                default:
                    n[h] = c
            }
        }
        return n
    }

    function c(t) {
        return t.match(/Format\s*:\s*(.*)/i)[1].split(/\s*,\s*/)
    }

    function d(t) {
        return t.match(/Style\s*:\s*(.*)/i)[1].split(/\s*,\s*/)
    }

    var u = Object.assign || function (t) {
        for (var e = [], s = arguments.length - 1; s-- > 0;) e[s] = arguments[s + 1];
        for (var i = 0; i < e.length; i++) if (e[i]) for (var r = Object.keys(e[i]), a = 0; a < r.length; a++) t[r[a]] = e[i][r[a]];
        return t
    };

    function m(t) {
        var e = {type: null, prev: null, next: null, points: []};
        /[mnlbs]/.test(t[0]) && (e.type = t[0].toUpperCase().replace("N", "L").replace("B", "C"));
        for (var s = t.length - !(1 & t.length), i = 1; i < s; i += 2) e.points.push({x: 1 * t[i], y: 1 * t[i + 1]});
        return e
    }

    function p(t) {
        return !(!t.points.length || !t.type) && !(/C|S/.test(t.type) && t.points.length < 3)
    }

    function f(t) {
        return t.map((function (t) {
            return t.type + t.points.map((function (t) {
                return t.x + "," + t.y
            })).join(",")
        })).join("")
    }

    function g(t) {
        for (var e, s = [], i = 0; i < t.length;) {
            var r = t[i], a = m(r);
            if (p(a)) {
                if ("S" === a.type) {
                    var n = (s[i - 1] || {points: [{x: 0, y: 0}]}).points.slice(-1)[0], o = n.x, l = n.y;
                    a.points.unshift({x: o, y: l})
                }
                i && (a.prev = s[i - 1].type, s[i - 1].next = a.type), s.push(a), i++
            } else {
                if (i && "S" === s[i - 1].type) {
                    var h = {p: a.points, c: s[i - 1].points.slice(0, 3)};
                    s[i - 1].points = s[i - 1].points.concat((h[r[0]] || []).map((function (t) {
                        return {x: t.x, y: t.y}
                    })))
                }
                t.splice(i, 1)
            }
        }
        var c = (e = []).concat.apply(e, s.map((function (t) {
            var e = t.type, s = t.points, i = t.prev, r = t.next;
            return "S" === e ? function (t, e, s) {
                var i = [], r = [0, 2 / 3, 1 / 3, 0], a = [0, 1 / 3, 2 / 3, 0], n = [0, 1 / 6, 2 / 3, 1 / 6],
                    o = function (t, e) {
                        return t[0] * e[0] + t[1] * e[1] + t[2] * e[2] + t[3] * e[3]
                    }, l = [t[t.length - 1].x, t[0].x, t[1].x, t[2].x], h = [t[t.length - 1].y, t[0].y, t[1].y, t[2].y];
                i.push({type: "M" === e ? "M" : "L", points: [{x: o(n, l), y: o(n, h)}]});
                for (var c = 3; c < t.length; c++) l = [t[c - 3].x, t[c - 2].x, t[c - 1].x, t[c].x], h = [t[c - 3].y, t[c - 2].y, t[c - 1].y, t[c].y], i.push({
                    type: "C",
                    points: [{x: o(r, l), y: o(r, h)}, {x: o(a, l), y: o(a, h)}, {x: o(n, l), y: o(n, h)}]
                });
                if ("L" === s || "C" === s) {
                    var d = t[t.length - 1];
                    i.push({type: "L", points: [{x: d.x, y: d.y}]})
                }
                return i
            }(s, i, r) : {type: e, points: s}
        })));
        return u({instructions: c, d: f(c)}, function (t) {
            var e, s = 1 / 0, i = 1 / 0, r = -1 / 0, a = -1 / 0;
            return (e = []).concat.apply(e, t.map((function (t) {
                return t.points
            }))).forEach((function (t) {
                var e = t.x, n = t.y;
                s = Math.min(s, e), i = Math.min(i, n), r = Math.max(r, e), a = Math.max(a, n)
            })), {minX: s, minY: i, width: r - s, height: a - i}
        }(s))
    }

    var v = ["fs", "clip", "c1", "c2", "c3", "c4", "a1", "a2", "a3", "a4", "alpha", "fscx", "fscy", "fax", "fay", "frx", "fry", "frz", "fr", "be", "blur", "bord", "xbord", "ybord", "shad", "xshad", "yshad"];

    function _(t, e, s) {
        var i, r, a;
        void 0 === s && (s = {});
        var n = t[e];
        if (void 0 === n) return null;
        if ("pos" === e || "org" === e) return 2 === n.length ? ((i = {})[e] = {x: n[0], y: n[1]}, i) : null;
        if ("move" === e) {
            var o = n[0], l = n[1], h = n[2], c = n[3], d = n[4];
            void 0 === d && (d = 0);
            var m = n[5];
            return void 0 === m && (m = 0), 4 === n.length || 6 === n.length ? {
                move: {
                    x1: o,
                    y1: l,
                    x2: h,
                    y2: c,
                    t1: d,
                    t2: m
                }
            } : null
        }
        if ("fad" === e || "fade" === e) return 2 === n.length ? {
            fade: {
                type: "fad",
                t1: n[0],
                t2: n[1]
            }
        } : 7 === n.length ? {
            fade: {
                type: "fade",
                a1: n[0],
                a2: n[1],
                a3: n[2],
                t1: n[3],
                t2: n[4],
                t3: n[5],
                t4: n[6]
            }
        } : null;
        if ("clip" === e) {
            var p = n.inverse, f = n.scale, y = n.drawing, b = n.dots;
            return y ? {clip: {inverse: p, scale: f, drawing: g(y), dots: b}} : b ? {
                clip: {
                    inverse: p,
                    scale: f,
                    drawing: y,
                    dots: {x1: b[0], y1: b[1], x2: b[2], y2: b[3]}
                }
            } : null
        }
        if (/^[xy]?(bord|shad)$/.test(e) && (n = Math.max(n, 0)), "bord" === e) return {xbord: n, ybord: n};
        if ("shad" === e) return {xshad: n, yshad: n};
        if (/^c\d$/.test(e)) return (r = {})[e] = n || s[e], r;
        if ("alpha" === e) return {a1: n, a2: n, a3: n, a4: n};
        if ("fr" === e) return {frz: n};
        if ("fs" === e) return {fs: /^\+|-/.test(n) ? (1 * n > -10 ? 1 + n / 10 : 1) * s.fs : 1 * n};
        if ("t" === e) {
            var x = n.t1, w = n.accel, j = n.tags, C = n.t2 || 1e3 * (s.end - s.start), S = {};
            return j.forEach((function (t) {
                var e = Object.keys(t)[0];
                ~v.indexOf(e) && ("clip" !== e || t[e].dots) && u(S, _(t, e, s))
            })), {t: {t1: x, t2: C, accel: w, tag: S}}
        }
        return (a = {})[e] = n, a
    }

    var y = [null, 1, 2, 3, null, 7, 8, 9, null, 4, 5, 6],
        b = ["r", "a", "an", "pos", "org", "move", "fade", "fad", "clip"];

    function x(t, e) {
        return {name: t, borderStyle: e[t].style.BorderStyle, tag: e[t].tag, fragments: []}
    }

    function w(t) {
        for (var e, s, i, r, a, n, o = t.styles, l = t.name, h = t.parsed, c = t.start, d = t.end, m = [], p = x(l, o), f = {}, v = 0; v < h.length; v++) {
            for (var w = h[v], j = w.tags, C = w.text, S = w.drawing, k = void 0, E = 0; E < j.length; E++) {
                var B = j[E];
                k = void 0 === B.r ? k : B.r
            }
            for (var T = {
                tag: void 0 === k ? JSON.parse(JSON.stringify(f)) : {},
                text: C,
                drawing: S.length ? g(S) : null
            }, M = 0; M < j.length; M++) {
                var N = j[M];
                e = e || y[N.a || 0] || N.an, s = s || _(N, "pos"), i = i || _(N, "org"), r = r || _(N, "move"), a = a || _(N, "fade") || _(N, "fad"), n = _(N, "clip") || n;
                var L = Object.keys(N)[0];
                if (L && !~b.indexOf(L)) {
                    var A = p.tag,
                        z = _(N, L, {start: c, end: d, c1: A.c1, c2: A.c2, c3: A.c3, c4: A.c4, fs: f.fs || p.tag.fs});
                    "t" === L ? (T.tag.t = T.tag.t || [], T.tag.t.push(z.t)) : u(T.tag, z)
                }
            }
            if (f = T.tag, void 0 !== k && (m.push(p), p = x(o[k] ? k : l, o)), T.text || T.drawing) {
                var $ = p.fragments[p.fragments.length - 1] || {};
                $.text && T.text && !Object.keys(T.tag).length ? $.text += T.text : p.fragments.push(T)
            }
        }
        return m.push(p), u({alignment: e, slices: m}, s, i, r, a, n)
    }

    function j(t) {
        for (var e = t.styles, s = t.dialogues, i = 1 / 0, r = [], a = 0; a < s.length; a++) {
            var n = s[a];
            if (!(n.Start >= n.End)) {
                e[n.Style] || (n.Style = "Default");
                var o = e[n.Style].style,
                    l = w({styles: e, name: n.Style, parsed: n.Text.parsed, start: n.Start, end: n.End}),
                    h = l.alignment || o.Alignment;
                i = Math.min(i, n.Layer), r.push(u({
                    layer: n.Layer,
                    start: n.Start,
                    end: n.End,
                    margin: {
                        left: n.MarginL || o.MarginL,
                        right: n.MarginR || o.MarginR,
                        vertical: n.MarginV || o.MarginV
                    },
                    effect: n.Effect
                }, l, {alignment: h}))
            }
        }
        for (var c = 0; c < r.length; c++) r[c].layer -= i;
        return r.sort((function (t, e) {
            return t.start - e.start || t.end - e.end
        }))
    }

    var C = {
        Name: "Default",
        Fontname: "Arial",
        Fontsize: "20",
        PrimaryColour: "&H00FFFFFF&",
        SecondaryColour: "&H000000FF&",
        OutlineColour: "&H00000000&",
        BackColour: "&H00000000&",
        Bold: "0",
        Italic: "0",
        Underline: "0",
        StrikeOut: "0",
        ScaleX: "100",
        ScaleY: "100",
        Spacing: "0",
        Angle: "0",
        BorderStyle: "1",
        Outline: "2",
        Shadow: "2",
        Alignment: "2",
        MarginL: "10",
        MarginR: "10",
        MarginV: "10",
        Encoding: "1"
    };

    function S(t) {
        if (/^(&|H|&H)[0-9a-f]{6,}/i.test(t)) {
            var e = t.match(/&?H?([0-9a-f]{2})?([0-9a-f]{6})/i);
            return [e[1] || "00", e[2]]
        }
        var s = parseInt(t, 10);
        if (!Number.isNaN(s)) {
            if (s < -2147483648) return ["00", "000000"];
            var i = -2147483648 <= s && s <= 2147483647 ? ("00000000" + (s < 0 ? s + 4294967296 : s).toString(16)).slice(-8) : String(s).slice(0, 8);
            return [i.slice(0, 2), i.slice(2)]
        }
        return ["00", "000000"]
    }

    function k(t, e) {
        void 0 === e && (e = {});
        var s = function (t) {
            for (var e = {
                info: {},
                styles: {format: [], style: []},
                events: {format: [], comment: [], dialogue: []}
            }, s = t.split(/\r?\n/), i = 0, r = 0; r < s.length; r++) {
                var a = s[r].trim();
                if (!/^;/.test(a) && (/^\[Script Info\]/i.test(a) ? i = 1 : /^\[V4\+? Styles\]/i.test(a) ? i = 2 : /^\[Events\]/i.test(a) ? i = 3 : /^\[.*\]/.test(a) && (i = 0), 0 !== i)) {
                    if (1 === i && /:/.test(a)) {
                        var n = a.match(/(.*?)\s*:\s*(.*)/), o = n[1], l = n[2];
                        e.info[o] = l
                    }
                    if (2 === i && (/^Format\s*:/i.test(a) && (e.styles.format = c(a)), /^Style\s*:/i.test(a) && e.styles.style.push(d(a))), 3 === i && (/^Format\s*:/i.test(a) && (e.events.format = c(a)), /^(?:Comment|Dialogue)\s*:/i.test(a))) {
                        var u = a.match(/^(\w+?)\s*:\s*(.*)/i), m = u[1], p = u[2];
                        e.events[m.toLowerCase()].push(h(p, e.events.format))
                    }
                }
            }
            return e
        }(t), i = function (t) {
            for (var e = t.info, s = t.style, i = t.format, r = t.defaultStyle, a = {}, n = [u({}, C, r, {Name: "Default"})].concat(s.map((function (t) {
                for (var e = {}, s = 0; s < i.length; s++) e[i[s]] = t[s];
                return e
            }))), o = function (t) {
                var s = n[t];
                /^(\*+)Default$/.test(s.Name) && (s.Name = "Default"), Object.keys(s).forEach((function (t) {
                    "Name" === t || "Fontname" === t || /Colour/.test(t) || (s[t] *= 1)
                }));
                var i = S(s.PrimaryColour), r = i[0], o = i[1], l = S(s.SecondaryColour), h = l[0], c = l[1],
                    d = S(s.OutlineColour), u = d[0], m = d[1], p = S(s.BackColour), f = p[0], g = p[1], v = {
                        fn: s.Fontname,
                        fs: s.Fontsize,
                        c1: o,
                        a1: r,
                        c2: c,
                        a2: h,
                        c3: m,
                        a3: u,
                        c4: g,
                        a4: f,
                        b: Math.abs(s.Bold),
                        i: Math.abs(s.Italic),
                        u: Math.abs(s.Underline),
                        s: Math.abs(s.StrikeOut),
                        fscx: s.ScaleX,
                        fscy: s.ScaleY,
                        fsp: s.Spacing,
                        frz: s.Angle,
                        xbord: s.Outline,
                        ybord: s.Outline,
                        xshad: s.Shadow,
                        yshad: s.Shadow,
                        q: /^[0-3]$/.test(e.WrapStyle) ? 1 * e.WrapStyle : 2
                    };
                a[s.Name] = {style: s, tag: v}
            }, l = 0; l < n.length; l++) o(l);
            return a
        }({info: s.info, style: s.styles.style, format: s.styles.format, defaultStyle: e.defaultStyle || {}});
        return {
            info: s.info,
            width: 1 * s.info.PlayResX || null,
            height: 1 * s.info.PlayResY || null,
            collisions: s.info.Collisions || "Normal",
            styles: i,
            dialogues: j({styles: i, dialogues: s.events.dialogue})
        }
    }

    var E = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || function (t) {
            return setTimeout(t, 50 / 3)
        },
        B = window.cancelAnimationFrame || window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame || clearTimeout;

    function T(t) {
        var e = t.match(/(\w\w)(\w\w)(\w\w)(\w\w)/), s = 1 - ("0x" + e[1]) / 255, i = +("0x" + e[2]),
            r = +("0x" + e[3]);
        return "rgba(" + +("0x" + e[4]) + "," + r + "," + i + "," + s + ")"
    }

    function M() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function (t) {
            var e = 16 * Math.random() | 0;
            return ("x" === t ? e : 3 & e | 8).toString(16)
        }))
    }

    function N(t, e) {
        void 0 === e && (e = []);
        for (var s = document.createElementNS("http://www.w3.org/2000/svg", t), i = 0; i < e.length; i++) {
            var r = e[i];
            s.setAttributeNS("xlink:href" === r[0] ? "http://www.w3.org/1999/xlink" : null, r[0], r[1])
        }
        return s
    }

    function L(t) {
        var e = document.body.style, s = t.replace(/^\w/, (function (t) {
            return t.toUpperCase()
        }));
        return t in e ? "" : "webkit" + s in e ? "-webkit-" : "moz" + s in e ? "-moz-" : ""
    }

    var A = {transform: L("transform"), animation: L("animation"), clipPath: L("clipPath")};

    function z(t) {
        var e = t.getRootNode ? t.getRootNode() : document;
        return e === document ? e.head : e
    }

    var $ = ["c3", "a3", "c4", "a4", "xbord", "ybord", "xshad", "yshad", "blur", "be"],
        R = ["fscx", "fscy", "frx", "fry", "frz", "fax", "fay"];

    function F(t) {
        var e = this._.scriptRes.width, s = this._.scriptRes.height, i = "";
        if (null !== t.dots) {
            var r = t.dots, a = r.x1, n = r.y1, o = r.x2, l = r.y2;
            i = "M" + (a /= e) + "," + (n /= s) + "L" + a + "," + (l /= s) + "," + (o /= e) + "," + l + "," + o + "," + n + "Z"
        }
        null !== t.drawing && (i = t.drawing.instructions.map((function (t) {
            return t.type + t.points.map((function (t) {
                var i = t.x, r = t.y;
                return i / e + "," + r / s
            })).join(",")
        })).join(""));
        var h = 1 / (1 << t.scale - 1);
        t.inverse && (i += "M0,0L0," + h + "," + h + "," + h + "," + h + ",0,0,0Z");
        var c = "ASS-" + M(), d = N("clipPath", [["id", c], ["clipPathUnits", "objectBoundingBox"]]);
        return d.appendChild(N("path", [["d", i], ["transform", "scale(" + h + ")"], ["clip-rule", "evenodd"]])), this._.$defs.appendChild(d), {
            $clipPath: d,
            cssText: A.clipPath + "clip-path:url(#" + c + ");"
        }
    }

    function O(t) {
        if (t.clip) {
            var e = document.createElement("div");
            this._.$stage.insertBefore(e, t.$div), e.appendChild(t.$div), e.className = "ASS-fix-objectBoundingBox";
            var s = F.call(this, t.clip), i = s.cssText, r = s.$clipPath;
            this._.$defs.appendChild(r), e.style.cssText = i, u(t, {$div: e, $clipPath: r})
        }
    }

    var H = document.createElement("div");
    H.className = "ASS-fix-font-size", H.textContent = "M";
    var P = Object.create(null);

    function V(t, e) {
        var s = t + "-" + e;
        return P[s] || (H.style.cssText = "line-height:normal;font-size:" + e + 'px;font-family:"' + t + '",Arial;', P[s] = e * e / H.clientHeight), P[s]
    }

    function D(t, e) {
        var s = [], i = T(t.a3 + t.c3), r = t.xbord * e, a = t.ybord * e, n = T(t.a4 + t.c4), o = t.xshad * e,
            l = t.yshad * e, h = t.blur || t.be || 0;
        if (!(r + a + o + l)) return "none";
        if (r || a) for (var c = -1; c <= 1; c++) for (var d = -1; d <= 1; d++) {
            for (var u = 1; u < r; u++) for (var m = 1; m < a; m++) (c || d) && s.push(i + " " + c * u + "px " + d * m + "px " + h + "px");
            s.push(i + " " + c * r + "px " + d * a + "px " + h + "px")
        }
        if (o || l) {
            var p = o > 0 ? 1 : -1, f = l > 0 ? 1 : -1;
            o = Math.abs(o), l = Math.abs(l);
            for (var g = Math.max(r, o - r); g < o + r; g++) for (var v = Math.max(a, l - a); v < l + a; v++) s.push(n + " " + g * p + "px " + v * f + "px " + h + "px");
            s.push(n + " " + (o + r) * p + "px " + (l + a) * f + "px " + h + "px")
        }
        return s.join()
    }

    function q(t) {
        return ["perspective(314px)", "rotateY(" + (t.fry || 0) + "deg)", "rotateX(" + (t.frx || 0) + "deg)", "rotateZ(" + (-t.frz || 0) + "deg)", "scale(" + (t.p ? 1 : (t.fscx || 100) / 100) + "," + (t.p ? 1 : (t.fscy || 100) / 100) + ")", "skew(" + (t.fax || 0) + "rad," + (t.fay || 0) + "rad)"].join(" ")
    }

    function I(t, e) {
        return "@" + A.animation + "keyframes " + t + " {" + e + "}\n"
    }

    var W = function () {
        this.obj = {}
    };

    function U() {
        var t = this, e = "";
        return this.dialogues.forEach((function (s) {
            var i = s.start, r = s.end, a = s.effect, n = s.move, o = s.fade, l = s.slices, h = 1e3 * (r - i),
                c = new W;
            if (a && !n) {
                var d = a.name, m = a.delay, p = a.lefttoright, f = a.y1, g = a.y2 || t._.resampledRes.height;
                if ("banner" === d) {
                    var v = t.scale * (h / m) * (p ? 1 : -1);
                    c.set("0.000%", "transform", "translateX(0)"), c.set("100.000%", "transform", "translateX(" + v + "px)")
                }
                if (/^scroll/.test(d)) {
                    var _ = /up/.test(d) ? -1 : 1, y = "translateY(" + t.scale * f * _ + "px)",
                        b = "translateY(" + t.scale * g * _ + "px)", x = (g - f) / (h / m) * 100;
                    c.set("0.000%", "transform", y), x < 100 && c.set(x.toFixed(3) + "%", "transform", b), c.set("100.000%", "transform", b)
                }
            }
            if (n) {
                var w = n.x1, j = n.y1, C = n.x2, S = n.y2, k = n.t1, E = n.t2 || h, B = s.pos || {x: 0, y: 0},
                    N = [{x: w, y: j}, {x: C, y: S}].map((function (e) {
                        var s = e.x, i = e.y;
                        return "translate(" + t.scale * (s - B.x) + "px, " + t.scale * (i - B.y) + "px)"
                    }));
                c.setT({t1: k, t2: E, duration: h, prop: "transform", from: N[0], to: N[1]})
            }
            if (o) if ("fad" === o.type) {
                var L = o.t1, A = o.t2;
                c.set("0.000%", "opacity", 0), L < h ? (c.set((L / h * 100).toFixed(3) + "%", "opacity", 1), L + A < h && c.set(((h - A) / h * 100).toFixed(3) + "%", "opacity", 1), c.set("100.000%", "opacity", 0)) : c.set("100.000%", "opacity", h / L)
            } else {
                var z = o.a1, F = o.a2, O = o.a3, H = o.t1, P = o.t2, U = o.t3, Y = o.t4,
                    X = [H, P, U, Y].map((function (t) {
                        return (t / h * 100).toFixed(3) + "%"
                    })), G = [z, F, O].map((function (t) {
                        return 1 - t / 255
                    }));
                c.set("0.000%", "opacity", G[0]), H < h && c.set(X[0], "opacity", G[0]), P < h && c.set(X[1], "opacity", G[1]), U < h && c.set(X[2], "opacity", G[1]), Y < h && c.set(X[3], "opacity", G[2]), c.set("100.000%", "opacity", G[2])
            }
            var J = c.toString();
            J && (u(s, {animationName: "ASS-" + M()}), e += I(s.animationName, J)), l.forEach((function (s) {
                s.fragments.forEach((function (i) {
                    if (i.tag.t && i.tag.t.length) {
                        var r, a = new W, n = u({}, s.tag, i.tag);
                        (r = i.tag.t, r.reduceRight((function (t, e) {
                            var s = !1;
                            return t.map((function (t) {
                                return s = e.t1 === t.t1 && e.t2 === t.t2 && e.accel === t.accel, u({}, t, s ? {tag: u({}, t.tag, e.tag)} : {})
                            })).concat(s ? [] : e)
                        }), [])).forEach((function (e) {
                            var r = e.t1, o = e.t2, l = e.tag;
                            if (l.fs) {
                                var c = t.scale * V(n.fn, n.fs) + "px", d = t.scale * V(l.fn, n.fs) + "px";
                                a.setT({t1: r, t2: o, duration: h, prop: "font-size", from: c, to: d})
                            }
                            if (l.fsp) {
                                var m = t.scale * n.fsp + "px", p = t.scale * l.fsp + "px";
                                a.setT({t1: r, t2: o, duration: h, prop: "letter-spacing", from: m, to: p})
                            }
                            var f = void 0 !== l.a1 && l.a1 === l.a2 && l.a2 === l.a3 && l.a3 === l.a4;
                            if (l.c1 || l.a1 && !f) {
                                var g = T(n.a1 + n.c1), v = T((l.a1 || n.a1) + (l.c1 || n.c1));
                                a.setT({t1: r, t2: o, duration: h, prop: "color", from: g, to: v})
                            }
                            if (f) {
                                var _ = 1 - parseInt(n.a1, 16) / 255, y = 1 - parseInt(l.a1, 16) / 255;
                                a.setT({t1: r, t2: o, duration: h, prop: "opacity", from: _, to: y})
                            }
                            if ($.some((function (t) {
                                return void 0 !== l[t] && l[t] !== (i.tag[t] || s.tag[t])
                            }))) {
                                var b = /Yes/i.test(t.info.ScaledBorderAndShadow) ? t.scale : 1, x = D(n, b),
                                    w = D(u({}, n, l), b);
                                a.setT({t1: r, t2: o, duration: h, prop: "text-shadow", from: x, to: w})
                            }
                            if (R.some((function (t) {
                                return void 0 !== l[t] && l[t] !== (i.tag[t] || s.tag[t])
                            }))) {
                                var j = u({}, n, l);
                                i.drawing && (u(j, {
                                    p: 0,
                                    fscx: (l.fscx || n.fscx) / n.fscx * 100,
                                    fscy: (l.fscy || n.fscy) / n.fscy * 100
                                }), u(n, {fscx: 100, fscy: 100}));
                                var C = q(n), S = q(j);
                                a.setT({t1: r, t2: o, duration: h, prop: "transform", from: C, to: S})
                            }
                        }));
                        var o = a.toString();
                        u(i, {animationName: "ASS-" + M()}), e += I(i.animationName, o)
                    }
                }))
            }))
        })), e
    }

    function Y(t, e, s) {
        var i = A.animation;
        return i + "animation-name:" + t + ";" + i + "animation-duration:" + e + "s;" + i + "animation-delay:" + s + "s;" + i + "animation-timing-function:linear;" + i + "animation-iteration-count:1;" + i + "animation-fill-mode:forwards;"
    }

    function X(t, e) {
        var s = u({}, e, t.tag), i = t.drawing, r = i.minX, a = i.minY, n = i.width, o = i.height,
            l = this.scale / (1 << s.p - 1), h = (s.fscx ? s.fscx / 100 : 1) * l, c = (s.fscy ? s.fscy / 100 : 1) * l,
            d = s.blur || s.be || 0, m = s.xbord + (s.xshad < 0 ? -s.xshad : 0) + d,
            p = s.ybord + (s.yshad < 0 ? -s.yshad : 0) + d, f = n * h + 2 * s.xbord + Math.abs(s.xshad) + 2 * d,
            g = o * c + 2 * s.ybord + Math.abs(s.yshad) + 2 * d,
            v = N("svg", [["width", f], ["height", g], ["viewBox", -m + " " + -p + " " + f + " " + g]]),
            _ = /Yes/i.test(this.info.ScaledBorderAndShadow) ? this.scale : 1, y = "ASS-" + M(), b = N("defs");
        b.appendChild(function (t, e, s) {
            var i = t.xbord || t.ybord, r = t.xshad || t.yshad, a = "FF" !== t.a1, n = t.blur || t.be || 0,
                o = N("filter", [["id", e]]);
            o.appendChild(N("feGaussianBlur", [["stdDeviation", i ? 0 : n], ["in", "SourceGraphic"], ["result", "sg_b"]])), o.appendChild(N("feFlood", [["flood-color", T(t.a1 + t.c1)], ["result", "c1"]])), o.appendChild(N("feComposite", [["operator", "in"], ["in", "c1"], ["in2", "sg_b"], ["result", "main"]])), i && (o.appendChild(N("feMorphology", [["radius", t.xbord * s + " " + t.ybord * s], ["operator", "dilate"], ["in", "SourceGraphic"], ["result", "dil"]])), o.appendChild(N("feGaussianBlur", [["stdDeviation", n], ["in", "dil"], ["result", "dil_b"]])), o.appendChild(N("feComposite", [["operator", "out"], ["in", "dil_b"], ["in2", "SourceGraphic"], ["result", "dil_b_o"]])), o.appendChild(N("feFlood", [["flood-color", T(t.a3 + t.c3)], ["result", "c3"]])), o.appendChild(N("feComposite", [["operator", "in"], ["in", "c3"], ["in2", "dil_b_o"], ["result", "border"]]))), r && (i || a) && (o.appendChild(N("feOffset", [["dx", t.xshad * s], ["dy", t.yshad * s], ["in", i ? "dil" : "SourceGraphic"], ["result", "off"]])), o.appendChild(N("feGaussianBlur", [["stdDeviation", n], ["in", "off"], ["result", "off_b"]])), a || (o.appendChild(N("feOffset", [["dx", t.xshad * s], ["dy", t.yshad * s], ["in", "SourceGraphic"], ["result", "sg_off"]])), o.appendChild(N("feComposite", [["operator", "out"], ["in", "off_b"], ["in2", "sg_off"], ["result", "off_b_o"]]))), o.appendChild(N("feFlood", [["flood-color", T(t.a4 + t.c4)], ["result", "c4"]])), o.appendChild(N("feComposite", [["operator", "in"], ["in", "c4"], ["in2", a ? "off_b" : "off_b_o"], ["result", "shadow"]])));
            var l = N("feMerge", []);
            return r && (i || a) && l.appendChild(N("feMergeNode", [["in", "shadow"]])), i && l.appendChild(N("feMergeNode", [["in", "border"]])), l.appendChild(N("feMergeNode", [["in", "main"]])), o.appendChild(l), o
        }(s, y, _)), v.appendChild(b);
        var x = "ASS-" + M(), w = N("symbol", [["id", x], ["viewBox", r + " " + a + " " + n + " " + o]]);
        return w.appendChild(N("path", [["d", t.drawing.d]])), v.appendChild(w), v.appendChild(N("use", [["width", n * h], ["height", o * c], ["xlink:href", "#" + x], ["filter", "url(#" + y + ")"]])), v.style.cssText = "position:absolute;left:" + (r * h - m) + "px;top:" + (a * c - p) + "px;", {
            $svg: v,
            cssText: "position:relative;width:" + n * h + "px;height:" + o * c + "px;"
        }
    }

    function G(t) {
        var e = this, s = document.createElement("div");
        s.className = "ASS-dialogue";
        var i = document.createDocumentFragment(), r = t.slices, a = t.start, n = t.end;
        return r.forEach((function (t) {
            var s = t.borderStyle;
            t.fragments.forEach((function (r) {
                var o = r.text, l = r.drawing, h = r.animationName, c = u({}, t.tag, r.tag),
                    d = "display:inline-block;", m = e.video.currentTime;
                if (!l) {
                    d += 'font-family:"' + c.fn + '",Arial;', d += "font-size:" + e.scale * V(c.fn, c.fs) + "px;", d += "color:" + T(c.a1 + c.c1) + ";";
                    var p = /Yes/i.test(e.info.ScaledBorderAndShadow) ? e.scale : 1;
                    1 === s && (d += "text-shadow:" + D(c, p) + ";"), 3 === s && (d += "background-color:" + T(c.a3 + c.c3) + ";box-shadow:" + D(c, p) + ";"), d += c.b ? "font-weight:" + (1 === c.b ? "bold" : c.b) + ";" : "", d += c.i ? "font-style:italic;" : "", d += c.u || c.s ? "text-decoration:" + (c.u ? "underline" : "") + " " + (c.s ? "line-through" : "") + ";" : "", d += c.fsp ? "letter-spacing:" + c.fsp + "px;" : "", 1 !== c.q && 0 !== c.q && 3 !== c.q || (d += "white-space:normal;"), 2 === c.q && (d += "white-space:nowrap;")
                }
                if (R.some((function (t) {
                    return /^fsc[xy]$/.test(t) ? 100 !== c[t] : !!c[t]
                })) && (d += A.transform + "transform:" + q(c) + ";", l || (d += "transform-style:preserve-3d;word-break:normal;white-space:nowrap;")), h && (d += Y(h, n - a, Math.min(0, a - m))), l && c.pbo) {
                    var f = e.scale * -c.pbo * (c.fscy || 100) / 100;
                    d += "vertical-align:" + f + "px;"
                }
                var g = /"fr[xyz]":[^0]/.test(JSON.stringify(c));
                (function (t, e) {
                    return t.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\\N/g, "<br>").replace(/\\n/g, 2 === e ? "<br>" : " ")
                })(o, c.q).split("<br>").forEach((function (s, a) {
                    var n = document.createElement("span");
                    if (n.dataset.hasRotate = g, l) {
                        var o = X.call(e, r, t.tag);
                        n.style.cssText = o.cssText, n.appendChild(o.$svg)
                    } else {
                        if (a && i.appendChild(document.createElement("br")), !s) return;
                        n.innerHTML = s
                    }
                    n.style.cssText += d, i.appendChild(n)
                }))
            }))
        })), s.appendChild(i), s
    }

    function J(t) {
        var e = t.layer, s = t.margin, i = t.width, r = t.height, a = t.alignment, n = t.end,
            o = this.width - (this.scale * (s.left + s.right) | 0), l = this.height, h = this.scale * s.vertical | 0,
            c = 100 * this.video.currentTime;
        this._.space[e] = this._.space[e] || {
            left: {width: new Uint16Array(l + 1), end: new Uint16Array(l + 1)},
            center: {width: new Uint16Array(l + 1), end: new Uint16Array(l + 1)},
            right: {width: new Uint16Array(l + 1), end: new Uint16Array(l + 1)}
        };
        var d = this._.space[e], u = ["right", "left", "center"][a % 3], m = 0, p = 0, f = function (t) {
            return (m = function (t) {
                var e = d.left.width[t], s = d.center.width[t], r = d.right.width[t], a = d.left.end[t],
                    n = d.center.end[t], l = d.right.end[t];
                return "left" === u && (a > c && e || n > c && s && 2 * i + s > o || l > c && r && i + r > o) || "center" === u && (a > c && e && 2 * e + i > o || n > c && s || l > c && r && 2 * r + i > o) || "right" === u && (a > c && e && e + i > o || n > c && s && 2 * i + s > o || l > c && r)
            }(t) ? 0 : m + 1) >= r && (p = t, !0)
        };
        if (a <= 3) for (var g = l - h - 1; g > h && !f(g); g--) ; else if (a >= 7) for (var v = h + 1; v < l - h && !f(v); v++) ; else for (var _ = l - r >> 1; _ < l - h && !f(_); _++) ;
        a > 3 && (p -= r - 1);
        for (var y = p; y < p + r; y++) d[u].width[y] = i, d[u].end[y] = 100 * n;
        return p
    }

    function K(t) {
        var e = t.effect, s = t.move, i = t.alignment, r = t.width, a = t.height, n = t.margin, o = t.slices, l = 0,
            h = 0;
        if (e) "banner" === e.name && (i <= 3 && (h = this.height - a - n.vertical), i >= 4 && i <= 6 && (h = (this.height - a) / 2), i >= 7 && (h = n.vertical), l = e.lefttoright ? -r : this.width); else if (t.pos || s) {
            var c = t.pos || {x: 0, y: 0};
            i % 3 == 1 && (l = this.scale * c.x), i % 3 == 2 && (l = this.scale * c.x - r / 2), i % 3 == 0 && (l = this.scale * c.x - r), i <= 3 && (h = this.scale * c.y - a), i >= 4 && i <= 6 && (h = this.scale * c.y - a / 2), i >= 7 && (h = this.scale * c.y)
        } else {
            i % 3 == 1 && (l = 0), i % 3 == 2 && (l = (this.width - r) / 2), i % 3 == 0 && (l = this.width - r - this.scale * n.right), o.some((function (t) {
                return t.fragments.some((function (t) {
                    return t.animationName
                }))
            })) ? (i <= 3 && (h = this.height - a - n.vertical), i >= 4 && i <= 6 && (h = (this.height - a) / 2), i >= 7 && (h = n.vertical)) : h = J.call(this, t)
        }
        return {x: l, y: h}
    }

    function Z(t) {
        var e = t.layer, s = t.start, i = t.end, r = t.alignment, a = t.effect, n = t.pos, o = t.margin,
            l = t.animationName, h = t.width, c = t.height, d = t.x, u = t.y, m = this.video.currentTime, p = "";
        (e && (p += "z-index:" + e + ";"), l && (p += Y(l, i - s, Math.min(0, s - m))), p += "text-align:" + ["right", "left", "center"][r % 3] + ";", a) || (p += "max-width:" + (this.width - this.scale * (o.left + o.right)) + "px;", n || (r % 3 == 1 && (p += "margin-left:" + this.scale * o.left + "px;"), r % 3 == 0 && (p += "margin-right:" + this.scale * o.right + "px;"), h > this.width - this.scale * (o.left + o.right) && (p += "margin-left:" + this.scale * o.left + "px;", p += "margin-right:" + this.scale * o.right + "px;")));
        return p += "width:" + h + "px;height:" + c + "px;left:" + d + "px;top:" + u + "px;"
    }

    function Q(t) {
        var e = G.call(this, t);
        u(t, {$div: e}), this._.$stage.appendChild(e);
        var s = e.getBoundingClientRect(), i = s.width, r = s.height;
        return u(t, {width: i, height: r}), u(t, K.call(this, t)), e.style.cssText = Z.call(this, t), function (t) {
            var e = t.alignment, s = t.width, i = t.height, r = t.x, a = t.y, n = t.$div, o = t.org;
            o || (o = {
                x: 0,
                y: 0
            }, e % 3 == 1 && (o.x = r), e % 3 == 2 && (o.x = r + s / 2), e % 3 == 0 && (o.x = r + s), e <= 3 && (o.y = a + i), e >= 4 && e <= 6 && (o.y = a + i / 2), e >= 7 && (o.y = a));
            for (var l = n.childNodes.length - 1; l >= 0; l--) {
                var h = n.childNodes[l];
                if ("true" === h.dataset.hasRotate) {
                    var c = o.x - r - h.offsetLeft, d = o.y - a - h.offsetTop;
                    h.style.cssText += A.transform + "transform-origin:" + c + "px " + d + "px;"
                }
            }
        }(t), O.call(this, t), t
    }

    function tt() {
        for (var t = this.video.currentTime, e = this._.stagings.length - 1; e >= 0; e--) {
            var s = this._.stagings[e], i = s.end;
            if (s.effect && /scroll/.test(s.effect.name)) {
                var r = s.effect, a = r.y1, n = r.y2, o = r.delay,
                    l = ((n || this._.resampledRes.height) - a) / (1e3 / o);
                i = Math.min(i, s.start + l)
            }
            i < t && (this._.$stage.removeChild(s.$div), s.$clipPath && this._.$defs.removeChild(s.$clipPath), this._.stagings.splice(e, 1))
        }
        for (var h = this.dialogues; this._.index < h.length && t >= h[this._.index].start;) {
            if (t < h[this._.index].end) {
                var c = Q.call(this, h[this._.index]);
                this._.stagings.push(c)
            }
            ++this._.index
        }
    }

    function et() {
        var t = this, e = function () {
            tt.call(t), t._.requestId = E(e)
        };
        return B(this._.requestId), this._.requestId = E(e), this._.$stage.classList.remove("ASS-animation-paused"), this
    }

    function st() {
        return B(this._.requestId), this._.requestId = 0, this._.$stage.classList.add("ASS-animation-paused"), this
    }

    function it() {
        for (; this._.$stage.lastChild;) this._.$stage.removeChild(this._.$stage.lastChild);
        for (; this._.$defs.lastChild;) this._.$defs.removeChild(this._.$defs.lastChild);
        this._.stagings = [], this._.space = []
    }

    function rt() {
        var t = this.video.currentTime, e = this.dialogues;
        it.call(this), this._.index = function () {
            for (var s = 0, i = e.length - 1; s + 1 < i && t > e[i + s >> 1].end;) s = i + s >> 1;
            if (!s) return 0;
            for (var r = s; r < i; r++) if (e[r].end > t && t >= e[r].start || r && e[r - 1].end < t && t < e[r].start) return r;
            return i
        }(), tt.call(this)
    }

    function at() {
        var t = this._.listener;
        t.play = et.bind(this), t.pause = st.bind(this), t.seeking = rt.bind(this), this.video.addEventListener("play", t.play), this.video.addEventListener("pause", t.pause), this.video.addEventListener("seeking", t.seeking)
    }

    function nt() {
        var t = this._.listener;
        this.video.removeEventListener("play", t.play), this.video.removeEventListener("pause", t.pause), this.video.removeEventListener("seeking", t.seeking), t.play = null, t.pause = null, t.seeking = null
    }

    function ot() {
        var t = this.video.clientWidth, e = this.video.clientHeight, s = this.video.videoWidth || t,
            i = this.video.videoHeight || e, r = this._.scriptRes.width, a = this._.scriptRes.height, n = r, o = a,
            l = Math.min(t / s, e / i);
        "video_width" === this.resampling && (o = r / s * i), "video_height" === this.resampling && (n = a / i * s), this.scale = Math.min(t / n, e / o), "script_width" === this.resampling && (this.scale = l * (s / n)), "script_height" === this.resampling && (this.scale = l * (i / o)), this.width = this.scale * n, this.height = this.scale * o, this._.resampledRes = {
            width: n,
            height: o
        }, this.container.style.cssText = "width:" + t + "px;height:" + e + "px;";
        var h = "width:" + this.width + "px;height:" + this.height + "px;top:" + (e - this.height) / 2 + "px;left:" + (t - this.width) / 2 + "px;";
        return this._.$stage.style.cssText = h, this._.$svg.style.cssText = h, this._.$svg.setAttributeNS(null, "viewBox", "0 0 " + r + " " + a), this._.$animation.innerHTML = U.call(this), rt.call(this), this
    }

    W.prototype.set = function (t, e, s) {
        this.obj[t] || (this.obj[t] = {}), this.obj[t][e] = s
    }, W.prototype.setT = function (t) {
        var e = t.t1, s = t.t2, i = t.duration, r = t.prop, a = t.from, n = t.to;
        this.set("0.000%", r, a), e < i && this.set((e / i * 100).toFixed(3) + "%", r, a), s < i && this.set((s / i * 100).toFixed(3) + "%", r, n), this.set("100.000%", r, n)
    }, W.prototype.toString = function () {
        var t = this;
        return Object.keys(this.obj).map((function (e) {
            return e + "{" + Object.keys(t.obj[e]).map((function (s) {
                return "" + (A[s] || "") + s + ":" + t.obj[e][s] + ";"
            })).join("") + "}"
        })).join("")
    };

    function lt(t, e, s) {
        if (void 0 === s && (s = {}), this.scale = 1, this._ = {
            index: 0,
            stagings: [],
            space: [],
            listener: {},
            $svg: N("svg"),
            $defs: N("defs"),
            $stage: document.createElement("div"),
            $animation: document.createElement("style")
        }, this._.$svg.appendChild(this._.$defs), this._.$stage.className = "ASS-stage ASS-animation-paused", this._.resampling = s.resampling || "video_height", this.container = s.container || document.createElement("div"), this.container.classList.add("ASS-container"), this.container.appendChild(H), this.container.appendChild(this._.$svg), this._.hasInitContainer = !!s.container, this.video = e, at.call(this), !this._.hasInitContainer) {
            var i = !e.paused;
            e.parentNode.insertBefore(this.container, e), this.container.appendChild(e), i && e.paused && e.play()
        }
        this.container.appendChild(this._.$stage);
        var r = k(t), a = r.info, n = r.width, o = r.height, l = r.dialogues;
        this.info = a, this._.scriptRes = {width: n || e.videoWidth, height: o || e.videoHeight}, this.dialogues = l;
        var h = z(this.container), c = h.querySelector("#ASS-global-style");
        return c || ((c = document.createElement("style")).type = "text/css", c.id = "ASS-global-style", c.appendChild(document.createTextNode(".ASS-container,.ASS-stage{position:relative;overflow:hidden}.ASS-container video{position:absolute;top:0;left:0}.ASS-stage{pointer-events:none;position:absolute}.ASS-dialogue{font-size:0;position:absolute}.ASS-fix-font-size{position:absolute;visibility:hidden}.ASS-fix-objectBoundingBox{width:100%;height:100%;position:absolute;top:0;left:0}.ASS-animation-paused *{-webkit-animation-play-state:paused!important;animation-play-state:paused!important}")), h.appendChild(c)), this._.$animation.type = "text/css", this._.$animation.className = "ASS-animation", h.appendChild(this._.$animation), ot.call(this), this.video.paused || (rt.call(this), et.call(this)), this
    }

    function ht() {
        return this._.$stage.style.visibility = "visible", this
    }

    function ct() {
        return this._.$stage.style.visibility = "hidden", this
    }

    function dt() {
        st.call(this), it.call(this), nt.call(this, this._.listener);
        var t = z(this.container);
        if (!this._.hasInitContainer) {
            var e = !this.video.paused;
            this.container.parentNode.insertBefore(this.video, this.container), this.container.parentNode.removeChild(this.container), e && this.video.paused && this.video.play()
        }
        for (var s in t.removeChild(this._.$animation), this) Object.prototype.hasOwnProperty.call(this, s) && (this[s] = null);
        return this
    }

    var ut = /^(video|script)_(width|height)$/;

    function mt() {
        return ut.test(this._.resampling) ? this._.resampling : "video_height"
    }

    function pt(t) {
        return t === this._.resampling ? t : (ut.test(t) && (this._.resampling = t, this.resize()), this._.resampling)
    }

    var ft = function (t, e, s) {
        return "string" != typeof t ? this : lt.call(this, t, e, s)
    }, gt = {resampling: {configurable: !0}};
    ft.prototype.resize = function () {
        return ot.call(this)
    }, ft.prototype.show = function () {
        return ht.call(this)
    }, ft.prototype.hide = function () {
        return ct.call(this)
    }, ft.prototype.destroy = function () {
        return dt.call(this)
    }, gt.resampling.get = function () {
        return mt.call(this)
    }, gt.resampling.set = function (t) {
        return pt.call(this, t)
    }, Object.defineProperties(ft.prototype, gt), e.default = ft
}, function (t, e, s) {
    "use strict";
    s.r(e);
    s(1);

    function i(t, e) {
        return {x: e.clientX - t.getBoundingClientRect().x, y: e.clientY - t.getBoundingClientRect().y}
    }

    function r(t) {
        console.error(`${this._.name} | ${t}`)
    }

    function a(t) {
        let e = (t = Math.floor(t)) % 60, s = Math.floor(t / 60) % 60, i = Math.floor(t / 3600);
        return s = s.toString().padStart(2, "0"), e = e.toString().padStart(2, "0"), i > 0 ? `${i}:${s}:${e}` : `${s}:${e}`
    }

    function n(t, e = {}, s = (() => {
    })) {
        var i = document.createElement(t);
        for (var r in e) i.setAttribute(r, e[r]);
        return s(i), i
    }

    function o(t) {
        return new Promise(e => {
            setTimeout(() => {
                e()
            }, t)
        })
    }

    function l(t = !1) {
        t && this.muted ? this.muted = !1 : this.muted = !0
    }

    function h(t = null) {
        const e = t || this;
        return new Promise(t => {
            const s = e._.form.video, i = e._.form.audio, r = e.playbackRate, a = s.currentTime - i.currentTime;
            if (i.playbackRate = r, s.mjs_setRate(r), s.syncTimeout && clearTimeout(s.syncTimeout), s.syncTimeout = null, e._.playing && Math.abs(a) > 1 / 60) {
                0;
                let e = r - a;
                .25 <= e && e <= 4 ? document.hasFocus() ? (s.mjs_setRate(e), s.syncTimeout = setTimeout(() => {
                    s.mjs_setRate(r), s.syncTimeout = null
                }, 1e3), setTimeout(() => {
                    t()
                }, 1050)) : t() : (s.mjs_setTime(i.currentTime), t())
            } else t()
        })
    }

    function c() {
        const t = [3, 4], e = this._.form.video, s = this._.form.audio;
        this._.playing && (t.includes(e.readyState) && t.includes(s.readyState) ? (s.mjs_play(), e.mjs_play()) : (!t.includes(e.readyState) && document.hasFocus() && s.mjs_pause(), t.includes(s.readyState) || e.mjs_pause()))
    }

    function d(t) {
        t ? (this._.form.video.mjs_play(), this._.form.audio.mjs_play(), this._.form.buttons.play.setAttribute("icon", "pauseBtn")) : (this._.form.video.mjs_pause(), this._.form.audio.mjs_pause(), this._.form.buttons.play.setAttribute("icon", "playBtn")), this._.playing = t
    }

    function u() {
        d.call(this, !0)
    }

    function m() {
        d.call(this, !1)
    }

    function p(t) {
        (t += this.currentTime) < 0 && (t = 0), this._.form.audio.currentTime = t, this._.form.video.mjs_setTime(t)
    }

    function f(t, e = !1) {
        this._.form.audio.currentTime = t, e || this._.form.video.mjs_setTime(t)
    }

    function g(t) {
        t < .25 && (t = .25), t > 2 && (t = 2), this._.playbackRate = t, h.call(this)
    }

    let v;

    function _(t) {
        const e = this.currentTime, s = this.playbackRate;
        this._.form.video.mjs_pause(), this._.form.video.src = t, this._.form.video.mjs_setTime(e), this._.form.video.mjs_setRate(s), this._.playing && this._.form.video.mjs_play()
    }

    function y(t) {
        const e = this.currentTime, s = this.playbackRate;
        this._.form.audio.mjs_pause(), this._.form.audio.src = t, this._.form.audio.currentTime = e, this._.form.audio.playbackRate = s, this._.playing && this._.form.audio.mjs_play()
    }

    function b(t) {
        clearTimeout(this._.subtitlesDownloader), void 0 !== this._.ass && (this._.ass.destroy(), this._.ass = void 0), t && (this._.subtitlesDownloader = setTimeout(() => {
            let e = new XMLHttpRequest;
            if (e.open("GET", t, !1), e.send(), 200 === e.status) try {
                this._.ass = new v(e.responseText, this._.form.video, {container: this._.form.subtitles}), this.resize()
            } catch (t) {
                r.call(this, "Can't use ASS library")
            }
        }))
    }

    document.addEventListener("DOMContentLoaded", (function () {
        v = s(5).default
    }));

    class x {
        constructor(t = null) {
            this.Name = t, this.Buttons = [], this.Content = n("div")
        }

        appendButton(t, e) {
            let s = n("div", {class: "mjs__settings_element"});
            s.innerText = t, s.onclick = () => {
                e()
            }, this.Buttons.push(s), this.Content.appendChild(s)
        }
    }

    class w {
        constructor(t = null) {
            this.Name = t, this.Buttons = [], this.Content = n("div")
        }

        appendButton(t, e, s) {
            let i = n("div", {class: "mjs__settings_element"});
            i.innerText = t, i.onclick = t => {
                for (let t of this.Buttons) t.removeAttribute("selected");
                i.setAttribute("selected", "true"), e()
            }, this.Buttons.push(i), this.Content.appendChild(i)
        }
    }

    class j {
        constructor(t) {
            this.Name = t, this.Content = n("div")
        }
    }

    function C() {
        this._.form.settings.opened ? this._.rootElement.classList.remove("mjs__settings_show") : (S.call(this), this._.rootElement.classList.add("mjs__settings_show")), this._.form.settings.opened = !this._.form.settings.opened
    }

    function S() {
        this._.form.settings.title.innerText = "Настройки", this._.form.settings.header.setAttribute("showIcon", null);
        for (let t in this._.form.settings.menu) t = this._.form.settings.menu[t], t.Content.setAttribute("style", "display: none");
        this._.form.settings.menuSwitcher.Content.removeAttribute("style")
    }

    function k() {
        this._.form.settings = {}, this._.form.settings.opened = !1, this._.form.settings.menu = {}, this._.form.settings.menu.quality = new w("Качество"), this._.form.settings.menu.dubs = new w("Озвучки"), this._.form.settings.menu.subtitles = new w("Субтитры"), this._.form.settings.menu.playbackRate = new w("Скорость воспроизведения"), this._.form.settings.menu.info = new j("Информация о плеере"), this._.form.settings.menu.info.Content = n("div", {blockName: "info"}, t => {
            let e = n("div", {style: "display: flex; padding-bottom: 12px"}, t => {
                const e = n("img", {
                    src: "https://avatars2.githubusercontent.com/u/26777464?s=96",
                    width: 48,
                    height: 48
                });
                t.appendChild(e);
                const s = n("div", {style: "line-height: 20px; padding: 4px 8px"}, t => {
                    t.innerHTML += 'Исходный код плеера:<br><a href="https://github.com/Ponywka/Multitrack.JS" style="color: #ffccff">Ponywka/Multitrack.JS</a>'
                });
                t.appendChild(s)
            });
            t.appendChild(e), t.innerHTML += "Build date: " + new Date(1627587276376).toString()
        }), this._.form.settings.title = n("div", {style: "mjs__settingsHeader-title"}), this._.form.settings.header = n("div", {class: "mjs__settingsHeader"}, t => {
            t.addEventListener("click", () => {
                S.call(this)
            })
        }), this._.form.settings.menuSwitcher = new x, this._.form.settings._root = n("div", {class: "mjs__settings"});
        for (let t of this._.videos) this._.form.settings.menu.quality.appendButton(t.name, () => {
            _.call(this, t.path)
        });
        let t = 0;
        if (this._.preferredVideoName) {
            const e = this._.videos.findIndex(t => t.name === this._.preferredVideoName);
            -1 !== e && (t = e)
        }
        this._.form.settings.menu.quality.Buttons[t].click();
        for (let t of this._.audios) this._.form.settings.menu.dubs.appendButton(t.name, () => {
            y.call(this, t.path)
        });
        this._.form.settings.menu.dubs.Buttons[0].click(), this._.form.settings.menu.subtitles.appendButton("Без субтитров", () => {
            b.call(this)
        }), this._.form.settings.menu.subtitles.Buttons[0].click();
        for (let t of this._.subtitles) this._.form.settings.menu.subtitles.appendButton(t.name, () => {
            b.call(this, t.path)
        });
        for (let t of [.5, 1, 1.5, 2]) this._.form.settings.menu.playbackRate.appendButton(t + "x", () => {
            g.call(this, t)
        });
        this._.form.settings.menu.playbackRate.Buttons[1].click();
        for (let t in this._.form.settings.menu) t = this._.form.settings.menu[t], this._.form.settings.menuSwitcher.appendButton(t.Name, () => {
            S.call(this), this._.form.settings.header.setAttribute("showIcon", "true"), this._.form.settings.title.innerText = t.Name, t.Content.removeAttribute("style"), this._.form.settings.menuSwitcher.Content.setAttribute("style", "display: none;")
        });
        this._.form.settings.body = n("div", {class: "mjs__settingsBody"}), this._.form.settings.body.appendChild(this._.form.settings.menuSwitcher.Content);
        for (let t in this._.form.settings.menu) t = this._.form.settings.menu[t], this._.form.settings.body.appendChild(t.Content);
        S.call(this), this._.form.settings.header.appendChild(this._.form.settings.title), this._.form.settings._root.appendChild(this._.form.settings.header), this._.form.settings._root.appendChild(this._.form.settings.body)
    }

    function E() {
        if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement) document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.webkitsExitFullscreen ? document.webkitExitFullscreen() : document.msExitFullscreen && document.msExitFullscreen(), this._.form.buttons.fullscreen.setAttribute("icon", "fullscreenOn"); else {
            var t = this._.element;
            t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : t.msRequestFullscreen ? t.msRequestFullscreen() : (t = this._.form.video).webkitEnterFullscreen && t.webkitEnterFullscreen(), this._.form.buttons.fullscreen.setAttribute("icon", "fullscreenOff")
        }
    }

    function B() {
        this._.form.buttons = {
            play: n("button", {icon: "playBtn", class: "mjs__overlay-button"}, t => {
                t.onclick = () => {
                    this._.playing ? this.pause() : this.play()
                }
            }), backward10: n("button", {icon: "backward10", class: "mjs__overlay-button"}, t => {
                t.onclick = () => {
                    p.call(this, -10)
                }
            }), forward10: n("button", {icon: "forward10", class: "mjs__overlay-button"}, t => {
                t.onclick = () => {
                    p.call(this, 10)
                }
            }), fullscreen: n("button", {icon: "fullscreenOn", class: "mjs__overlay-button"}, t => {
                t.onclick = t => {
                    E.call(this)
                }
            }), pip: n("button", {icon: "pipOn", class: "mjs__overlay-button"}, t => {
                t.onclick = e => {
                    "pictureInPictureEnabled" in document ? this._.form.video !== document.pictureInPictureElement ? (this._.form.video.requestPictureInPicture(), t.setAttribute("icon", "pipOff")) : (document.exitPictureInPicture(), t.setAttribute("icon", "pipOn")) : r.call(this, "Sorry, your browser is not support picture-in-picture")
                }
            }), menu: n("button", {icon: "menu", class: "mjs__overlay-button"}, t => {
                t.addEventListener("click", () => {
                    C.call(this)
                })
            })
        }
    }

    function T() {
        document.addEventListener("keydown", t => {
            switch (t.code) {
                case"Space":
                    t.preventDefault();
                case"KeyK":
                    this._.playing ? this.pause() : this.play();
                    break;
                case"ArrowLeft":
                    t.preventDefault(), p.call(this, -5);
                    break;
                case"ArrowRight":
                    t.preventDefault(), p.call(this, 5);
                    break;
                case"KeyJ":
                    p.call(this, -10);
                    break;
                case"KeyL":
                    p.call(this, 10);
                    break;
                case"KeyM":
                    l.call(this, !0);
                    break;
                case"ArrowUp":
                    t.preventDefault(), this.volume += .05;
                    break;
                case"ArrowDown":
                    t.preventDefault(), this.volume -= .05;
                    break;
                case"KeyF":
                    E.call(this);
                    break;
                case"Digit0":
                case"Numpad0":
                    this.currentTime = 0 * this.duration;
                    break;
                case"Digit1":
                case"Numpad1":
                    this.currentTime = .1 * this.duration;
                    break;
                case"Digit2":
                case"Numpad2":
                    this.currentTime = .2 * this.duration;
                    break;
                case"Digit3":
                case"Numpad3":
                    this.currentTime = .3 * this.duration;
                    break;
                case"Digit4":
                case"Numpad4":
                    this.currentTime = .4 * this.duration;
                    break;
                case"Digit5":
                case"Numpad5":
                    this.currentTime = .5 * this.duration;
                    break;
                case"Digit6":
                case"Numpad6":
                    this.currentTime = .6 * this.duration;
                    break;
                case"Digit7":
                case"Numpad7":
                    this.currentTime = .7 * this.duration;
                    break;
                case"Digit8":
                case"Numpad8":
                    this.currentTime = .8 * this.duration;
                    break;
                case"Digit9":
                case"Numpad9":
                    this.currentTime = .9 * this.duration;
                    break;
                case"Comma":
                    this._.playing || p.call(this, -1 / 24);
                    break;
                case"Period":
                    this._.playing || p.call(this, 1 / 24);
                    break;
                default:
                    0
            }
        })
    }

    function M() {
        this._.moveEvents = [], document.addEventListener("mousemove", t => {
            for (let e of this._.moveEvents) e.move(t)
        }), document.addEventListener("mouseup", t => {
            for (let e of this._.moveEvents) e.release(t);
            this._.moveEvents = []
        }), document.addEventListener("touchmove", t => {
            for (let e of this._.moveEvents) e.move(t.touches[0])
        }, !1), document.addEventListener("touchend", t => {
            for (let e of this._.moveEvents) e.release(t.changedTouches[0]);
            this._.moveEvents = []
        }, !1), this._.form.overlays._root.addEventListener("dblclick", t => {
            t.target === this._.form.overlays._root && E.call(this)
        }, !1), this._.element.addEventListener("contextmenu", t => (t.preventDefault(), C.call(this), !1), !1)
    }

    function N() {
        this._.form.video = n("video", {playsinline: "", preload: "metadata"}, t => {
            t._onplaying = () => {
                d.call(this, !0)
            }, t.onplaying = t._onplaying, t.mjs_play = () => {
                t.onplaying = null, t.play().then(() => {
                    t.onplaying = t._onplaying
                }).catch(e => {
                    t.onplaying = t._onplaying, d.call(this, !1)
                })
            }, t._onpause = () => {
                (t === document.pictureInPictureElement || document.hasFocus()) && d.call(this, !1)
            }, t.onpause = t._onpause, t.mjs_pause = () => {
                t.onpause = null, t.pause(), setTimeout(() => {
                    t.onpause = t._onpause
                }, 16)
            }, t._onseeking = t => {
                f.call(this, t.target.currentTime, !0)
            }, t.onseeking = t._onseeking, t.mjs_setTime = e => {
                t.onseeking = null, t.currentTime = e, setTimeout(() => {
                    t.onseeking = t._onseeking
                }, 16)
            }, t._onratechange = () => {
                g.call(this, t.playbackRate)
            }, t.onratechange = t._onratechange, t.mjs_setRate = e => {
                t.onratechange = null, t.playbackRate = e, setTimeout(() => {
                    t.onratechange = t._onratechange
                }, 16)
            }, t.onwaiting = () => {
                c.call(this)
            }, t.oncanplay = () => {
                c.call(this)
            }, t.onprogress = () => {
                var e = this._.form.progressbar.loaded, s = this._.form.progressbar.loaded._canvas;
                e.width = e.clientWidth, s.fillStyle = "white", s.clearRect(0, 0, e.width, 1);
                for (let a = 0; a < t.buffered.length; a++) {
                    var i = t.buffered.start(a) * e.width / this.duration,
                        r = t.buffered.end(a) * e.width / this.duration - i;
                    s.fillRect(Math.floor(i), 0, Math.floor(r), 1)
                }
            }
        })
    }

    function L() {
        this._.form.audio = n("audio", {}, t => {
            t._onplaying = () => {
                d.call(this, !0)
            }, t.onplaying = t._onplaying, t.mjs_play = () => {
                t.onplaying = null, t.play().then(() => {
                    t.onplaying = t._onplaying
                })
            }, t._onpause = () => {
                d.call(this, !1)
            }, t.onpause = t._onpause, t.mjs_pause = () => {
                t.onpause = null, t.pause(), setTimeout(() => {
                    t.onpause = t._onpause
                }, 16)
            }, t.onwaiting = () => {
                c.call(this)
            }, t.oncanplay = () => {
                c.call(this)
            }, t.onloadedmetadata = () => {
                this._.form.time.innerText = `${a(t.currentTime)} / ${a(this.duration)}`
            }, t.ontimeupdate = () => {
                this._.form.progressbar.updateStyle || this._.form.progressbar.played.setAttribute("style", `width: ${100 * t.currentTime / this.duration}%`), this._.form.time.innerText = `${a.call(this, t.currentTime)} / ${a.call(this, this.duration)}`
            }
        })
    }

    function A() {
        this._.form.buttons.volume = n("button", {class: "mjs__overlay-button", icon: "volume", iconVar: 3}, t => {
            t.addEventListener("click", () => {
                l.call(this, !0)
            })
        }), this._.form.volumebar = {
            line: n("div", {class: "mjs__overlay-volumeBar-background"}),
            selected: n("div", {class: "mjs__overlay-volumeBar-selected"}),
            _root: n("div", {class: "mjs__overlay-volumeBar"}, t => {
                let e = e => {
                    this._.form.volumebar.updateStyle = !1;
                    i(t, e).x;
                    var s = i(t, e).x / t.clientWidth;
                    this.volume = s
                }, s = e => {
                    if (this._.form.volumebar.updateStyle) {
                        var s = i(t, e).x / t.clientWidth;
                        this.volume = s
                    }
                };
                t.addEventListener("mousedown", () => {
                    this._.form.volumebar.updateStyle = !0, this._.form.audio.lastVolume = this._.form.audio.volume, Object(this._.moveEvents).push({
                        move: s,
                        release: e
                    })
                }), t.addEventListener("touchstart", () => {
                    this._.form.volumebar.updateStyle = !0, this._.form.audio.lastVolume = this._.form.audio.volume, Object(this._.moveEvents).push({
                        move: s,
                        release: e
                    })
                })
            })
        }, this._.form.volumebar._root.appendChild(this._.form.volumebar.line), this._.form.volumebar._root.appendChild(this._.form.volumebar.selected)
    }

    function z() {
        this._.form.progressbar = {
            line: n("div", {class: "mjs__overlay-progressBar-background"}),
            loaded: n("canvas", {class: "mjs__overlay-progressBar-loaded", height: 1}, t => {
                t._canvas = t.getContext("2d")
            }),
            played: n("div", {class: "mjs__overlay-progressBar-played"}),
            popup: n("div", {class: "mjs__overlay-progressPopup"}, t => {
                t.text = n("div", {class: "mjs__overlay-progressPopup-time"}), t.image = n("div", {class: "mjs__overlay-progressPopup-image"})
            }),
            _root: n("div", {class: "mjs__overlay-progressBar"}, t => {
                let e = (e, s) => {
                    if (this._.form.progressbar.popup.text.innerText = a(this.duration * s), this._.form.progressbar.popup.classList.add("mjs__overlay-progressPopup-show"), 0 != this._.form.progressbar.popup.clientWidth && (this._.form.progressbar.popup.halfWidth = this._.form.progressbar.popup.clientWidth / 2), e < this._.form.progressbar.popup.halfWidth ? this._.form.progressbar.popup.setAttribute("style", "left: 0px") : e < t.clientWidth - this._.form.progressbar.popup.halfWidth ? this._.form.progressbar.popup.setAttribute("style", `left: ${e - this._.form.progressbar.popup.halfWidth}px`) : this._.form.progressbar.popup.setAttribute("style", `left: ${t.clientWidth - 2 * this._.form.progressbar.popup.halfWidth}px`), this._.parameters.frames.image) {
                        var i = this._.parameters.frames.x * this._.parameters.frames.y, r = Math.floor(s * i);
                        r >= i && (r = i - 1);
                        var n = r % this._.parameters.frames.x / (this._.parameters.frames.x - 1),
                            o = Math.floor(r / this._.parameters.frames.x) / (this._.parameters.frames.y - 1);
                        this._.form.progressbar.popup.image.setAttribute("style", `\n                            background-position: ${100 * n}% ${100 * o}%;\n                            background-size: ${100 * this._.parameters.frames.x}%;\n                            background-image: url(${this._.parameters.frames.image})`)
                    } else this._.form.progressbar.popup.image.setAttribute("style", "display: none")
                }, s = s => {
                    var r = i(t, s), a = r.x / t.clientWidth;
                    a < 0 && (a = 0), a > 1 && (a = 1), this._.form.progressbar.updateStyle && this._.form.progressbar.played.setAttribute("style", `width: ${100 * a}%`), e(r.x, a)
                }, r = e => {
                    this._.form.progressbar.updateStyle = !1, this._.form.progressbar.popup.classList.remove("mjs__overlay-progressPopup-show"), this.currentTime = this.duration * i(t, e).x / t.clientWidth
                };
                t.addEventListener("mousedown", t => {
                    this._.form.progressbar.updateStyle = !0, Object(this._.moveEvents).push({move: s, release: r})
                }), t.addEventListener("touchstart", t => {
                    this._.form.progressbar.updateStyle = !0, Object(this._.moveEvents).push({move: s, release: r})
                }), t.addEventListener("mousemove", s => {
                    var r = i(t, s), a = r.x / t.clientWidth;
                    a < 0 && (a = 0), a > 1 && (a = 1), this._.form.progressbar.updateStyle || r.y > 0 ? e(r.x, a) : this._.form.progressbar.popup.classList.remove("mjs__overlay-progressPopup-show")
                }), t.addEventListener("mouseout", t => {
                    this._.form.progressbar.popup.classList.remove("mjs__overlay-progressPopup-show")
                })
            })
        }, this._.form.progressbar.popup.appendChild(this._.form.progressbar.popup.image), this._.form.progressbar.popup.appendChild(this._.form.progressbar.popup.text), this._.form.progressbar._root.appendChild(this._.form.progressbar.popup), this._.form.progressbar._root.appendChild(this._.form.progressbar.line), this._.form.progressbar._root.appendChild(this._.form.progressbar.loaded), this._.form.progressbar._root.appendChild(this._.form.progressbar.played)
    }

    function $() {
        let t;

        function e() {
            this._.rootElement.classList.remove("mjs__overlay_hidden"), clearTimeout(t), t = setTimeout(() => {
                this._.rootElement.classList.add("mjs__overlay_hidden")
            }, 3e3)
        }

        this._.element.addEventListener("mousemove", () => {
            e.call(this)
        }), this._.element.addEventListener("touchmove", () => {
            e.call(this)
        }), this._.element.addEventListener("mouseout", () => {
            this._.form.overlays._root;
            clearTimeout(t), this._.rootElement.classList.add("mjs__overlay_hidden")
        }), this._.form.overlays = {
            _root: n("div", {class: "mjs__overlay"}, t => {
            }), bottom: n("div", {class: "mjs__overlay-bottom"}), top: n("div", {class: "mjs__overlay-top"})
        }, this._.form.overlays.top.appendChild(this._.form.title), this._.form.overlays.bottom.appendChild(this._.form.buttons.play), this._.form.overlays.bottom.appendChild(this._.form.buttons.backward10), this._.form.overlays.bottom.appendChild(this._.form.buttons.forward10), this._.form.overlays.bottom.appendChild(this._.form.buttons.volume), this._.form.overlays.bottom.appendChild(this._.form.volumebar._root), this._.form.overlays.bottom.appendChild(this._.form.time), this._.form.overlays.bottom.appendChild(n("div", {style: "flex: auto"})), "pictureInPictureEnabled" in document && this._.form.overlays.bottom.appendChild(this._.form.buttons.pip), this._.form.overlays.bottom.appendChild(this._.form.buttons.menu), this._.form.overlays.bottom.appendChild(this._.form.buttons.fullscreen), this._.form.overlays._root.appendChild(this._.form.overlays.top), this._.form.overlays._root.appendChild(this._.form.overlays.bottom), this._.form.overlays._root.appendChild(this._.form.progressbar._root), this._.form.overlays._root.addEventListener("click", t => {
            t.target == this._.form.overlays._root && (this._.playing ? this.pause() : this.play())
        })
    }

    function R() {
        this._.rootElement.classList.add("mjs"), this._.element = n("div", {class: "mjs__root"}), this._.form = {}, N.call(this), L.call(this), this._.form.subtitles = n("div", {class: "mjs__subtitles"}), this._.form.time = n("div", {class: "mjs__overlay-time"}), this._.form.time.innerText = "--:-- / --:--", this._.form.title = n("div", {class: "mjs__overlay-title"}), B.call(this), z.call(this), A.call(this), k.call(this), $.call(this), this._.element.appendChild(this._.form.video), this._.element.appendChild(this._.form.audio), this._.element.appendChild(this._.form.subtitles), this._.element.appendChild(this._.form.overlays._root), this._.element.appendChild(this._.form.settings._root), M.call(this), T.call(this), this._.rootElement.appendChild(this._.element)
    }

    function F(t, e) {
        this._ = {
            name: "Multitrack.JS",
            parameters: {frames: {x: 10, y: 10}},
            subtitlesDownloader: null,
            videos: e.videos,
            audios: e.audios,
            subtitles: e.subtitles,
            preferredVideoName: e.preferredVideoName,
            playbackRate: 1,
            enable_sync: !1
        }, this._.playing = !1, (this._.rootElement = document.querySelector(t)) ? (R.call(this), e.placeholder && (this._.form.video.poster = e.placeholder), e.preview && (this._.parameters.frames.image = e.preview), this._.form.title.innerText = e.title, this.trySync = !0, window.addEventListener("resize", () => {
            this.resize()
        })) : r.call(this, `Can not find "${t}" element!`)
    }

    e.default = class {
        get currentTime() {
            return this._.form.audio.currentTime
        }

        set currentTime(t) {
            f.call(this, t)
        }

        get duration() {
            return this._.form.audio.duration
        }

        get ended() {
            const t = this._.form.video, e = this._.form.audio;
            return t.ended || e.ended
        }

        get paused() {
            return !this._.playing
        }

        get muted() {
            return this._.form.audio.muted
        }

        set muted(t) {
            t = 1 == t;
            const e = this._.form.audio;
            e.muted = t;
            let s = Math.ceil(3 * e.volume);
            t && (s = 0), this._.form.buttons.volume.setAttribute("iconVar", s)
        }

        get playbackRate() {
            return this._.playbackRate
        }

        set playbackRate(t) {
            g.call(this, t)
        }

        get volume() {
            return this._.form.audio.volume
        }

        set volume(t) {
            if ("number" == typeof t) {
                t < 0 && (t = 0), t > 1 && (t = 1);
                const e = this._.form.audio;
                e.volume = t;
                let s = Math.ceil(3 * e.volume);
                e.muted && (s = 0), this._.form.buttons.volume.setAttribute("iconVar", s), this._.form.volumebar.selected.setAttribute("style", `width: ${100 * t}%`)
            }
        }

        get trySync() {
            return this._.enable_sync
        }

        set trySync(t) {
            const e = this;
            1 == t && (t = !0), 0 == t && (t = !1);
            const s = this._.enable_sync;
            this._.enable_sync = t, 1 == t && 1 != s && async function () {
                let t = Date.now() - 1e3;
                for (; e._.enable_sync;) Date.now() - t > 900 ? (e._.playing && await h(e), t = Date.now()) : await o(1e3)
            }()
        }

        constructor(t, e) {
            return F.call(this, t, e), this
        }

        play() {
            u.call(this)
        }

        pause() {
            m.call(this)
        }

        resize() {
            void 0 !== this._.ass && this._.ass.resize()
        }
    }
}]);