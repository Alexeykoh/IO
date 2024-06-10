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

    public update(node: IO): void {
        // Get the component in the DOM using its element ID
        const componentInDOM = getRef(this._node.elementID);

        // recursive mutate
        this._hydration.mutate(node, componentInDOM);

        // this._hydration.hydrate(this._node);
    }
    public forceRender(node: IO) {
        const componentInDOM = getRef(this._node.elementID);
        const newElement = this._hydration.hydrate(node);
        componentInDOM.replaceWith(newElement);
    }
}
