import { IO } from './IO/IO';
import { Root } from './IO/IONode';
import { iSignal, signal } from './IO/libs/Signal';
import { tag } from './IO/types/enums.enum';

interface iList {
    id: number;
    count: number;
}
// ===== EXAMPLE =====
const root = new Root(EditableList(), document.body);
console.log(root);
root.render();

function EditableList() {
    const list = signal<iList[]>([{ count: 0, id: Date.now() }]);
    function createNew() {
        list.value = [...list.value, { count: 0, id: Date.now() }];
    }
    const io = new IO(tag.DIV);
    io.children = [List(list), Button('create new', createNew)];
    return io;
}

function List(list: iSignal<iList[]>) {
    const io = new IO(tag.UL);
    function increase(id: number) {
        list.value = list.value.map((el) => {
            if (el.id === id) {
                return { ...el, count: el.count + 1 };
            } else {
                return el;
            }
        });
    }
    list.effect = (data) => {
        io.children = data.map((el) => {
            return Item(el, increase);
        });
    };
    return io;
}

function Item(props: iList, increase: (id: number) => void) {
    const io = new IO(tag.LI);
    io.attributeList = { title: props.id.toString() };
    io.text = props.count.toString();
    io.children = [
        Button('increase', () => {
            increase(props.id);
        }),
    ];
    return io;
}

function Button(text: string, event: () => void) {
    const io = new IO(tag.BUTTON);
    io.text = text;
    io.children = [];
    io.eventList = { click: event };
    return io;
}
