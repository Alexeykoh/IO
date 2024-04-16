import { IO } from './IO/IO';
import { IORoot, iPages } from './IO/libs/root.io';
import { tag } from './IO/libs/types.io';

// counter
function Counter() {
    const io = new IO(tag.DIV);
    const [counter, setCounter] = io.state<number>(0);
    io.components = [
        () =>
            new IO(tag.BUTTON, {
                text: '+++',
                events: {
                    click: () => {
                        setCounter(counter() + 1);
                    },
                },
            }),
        () => new IO(tag.DIV, { text: counter }),
        () =>
            new IO(tag.BUTTON, {
                text: '---',
                events: {
                    click: () => {
                        setCounter(counter() - 1);
                    },
                },
            }),
    ];
    return io;
}

// pages
function MainPge() {
    const io = new IO(tag.SECTION);
    io.text = 'page_1';
    return io;
}
function SecondPage() {
    const io = new IO(tag.SECTION);
    io.text = 'page_2';
    io.components = [Counter];
    return io;
}

const pages: iPages<'main' | 'second'>[] = [
    { name: 'main', page: MainPge },
    { name: 'second', page: SecondPage },
];

const root = new IORoot({
    rootElement: document.body,
    rootComponent: () => new IO(tag.MAIN),
});
root.pages(pages);
root.route('main');

setTimeout(() => {
    root.route('second');
}, 1000);
