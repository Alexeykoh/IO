import { IONode, Root } from './IO/IONode';
import { iSignal, signal } from './IO/libs/Signal';
import { tag } from './IO/types/enums.enum';

interface iTasks {
    text: string;
}
// ===== EXAMPLE =====
const root = new Root(ToDo(), document.body);
console.log(root);
root.render();

function ToDo() {
    const taskList = signal<iTasks[]>([{ text: 'test task' }]);
    const io = new IONode(tag.DIV, {}, []);
    io.children = [TaskList(taskList), TodoForm(taskList)];

    return io;
}

function TaskList(list: iSignal<iTasks[]>) {
    const io = new IONode(tag.UL);
    list.effect = (data) => {
        console.log('list.effect', data);
        io.children = [
            ...list.value.map((el) => {
                return TaskItem(el.text);
            }),
        ];
    };
    return io;
}

function TaskItem(text: string) {
    const io = new IONode(tag.LI);
    io.text = text;
    return io;
}

function TodoForm(list: iSignal<iTasks[]>) {
    const io = new IONode(tag.FORM);
    const inputHandler = signal<string>('');
    io.children = [FormInput(inputHandler), FormButton()];
    io.eventList = {
        submit: (e) => {
            e?.preventDefault();
            list.value = [...list.value, { text: inputHandler.value }];
            inputHandler.value = '';
        },
    };
    return io;
}

function FormInput(inputHandler: iSignal<string>) {
    const io = new IONode(tag.INPUT);

    inputHandler.effect = (data) => {
        if (!data) {
            io.attributeList = { ...io.attributeList, value: data };
        }
    };
    io.eventList = {
        input: (e) => {
            const target = e?.target as HTMLInputElement;
            inputHandler.value = target.value;
        },
    };
    return io;
}

function FormButton() {
    const io = new IONode(tag.BUTTON);
    io.text = 'add task';
    io.attributeList = { type: 'submit' };
    return io;
}
