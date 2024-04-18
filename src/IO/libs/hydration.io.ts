import { IO } from '../IO';
import { _atr, _classList, _components, _events, _id, _tag, _text } from './types.io';

export class Hydration {
    // Create and return a new HTMLElement
    private create(tag: _tag): HTMLElement {
        const newElement: HTMLElement = document.createElement(tag);
        return newElement;
    }

    // Method to set class list for an HTML element
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

    // Method to set ID for an HTML element
    private setID(element: HTMLElement, id: _id | undefined) {
        if (id) {
            element.id = id?.toString() as string;
        }
    }

    // Method to set events for an HTML element
    private setEvents(element: HTMLElement, events: _events | undefined) {
        for (const key in events) {
            const eventKey = key;
            const eventAction = events[key];

            element.addEventListener(eventKey, eventAction);
        }
    }

    // Method to set components for an HTML element
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

    // Method to set text content for an HTML element
    private setText(element: HTMLElement, text: _text | undefined) {
        if (text) {
            if (typeof text === 'string' || typeof text === 'number') {
                element.innerHTML = text.toString();
            } else {
                element.innerHTML = text().toString();
            }
        }
    }

    // Method to set attributes for an HTML element
    private setAtr(element: HTMLElement, atr: _atr | undefined) {
        for (const key in atr) {
            const atrKey = key;
            const atrValue = atr[key];
            if (atrValue === undefined || atrValue === null) {
                return;
            }
            if (typeof atrValue === 'function') {
                element.setAttribute(atrKey, atrValue());
            } else {
                element.setAttribute(atrKey, atrValue);
            }
        }
    }

    // Method to set component ID for an HTML element
    private setComponentId(element: HTMLElement, elementID: string | undefined) {
        element.dataset.componentId = elementID;
    }

    // Main method to hydrate an HTML element with provided props
    public hydrate(_node: IO) {
        const { classList, id, events, text, components, atr, tag, elementID } = _node;
        const element = this.create(tag);

        // Set properties for the element
        this.setComponentId(element, elementID);
        this.setClassList(element, classList);
        this.setID(element, id);
        this.setEvents(element, events);
        this.setText(element, text);
        this.setComponents(element, components);

        // Set attributes for the element
        this.setAtr(element, atr);

        return element;
    }
}
