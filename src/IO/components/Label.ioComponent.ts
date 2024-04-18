import { IO } from '../IO';
import { _classList, _components, tag } from '../libs/types.io';

interface iLabelIOComponent {
    callback?: (value: string) => void;
    placeholder?: string;
    value?: string;
    classList?: _classList;
    children?: _components;
}
export function LabelComponent(props: iLabelIOComponent) {
    const { classList, children } = props;

    const io = new IO(tag.INPUT);
    io.classList = classList;
    io.components = children;

    return io;
}

