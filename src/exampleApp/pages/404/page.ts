import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';

export function Page404() {
    const io = new IO(tag.SECTION, { text: '404' }, []);
    return io;
}
