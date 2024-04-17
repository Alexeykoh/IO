import { IO } from './IO/IO';
import { Root } from './IO/libs/root.io';
import { tag } from './IO/libs/types.io';

interface iToDo {
    text: string;
}
type ToDo = iToDo[];

const mockList: ToDo = [{ text: 'hello world' }, { text: 'minecraft is my life!' }];
const mockList_2: ToDo = [{ text: 'hello world' }, { text: 'minecraft is my life!' }, { text: 'BISC rule!' }];

const root = new Root(StartPage(), document.body);
root.render();

function StartPage() {
    const io = new IO(tag.SECTION);
    io.nodes = [ToDoComponent()];
    return io;
}

function ToDoComponent() {
    const io = new IO(tag.DIV);
    const [todo, setTodo] = io.signal<ToDo>(mockList);
    io.nodes = todo().map((el) => {
        return ListItem(el.text);
    });

    setTimeout(() => {
        setTodo(mockList_2);
    }, 1000);

    return io;
}

function Form() {
    const io = new IO(tag.FORM);
    io.nodes = [FormInput(), FormButton()];
    return io;
}

function List(todo: () => ToDo) {
    const io = new IO(tag.UL);
    io.nodes = todo().map((el) => {
        return ListItem(el.text);
    });
    return io;
}

function ListItem(text: string) {
    const io = new IO(tag.LI);
    io.text = text;
    io.nodes = [];
    return io;
}

function FormInput() {
    const io = new IO(tag.INPUT);
    io.nodes = [];
    return io;
}

function FormButton() {
    const io = new IO(tag.BUTTON);
    io.text = 'add task';
    io.nodes = [];
    return io;
}

const kek = [FormInput, FormButton];
kek.forEach((el) => {
    console.log(el);
});
