import {LogoInfoBlock} from "./utils";

export function mute(undoLast = false) {
    this.muted = !(undoLast && this.muted);

    if (this.muted) {
        LogoInfoBlock.call(this, 0);
    } else {
        LogoInfoBlock.call(this, parseInt((this.volume * 100).toString()));
    }
}
