import { IO } from '../../../IO';
import { getRef } from '../../helpers/get-ref';

export class ReRendering {
    private _node: IO;

    constructor(node: IO) {
        this._node = node;
    }

    public update() {
        // Get the component in the DOM using its element ID
        const componentInDOM = getRef(this._node.elementID);

        // Render the new component
        const newComponent = this._node.render();
        newComponent.focus();

        // Replace the existing component in the DOM with the new one
        componentInDOM?.replaceWith(newComponent);
    }
}
