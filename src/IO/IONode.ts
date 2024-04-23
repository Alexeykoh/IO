// ===== NODE =====

import { CreateElement } from './libs/createtElement';
import { _attributeList, _children, _classList, _eventList, _params, _tag, _text } from './types/io.interface';

export function getID() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export class IONode {
    //extra fields
    private _id: string;

    // tag fields
    private _tag: _tag;

    // params fields
    private _text: _text;
    private _classList: _classList;
    private _eventList: _eventList;
    private _attributeList: _attributeList;

    // children fields
    private _children: _children;

    // snapshot
    private _snapshot: this;

    constructor(tag: _tag, params?: _params, children?: _children) {
        //extra fields
        this._id = getID();

        // tag fields
        this._tag = tag;

        // params fields
        this._text = params?.text || null;
        this._classList = params?.classList || null;
        this._eventList = params?.eventList || null;
        this._attributeList = params?.attributeList || null;

        // children fields
        this._children = children || [];

        // snapshot
        this._snapshot = { ...this };
    }

    // id
    get id() {
        return this._id;
    }

    // tag
    get tag() {
        return this._tag;
    }

    // eventList
    set eventList(value: _eventList) {
        this._eventList = value;
        this.update();
    }

    get eventList() {
        return this._eventList;
    }

    // attributeList
    set attributeList(value: _attributeList) {
        this._attributeList = value;
        this.update();
    }

    get attributeList() {
        return this._attributeList;
    }

    // classList
    set classList(value: _classList) {
        this._classList = value;
        this.update();
    }

    get classList() {
        return this._classList;
    }

    // text
    set text(value: _text) {
        this._text = value;
        this.update();
    }

    get text() {
        return this._text;
    }

    // children
    set children(value: IONode[]) {
        this._children = value;
        this.update();
    }

    get children() {
        return this._children;
    }

    //methods
    update() {
        console.group('compare');
        console.log('snapshot node', this._snapshot);
        console.log('new node', this);
        console.groupEnd();

        const elementInDOM = document.getElementById(this._id);
        const newElement = CreateElement(this);

        const recursion = (_node: IONode, _element: HTMLElement) => {
            const children = _node.children;

            if (children.length) {
                children.forEach((child) => {
                    const childElement = CreateElement(child);
                    _element.appendChild(childElement);

                    recursion(child, childElement);
                });
            }
        };

        recursion(this, newElement);
        elementInDOM?.replaceWith(newElement);

        this._snapshot = { ...this };
    }
}

// ===== ROOT =====
export class Root {
    rootNode: IONode;
    rootElement: HTMLElement;
    constructor(rootNode: IONode, rootElement: HTMLElement) {
        this.rootNode = rootNode;
        this.rootElement = rootElement;
    }

    render() {
        const recursion = (_node: IONode, element: HTMLElement) => {
            const newElement = CreateElement(_node);
            const children = _node.children;
            element.appendChild(newElement);
            if (children.length) {
                children.forEach((child) => {
                    recursion(child, newElement);
                });
            }
        };

        recursion(this.rootNode, this.rootElement);
    }
}
