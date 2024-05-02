import { IO } from '../../../../IO/IO';
import { tag } from '../../../../IO/libs/types/types.io';

export function AuthPage() {
    const io = new IO(tag.SECTION, { text: 'auth' }, []);
    return io;
}
