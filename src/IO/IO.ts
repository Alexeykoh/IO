import { Hydration } from './libs/hydration.io';
import { IONode } from './libs/node.io';
import { _components, _tag, iIO, iStateQueryCallbacks, tGetState, tSetState } from './libs/types.io';

// IO class extends IOData
export class IO extends IONode {
    public _hydration: Hydration; // Instance of Hydration class

    constructor(tag: _tag, props?: iIO, children?: _components) {
        super(tag, props, children); // Call constructor of superclass
        this._hydration = new Hydration(); // Initialize Hydration instance
    }

    // Render the IO element
    public render() {
        // Hydrate the element with props and return
        const readyElement = this._hydration.hydrate(this);
        return readyElement;
    }

    // Force update the element
    public forceUpdate() {
        this.$stateElementor.notify(this); // Notify state elementor for update
    }

    // Manage state of the element
    public state<stateType>(init: stateType, update: boolean = true) {
        const key = this.getID(); // Get unique identifier for state
        this._state.set(key, init); // Initialize state with provided initial value

        // Define setter function for state
        const set = (value: stateType) => {
            this._state.set(key, value); // Set new value for state
            if (update) {
                this.$stateElementor.notify(this); // Notify state elementor for update
            }
        };

        // Define getter function for state
        const get = () => {
            return this._state.get(key); // Get current value of state
        };

        return [get, set] as [tGetState<stateType>, tSetState<stateType>]; // Return getter and setter
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

    public signal<signalType>(init: signalType, update: boolean = true) {
        const key = this.getID(); // Get unique identifier for state
        this._state.set(key, init); // Initialize state with provided initial value

        // Define setter function for state
        const set = async (value: signalType) => {
            console.log('set state');

            this._state.set(key, value); // Set new value for state

            const componentInDOM = this.getRef(this.elementID);
            const componentInDOMCopy = componentInDOM.cloneNode(false);

            // console.log('this.getRef(this.elementID)', this.getRef(this.elementID));

            rec(this, componentInDOMCopy).then(() => {
                componentInDOM.replaceWith(componentInDOMCopy);
                console.log(componentInDOMCopy);
            });
        };

        async function rec(_node: IO, _el: HTMLElement | Node) {
            const element = _node.render();
            const children = _node.nodes;
            if (children?.length) {
                children.forEach((child) => {
                    const childElement = child.render();
                    _el.appendChild(childElement);
                    rec(child, element);
                });
            }
            return _el;
        }

        // Define getter function for state
        const get = () => {
            console.log('get state');
            return this._state.get(key); // Get current value of state
        };

        return [get, set] as [tGetState<signalType>, tSetState<signalType>]; // Return getter and setter
    }
}
