import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';

export function Description(text: string) {
    const io = new IO(tag.P);
    io.text = text;
    io.classList = ['ui-description'];
    return io;
}
