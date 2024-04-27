import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';
import { path } from '../../../IO/libs/router/types/types';
import { navigate } from '../../../IO/root/root.io';

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
