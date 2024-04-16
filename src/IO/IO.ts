import { IOData } from './libs/data.io';
import { Hydration } from './libs/hydration.io';
import { _components, _tag, iIO, iStateQueryCallbacks, tGetState, tSetState } from './libs/types.io';

export class IO extends IOData {
    private _hydration: Hydration;

    constructor(tag: _tag, props?: iIO, children?: _components) {
        super(tag, props, children);
        this._hydration = new Hydration();
    }

    private create(): HTMLElement {
        const newElement: HTMLElement = document.createElement(this.tag);
        return newElement;
    }

    public render() {
        const resultElement = this.create();
        const props: iIO = {
            classList: this.classList,
            tag: this.tag,
            id: this.id,
            events: this.events,
            atr: this.atr,
            text: this.text,
            inner: this._inner,
            children: this.children,
            components: this.components,
        };
        const readyElement = this._hydration.hydrate(resultElement, props, this.elementID, this.elementRef);
        return readyElement;
    }

    public forceUpdate() {
        this.$stateElementor.notify(this);
    }

    public state<stateType>(init: stateType, update: boolean = true) {
        const key = this.getID();
        this._state.set(key, init);
        const set = (value: stateType) => {
            this._state.set(key, value);
            if (update) {
                this.$stateElementor.notify(this);
            }
        };
        const get = () => {
            return this._state.get(key);
        };

        return [get, set] as [tGetState<stateType>, tSetState<stateType>];
    }

    public stateQuery<stateType>(
        init: stateType,
        queryPromise: Promise<stateType>,
        callback?: iStateQueryCallbacks<stateType>
    ) {
        const key = this.getID();
        this._state.set(key, init);

        const refetch = () => {
            console.log('start fetch');
            queryPromise
                .then((res) => {
                    this._state.set(key, res);
                    if (callback && callback.ok) {
                        callback.ok(res);
                    }
                    this.$stateElementor.notify(this);
                })
                .catch((err: Error) => {
                    if (callback && callback.error) {
                        callback.error(err);
                    }
                })
                .finally(() => {
                    this.$stateElementor.notify(this);
                });
        };
        refetch();

        const data: () => stateType = () => {
            return this._state.get(key) as stateType;
        };

        return { data, refetch };
    }
}
