import {mute} from "../volume";
import {toggleFullscreen} from "./buttons";
import {seek} from "../playback";
import {createElement, LogoInfoBlock} from "../utils";

export function hotkeys() {
    document.addEventListener("keydown", (event) => {
        switch (event.code) {
            case "Space":
                event.preventDefault();
            case "KeyK":
                this._.playing ? this.pause() : this.play();
                break;
            case "ArrowLeft":
                event.preventDefault();
                seek.call(this, -5);
                break;
            case "ArrowRight":
                event.preventDefault();
                seek.call(this, 5);
                break;
            case "KeyJ":
                seek.call(this, -10);
                break;
            case "KeyL":
                seek.call(this, 10);
                break;
            case "KeyM":
                mute.call(this, true);
                break;
            case "ArrowUp":
                event.preventDefault();
                this.volume += 0.05;
                LogoInfoBlock.call(this, parseInt((this.volume * 100).toString()));
                break;
            case "ArrowDown":
                event.preventDefault();
                this.volume -= 0.05;
                LogoInfoBlock.call(this, parseInt((this.volume * 100).toString()));
                break;
            case "KeyF":
                toggleFullscreen.call(this);
                break;
            case "Digit0":
            case "Numpad0":
                this.currentTime = 0;
                break;
            case "Digit1":
            case "Numpad1":
                this.currentTime = this.duration * 0.1;
                break;
            case "Digit2":
            case "Numpad2":
                this.currentTime = this.duration * 0.2;
                break;
            case "Digit3":
            case "Numpad3":
                this.currentTime = this.duration * 0.3;
                break;
            case "Digit4":
            case "Numpad4":
                this.currentTime = this.duration * 0.4;
                break;
            case "Digit5":
            case "Numpad5":
                this.currentTime = this.duration * 0.5;
                break;
            case "Digit6":
            case "Numpad6":
                this.currentTime = this.duration * 0.6;
                break;
            case "Digit7":
            case "Numpad7":
                this.currentTime = this.duration * 0.7;
                break;
            case "Digit8":
            case "Numpad8":
                this.currentTime = this.duration * 0.8;
                break;
            case "Digit9":
            case "Numpad9":
                this.currentTime = this.duration * 0.9;
                break;
            case "Comma":
                if (!this._.playing) {
                    seek.call(this, -(1 / 30));
                }
                break;
            case "Period":
                if (!this._.playing) {
                    seek.call(this, (1 / 30));
                }
                break;
            default:
                if (process.env.NODE_ENV !== "production") {
                    console.log("Key pressed: " + event.code);
                }
                break;
        }
    });
}

