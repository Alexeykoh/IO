import { IO } from '../../IO/IO';
import { tag } from '../../IO/libs/types/types.io';

export function Footer() {
    const io = new IO(tag.FOOTER);
    io.text = 'footer';
    return io;
}
