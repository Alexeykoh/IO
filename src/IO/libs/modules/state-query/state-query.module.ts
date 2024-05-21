import { IO } from '../../../IO';
import { getID } from '../../helpers/get-id';
import { iStateQueryCallbacks } from '../../types/types.io';
import { ReRendering } from '../re-rendering/re-rendering.module';

export class StateQueryModule {
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

    public stateQuery<stateType>(
        // Query state asynchronously
        init: stateType | null,
        queryPromise: Promise<stateType>,
        callback?: iStateQueryCallbacks<stateType>
    ) {
        const key = getID(); // Get unique identifier for state
        this._state.set(key, init); // Initialize state with provided initial value

        // Function to refetch state asynchronously
        const refetch = () => {
            queryPromise
                .then((res) => {
                    this._state.set(key, res); // Set state with result of query
                    if (callback && callback.ok) {
                        callback.ok(res); // Execute OK callback if provided
                    }
                    this._update.update(); // Notify state elementor for update
                })
                .catch((err: Error) => {
                    if (callback && callback.error) {
                        callback.error(err); // Execute error callback if provided
                    }
                })
                .finally(() => {
                    this._update.update(); // Notify state elementor for update
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
