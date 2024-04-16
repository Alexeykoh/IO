import { IOData } from './libs/data.io';
import { Hydration } from './libs/hydration.io';
import { _components, _tag, iIO, iStateQueryCallbacks, tGetState, tSetState } from './libs/types.io';

// IO class extends IOData
export class IO extends IOData {
    private _hydration: Hydration; // Instance of Hydration class

    constructor(tag: _tag, props?: iIO, children?: _components) {
        super(tag, props, children); // Call constructor of superclass
        this._hydration = new Hydration(); // Initialize Hydration instance
    }

    // Create and return a new HTMLElement
    private create(): HTMLElement {
        const newElement: HTMLElement = document.createElement(this.tag);
        return newElement;
    }

    // Render the IO element
    public render() {
        const resultElement = this.create(); // Create the element
        const props: iIO = {
            // Gather properties for the element
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
        // Hydrate the element with props and return
        const readyElement = this._hydration.hydrate(resultElement, props, this.elementID, this.elementRef);
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
}
