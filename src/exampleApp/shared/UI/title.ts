import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';

export function Title(text: string) {
    const io = new IO(tag.H2);
    io.classList = ['ui-title'];
    io.text = text;
    return io;
}
