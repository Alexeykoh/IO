import { IO } from './IO/IO';
import { InputComponent } from './IO/components/Input.ioComponent';
import { IORoot, iPages } from './IO/libs/root.io';
import { tag } from './IO/libs/types.io';

interface iTodo {
    id: number;
    text: string;
}
type ToDo = iTodo[];

// pages
const pages: iPages<'main'>[] = [{ name: 'main', page: ToDo }];

// init root
const root = new IORoot({
    rootElement: document.body,
    rootComponent: () => new IO(tag.MAIN),
});
root.pages(pages);
root.route('main');

// components
function ToDo() {
    const mockToDo: ToDo = [{ id: 1, text: ' hello world' }];
    let idCounter = 1;

    function newTodo(text: string) {
        const newTodo: iTodo = { id: (idCounter += 1), text };
        setTodo((data) => {
            console.log(newTodo);
            return [...data, newTodo];
        });
    }

    const io = new IO(tag.SECTION);
    const [todo, setTodo] = io.state<ToDo>(mockToDo);
    io.components = [() => Form(newTodo), () => List(todo())];
    return io;
}

function Form(newTodo: (text: string) => void) {
    function submitHandler() {
        newTodo(input());
    }
    function inputHandler(text: string) {
        setInput(text);
    }

    const io = new IO(tag.DIV);
    const [input, setInput] = io.state<string>('new todo', false);
    io.components = [() => Input(inputHandler), () => Button(submitHandler)];
    return io;
}

function Input(input: (text: string) => void) {
    // const io = new IO(tag.INPUT);
    // io.events = {
    //     input: (e) => {
    //         const text = (e?.target as HTMLInputElement).value;
    //         input(text);
    //     },
    // };
    // return io;
    
    return InputComponent({callback: input,classList: ['todoInput']})
}

function Button(submit: () => void) {
    const io = new IO(tag.BUTTON);
    io.text = 'add new';
    io.events = {
        click: () => {
            submit();
        },
    };
    return io;
}

function List(todo: ToDo) {
    const io = new IO(tag.UL);
    io.components = todo.map((el) => {
        return () => Item(el.text);
    });
    return io;
}

function Item(text: string) {
    const io = new IO(tag.LI);
    io.text = text;
    return io;
}
