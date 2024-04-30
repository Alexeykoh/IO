import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';

export function Badge(text: string) {
    const io = new IO(tag.SPAN);
    io.text = text;
    io.classList = ['ui-badge'];
    return io;
}
