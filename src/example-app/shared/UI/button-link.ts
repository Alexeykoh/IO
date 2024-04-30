import { path } from '../../../IO-Router/types/types';
import { IO } from '../../../IO/IO';
import { navigate } from '../../../IO/libs/modules/root/root.io';
import { tag } from '../../../IO/libs/types/types.io';

export function ButtonLink(name: string, link: path) {
    const io = new IO(tag.BUTTON);
    io.text = name;
    io.classList = ['ui-button-link'];
    io.events = {
        click: () => {
            navigate(link);
        },
    };
    return io;
}
