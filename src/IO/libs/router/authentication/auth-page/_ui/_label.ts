import { IO } from '../../../../modules/IO';
import { tag } from '../../../../modules/types.io';

export function Label(title: string, children: (() => IO)[]) {
    const io = new IO(tag.LABEL);
    io.components = [() => new IO(tag.P, { text: title }), ...children];
    return io;
}
