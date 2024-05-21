import { breadcrumbs, navigate } from '../../../IO-Root/root.io';
import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import { LogoIcon } from './UI/logo-icon';
import { Title } from './UI/title';

export function Header() {
    const io = new IO(tag.HEADER);
    io.components = [Logo, () => breadcrumbs()];
    return io;
}

function Logo() {
    const io = new IO(tag.DIV);
    io.events = { click: () => navigate('/products') };
    io.classList = ['logo'];
    io.atr = { style: 'display: flex; align-items: center; gap: 8px;' };
    io.components = [LogoIcon, () => Title('eCommerce Store')];
    return io;
}
