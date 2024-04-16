import { IO } from '../IO';
export type tGetState<T> = () => T;
export type tSetState<T> = (value: T) => void;

export type ElementorArray = (() => IO)[];

export type tagType =
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'p'
    | 'span'
    | 'a'
    | 'img'
    | 'ul'
    | 'ol'
    | 'li'
    | 'nav'
    | 'header'
    | 'footer'
    | 'section'
    | 'article'
    | 'aside'
    | 'main'
    | 'form'
    | 'input'
    | 'button'
    | 'label'
    | 'textarea'
    | 'select'
    | 'option'
    | 'table'
    | 'tr'
    | 'td'
    | 'th'
    | 'thead'
    | 'tbody'
    | 'tfoot'
    | 'caption'
    | 'video'
    | 'audio'
    | 'iframe'
    | 'canvas'
    | 'svg';

export interface iElementor {
    tag: tagType;
    classList?: ((() => string) | string)[];
    id?: (number | string) | (() => string | number);
    events?: { [key: string]: (e?: Event) => void };
    atr?: { [key: string]: (() => string) | string };
    children?: IO[];
    components?: (() => IO)[];
    text?: (() => string) | string;
    inner?: string;
    onMount?: () => void;
}

export interface iElementorRoot {
    rootElement: HTMLElement;
}

export interface iPage {
    [key: string]: () => IO;
}
