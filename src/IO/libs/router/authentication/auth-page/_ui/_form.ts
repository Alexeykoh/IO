import { IO } from '../../../../modules/IO';
import { tag } from '../../../../modules/types.io';

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
