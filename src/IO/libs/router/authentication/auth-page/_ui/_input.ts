import { IOInput } from '../../../../../components/IOInput';
import { tag } from '../../../../modules/types.io';

export function Input() {
    const io = new IOInput(tag.INPUT, {}, [], (data) => {
        console.log(data);
    });
    return io;
}
