import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';

export function Title(text: string) {
    const io = new IO(tag.H2);
    io.classList = ['ui-title'];
    io.text = text;
    return io;
}
