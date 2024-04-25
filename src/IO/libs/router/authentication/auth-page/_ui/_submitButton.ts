import { IO } from '../../../../../IO';
import { tag } from '../../../../modules/types.io';

export function SubmitButton(text: string) {
    const io = new IO(tag.BUTTON);
    io.text = text;
    return io;
}
