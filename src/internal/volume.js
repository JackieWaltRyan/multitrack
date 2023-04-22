export function mute(undoLast = false) {
    this.muted = !(undoLast && this.muted);
}
