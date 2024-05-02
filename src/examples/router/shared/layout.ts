import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import { Footer } from './footer';
import { Header } from './header';

export function Layout(children: (() => IO)[]) {
    const io = new IO(tag.MAIN);
    io.components = [Header, ...children, Footer];
    return io;
}
