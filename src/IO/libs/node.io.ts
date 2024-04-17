import { IO } from '../IO';
import { IOCore } from './core.io';
import { Observer } from './observer.io';
import { stateElementor } from './state.io';

import { _atr, _children, _classList, _components, _events, _id, _inner, _tag, _text, iIO, nodes } from './types.io';

export class IONode extends IOCore {
    // Represents a base class for creating IO elements with data management capabilities
    public tag: _tag;
    public classList?: _classList;
    public id?: _id;
    public events?: _events;
    public atr?: _atr;
    public components?: _components;
    public nodes?: nodes;
    public text?: _text;
    public elementID: string;

    protected _inner: _inner;
    protected children?: _children;
    protected _state: Map<string, unknown>;
    protected $stateElementor: Observer<IO>;

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
        this.nodes = [];
        this.text = props?.text;
        this.elementID = this.getID(); // Generate a unique element ID
        this._inner = null; // Inner HTML content of the element
        this._state = new Map(); // Map to store state data associated with this instance

        // Subscribe to the global state observer
        this.$stateElementor = stateElementor.subscribe();
    }

    // Setter for the inner HTML content of the element
    set inner(value: string) {
        this._inner = value;
    }
}
