import { IO } from '../IO';
import { _classList, _components, tag } from '../libs/types.io';

interface iFormIOComponent {
    callback?: (formElement: HTMLFormElement) => void;
    classList?: _classList;
    children?: _components;
}
export function FormComponent(props: iFormIOComponent) {
    const { callback, classList, children } = props;

    const io = new IO(tag.FORM);
    io.classList = classList;
    io.components = children;
    io.events = {
        submit: (event) => {
            const formElement = event?.target as HTMLFormElement;
            if (callback) {
                callback(formElement);
            }
        },
    };
    return io;
}
