import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';

export function AuthPage() {
    const io = new IO(tag.SECTION, { text: 'auth' }, []);
    return io;
}
