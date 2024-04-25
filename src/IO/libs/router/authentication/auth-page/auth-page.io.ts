import { IO } from '../../../../IO';
import { IOInput } from '../../../../components/IOInput';
import { tag } from '../../../types.io';

export function IOAuthPage() {
    const io = new IO(tag.MAIN);
    const [form, setForm] = io.state<boolean>(false);

    io.components = [
        () =>
            new IO(tag.BUTTON, {
                text: 'to registration',
                events: {
                    click: () =>
                        setForm((data) => {
                            console.log('data', data);
                            return !data;
                        }),
                },
            }),
        form() ? LoginSection : RegistrationSection,
    ];
    return io;
}

function LoginSection() {
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

function RegistrationSection() {
    const io = new IO(tag.SECTION);
    io.components = [
        () => Title('REGISTRATION'),
        () =>
            Form([
                () => Label('login', [() => Input()]),
                () => Label('password', [() => Input()]),
                () => Label('password*', [() => Input()]),
                () => Label('', [() => SubmitButton('submit')]),
            ]),
    ];
    return io;
}

export function Form(children: (() => IO)[]) {
    const io = new IO(tag.FORM);
    io.components = [...children];
    io.events = {
        submit: (e) => {
            e?.preventDefault();
        },
    };
    return io;
}

export function Title(text: string) {
    const io = new IO(tag.H3);
    io.text = text;
    return io;
}

export function Input() {
    const io = new IOInput(tag.INPUT, {}, [], (data) => {
        console.log(data);
    });
    return io;
}

export function SubmitButton(text: string) {
    const io = new IO(tag.BUTTON);
    io.text = text;
    return io;
}

export function Label(title: string, children: (() => IO)[]) {
    const io = new IO(tag.LABEL);
    io.components = [() => new IO(tag.P, { text: title }), ...children];
    return io;
}
