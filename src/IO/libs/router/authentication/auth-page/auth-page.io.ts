import { IO } from '../../../modules/IO';
import { tag } from '../../../modules/types.io';
import { LoginSection } from './_ui/_loginSection';
import { RegistrationSection } from './_ui/_registrationSection';

export function IOAuthPage() {
    const io = new IO(tag.MAIN);
    const [form, setForm] = io.state<boolean>(false);

    function cond() {
        if (form()) {
            return LoginSection();
        } else {
            return RegistrationSection();
        }
    }

    io.components = [
        () =>
            new IO(tag.BUTTON, {
                text: 'to registration',
                events: {
                    click: () => {
                        setForm((data) => {
                            return !data;
                        });
                    },
                },
            }),
        cond,
    ];
    return io;
}