export function settings_hotkeys(el) {
    let size = 32;

    let Space_KeyK = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAxxJREFUWIXFl01oVUcUx39nZu7Ll1arDUhQUWtRGqSbtnTZooIWuzH4gXYhrYiYPEkDscFsngUJoiTBr6hVSGlFiaKLgOhS8IMiBkWUqkFFFw1NU23I97tzx0USX3zEvHmieQfO4t753/M//M+ZOXMFYNbp+19g3Twm07Q86Vi/6IbMaX7QgLjKSSVPWb0s/PVhD1CUowR6TWxI5YocoMjEkiqH/GBiScltAkGYWQEHD4nUWlHRN0D9RFgRKiKrropEZxE+zhRbGSt4+KVrtbNvBYO2aSJcEMmhKzVzD12rnX3LWLnuFVtbrxJYgGL6oi477U2YO/1TXTXAsl+eLYkiKfMJbIxHAoJLfTA+vgcla69XlfR/nfhnigqTLQoKvBLQoY8CKcx4eHFsu1BX8hdA4VDY5JDFPuTgqYCbUAF3onVPye8A3+3o+BHrvvcl904ASWHS8PfCKW47QNnPf5dGlv1j1fJLIMsSvMI7BpRmw/lESd+mxOP83hfqpILCrNjBbxekBPgUbTtH3kn8VH3xbYCB/4oOasdn2ZKDbwlGFbgLplgATv1xuPg4wJYtLuiz/y4f0yZZmTKhIqPbsbtAtzutto4+HzsmSRPKT15xxnGlrZDRw2Gy0lIilVTrTh6Y2R2Pu7zNm5+vBmg++tE5beWiV6w0z6oEiYSEQBvAYPeLfVr4Yeum521Hmj98koeOW+vugMvPsgRCJtdpA6t8Y/eqwEq5CaVQh7IP4PCJae1B6Pb6xBvrXsMoZlPkVeu75pjI/WasyMh62fYN/38LEAxOrzNWHnkOOIwVvx6QaFQBJ0RBi7YyIw3TGF/p8hrOSL+yUplND3iVIDY0TJ9YQ2BC+Sp9PUjKJ/kFPdUADS0ftOpQtb7TEmj3+lE87l3Ays6asoEFACqpK4yVXq8S+ICCUDQAnRPiC2KDthFgT2vB0yBS531iy64V/T5nWLtTdo1YtRQZ7vo3m6tyzl0WUS2Q+Uomu5cPvOUh+m7M8yB6nwl4jeP3mIC20ksuf82M5ShIVS7YRVyTABz50n0eYedPLrt+tO1PufkSIp3XHOz6ePoAAAAASUVORK5CYII=",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Воспроизведение / Пауза";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Space_KeyK);

    let KeyF = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAdZJREFUWIXFlz1rFUEUhp93Z/YiBGMpCrcwWqRXtLTJBf9BsBBE0DRaiLUgpLExhYIK6Wwkv8AiXbBUwS4iKoogiCBILgR3Z47Fbq7VTU5gc3fqd+Y8nPd87Arg1MvtC5Y5wwyPCr78uLr4RsMXH9Yw7s4y+OQYj3Ru/eMOMNcLAIzj4G/RV3CAuTioih7jQxxU6hegrJ0ZMDYt1zeLEP7sJ8spzauI64iRCyAmXwbM2Ni6v/DVIf19efX7K2Q+gOAEAGWA0YNvp5N0bTqo5pVZAd+77gzsqZQ0jCoeui55AELtBDBrLtQl1iSjGwB/DTS6Eshu2zoEgCYDVBCd/voAnBaYmnY9lrWbM5+nK1WCDd0A3i5oS4CNtZPvgbP7aZdv/3wscccF4LZgj8BxBpmxudvQOQnVvnf91q9FQ0+m6uA4NRddj3IIC9QSqOJEKLTkDXAggNuCVlZSotTlHPAOorYNyxqwHuaA0dRKrPhfEF0AuNtwYkHXk9BpwaQNK4j9WNDugrpE9LCMUFMEMVGoy10QvJ9kYnn1yu7rVNuNTgH825ARsF10GPywAEdy/F1wVAAhaUx/v2Y7MSaeg+71Et7smQCeXrLzWFqYZeyQwqeVt3r3D1o6lA1jiGoIAAAAAElFTkSuQmCC",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Включить / Отключить полноэкранный режим.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(KeyF);

    el.appendChild(createElement("hr", {
        style: "border-style: inset; border-width: 1px;"
    }));

    let ArrowLeft = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAo5JREFUWIXFlzFoE1EYx//fe69J22dGNYpXURRdRUGwEidFKvRAcCg0IHQo6CDVULCLdRKlGicV3MzgcJNKMnguBqQg1sVBq4hLxWCqtSSXS9p7eQ4paWlsm3hH8oe3HLz7/fg+3nfvCAB2Pf10TFexD20MMXz7MXT4HRlPZu9BY6yd8Ho07tKBx1+KAGRHBABHhJZYp+AAIEVomXWQD4jQMnVWoMv7nwroWYDmAfT7FWBCEVpbzK6G2ZE31/tOCkVvW9+/bnHVUgtsN6LN6auG2387H+HlStRvBYRoXsAuFKrm9A3DPZPISTiVFwD1+RbgXlMC9jZXmS+TNTgPVdPw2Cm/cKCpCmi7e0mZ1go8LHQaigKBby1AsIXn1eESlIGHWFDwmsDGLbBBS6aVNNx4IifLHmUAxIBg58a/TwHBVrxiWknDnZzU7ON8/hYnSAAzPlh7AOxsQA1fyut1z75XwuWDVtJwfcAaEk/kpC7xzwB2r30uROMkpF6PBz6fIyVGJY81vJdGRn6vrwCI6NXiYnHQsmotmJtbuK81TvgR0FobRLSjgTV6caFBYCXZkqoMpFJRJx7PScnDaQ0EdvzqApeH/2wkAADZHioPTKWiTiKek2XdHbgEXRla3EwAgM52iVUJz+tOawQ3iBhXhM0Xi1UrvZlEPCenUlFHiPI5ruj11vuaWzR+vrBFBerJVqVTrwRzZBoBtIMmzGKzAgDBdrukmbTIHR/MRwT1fACw149AaxcSj05HSqVnYxd0z53n2wtC0U+/FxK6edZtvgKrmQXwC/A3G4DWLiRrc8gv2K9AYNnsc9weAa7IQed+zYpCKDwC6FpH8Fo/JAB4cFwfhVb728nmin8dnaH3fwFQn0sSGYXRjQAAAABJRU5ErkJggg==",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Изменить позицию видео на -5 секунд.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(ArrowLeft);

    let ArrowRight = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAApFJREFUWIXFl0FoE0EUhv+3M9m4SVOQtrSGVlHU6lEUROqxQoKIiAQUvBUqCIWmelE8rBdBUC8BFbwpxVMPiUiVnpNFUM9KKQqxtbXWQ5pkbZLZ5yGSSpO2Jrs2D+ayzOP79p/ZGZYAYM+LjyfYwX7sYJGGz98uH3lHA88+PQQjvpPwWjEe0MGns3kAwbYIAAWpl7R2wQEgKPWy1kY+IPUytVfAV/EkgTTA3QANNtuoSUVwM4RDb9M39552/NoxqbSZZvs1oQhuhqxQ39C95ZA1MWCXAnxeKJpppt91AlLRvmCh9CZqrnRaEwO2/4d9Tijt1b/2U/TWAnuxCQCyoOuRabMrFx2b9VMoOMXA2f++B9YHTsli6XXUXOmcThxa49XCRalo2yTowo1FjxKolfVrzReZTlST2OUPTWGLJCg2vuS1AABYupKRyT8SHSI0BVBDCbo09r2RwCKAeTcGzMgc7e4ZN01yYvGsIZQ/CcaZOoEr15Y3CsxTQA0+v99XcCOwsUZHFwJF6ZsFEP77uZT1JyGpJeUlex3W4NSVQtXdBWGh++dGRn5+dQMjQqa/f3d1CWJZw3GMpGAOb5wnZb0AAPQC1OuCbukldds0yYnHsoYd6EhxBcNAPUvKise3IcPSoCKJya5cPJY11vRQSigMbzZ9swRarYyjVaJVOBtK5lI+Z3M40HgPtFaMTFkv1+Aa5VKkaEs44N0SZGyjVIPrKp9iaNvCqwLuE/hSYTuSmOxZjcfYMMqFJHj7N/dOgLB092UVHioWkyCqO+22bL8Tsb24C9IAegAcbrbRq69gqNVGrz/DFgS8PoiaFRCKCmjfr1leSoUnAF1vC575MQHAo5N8HKwO7CRbKDF39T19+A2FRFzlXFFvoQAAAABJRU5ErkJggg==",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Изменить позицию видео на +5 секунд.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(ArrowRight);

    let KeyJ = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAg5JREFUWIXFlz1oFEEUgL83M3dg4vlTBlRQUlgpqBAEiSAIKaKSiIKNrXYqJ4I/SCRc6VWigo2Ywp9CDEG7FPYa7VSCHJLCVsPdRe9m9tnInYTEm8Du7YMtdnf43rdv580wAjD09PMhTdhNH0MMte/n9r6TnU++VFGu9DN5J5S7MvxosQ4M5iIADVdsmbySAwy6YtvkmB9csS35ChR8qhXwIjopiVlOJJkDKfUUcCHVCtTe3to1BzA6vbQgwtGeAjZdgaQDVgndu/8IpFyBLrgtEIF21mcjYD0gvdnZVSCJm9wpC3RZsVznMvoFsdxUu+Bfkg2rn6wjkOkc0IhxLt2VsAv2kQIpL0SdMG2Q/rdh95ML0W2YZheo8R2wFxcnEFMBoalwxihbFWYAu47BYgccZChKIG4OyKfqi9IbgPLZn6OKXFwrO8beA7g22dzhgx+OETDOC70vDlw9Xd8HUFrZUrZBZleNabm2XK4+2zwPoOIvOS8Sw5Ybp+oRzQICHwrSPjb1avsPgOsTzcNGkxFUW1j3uvJy0zeAmxPLRzQx80Axint7vBEl8Dc+BisnK7MDS2u9nDrRGE+UGWBbLFDujK1sRADgN/AY5bkKNcQMiIb9gpxXGNsgC6kc/7VRgVQjs70gXiCj7ThawAZpkN/RrO5c4CFIOZf0qg8E4P6IHkTDnn7mtsF+vfBeFv4ANTO+hZRePxYAAAAASUVORK5CYII=",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Изменить позицию видео на -10 секунд.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(KeyJ);

    let KeyL = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAZVJREFUWIXFlztLA0EUhb+bmURFUbASg6Ag2Nj5wNpCG0sLwT8gVmIlCJLWRksVG0t/g62ViI1WKoiN+OgEo5hkZmwMiYXsXdjNDAxscXbPx7kPWAEYOr2dwYVROnmMPL6sTFzKyMndPhI2OmreOnsyfnz/AfRGAqjaUq0Qyxyg15bqhYj+YEt1iQtQbCQnEODeeFn24ucR2c8SoGCdkHRLXs7Ot0eu+/tqBxp9qmtccgkkiAN463r3A64nywCwVgFAU3IFdijbnrGmoUmg+TSFaTxnC6BLIPzaw7NGnzkALY1OnwZAUYLQqgEafSoAzRS0J6DTpwDQRBryLUHyJmy31OhTAWgiDaHVA1FKIBJ5Cgg5ToFuEeWYQPwx1ETaJolSgmYHDA/jaq+ylfxZKUNYA4qZAAAGoFIRD+xqXthZ+hyEsJoIYHSLZbGy8D3ZVfx60oi/6z1lafi5vyvsHwBlAuMQbnytW6OlSABls2oBcju6KcgTwDipEvPXzDqOQDZjuIuEAwE4nA3THjfWWXfzsH4hVz8RR5kczTDlQAAAAABJRU5ErkJggg==",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Изменить позицию видео на +10 секунд.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(KeyL);

    el.appendChild(createElement("hr", {
        style: "border-style: inset; border-width: 1px;"
    }));

    let KeyM = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAsxJREFUWIXFV89LFVEYPefOHQkkEIxS1Eoowm2UEC4kiHCRtIhXEi0qSqKCIopcSDzB0jYZbSpaZNRCEAyiwNpZCEb0B1RSUUaa/ZBQAmfu/VrIezOazh1JfR9ceDPvvPOdOd+P9x4BoKznzXYY2YiVDI8fR5u2vGJV99suUM6uaPIornHTnXeTAIoLJGBKF02rQiUHgGJdFKgC5gd0UcDCCvBDhwPEhLKyx0KtA6UHgO/gDCBsUrBjVvExBCWJArRxOjA00Lp+EADq20eygFx2KM4OtFb2zeA/DwFoSBTguQQQNvdyZ1jR+ZxfdgOoXwA9WFpTcTV34VlaSDK90oZIPLEmzWZpdaCPaMPf82AnfZHDvftp8k8XqGRuQygvJBKPna34WXvZBxWqM3NxKlCnn2arhuNYzyKZO2QaB6IS7W0Z2wUA/VfKu7VhXwzX199Rfi+OmXHAwW1SCPBsJECFcmPfhW+bAcBy+pg2akQbftXKNANA4/nRahXI9VgPpBAQEknHDyJLdchiFcjdTEa8J50bfmnD49qoow87Kn9kMuKtCnlfG67O4f0Aidw6pHsKRKL3PQMArEPZ+EUAV3q71vbn3Skfb6FhHSCf8veMAh1D5iyBHyuBtvmubjt44ntt7v6hU+NbfcNL2hDaRlPjpyiB1q5NGJvj2EhqAt3NzT93AEAQyAMBiuZ+VAcKcDjgXkSxmIOtMcAwACqwdF68dXOnWMWxEvyLXZNIbhTgWIVah+kdWAx2Bg+4apDmyygCW7oeaFa+NNyL64HQbWlcQRruFCWIEqaxdBb5UpSAyU2YGL5RTr+cAoSIht/QS5E3j/dS4NnW8CdZpHBCKI2ElAPsiSdYIKxQDijLMQEfgfLfP8lKAL5YRO0VwN7ocgnHcDliUYtoWQR4hlMo5F8zbXAb4LlCZCflJgHgVq1sszDVK5vde3/yJV//BcJ6VTGfiWS2AAAAAElFTkSuQmCC",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Полностью отключить / включить звук.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(KeyM);

    let ArrowUp = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAqJJREFUWIXFV0FrE0EU/t7MSxqbmt7UCltRLHhXlHjozUKQkkPpQUrPHkoLVn9A7qIVBRW8efFQPHhoG9i7QVAPntQi3lqlDQpNumZ3ZsdDkmZb3CS7K82DxwZ23/d9+828txMCgLFXn68YH+dxjEEC37dvXXpP1ssvD2Fw5zjJD8LgAV18sVkDkB2IAKDOaVcMihwAspz2RBKArdb1bFwATnsUq9AYYzNzEQCUUm+I6EYsASkVwwED289QsbJsOQBQeLw5vVfPvDYwN6NCCdaEaCkOkQPAxtJE42T2z4zUtBYVT0hNiJC2O2yKlWXLKZXMgXWlkhEbSxMNbxizUpMdBTOKA7bzu0k+de9HtmK277cFvPW3HhVK1Vxl2XKGdp1pqUXfTgipCH2kPbrnFysrTXKZ9teFh8m2AKkoD9ctF0rV3MaTiQb/qs+worV+sPtwAPaIo4urLfIhadZZ0yTrTve0nsvzfkeE2avPcB97orsAn+yM2yHPgg7IZUCA7Dyfz9S8cmGxKULt13qKEKwIIfmVlVdcXbGcucVqblSRzQqT7fsp1WmllEKwLj8iVXmuJYK1N9vE+jdPty7YbZNr6LLUlD98XwQcEEdr8xq6PLdYza2uWI7UVA3j4eBaHonr8ws774zvn2FD492GSQhGHvA/zS/s/DQaV0NrufskDC00gd9SCYS8xrlWhgbLcAd6REcCawBhEnpEtyXowR9oQyXi8oNZxXUgABLbxSQO/C8BsfdAYBdKRYNYgkFvQgS/BfGPdfEFBMrYp8ODIYoAGedIdiRkgoNtki6w7k+ZbN0FpXRjPKYBiQSc9sndPCEBaDoVFyTpIBpLUgw050Adg/trVmPWeA7Q3YHQG/OMAODpNXMZRl84Tm6p5bfbH+jjXyzSstSDo6igAAAAAElFTkSuQmCC",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Изменить громкость видео на +5.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(ArrowUp);

    let ArrowDown = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAshJREFUWIXFV89rE0EU/t7ubDabNIKsYkREBbEne9IqCJ4MpF3BU8CL/4DQw4p68CB4EC/Vgz34o5diWRAkaPEi4iWFslTxDyj+QBuEFgQh7cZtdmfHQ5vtpjSpmZRm4bHsvHnf982bN29YAoD8y4Wz4OI49vJR6cfS1cFPdPTFwiMI2HtK3nwEHtLJyS+rALJ9EQB4LNVQ+kUOAFmWCpReAH5tvI/IArBUQHKRAss+pQcBIC38byAckhKghZIZEKh+vJP3AODCg8VFQFIA45IZSIJEBAjJWFVSAGEzTg3lF7ErGVB5q6CuBPSiPgaRrSPsVg30gCEtIFlzvQmQ3oJNCetbIHcMpE8BkqeAt353JaD/NdC5gucB5AEc2+poqYH2GD8hsAzCcLsJisoJbWxu6rl5PvAwpHJyt/oZT4CEynbxbuBhaGrSPKdymmvHozBO2N5wwC5VDccxaxlfFFmkuC3+xKpTEVpjI8XN+KLoOGbNLlUNxulgOx6FhYTtTRls6LkZu1Q1Jhyzlgv9ghZSJfbz1lYcjwfkphq8OOGYtbExoQf6wCsW0ql2PB0yQGCcChHbN2OXhDE+nffS5FsaR6Xpj2sgiue7CjbIR4Su/K6VVa5YnTg61UDTCkSrsQjGfEvlVEm2cHU9I26khDE5y62UVU7WTvgdtiBpKGh89d3Na0vZ8em8p+h1i3FU4gxwchtaEJMbhlfWQrL+B3unLUjaxdTKwOtmJjJDudtNAZnTA/aEY9bskjByuveWcXRMe9Lo7mWvux5KYra+lh0df09ecnhsROj7Wb0MAasruHvFv903cYHZjEiP3toQ8XhE6H+EXwa6IwcAul/wpW4RInxo6PoVAND8tTcACjI4vdwFlwze+AoAEHRYFqSH6xgAIE0cC1A5eejnrxnjeAbQjX6wE4knBABPh8WZCPzE3rKr36/P0+d/FCKDTjMwvtIAAAAASUVORK5CYII=",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Изменить громкость видео на -5.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(ArrowDown);

    el.appendChild(createElement("hr", {
        style: "border-style: inset; border-width: 1px;"
    }));

    let Digit0_Numpad0 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAz9JREFUWIXFl01oXUUUx39nZu5rJPY905dImyYLpVRXSongRxamRKiC2m5qlO66SFdd9AuxlHLdKBbSTaEqLgwuNH6AaBetlWKURjfRWrTQEKRgP9Sa1z6b+2iTd2fGRXxtUt/TuUHzDgwcZs78z/+eM+dwrgCseu/sQ95xD0soojj3ywv3j0v3OxMH8exYSuc3xTMka96aTIDWphCAisnNqmY5B2g1uapqon8wuao0l0CULioCPwu85hxfASjN497zItCdmYCxWSMgJ2dTv/GbuPvKvM0f+1+5MFK17hMR6c1EQGcg4OG8itj0Zdx9pefN8ajw28ot4vHllb++e2JbV6kvvrRJiTsFdIViKmOF0JVL2X1ib1dpc3wmV7zY+ZlJ5W1tZbj94qqjPYPj0WjcOWVS2ZMFU+lUCFwTj+rVHwEkM227dcr62plKpb+j2LkL4DHd+YFOZTIUNzgCkZOROBbXF59rMU521jnf+dT2yWVxLC6y6v3gKIQ+QhH5HGBF0tLvkWIdkw7TUlgPHBPnjmuv9oXgGpMGEXDMymkAk0qvp/4dEXqBY16i703VOeBfa1xpKwSs0oeH704AxKm1je24D+DTAx3T2srVEOzQFPxRU6JU7mpk5KGtpptUygj1UrVAjAnohPND/o/2Hn/TzqqgLwttRIWaoq0qc8vPbSLlW3ZSaGC0QELLsLh16+/LASIrEw1L1XIWYPuWUt5YWRFWhmFVoCK/7AFgzFTlpG9wRUTG/lIeNKmEpSC4D3i/ARhLovwXhZlrU0D7bSaXXTk/CiBWbzBBqOFliHIyEMdeDQ/LDZPK0N/KycrQoaMyE8deGSsDobihKQBYe/108hwwMt22fKhtKun38MRcdDh+x9U7DwJUfqgMGC9rQkFl78ak0ZOuJxdyzq2Lj+SnBgd9VLxceV7A58qtI/GopC9tnu6QWTkFrA4msP/pShYCAF9XI/vsqx/nS/M342eutTuvjwCPZAGTl5+8npUAwHnxcsCJzI1k+D6P30OGQaQmixjJgLnZ75Be0JAWN9wulsB/Jlmq4P8hoK1UaN6vWWKM5Q2QXU1x7/3rAnD4Yd+Dt/cupW9t9U/bvpXv/gQ0P6U6O/BD6QAAAABJRU5ErkJggg==",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на самое начало видео.";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit0_Numpad0);

    let Digit1_Numpad1 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAg5JREFUWIXFl79rFFEQxz+z7+2JHGIZFcVTLGwk4A/sRAWNhZanaGWldbDRRg8Vi4AigklEG238B4SgQkCwklzELhp/BATPWAiRLInZtzcWmuwlQbx9d+4OLDyYnc9838x7s6wAbHw8sVebbCNHk4BPjdM7x2TLo7e3UPrzTL5kyk3ZcX9yFigXIgAiW1oIikoOULalOCgwP9hSLMUKCJ1/BVQYD1TPKRwFueHDCGwieD5vdF6OvLy0tV62a+54c0zi1YIJsWHfi1rPd4CFaC4xEvpwsDajAIF3uPjw0yubp5eB/DaCNS5T4KRz7tDzgUrjYE3tWjd9YOT6hlGAjJxUQBblAcHZkYFNX6pVNfNzjYcQfANGoYMKZAlUobfa//l1bL7es0lwRuE2QAWY8RaQrXSDULobOgRASGMzctI4j1uwFKCLiykw63JowSolmq79z0AHk3AZyJPjO4gAkJYS+HI6agGthzCnW7Ai/2JsBetmPAV0VIEWkPco7kILKsCPQlrQCsrjW/DHmqg+QOQjwhgAUzi7Xi6qSojoSYFd7cLk8vFI//1aagrPrj0p9/3NXzsR7W4q9XZ51mQdIELv1WPRvtDE71e6fsYmxJlTRtvfk08LesC8aiZmlSMEcL9V/k8BXbWu3QJvASaRiOJ+zWatTRgGuVBIetUhARjcr3vQZHueuU1iPpyvy/gv2v/GMN6PpxkAAAAASUVORK5CYII=",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 1 (10% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit1_Numpad1);

    let Digit2_Numpad2 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAtFJREFUWIXFl2tojmEYx3/X8zzvO4bXHLPZwlIjh2IoRSHHQiKlpEx5Ra2WFFJvrxzCB+OLOWYiOYSWmENh+eI05eOQkEmxyLxjew6XD3OIrN3Pu9l7fXp6nv99/39d13Vfd48ADDpTNxFfh9KVYcvLd8uKHkpB5dNyRMu61Px37JXhR559AXpkCCDlRFusTJkD9HCirpVBf3CirmQWIOKllYG7qJwILB7YGqQCdChYSwRWA5FQAI4fKgOvENbWbCmo/uv9C+DWtO2vjytyDehnuqHM2PpGjYRwz1drwZ1k3geAqTte5kY8e74i/RGu3k7kPwGYnqxfKKJVxgCzE/UmAK+zLBl5OZnXVBx/FOmXm5dAdQPQ7cd3FdV117flHwSYk6h/rDDOBMCxPaMSeF5jyp+XbIhJc/MFdZkJf6wTkF3FcT1We1hcy5dq1BDAsAcKJbvnc/3aEgUZ2Iam9+Cct4W1UOe4Uo9ha4Vpwvz2BJ5KA4CjEiMwBTArgUFozaV9rQ0a8WS8GrU2OHa4Y9imu8JOgJVlH3OaPXeuoX/oOfDPEGX/yYqBNwC8Fm+9jfQyXes46U3C36HcTH3quxFg1Zr3EwLP2hhmeYdKIEKNZX1bVHleWkpKGgeI5561IRoKoAMluJKd+rK0/HzB13j8bba4fhW+FIbdJL1TIJx2u/deWV7Zxy1d3hALmuzLwGRMD/8fAOEzcKBPUaw0mZSgdGnjACsIqi0oDu38EyBkD+zeey62CaBscSrXEv86voxJ1xzClSCx52KvbQCbl3we4at/DU+GdMS8FcAwA1Zgn2p9UhGvaYqDVrSlFRilsKJTAYJfMtGdVRxtT5+YnxqNwZXs2IaDyIJ4cnZjeVbEd9vTukHWWPUYbrKv7Jj1zXRs/5folLugYwCddh2nCWD7kiKTv2aOzyGQ9ZlwF9EKATg4SScE+MO61t1+se6+1H4HkUT8Wkg4Q3oAAAAASUVORK5CYII=",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 2 (20% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit2_Numpad2);

    let Digit3_Numpad3 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAw1JREFUWIXFl1+IVVUUxn9r731v5TUYTaMYumUEDvgU058HUaxEaygGo8KUShkYH3rQih5SlCMFPTVMCRY36CHKwelFi7CmB4egP0jNUw6JTDqS3gocR7gz09yz91k9XFAZnNhnuMxdsOCcs/b+vo+99lp7HwG4e+D3hzRjFYtoYjhXfbHjF7nn0zN9KK8tJvk1U96TBz4+WwNKLREAU65YN60iByi5YmpayA+umEprBRR8zhVQxhT9QKz8qKZ+gVlzG9atNsJWVV4GbC4BLuRagYH6Enp+er08M+f7ODC04Z3xTxRzHFgeCyiPH/xTowbCz0Hb1w0n4p9JLi2ZNuFZVdqB6Uz15HBS/g1gY3JxYyY61JgSgbvpwMUoAWro/i5p//Kpt6orQyH7Hui4IexRdg+93X4YYNP+S18j2hWDa6wXYtzV5aXN+6qPCHrEeumYE3c2SF/Xm//cBWA9x6Jxc+yB5xo+7/hbMOFB4IRTxsnicPNuwv+1THUcwKbmDomEdc43S4Ac/aL/zlEAl8ljErWzwNn8K3AF+OM6LxNkcuKvFSsOAWzdU70PL9tiwfKmYBbPms8qK6s3C+7Yc6XN1/0gOQ4353J1QsV4nVdxcVoVNRrXARomPT0Tkdm6ZpPA2A2iJlXlW+eW9Vcqkvb2TpRD4DSwNAZsIVXQBnRefxWAJ6Q++TDwQqWy/MKunRNHUOmNATPOC81w6+X5V1+5vAbApnY4em4z+4CkrgyctqleNiYO19ggxLgLDEqmndaboXnGzKqxIwAFNffG4kanwHr5vP9o24j8q9sLqYzOifuCl93vDyz9G8AFtsTiyt7uWmwVnCpeLa1NhsUnG/TWtG1qiypl0JrCyXeP3z4KsLe7thn4JjptB56eii5DUR0UU9qZfCXTN4snXTPrM5MdA5ZFYx58ciZvHzgHekiVH9Bw3uJKQWS1iG4DtgO57ngLqYJVIH2NxwaXUYi8ADVFQFOticfxAgXYIFO07tes5lzgI5A3WkKv+qEAHH5UO9Fw/2Jy22DHdv0qI/8Bfn16yjR6u2oAAAAASUVORK5CYII=",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 3 (30% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit3_Numpad3);

    let Digit4_Numpad4 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAApdJREFUWIXFl0tIFXEUxn/nP3OviQsrQu1FaBGRm8AgqEVB9FgGURgouAkVIZTIRYHdwErBohZZErYQIehB+6AyyE30ACFKJFwIGRWlcX3O/Oe06F4tUe8dX/fbDMM5852P75z/mRkBWH//024NKGQFIYb+wVM73sjmjt7rKHUrWXwKyjXZdrcvDuRkRACMuNFJk6niADlu1DMZrA9u1JPMCoj4i3KgQd3JNuNHPKtBvhHnEVAcSoBrF+zAi5cXNjUioon7X/sbBx6HFuAsTMCEGqlGRA/E+gsgJ94Vy4u7gbGqmvrpfwUs0IGmpxc39gJENHrTeKO1QNz1QCUcn+v4oQX0jUUnmgCOnv9yRDxOBuTUAhjfgCyzA6pS3XWlcPxE3UD2uJVWgIiTIAsAQjoQToB2PGkpeAbgm0iDaykCYCJBtiAH0m/BT9/lHMDxusFiY+VsMmCTZD4QegbSdUCpf3gj/xuoRPzvbUAkGcpKtMAEBmF5ZuBVZ+u6ewDl1T9Oq5V9/0WnWgAS1gE39Sb0VKkC0fKqr3mONVdnJvgECQEmbAfSasHr9va1HwCiXrQFWDszITp1CgwsdQtEGZtKDkwPGjTPzPGUOIDrSzeizQCK2SJoaSoBUlM2lEry81udqw+mIpoNNWVD74Fd8+WkM4QlZ0p/7/VM8HGuhPztucOxmAQVFboqe3I4GyBLzE61ujUVeTozkAt0/+3v7BjqGd0ADK4ZideLmEvTkdQTGWYRzU2SvAYguqyreA4kT4G/fItoXlgrBiBiMaFfRs7iPskAcITK2OGJB+LbY2EFyOVD4+E8W2IszQwsSsASnIJFCXCsjJC5X7O461ruwPTHxYpC9bYAtO7REtQWrWRtxzqfK9/Kuz/VFuUq0n3cdQAAAABJRU5ErkJggg==",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 4 (40% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit4_Numpad4);

    let Digit5_Numpad5 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAq5JREFUWIXFl1uIjVEUx39r7+8caaYhZJjIJTW8I5ckvLgmakouRaJMTSYPxIPGLS9yG7mHtxkdRPLoUjK55EGemJLc0jAzDwzmnL338uAgwtlHpzmrVl99+7/W+n/r9n2fAAxrfTIJr6PpS7Hy/O2y2gcy8tzTA4g29mnwn7Jfxp1q/whUlIlAT5LOmnIFB6hI0jlTxviQpHNSXgIpF5cBQXeEJHfUuFSuENZrqLZiLylMKEgg8XEZEGdO39o6qiMKDN0zd7+8QwwBG0nAEgLA7KbX05Aw419YUVOjXlfF+I3OgOYrZYPOEczOwhZxfhPr4oDO5Q2cBTTKJopAbAZS9P92daBSusmJJuDzJUiCQUuagcgS9MuXwGS5bsRkv98PghF0JDAfGFU0gdgpIBgLcOFwdRvQ9vtxXZ3aZPj7Nap6kCLeLbKy/l1UPkU5KIZjLgT3y4FJ+1zHwFeZjHiAFRs6p4iEG5BvmkJ+V6/vLEVB34iw8eyJwRcAVq/vbAQOxBga64USaI1xklm7tmsBQE/3oKPWS1eMrUm8UDo1+wAyGclaLzejbGKnIFLGNzRov+Zm6U2ceSUR4xq9B4B2oIZ/d3j3oWbpBUg5BhCxsKJ6IPFy9VBLVa0Ndrr18uXvWI78eLIgU+N6wAmF1HojILr/fOWjxMmqxMmnP+Baq7RqN8DmpR9mWSe1Mb5l2+KPcXtAWL7ncmULQNOSD0N71SwS1SEITjXc33ul6jbAlrquATabvguMj/K7fWFP7B7oVaV+17WKM38DNM37NCJYvQhMjvSJ7Jj7udhF1AacVA2PSfsX5FKVCGMJskhE11HkJ34xU/Bdpn1TC1/sb0fFj/T/ECiplHoRFU/AeumhnL9miecEyKZyRBfRYwJwfLJODPgxfRvdPqu/Jw+/AlgsTCHpgSdpAAAAAElFTkSuQmCC",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 5 (50% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit5_Numpad5);

    let Digit6_Numpad6 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAzhJREFUWIXFl11oXEUUx39nZu5GaTYNaJqGKMWPWkGsxSoqCAbB4IMi0fhRrFIwUbCIiAQhWLtFQ1CxoMFWKmioiLRb8ckPEGl9tVXsg7ZpLbHiB2ULFXvX1r135viwaCOm2VljswPnaf73f373nDPDvQLQ897B6zRwCQu4xDD9y5or98nF26c2ozy1kMn/Xsorcvmbh1NgUUsAoOoKNdOq5ACLXCEzLcwPrpBJawGSvOkK1BDeEZVdxnIk+HB85qZowampPaIq41EAzjdTATlgVAZ2b+idmkt18/jRnc5HAthIAEWn88Te8vloTwXg1tLP14oJfaqa/JNREmoMRJnSRAUUhndv7KmsfnRfckHP0rcIupYgwPxmyNm8sYEI+z8a6/0MYMmFvc+T6dp5ZZ0JEFmBTwH6StPnuVOsn+9bNw0g8BNAx++FZTZIO6DAN8BhEUThMpSr/xtATAuQDKAtswVByiLm2R2buw7N1Nz7ZGUFJoyh3NMUQNQp+EvyY/e3O8ty32yS8qtdU8Dg/U8cGxHkpWiAqBZoXVMuiwd4eH3lihDYhNBHvR17jFDa/nrXoR0T3S8/9HhlucJwDIBxuaFRGH/mgXXDJ1aZzOx13jzgcrPU5abH5WaNyczedcMnVgGcn7eN2tykUd7WC40iCWeuaxt0q/XSMYuuwwbdArBtW8dxm5tPYryN80KjMFk9+dBQ2u283DiH9qahobQboOD16xjvqFOAkgC01cLi+u03R0/z0Akcc15Sjbgv4oZQ6AWomuIPi7PfUqD9LNI0/Fr8HsAFuUi1sXfUDEhm+gEmJ+W09TJx1n56eW3iY/kDQDLTHzcDudAoEi8rRwbTfoC0s7gxyc3kv3Xm7WpnsQQwMpj2J15WxnjL6F2pNqxTfR3Vgl4/Xi5WAJ4ZSK+xnj4Ab9nz4gft+wFKAyeX1IJ8ASyLMZXn7qjGAgByMKi/+4UPiwdm291w58mrRO37oCuiHTfdfqoJAAAyhXdFZZcRvgPwgeVidBB4EHDNmMnYbaebBfhfV5PfhOcCIOYiOpcA1kuV1v2apc553gB5uiXpVbcKwJYbdDXqL13I3NbbI499KV/9CULKhpKPtOGtAAAAAElFTkSuQmCC",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 6 (60% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit6_Numpad6);

    let Digit7_Numpad7 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAkhJREFUWIXFl01IVFEUx3/n3etEaQi6CKOBigJXbQraFdgHhcuKaFFIBIXCpEUEQlRgm8iGIszKjQUZ1KaPRS3aBCFEtlKwpFxoGGGR4SSj973Tomhlvq9h5mze5p7z/93/uR/vCkDDwOgWDVhHGUM8xqcONb6V7N33V1E6yin+L5Ru2XBnbBaorggAFGxm3quUOEC1zSx4FdQHm1mQygJUuUgOTAeeNJsgGIsyOFDTKATPEOpCAawf7oAqI6/PZd9EEf8bg9u7JoaBbWEDpenipEYoqCj9iI4uWaxK+l52rvm2u+tz1vn6CbBhhSM5AAjQ8ufz3wEfXpxffRlA52mzSKg4gDWuNItQhDyIHuiYWD7r5FjUvKgOhMn/KPrcAyguM4etL/VlBtC+p1caCgDGeW1xMq1N3wIfRw/A/tyXHeJkUywAk9YB5cmDG6vGAaxKjpj1UrdAlGsALSem1jrfa46bb220k3DRUBjuv133CkCDTM4GmNgA6VqgeRBtbf1aUyzK0SQVkrdAmV7xqzAAEMzZFqtSmwwg4S5Q4Vb+YXYOVIybaSPKgb4oQDIHXOC5XoD2gz/3qJPGZPIJ14Cgj7oH6icBPPVO4iecPglbECjXAc7sm9kojl1LXVLhADEdEBi69HjlIECVs+2gqf7pYgMoch/g7M7vtdbnSJrZA1gT8yASaL6wt/hcNDiFoyaVOsl2QZNBR9LOPA1ASaMU13E6AONLgco9zWat9ekFOV0RedWbAtCzVTej/vpyahvffDw+JO9+A4fOx3Ohy0yAAAAAAElFTkSuQmCC",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 7 (70% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit7_Numpad7);

    let Digit8_Numpad8 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA3JJREFUWIXFl29olVUcxz+/85x715hLodQZCW398dVamC73yjGsRrUkSpjoC20vXLo17Y1RJFdG4YtojZYuYiSSNNgbIZpNsoZQzJlSCyGNeRdZuc0scdfJ7nOeXy9kc9Wd91ww7w8OHJ7f9/n+vs855/flPAJQ0n1mJU7v43ZGICMX6pedkKX7z7Yhuv22Fr8R78gDH/40ARTlSUDKxqdMvooDFNl42uSxPth4WvIrIBbmugJ6BZEuVQ4TMAyA436Qp4ToRZDinARY578CCkdjEm44+nrZ6L9Sw8CR6kRyj1p7EKjx5ZSa3efVE/t1pOk1/YnSawDVifOrxMhyAI30VH/i3oHrz5N3GIl9CVR5CXhi168+AlTUlPe1LjldnRibF3fpHoTafyL4nMnghSNvl6TWvPFLuREz5CPABKGQdTj5rq91yWmAwnTYETipzYCpDQr0PYAvWpf+YJ1878PtdQYEGZme21CevAl0ZlWC0CRBK7Jx+x7C0pkXIg6h0phZqB6awTlKITu3saHgMSqeb7nwGIAdKWmyoWm3oeisvMZC827wc0kzwLrto1U2lId9uKW+ecyrCwTOYHT1J+2LRwHqm8ZXYGgBIKK9u2PhtwDrW0YXayTHgIe8eDduHfdtQ4CzCOs/fn/hqUzJjdvGl6N0Aw/6ElqbmxMqaqK5ksZZNVE0Zz5TSEPDJa8VUOXHeDy2urOzeAygoeFiJZjrW0DU3tV19yBAY+OVRel0+hiwzEvAlk1/+giIJDJVnQfmDyYSan9L/tUmwjZuHHMFOi6lFuzo6RH30qY/VkWYb/BoA98uGOo8MH8Q4OLw5b0xJ002FJmVFxtK86KCy3sB9u2/a8CGMuTF7ecDmpyeBaHU3QRYB2wBsI4kSHYjCryccJYROTmssHkOYO/01ISmTDy+zWsLgtA8snPtRDmAFFxttiG9/8WZz+68WvwywM7nJipiztOIXls74ekDOjAZn1fT1iOTAK/WpVYGwqMATjm559OiEwA71mlh4VSqH6j0YZVdz6T8jUjkq3BKN7zVV/R7pnTi2dQ9LpKDglZ7U+6unczFCQEmQD9SNb0EnAPAUYaJnhaVzeR4xZc3H7+Wq4BbGjndCf8fAWGeBQROUuTz18w6PgB5JR/VRXSfAHRW6ooIV5rthVtbPTi39bic/Bs/zIvEVsd/OgAAAABJRU5ErkJggg==",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 8 (80% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit8_Numpad8);

    let Digit9_Numpad9 = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAA0BJREFUWIXFl09oXFUUxn/n3jtjZGIXJZ2kTCQoVWoERRrJSggSoy5cBFKh1IAl0qLBhYgbS8s0pcHiH6hCq9WgNGoXVUtXRabFglAQW0u6sIa0jIsmqX9oUpKWJu/ed1xZ21gzdzRmDpzNu9/7vu+dc+/hPgFYffCnNk25h2UMMZQnN6w9JXcfGH0H5ZXlFL8Rytuy5sOxWSBXEwNw1WXnTa3EAXIum5ga6oPLJlJbAxlfdQXmEYZF5QtjuQAQUtaoao9AL5CpyoAL1VRAzhmV7m+2FUYXLIwBRzsGJ97UNP0K9IFoxsd3XNQYoKJln3Ht376++jeAzoHxR4JqB4AVOXFse+EMwGODk6tc4r8TJGquSNf28VgDnaWB5uPrNp/KrGxqGhKkd8H68OVLl/pO729LniyOd2pKKYbXWC9UShdkpDTQfBwg31DY6bzp/RvGm958Q2EnwNfFwjEXZCSG27ggVErrpQTQUSzXuUD/P2Pp7yiW6wCsl1IMd9wmVCYAVlzLtthU6hdB1q+4lm0BRq2XixJB7ZyvjBKoB8jNuemKcGenADJB5ivLg7FBqJSSysMAB/c0/mKDnFwEe/LwW02/AphARV4bIvdAxstTm16eXAXg0JdckCu3wV3Jen3xzy/LpLZy/4NgnDdEZC6dyw4CfPpe44gL+qjz8rnzZsJ5M+6CfHbHnLYd2Nd49oaBJIoXZ+Mn4Qt9fZfPDw2t3P3JB/kxYOPtQOvXqz10SIJNQbUyd5WjmDe2bJpqtz5s3TvccO7mhc3P/75WsLtMOrUDOGsCSJSBiFOwILrBdfc/N/UjmPOKpoLej5dWAAl2K0A2kayy9BW4KaQVaAWBv4Rm0+m7ygAuleaoFlSxByqGwrt7jsocgCSmyyzVIIoL+Xi6IVcEeK1ntkuCPhTzVnwLhO9ROQLqb3muXA+WE7sP148AFLtn8vMJ+4nof1UGjDPPFo/c+fNimG3PzDyYJvZLh7ZEkQLOxl7JPBsGn575SEy4pQI+1OVDyn1itIeEjYCL/XoA2fXE9agLyf8V/+EYLpWBJTsF/9KADXKV2v2azToXeB/k1ZrIq+4TgL3tug4N9y6ntg32wpbT8sMft/eUr1aObmoAAAAASUVORK5CYII=",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на главу 9 (90% длительности видео).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Digit9_Numpad9);

    el.appendChild(createElement("hr", {
        style: "border-style: inset; border-width: 1px;"
    }));

    let Comma = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAtNJREFUWIXFl0tsTFEYx3/fubejMqElERQNCbGwscCSWEhEiFcIaZtINBFETFqtVtpmREZaSi3EoBsLgk5iQVg1FnaCiIWISjxSiQrTl06nZubez6IMaTLtvHS+3Tm55/x/53udcwVgwZ23a3F0KdNplnzs27fymSy50dOBqG9axf/aRVne+W4E8BYIIGJ7YqZQ4gBe2xM3BdQH2xOXwgIUJf6LB6JAO8a6hZtoBqlICWA7efaAapcldv3jprJPAOsDn++LamoAK38AL1HX99hf/uTPxEZ/7xZJcB5Sa+TDA2FFzpS+WXg5FBIHYFNT7woRcxGXrVMttq1E1gBxUYIxt7ilu23uEMAO/4fSn7HiBlz1ATPS2SQrDyjaLYjvQdvC1wB+v5rn0b5KJ8o5G+ZP5vIcAbRHoOZee9nDPzM7675seDXy9VIRsjqDjf4BSC8Eg6LSqnO+dYT8q2IAu46FF1tW4ixxKsnkyBMBpqgCB5FOKYo3375Q9h2g6kSfNzFmGhWnFkeKsxVOAkwWAoWTt67Mu/B7JBWHwxU6qq0WLMpV+C/AJJ1QJ4w9rkF14mxuJgcP9k+2oyNCpzF28/Xrs8dDUNXn9Xg8jUAtkHMI5NCBgXSONAjS2h8p6QiFJAZQXR1ebBLmrJBbEsrRysFMfNrjIjXBmyXJMjxcNbDBqFwCsipDOb5/KOOgKnRbGF/H7VnJRjTQM1yJcg6YnxFAzd7hbLMqDhIs0nhLW2i8Fft2DJQaj9UApN2KpX7Xj1zTOqwiZz4ab/Iyqts9tMJgAqrsmRLg1PaRvNSVwEtUfYH7s5LXceP2yBZBg0B5ynUtWyN5LWxR7UqoVR94NPMTQPO20b2iejfl96c3R/PbWcYtitAurrnritsksC8lQGDT2P8ASNvy/ybMGCD7F1F+ACxHIhTy18x2uAZSUwh1EQ0KwNV1usbFWTa96tb7I0/lxS/PygmfyGAolgAAAABJRU5ErkJggg==",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на предыдущий кадр (-1/30 секунды).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Comma);

    let Period = createElement("div", {
        class: "settings_hotkeys"
    }, (bl) => {
        const imageBlock = createElement("img", {
            src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAADsAAAA7AF5KHG9AAAAGXRFWHRTb2Z0d2FyZQB3d3cuaW5rc2NhcGUub3Jnm+48GgAAAtZJREFUWIXFl1tIFGEUx39n5nO17AYZdsEoKHrxJaieCiJBiOgKQpZPQUEbldVGlhSTZlZmFgQVBQWbEYgPkgRBUG8REdFDSBe0Ii+ZREZL6ezM6cHW6MFxVzf3//gN35zfnPPN/5xPAGbffb0cTxcwkbLlfc/WJc+k4NabBkTLJzT4X12QRdff/gByMwQQM6FBK1PBAXJNyLUyGB9MyJXMAmTFgzKgt7HMKXxvOxABJqUdwHgjZ0DUanl8fN5r4MTKM103bDdeh0gJkLa0yZqTnzTg+UdV3f3IKbifWCiq6lql6l8ClqYFoPhEZxDAkJSHglX+oHrOKwDHUeuJ11mmIueA/HEBrD3WNTrAkFzgpglRec+Z2wdQHOnJNSHvsCIVQPaYANYf6U4WIKGvglRlt+dfbmoSD2BDRe8iVe80UJIywOZIT6oACbVZKgea6/MfJBY2HewpEouLQGHSACXln8cK8OcN0uqj+5sb8tsBVjtqZvX37kCpAfJG3b51b+/4AIb0S5R6k+PXRs/PjgGUHurKUzerGtWdgD0iQFn4SzoAEupUlYrGKzMbQRSgLPwlAtSNtMGYQCdMXSL/elSWa6EBtmXsACdMQb+A+sHBwdpodKgEu3Z9z/P9eLX67AzaGGjFSUlp9XzZdyM6owPAcdR0d/TvYMCrsUVGPYTGxMcM0CYiBy5Hpw//hnu2fyvqe9d/0UBhsu1iLBn4qkJVtztt2Ij2betfLCo1+JqyEaVyBlwVbloWlfV3pvUBhEt6p+RIdoR4wopTz2ZSJRB4iFB+tnnqcDOKvYyViafjbkajleCDIuHaltzhdnx04/dV7ovYpSxYmo6xIBDAQiJO6+T7AM76n/PV9+rUS+9AYuxgI9pSvW7gle/7pbhEBHtiRzKgFE9LrfR9cMoA/13jMaL0ANiexMjk1cx4XAM5mInoInpFAK6u0GU+3sKJjW63h5/K89+qsgzPk2otWwAAAABJRU5ErkJggg==",
            width: size,
            height: size
        });
        bl.appendChild(imageBlock);

        const infoBlock = createElement("div", {
            class: "settings_hotkeys_infoBlock"
        }, (inf) => {
            inf.innerHTML = "Перейти на следующий кадр (+1/30 секунды).";
        });
        bl.appendChild(infoBlock);
    });
    el.appendChild(Period);
}
