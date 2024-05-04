import { IO } from '../../../IO/IO';
import { tSetState, tag } from '../../../IO/libs/types/types.io';
import './_styles/_input.scss';

export function Input(input: tSetState<string>) {
    const io = new IO(tag.INPUT);

    io.classList = ['todo-input'];
    io.atr = { placeholder: 'write new task...' };
    io.events = {
        input: (e) => {
            const _text = (e?.target as HTMLInputElement).value;
            input(_text);
        },
    };

    return io;
}
