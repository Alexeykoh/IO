import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import { Title } from './UI/title';

export function Header() {
    const io = new IO(tag.HEADER);
    io.components = [() => Title('eCommerce Store')];
    return io;
}
