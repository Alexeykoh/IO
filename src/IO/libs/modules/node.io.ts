import { Observer } from '../../utils/observer.io';
import { Stream, StreamSubscriber } from '../../utils/stream';
import { IO } from './IO';
import { $IOStream, iStreamMessage } from './IOStream';
import { IOCore } from './core.io';
import { stateElementor } from './state.io';

import { _atr, _children, _classList, _components, _events, _id, _inner, _tag, _text, iIO } from './types.io';

export class IONode extends IOCore {
    // Represents a base class for creating IO elements with data management capabilities
    public tag: _tag;
    public classList?: _classList;
    public id?: _id;
    public events?: _events;
    public atr?: _atr;
    public elementID: string;
    public components?: _components;
    public text?: _text;

    protected children?: _children;
    protected _inner: _inner;
    protected elementRef: HTMLElement | null;
    protected _state: Map<string, unknown>;
    protected $stateElementor: Observer<IO>;
    protected $subscriber: StreamSubscriber<iStreamMessage> | null;
    protected _$stream: Stream<iStreamMessage>;

    // Constructor for creating an IOData instance
    constructor(tag: _tag, props?: iIO, children?: _components) {
        // Call the constructor of the parent class (IOCore)
        super();

        // Initialize instance properties
        this.tag = tag;
        this.classList = props?.classList;
        this.id = props?.id;
        this.events = props?.events;
        this.atr = props?.atr;
        this.children = props?.children;
        this.components = children;
        this.text = props?.text;
        this.elementID = this.getID(); // Generate a unique element ID
        this.elementRef = null; // Reference to the HTML element associated with this instance
        this._inner = null; // Inner HTML content of the element
        this._state = new Map(); // Map to store state data associated with this instance

        // Subscribe to the global state observer
        this.$stateElementor = stateElementor.subscribe();

        // stream
        this._$stream = $IOStream;
        this.$subscriber = null;
    }

    // Setter for the inner HTML content of the element
    set inner(value: string) {
        this._inner = value;
    }
}
