import { IO } from '../../../../modules/IO';
import { tag } from '../../../../modules/types.io';

export function Title(text: string) {
    const io = new IO(tag.H3);
    io.text = text;
    return io;
}
