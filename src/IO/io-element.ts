type ioTag = string;
type ioInner = string | undefined;
type ioClassList = string[] | undefined;
type ioEventList = { [key: string]: (e?: Event) => void } | undefined;
type ioAttributes = { [key: string]: string } | undefined;
type ioText = string | undefined;
type ioElementLink = HTMLElement | null;
interface iIOElement {
    tag: ioTag;
    inner?: ioInner;
    classList?: ioClassList;
    eventList?: ioEventList;
    attributes?: ioAttributes;
    text?: ioText;
}

export class IOElement {
    protected _tag: ioTag;
    protected _classList?: ioClassList;
    protected _inner?: ioInner;
    protected _eventList?: ioEventList;
    protected _attributes?: ioAttributes;
    protected _text?: ioText;

    public elementLink: ioElementLink;

    constructor(params: iIOElement) {
        this._tag = params.tag;
        this._classList = params.classList;
        this._inner = params.inner;
        this._eventList = params.eventList;
        this._attributes = params.attributes;
        this._text = params.text;

        this.elementLink = null;
    }

    // Getters
    get tag() {
        return this._tag;
    }
    get classList(): ioClassList {
        return this._classList;
    }

    get inner(): ioInner {
        return this._inner;
    }

    get eventList(): ioEventList {
        return this._eventList;
    }

    get attributes(): ioAttributes {
        return this._attributes;
    }

    get text(): ioText {
        return this._text;
    }

    // Setters
    set tag(value: ioTag) {
        this._tag = value;
    }

    set classList(value: ioClassList) {
        this._classList = value?.map((el) => {
            const regex = /\s/g;
            return el.replace(regex, '');
        });
    }

    set inner(value: ioInner) {
        this._inner = value;
    }

    set eventList(value: ioEventList) {
        this._eventList = value;
    }

    set attributes(value: ioAttributes) {
        this._attributes = value;
    }

    set text(value: ioText) {
        this._text = value;
    }

    // Methods
    protected createClassList(element: HTMLElement) {
        if (this.classList) {
            this.classList.forEach((el) => {
                element.classList.add(el);
            });
        }
    }
    protected createInner(element: HTMLElement) {
        if (this._inner) {
            element.innerHTML = this._inner;
        }
    }
    protected createEventList(element: HTMLElement) {
        if (this._eventList) {
            for (const key in this._eventList) {
                const _event = this._eventList[key];
                element.addEventListener(key, () => _event);
            }
        }
    }
    protected createAttributes(element: HTMLElement) {
        if (this._attributes) {
            for (const key in this._attributes) {
                element.setAttribute(key, this._attributes[key]);
            }
        }
    }
    protected createText(element: HTMLElement) {
        if (this._text) {
            element.innerText = this._text;
        }
    }

    protected createElementLink(element: HTMLElement) {
        this.elementLink = element;
    }

    protected render() {
        // new element
        const createdElement = document.createElement(this._tag);

        // hydration
        this.createText(createdElement);
        this.createClassList(createdElement);
        this.createAttributes(createdElement);
        this.createAttributes(createdElement);

        // create link for DOM
        this.createElementLink(createdElement);

        console.log('elementLink', this.elementLink);
    }
}
