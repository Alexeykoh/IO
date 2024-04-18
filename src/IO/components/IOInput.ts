import { IO } from '../IO';
import { _components, iIO } from '../libs/types.io';

export class IOInput extends IO {
    private _callback: ((value: string) => void) | undefined;
    constructor(
        tag: string,
        props?: iIO | undefined,
        children?: _components | undefined,
        callback?: (value: string) => void
    ) {
        super(tag, props, children);
        this._callback = callback;
        this.atr = { value: '' };
        this.events = {
            input: (e) => {
                const target = e?.target as HTMLInputElement;
                const text = target.value;
                if (this.atr) {
                    this.atr['value'] = text;
                    target.setAttribute('value', text);
                    if (this._callback) {
                        this._callback(text);
                    }
                }
            },
        };
    }
    
    
}
