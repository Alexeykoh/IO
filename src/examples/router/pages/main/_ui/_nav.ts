import { navigate } from '../../../../../IO-Root/root.io';
import { path } from '../../../../../IO-Router/types/types';
import { IO } from '../../../../../IO/IO';
import { tag } from '../../../../../IO/libs/types/types.io';

export function Nav() {
    const io = new IO(tag.UL);
    return io;
}

export function NavItem(name: string, route: path) {
    const io = new IO(tag.LI);
    io.text = name;
    io.events = {
        click: () => {
            navigate(route);
        },
    };
    return io;
}
