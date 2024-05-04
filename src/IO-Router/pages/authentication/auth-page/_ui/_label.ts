import { IO } from '../../../../../IO/IO';
import { tag } from '../../../../../IO/libs/types/types.io';

export function Label(title: string, children: (() => IO)[]) {
    const io = new IO(tag.LABEL);
    io.components = [() => new IO(tag.P, { text: title }), ...children];
    return io;
}
