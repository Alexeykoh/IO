import { StreamSubscriber } from '../../utils/stream';
import { $IOStream, iStreamMessage } from './IOStream';
import { Hydration } from './hydration.io';
import { IONode } from './node.io';
import { _components, _tag, iIO, iStateQueryCallbacks, tGetState } from './types.io';

export type stateCallback<T> = (value: T) => T;
export type new_tGetState<T> = (value: ((value: T) => T) | T) => void;

// IO class extends IOData
export class IO extends IONode {
    private _hydration: Hydration; // Instance of Hydration class

    constructor(tag: _tag, props?: iIO, children?: _components) {
        super(tag, props, children); // Call constructor of superclass
        this._hydration = new Hydration(); // Initialize Hydration instance
    }

    // Render the IO element
    public render(): HTMLElement {
        // Hydrate the element with props and return
        return this._hydration.hydrate(this);
    }

    // Force update the element
    public forceUpdate() {
        this.$stateElementor.notify(this); // Notify state elementor for update
    }

    // Manage state of the element
    public state<stateType>(init: stateType, update: boolean = true, callback?: (val: stateType) => void) {
        const key = this.getID(); // Get unique identifier for state
        this._state.set(key, init); // Initialize state with provided initial value

        // Define setter function for state
        const set = (value: (val: stateType) => stateType | stateType) => {
            let result: stateType;

            if (typeof value === 'function') {
                result = value(this._state.get(key) as stateType);
            } else {
                result = value;
            }

            this._state.set(key, result); // Set new value for state
            if (update) {
                this.$stateElementor.notify(this); // Notify state elementor for update
            }
            if (callback) {
                callback(this._state.get(key) as stateType);
            }
        };

        // Define getter function for state
        const get = () => {
            return this._state.get(key); // Get current value of state
        };

        return [get, set] as [tGetState<stateType>, new_tGetState<stateType>]; // Return getter and setter
    }

    // Query state asynchronously
    public stateQuery<stateType>(
        init: stateType,
        queryPromise: Promise<stateType>,
        callback?: iStateQueryCallbacks<stateType>
    ) {
        const key = this.getID(); // Get unique identifier for state
        this._state.set(key, init); // Initialize state with provided initial value

        // Function to refetch state asynchronously
        const refetch = () => {
            queryPromise
                .then((res) => {
                    this._state.set(key, res); // Set state with result of query
                    if (callback && callback.ok) {
                        callback.ok(res); // Execute OK callback if provided
                    }
                    this.$stateElementor.notify(this); // Notify state elementor for update
                })
                .catch((err: Error) => {
                    if (callback && callback.error) {
                        callback.error(err); // Execute error callback if provided
                    }
                })
                .finally(() => {
                    this.$stateElementor.notify(this); // Notify state elementor for update
                });
        };
        refetch(); // Initial fetch of state

        // Function to get current state data
        const data: () => stateType = () => {
            return this._state.get(key) as stateType; // Return current value of state
        };

        return { data, refetch }; // Return data and refetch functions
    }

    // global stream
    public stream<T>() {
        // subscribe to global stream
        const subscribe = (id: string, effect?: (data: T) => void) => {
            this.$subscriber = new StreamSubscriber<iStreamMessage>(this._$stream, (message) => {
                if (message.id === id) {
                    if (effect) {
                        effect(message.data as T);
                    }
                    this.forceUpdate();
                }
            });
        };
        // notify global stream
        const notify = (id: string, data?: T) => {
            $IOStream.notify({ id: id, data: data });
        };
        return { subscribe, notify };
    }
}


