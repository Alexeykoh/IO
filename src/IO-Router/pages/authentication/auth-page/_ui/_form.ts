import { IO } from '../../../../../IO/IO';
import { tag } from '../../../../../IO/libs/types/types.io';

export function Form(children: (() => IO)[]) {
    const io = new IO(tag.FORM);
    io.components = [...children];
    io.events = {
        submit: (e) => {
            e?.preventDefault();
        },
    };
    return io;
}
