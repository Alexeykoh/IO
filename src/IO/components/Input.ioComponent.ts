import { IO } from '../IO';
import { _classList, tag } from '../libs/types.io';

const errorsText = {
    name: '',
    password: '',
    email: '',
};

interface iValidationMessage {
    text: string;
    result: boolean;
}

interface iInputIOComponent {
    callback?: (value: string, validation: iValidationMessage | undefined) => void;
    placeholder?: string;
    value?: string;
    classList: _classList;
    validation?: 'name' | 'password' | 'email';
}
export function InputComponent(props: iInputIOComponent) {
    // !!! IN TEST 
    const { callback, placeholder, value, classList, validation } = props;

    const io = new IO(tag.INPUT);
    const [validate, setValidate] = io.state<boolean>(false);

    io.classList = [...classList, () => (validate() ? 'ok' : 'err')];
    io.atr = { value: value, placeholder: placeholder };
    io.events = {
        input: (event) => {
            const text = (event?.target as HTMLInputElement).value;
            if (callback) {
                let validationMessage: iValidationMessage | undefined;
                if (validation) {
                    // todo: write validation methods and errors
                }
                callback(text, validationMessage);
            }
        },
    };

    return io;
}
