import {LogoInfoBlock} from "./utils";

export function mute(undoLast = false) {
    this.muted = !(undoLast && this.muted);

    if (this.muted) {
        LogoInfoBlock(0);
    } else {
        LogoInfoBlock(parseInt((this.volume * 100).toString()));
    }
}
