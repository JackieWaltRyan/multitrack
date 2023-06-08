import {createElement, mobileCheck} from "./utils";
import {hotkeys} from "./gui/hotkeys";
import {gestures} from "./gui/gestures";
import {generateMedia} from "./gui/media";
import {generateVolume} from "./gui/volume";
import {generateSettings} from "./gui/settings";
import {generateProgressbar} from "./gui/progressbar";
import {generateButtons, tooltip} from "./gui/buttons";
import {generateMobileOverlay, generateOverlay} from "./gui/overlay";

export function gui() {
    this._.rootElement.classList.add("mt");

    this._.element = createElement("div", {
        class: "mt_root"
    });

    this._.form = {};
    // Генерация элементов GUI
    generateMedia.call(this);

    this._.form.subtitles = createElement("div", {
        class: "mt_subtitles"
    });

    this._.form.time = createElement("div", {
        class: "mt_overlay_time"
    }, (el) => {
        el.onmousemove = (event) => {
            tooltip.call(this, event, true, "Время");
        };

        el.onmouseout = () => {
            tooltip.call(this, false);
        };
    });

    this._.form.time.innerText = "--:-- / --:--";

    this._.form.title = createElement("div", {
        class: "mt_overlay_title"
    });

    this._.form.logo_spiner = createElement("div", {
        class: !mobileCheck() ? "mt_logo_spiner" : "mt_logo_spiner_mobile"
    });

    this._.form.logo_play = createElement("div", {
        class: !mobileCheck() ? "mt_all_logo mt_logo_play" : "mt_all_logo_mobile mt_logo_play"
    });

    this._.form.logo_pause = createElement("div", {
        class: !mobileCheck() ? "mt_all_logo mt_logo_pause" : "mt_all_logo_mobile mt_logo_pause"
    });

    this._.form.logo_info_block = createElement("div", {
        class: !mobileCheck() ? "mt_all_logo mt_logo_info_block" : "mt_all_logo_mobile mt_logo_info_block_mobile"
    });

    this._.form.tooltip = createElement("div", {
        class: "mt_tooltip"
    });

    // Кнопки (массив)
    generateButtons.call(this);
    generateProgressbar.call(this);

    if (!mobileCheck()) {
        generateVolume.call(this);
    }

    generateSettings.call(this);

    if (mobileCheck()) {
        generateMobileOverlay.call(this);
    } else {
        generateOverlay.call(this);
    }

    this._.element.appendChild(this._.form.video);
    this._.element.appendChild(this._.form.audio);
    this._.element.appendChild(this._.form.subtitles);
    this._.element.appendChild(this._.form.overlays._root);
    this._.element.appendChild(this._.form.settings._root);
    this._.element.appendChild(this._.form.logo_spiner);
    this._.element.appendChild(this._.form.logo_play);
    this._.element.appendChild(this._.form.logo_pause);
    this._.element.appendChild(this._.form.logo_info_block);
    this._.element.appendChild(this._.form.tooltip);

    gestures.call(this);

    if (!mobileCheck()) {
        hotkeys.call(this);
    }

    this._.rootElement.appendChild(this._.element);
}
