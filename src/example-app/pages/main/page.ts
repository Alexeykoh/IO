import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';

export function MainPage() {
    const io = new IO(tag.SECTION, { text: 'main' }, [StreamComponent, NotifyComponent]);
    return io;
}

function StreamComponent() {
    const io = new IO(tag.DIV);
    io.text = 'streamer';
    io.stream().subscribe('123', (data) => {
        console.log('stream', data);
    });
    return io;
}

function NotifyComponent() {
    const io = new IO(tag.BUTTON);
    io.text = 'notifier';
    io.events = {
        click: () => {
            io.stream().notify('123', 'hello streamer');
        },
    };
    return io;
}
