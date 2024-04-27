import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';

export function Badge(text: string) {
    const io = new IO(tag.SPAN);
    io.text = text;
    io.classList = ['ui-badge'];
    return io;
}
