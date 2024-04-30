import { IO } from '../../../IO';
import { getID } from '../../helpers/get-id';
import { new_tGetState, tGetState } from '../../types/types.io';
import { ReRendering } from '../re-rendering/re-rendering.module';

export class StateModule {
    // root
    private readonly _node: IO;
    private readonly _state: Map<string, unknown>;

    // module
    private _update: ReRendering;

    constructor(node: IO) {
        // root
        this._state = new Map<string, unknown>();
        this._node = node;

        // module
        this._update = new ReRendering(this._node);
    }

    public state<stateType>(init: stateType, update: boolean = true, callback?: (val: stateType) => void) {
        // Manage state of the element
        const key = getID(); // Get unique identifier for state
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
                this._update.update();
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
}
