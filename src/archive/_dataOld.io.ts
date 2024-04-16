import { IO } from '../IO/IO';
import { IOCore } from '../IO/libs/core.io';
import { Observer } from '../IO/libs/observer.io';
import { stateElementor } from '../IO/libs/state.io';

import { IOArray, iIO } from '../IO/libs/types.io';

export class _IODataOld extends IOCore {
    public tag?: string;
    public classList?: ((() => string) | string)[];
    public id?: (number | string) | (() => string | number);
    public events?: { [key: string]: (e?: Event) => void };
    public atr?: { [key: string]: (() => string) | string };
    protected children?: IO[];
    public components?: IOArray | (() => IOArray);
    public text?: (() => string) | string;
    public elementID: string;
    protected elementRef: HTMLElement | null;
    protected _state: Map<string, unknown>;
    protected $stateElementor: Observer<IO>;
    protected _inner: string | null;

    constructor(props: iIO) {
        super();
        this.tag = props.tag;
        this.classList = props.classList;
        this.id = props.id;
        this.events = props.events;
        this.atr = props.atr;
        this.children = props.children;
        this.components = props.components;
        this.text = props.text;
        this.elementID = this.getID();
        this.elementRef = null;
        this._inner = null;
        this._state = new Map();

        this.$stateElementor = stateElementor.subscribe();
    }
    public getID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }

    set inner(value: string) {
        this._inner = value;
    }
}
