import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import { map } from '../../../IO/utils/map';
import { iTodo } from '../app';
import { Item } from './_item';

export function List(todoList: iTodo[], remTodo: (id: number) => void, completeTodo: (id: number) => void) {
    const io = new IO(tag.UL);

    // map method for generate IO components by template
    io.components = map(todoList, (params) => Item(params, remTodo, completeTodo));

    return io;
}
