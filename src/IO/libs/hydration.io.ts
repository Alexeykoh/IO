import { IO } from '../IO';
import { _atr, _children, _classList, _components, _events, _id, _inner, _text, iIO } from './types.io';

export class Hydration {
    private setClassList(element: HTMLElement, classList: _classList | undefined) {
        classList?.forEach((el) => {
            if (typeof el !== 'function') {
                element.classList.add(el.replace(/\s/g, ''));
            } else {
                const execClass = el();
                element.classList.add(execClass.replace(/\s/g, ''));
            }
        });
    }

    private setID(element: HTMLElement, id: _id | undefined) {
        if (id) {
            element.id = id?.toString() as string;
        }
    }

    // private create(): HTMLElement {
    //     const newElement: HTMLElement = document.createElement(this.tag);
    //     return newElement;
    // }

    private setEvents(element: HTMLElement, events: _events | undefined) {
        for (const key in events) {
            const eventKey = key;
            const eventAction = events[key];

            element.addEventListener(eventKey, eventAction);
        }
    }

    private setChildren(element: HTMLElement, children: _children | undefined) {
        children?.forEach((el: IO) => {
            element.appendChild(el.render());
        });
    }

    private setComponents(element: HTMLElement, components: _components | undefined) {
        if (typeof components === 'function') {
            components().forEach((el: () => IO) => {
                const component = el();
                element.appendChild(component.render());
            });
        } else {
            components?.forEach((el: () => IO) => {
                const component = el();
                element.appendChild(component.render());
            });
        }
    }

    private setText(element: HTMLElement, text: _text | undefined) {
        if (text) {
            if (typeof text === 'string') {
                element.innerHTML = text;
            } else {
                element.innerHTML = text();
            }
        }
    }

    private setAtr(element: HTMLElement, atr: _atr | undefined) {
        for (const key in atr) {
            const atrKey = key;
            const atrValue = atr[key];
            if (typeof atrValue === 'function') {
                element.setAttribute(atrKey, atrValue());
            } else {
                element.setAttribute(atrKey, atrValue);
            }
        }
    }

    private setComponentId(element: HTMLElement, elementID: string | undefined) {
        element.dataset.componentId = elementID;
    }

    private setInner(element: HTMLElement, _inner: _inner | undefined) {
        if (_inner) {
            element.innerHTML = _inner;
        } else {
            throw new Error('"setInner": _inner cannot be empty or null');
        }
    }

    public hydrate(element: HTMLElement, props: iIO, elementID: string, elementRef: HTMLElement | null) {
        const { classList, id, events, text, children, components, inner, atr } = props;

        this.setComponentId(element, elementID);
        this.setClassList(element, classList);
        this.setID(element, id);
        this.setEvents(element, events);
        if (inner) {
            this.setInner(element, inner);
        } else {
            this.setText(element, text);
            this.setChildren(element, children);
            this.setComponents(element, components);
        }
        this.setAtr(element, atr);

        elementRef = element;
        return element;
    }
}
