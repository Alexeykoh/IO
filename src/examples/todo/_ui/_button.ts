import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import './_styles/_button.scss';

export function Button(text: string, event?: () => void) {
    const io = new IO(tag.BUTTON);

    io.classList = ['todo-button'];
    io.text = text;
    if (event) {
        io.events = {
            click: event,
        };
    }

    return io;
}
