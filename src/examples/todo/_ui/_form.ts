import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import { Button } from './_button';
import { Input } from './_input';
import './_styles/_form.scss';

export function Form(addTodo: (text: string) => void) {
    const io = new IO(tag.FORM);
    const [input, setInput] = io.state<string>('', false);

    io.classList = ['todo-form'];
    io.components = [() => Input(setInput), () => Button('add task')];
    io.events = {
        submit: (e) => {
            e?.preventDefault();
            console.log(input());
            if (input()) {
                addTodo(input());
            }
        },
    };

    return io;
}
