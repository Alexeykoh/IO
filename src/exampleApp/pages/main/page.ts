import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';
import { Historynavigate } from '../../../IO/root/root.io';

export function MainPage() {
    const io = new IO(tag.SECTION, { text: 'main' }, [button_previos, button_next]);

    return io;
}
function button_next() {
    const io = new IO(tag.BUTTON, { text: 'Next' }, []);
    io.events = {
        click: () => {
            Historynavigate("next");
        },
    };
    return io;
}
function button_previos() {
    const io = new IO(tag.BUTTON, { text: 'previos' }, []);
    io.events = {
        click: () => {
            Historynavigate("back");
        },
    };
    return io;
}
