import { IO } from '../../../../IO/IO';
import { tag } from '../../../../IO/libs/types/types.io';

export function Page404() {
    const io = new IO(tag.SECTION, { text: '404' }, []);
    return io;
}
