import { IO } from '../../modules/IO';
import { tag } from '../../modules/types.io';
import { path } from '../types/types';
import './404.scss';

export function Page404(navigate: (path: path) => void) {
    const io = new IO(tag.SECTION);
    io.classList = ['page-404'];
    io.components = [() => Title('404 page'), () => LinkButton('main', '/', navigate)];
    return io;
}

export function LinkButton(text: string, link: path, navigate: (path: path) => void) {
    const io = new IO(tag.BUTTON);
    io.text = 'back to: ' + text;
    io.events = {
        click: () => {
            navigate(link);
        },
    };
    return io;
}

export function Title(text: string) {
    const io = new IO(tag.H1);
    io.text = text;
    return io;
}
