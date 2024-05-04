import { IO } from '../../../../../IO/IO';
import { tag } from '../../../../../IO/libs/types/types.io';

export function SubmitButton(text: string) {
    const io = new IO(tag.BUTTON);
    io.text = text;
    return io;
}
