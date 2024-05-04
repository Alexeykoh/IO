import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import { iTodo } from '../app';
import { Button } from './_button';
import { Description } from './_description';
import './_styles/_item.scss';

export function Item(params: iTodo, remTodo: (id: number) => void, completeTodo: (id: number) => void) {
    const io = new IO(tag.LI);

    io.classList = [
        'todo-item',
        () => {
            return params.complete ? 'complete' : 'in-progress';
        },
    ];
    // io.text = params.id;
    io.components = [
        () => Button('complete', () => completeTodo(params.id)), // complete button
        () => Description(params.description), // text of task
        () => Button('delete', () => remTodo(params.id)), // delete button
    ];
    return io;
}
