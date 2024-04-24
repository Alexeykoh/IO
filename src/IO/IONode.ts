// ===== NODE =====

import { CreateElement, UpdateElement } from './libs/createtElement';
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

        //extra fields
        this._id = getID();
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
        console.group('[update]');
        const recursion = (_node: IONode) => {
            console.warn('[update/rec/hl]: start recursion in', _node.tag, _node.id, _node);
            const parentElement = document.getElementById(_node._id);
            if (!parentElement) {
                return;
            }
            console.log(`[update/rec/hl - ${_node.tag}]: update high level element`);
            UpdateElement(_node, parentElement as HTMLElement);
            const children = _node._children;

            if (children.length) {
                const sliceChildren = children;
                const childNode = parentElement.children;
                const newParentElement = document.getElementById(_node._id);
                console.log('[find parent element]', _node._tag, newParentElement?.childNodes);
                console.log(`[update/rec/hl - ${_node.tag}]: element has ${children.length} IO children`);
                console.log(`[update/rec/hl - ${_node.tag}]: element has ${childNode.length} childNodes`);

                console.log(`[update/rec/child - ${_node.tag}]: list of IO children: `, children);
                console.log(`[update/rec/child - ${_node.tag}]: list of childNodes: `, childNode);

                console.group(`[update/rec/hl - ${_node.tag}]: start children iteration`);

                sliceChildren.forEach((child, ind) => {
                    console.log(`[update/rec/child - ${child.tag}]: child info`, ind, child.tag, childNode[ind], child);
                    if (childNode[ind] && sliceChildren) {
                        UpdateElement(child, childNode[ind] as HTMLElement);
                        console.log(
                            `%c [update/rec/child - ${child.tag}]: update current element`,
                            'background: orange; color: black',
                            child.tag
                        );
                    } else {
                        const newChild = CreateElement(child);
                        console.log(
                            `%c [update/rec/child - ${child.tag}]: create new element`,
                            'background: pink; color: black',
                            child.tag,
                            newChild
                        );
                        parentElement.appendChild(newChild);
                    }
                    console.log(`[update/rec/child]: init new recursion`);
                    recursion(child);
                });
                console.groupEnd();
            }
        };

        recursion(this);
        this._snapshot = { ...this };
        console.groupEnd();
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
