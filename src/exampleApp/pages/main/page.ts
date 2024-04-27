import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';

export function MainPage() {
    const io = new IO(tag.SECTION, { text: 'main' }, []);
    return io;
}
