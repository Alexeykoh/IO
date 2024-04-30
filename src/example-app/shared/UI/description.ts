import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';

export function Description(text: string) {
    const io = new IO(tag.P);
    io.text = text;
    io.classList = ['ui-description'];
    return io;
}
