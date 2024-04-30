import { IO } from '../../../../../IO/IO';
import { tag } from '../../../../../IO/libs/types/types.io';
import { Form } from './_form';
import { Input } from './_input';
import { Label } from './_label';
import { SubmitButton } from './_submitButton';
import { Title } from './_title';

export function LoginSection() {
    const io = new IO(tag.SECTION);
    io.components = [
        () => Title('LOGIN'),
        () =>
            Form([
                () => Label('login', [() => Input()]),
                () => Label('password', [() => Input()]),
                () => Label('', [() => SubmitButton('submit')]),
            ]),
    ];
    return io;
}
