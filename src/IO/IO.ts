import { IONode } from './IONode';
import { _children, _params, _tag } from './types/io.interface';

export class IO extends IONode {
    constructor(tag: _tag, params?: _params, children?: _children) {
        super(tag, params, children);
    }
}
