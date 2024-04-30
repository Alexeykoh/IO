import { IOInput } from '../../../../../IO/components/io-input';
import { tag } from '../../../../../IO/libs/types/types.io';

export function Input() {
    const io = new IOInput(tag.INPUT, {}, [], (data) => {
        console.log(data);
    });
    return io;
}
