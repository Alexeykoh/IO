import { IO } from './IO/IO';

function Root() {
    const io = new IO({ tag: 'div' });
    const [text, setText] = io.state<string>('hello world');
    io.text = text;
    io.components = [() => new IO({ tag: 'p', text: text })];
    console.log(io);
    return io;
}

document.body.appendChild(Root().get());
