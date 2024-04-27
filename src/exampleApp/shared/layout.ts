import { IO } from '../../IO/libs/modules/IO';
import { tag } from '../../IO/libs/modules/types.io';
import { Header } from './header';
import { Footer } from './footer';

export function Layout(children: (() => IO)[]) {
    const io = new IO(tag.MAIN);
    io.components = [Header, ...children, Footer];
    return io;
}
