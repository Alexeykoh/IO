import { IO } from '../../IO/libs/modules/IO';
import { tag } from '../../IO/libs/modules/types.io';
import { Title } from './UI/title';

export function Header() {
    const io = new IO(tag.HEADER);
    io.components = [() => Title('eCommerce Store')];
    return io;
}
