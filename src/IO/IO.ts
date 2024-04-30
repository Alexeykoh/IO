import { getID } from './libs/helpers/get-id';
import { Hydration } from './libs/modules/hydration/hydration.module';
import { ReRendering } from './libs/modules/re-rendering/re-rendering.module';
import { StateModule } from './libs/modules/state/state.module';
import { StateQueryModule } from './libs/modules/state-query/state-query.module';
import { StreamModule } from './libs/modules/stream/stream.module';
import {
    _atr,
    _classList,
    _components,
    _events,
    _id,
    _tag,
    _text,
    iIO,
    iStateQueryCallbacks,
} from './libs/types/types.io';

// IO class extends IOData
export class IO {
    // module
    private _hydration: Hydration;
    private _testStateModule: StateModule;
    private _testStateQueryModule: StateQueryModule;
    private _stream: StreamModule;

    // params
    private _tag: _tag;
    private _classList?: _classList;
    private _id?: _id;
    private _events?: _events;
    private _atr?: _atr;
    private _elementID: string;
    private _components?: _components;
    private _text?: _text;

    // root
    protected elementRef: HTMLElement | null;

    constructor(tag: _tag, props?: iIO, children?: _components) {
        // modules
        this._hydration = new Hydration();
        this._testStateModule = new StateModule(this);
        this._testStateQueryModule = new StateQueryModule(this);
        this._stream = new StreamModule(this);

        // parameters
        this._tag = tag;
        this._classList = props?.classList;
        this._id = props?.id;
        this._events = props?.events;
        this._atr = props?.atr;
        this._components = children;
        this._text = props?.text;

        // core
        this._elementID = getID(); // Generate a unique element ID
        this.elementRef = null; // Reference to the HTML element associated with this instance
    }

    // setters
    set tag(value: _tag) {
        this._tag = value;
    }
    set classList(value: _classList) {
        this._classList = value;
    }
    set id(value: _id) {
        this._id = value;
    }
    set events(value: _events) {
        this._events = value;
    }
    set atr(value: _atr) {
        this._atr = value;
    }
    set components(value: _components) {
        this._components = value;
    }
    set text(value: _text) {
        this._text = value;
    }

    // getters
    get tag(): _tag {
        return this._tag;
    }
    get classList(): _classList | undefined {
        return this._classList;
    }
    get id(): _id | undefined {
        return this._id;
    }
    get events(): _events | undefined {
        return this._events;
    }
    get atr(): _atr | undefined {
        return this._atr;
    }
    get components(): _components | undefined {
        return this._components;
    }
    get text(): _text | undefined {
        return this._text;
    }
    get elementID(): string {
        return this._elementID;
    }

    // module methods
    public state<T>(init: T) {
        return this._testStateModule.state(init, true);
    }
    public stateQuery<T>(init: T, promise: Promise<T>, callback?: iStateQueryCallbacks<T>) {
        return this._testStateQueryModule.stateQuery(init, promise, callback);
    }
    public stream<T>() {
        return this._stream.stream<T>();
    }

    // root methods
    public render(): HTMLElement {
        // Render the IO element
        // Hydrate the element with props and return
        return this._hydration.hydrate(this);
    }
    public forceUpdate() {
        // Force update the element
        const reRender = new ReRendering(this);
        reRender.update();
    }
}
