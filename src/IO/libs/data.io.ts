import { IO } from '../IO';
import { IOCore } from './core.io';
import { Observer } from './observer.io';
import { stateElementor } from './state.io';

import { _atr, _children, _classList, _components, _events, _id, _inner, _tag, _text, iIO } from './types.io';

export class IOData extends IOCore {
    public tag: _tag;
    public classList?: _classList;
    public id?: _id;
    public events?: _events;
    public atr?: _atr;
    protected children?: _children;
    public components?: _components;
    public text?: _text;
    protected _inner: _inner;
    public elementID: string;
    protected elementRef: HTMLElement | null;
    protected _state: Map<string, unknown>;
    protected $stateElementor: Observer<IO>;

    constructor(tag: _tag, props?: iIO, children?: _components) {
        super();
        this.tag = tag;
        this.classList = props?.classList;
        this.id = props?.id;
        this.events = props?.events;
        this.atr = props?.atr;
        this.children = props?.children;
        this.components = children;
        this.text = props?.text;
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
