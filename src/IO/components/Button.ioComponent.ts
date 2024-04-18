import { IO } from '../IO';
import { _classList, tag } from '../libs/types.io';

interface iButtonIOComponent {
    callback?: () => void;
    text?: string;
    type?: 'button' | 'submit';
    classList?: _classList;
}
export function ButtonComponent(props: iButtonIOComponent) {
    const { callback, text, type, classList } = props;

    const io = new IO(tag.BUTTON);
    io.classList = classList;
    io.atr = { type: type };
    io.text = text;
    io.events = {
        click: () => {
            if (callback) {
                callback();
            }
        },
    };
    return io;
}
