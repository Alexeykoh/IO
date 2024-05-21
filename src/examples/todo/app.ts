import { IO } from '../../IO/IO';
import { tag } from '../../IO/libs/types/types.io';
import { Form } from './_ui/_form';
import { List } from './_ui/_list';

export interface iTodo {
    id: number;
    description: string;
    complete: boolean;
}

function Todo() {
    function addTodo(text: string) {
        // add new task
        setTaskList((prev) => [...prev, { id: Date.now(), description: text, complete: false }]);
    }
    function remTodo(id: number) {
        // remove task by id
        setTaskList((prev) => prev.filter((el) => el.id !== id));
    }
    function completeTodo(id: number) {
        // change complete status by id
        setTaskList(
            (prev) =>
                (prev = prev.map((el) => {
                    if (el.id === id) {
                        return { ...el, complete: !el.complete };
                    }
                    return { ...el };
                }))
        );
    }

    const io = new IO(tag.DIV);
    const [taskList, setTaskList] = io.state<iTodo[]>([]); // state with task list
    io.components = [() => Form(addTodo), () => List(taskList(), remTodo, completeTodo)]; // form & list with tasks
    return io;
}

// init App
export function AppTodo() {
    Todo()
        .render()
        .then((data) => {
            document.body.appendChild(data);
        });
}
