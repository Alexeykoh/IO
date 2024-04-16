import { IO } from './IO/IO';

const mockFetch = new Promise<string>((res, rej) => {
    setTimeout(() => {
        res('hello world 222');
    }, 1000);
});

function Root() {
    const io = new IO({ tag: 'div' });
    const { data } = io.stateQuery<string>('hello world', mockFetch);
    io.components = [() => new IO({ tag: 'p', text: data })];

    return io;
}

document.body.appendChild(Root().render());
