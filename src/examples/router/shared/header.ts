import { IO } from '../../../IO/IO';
import { HistoryNavigate, breadcrumbs } from '../../../IO/libs/modules/root/root.io';
import { tag } from '../../../IO/libs/types/types.io';
import { Title } from './UI/title';

export function Header() {
    const io = new IO(tag.HEADER);
    io.components = [
        () => Title('eCommerce Store'),
        () => NavigateButton('back'),
        () => NavigateButton('next'),
        () => breadcrumbs(),
    ];
    return io;
}

function NavigateButton(vector: 'back' | 'next') {
    const io = new IO(tag.BUTTON);
    io.text = `to ${vector}`;
    io.events = { click: () => HistoryNavigate(vector) };
    return io;
}
