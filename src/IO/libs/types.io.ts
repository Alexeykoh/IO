import { IO } from '../IO';
export type tGetState<T> = () => T;
export type tSetState<T> = (value: T) => void;
export type qStateErr = (err: Error) => void;
export type qStateLoading = () => void;

export type IOArray = (() => IO)[];

export enum tag {
    DIV = 'div',
    H1 = 'h1',
    H2 = 'h2',
    H3 = 'h3',
    H4 = 'h4',
    H5 = 'h5',
    H6 = 'h6',
    P = 'p',
    SPAN = 'span',
    A = 'a',
    IMG = 'img',
    UL = 'ul',
    OL = 'ol',
    LI = 'li',
    NAV = 'nav',
    HEADER = 'header',
    FOOTER = 'footer',
    SECTION = 'section',
    ARTICLE = 'article',
    ASIDE = 'aside',
    MAIN = 'main',
    FORM = 'form',
    INPUT = 'input',
    BUTTON = 'button',
    LABEL = 'label',
    TEXTAREA = 'textarea',
    SELECT = 'select',
    OPTION = 'option',
    TABLE = 'table',
    TR = 'tr',
    TD = 'td',
    TH = 'th',
    THEAD = 'thead',
    TBODY = 'tbody',
    TFOOT = 'tfoot',
    CAPTION = 'caption',
    VIDEO = 'video',
    AUDIO = 'audio',
    IFRAME = 'iframe',
    CANVAS = 'canvas',
    SVG = 'svg',
}

export type _tag = tag | string;
export type _classList = ((() => string) | string)[];
export type _id = (number | string) | (() => string | number);
export type _events = { [key: string]: (e?: Event) => void };
export type _atr = { [key: string]: (() => string) | string };
export type _children = IO[];
export type _components = IOArray | (() => IOArray);
export type _text = (() => string) | string;
export type _inner = string | null;

export interface iIO {
    tag?: _tag;
    classList?: _classList;
    id?: _id;
    events?: _events;
    atr?: _atr;
    children?: _children;
    components?: _components;
    text?: _text;
    inner?: _inner;
}

export interface iQueryStatus<T> {
    data: () => T;
    loading: boolean;
    error: Error | null;
}
export interface iIORoot {
    rootElement: HTMLElement;
    rootComponent: (() => IO) | null;
}

export interface iPage {
    [key: string]: () => IO;
}

export interface iStateQueryCallbacks<T> {
    ok?: (res: T) => void;
    error?: (err: Error) => void;
}
