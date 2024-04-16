// v4.1 30.03.24 21:02

import { IOData } from './libs/data.io';
import { iElementor, tGetState, tSetState } from './libs/types.io';

export class IO extends IOData {
    constructor(props: iElementor) {
        super(props);
    }

    private setClassList(element: HTMLElement) {
        this.classList?.forEach((el) => {
            if (typeof el !== 'function') {
                element.classList.add(el.replace(/\s/g, ''));
            } else {
                const execClass = el();
                element.classList.add(execClass.replace(/\s/g, ''));
            }
        });
    }

    private setID(element: HTMLElement) {
        if (this.id) {
            element.id = this.id?.toString() as string;
        }
    }

    private create(): HTMLElement {
        const newElement: HTMLElement = document.createElement(this.tag);
        return newElement;
    }

    private setEvents(element: HTMLElement) {
        for (const key in this.events) {
            const eventKey = key;
            const eventAction = this.events[key];

            element.addEventListener(eventKey, eventAction);
        }
    }

    private setChildren(element: HTMLElement) {
        this.children?.forEach((el: IO) => {
            element.appendChild(el.get());
        });
    }

    private setComponents(element: HTMLElement) {
        if (typeof this.components === 'function') {
            this.components().forEach((el: () => IO) => {
                const component = el();
                element.appendChild(component.get());
            });
        } else {
            this.components?.forEach((el: () => IO) => {
                const component = el();
                element.appendChild(component.get());
            });
        }
    }

    private setText(element: HTMLElement) {
        if (this.text) {
            if (typeof this.text === 'string') {
                element.innerHTML = this.text;
            } else {
                element.innerHTML = this.text();
            }
        }
    }

    private setAtr(element: HTMLElement) {
        for (const key in this.atr) {
            const atrKey = key;
            const atrValue = this.atr[key];
            if (typeof atrValue === 'function') {
                element.setAttribute(atrKey, atrValue());
            } else {
                element.setAttribute(atrKey, atrValue);
            }
        }
    }

    private setComponentId(element: HTMLElement) {
        element.dataset.componentId = this.elementID;
    }

    private setInner(element: HTMLElement) {
        if (this._inner) {
            element.innerHTML = this._inner;
        } else {
            throw new Error('"setInner": _inner cannot be empty or null');
        }
    }

    private hydrate(element: HTMLElement) {
        this.setComponentId(element);
        this.setClassList(element);
        this.setID(element);
        this.setEvents(element);
        if (this._inner) {
            this.setInner(element);
        } else {
            this.setText(element);
            this.setChildren(element);
            this.setComponents(element);
        }
        this.setAtr(element);

        this.elementRef = element;
        return element;
    }

    public updateChild() {}

    public fn() {
        return () => {
            return this;
        };
    }

    public get() {
        const resultElement = this.create();
        const readyElement = this.hydrate(resultElement);
        return readyElement;
    }

    public update() {
        this.$stateElementor.notify(this);
    }

    public state<stateType>(init: stateType, update: boolean = true) {
        const key = this.getID();
        this._state.set(key, init);
        const set = (value: stateType) => {
            this._state.set(key, value);
            if (update) {
                this.$stateElementor.notify(this);
            }
        };
        const get = () => {
            return this._state.get(key);
        };

        return [get, set] as [tGetState<stateType>, tSetState<stateType>];
    }
}
