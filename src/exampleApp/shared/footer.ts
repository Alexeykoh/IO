import { IO } from '../../IO/libs/modules/IO';
import { tag } from '../../IO/libs/modules/types.io';

export function Footer() {
    const io = new IO(tag.FOOTER);
    io.text = 'footer';
    return io;
}
