import { IO } from '../../../IO';
import { getRef } from '../../helpers/get-ref';
import { Hydration } from '../hydration/hydration.module';

export class ReRendering {
    // root
    private _node: IO;

    // module
    private _hydration: Hydration;

    constructor(node: IO) {
        // root
        this._node = node;

        // module
        this._hydration = new Hydration();
    }

    public update(): void {
        // Get the component in the DOM using its element ID
        const componentInDOM = getRef(this._node.elementID);

        // recursive mutate
        if (this._node && componentInDOM) {
            this._hydration.mutate(this._node, componentInDOM);
        } else {
            console.warn('componentInDOM not found!');
        }
    }
}
