import { IO } from '../../../IO';
import { _atr, _classList, _components, _events, _id, _tag, _text } from '../../types/types.io';

export class Hydration {
    private tagSwitcher(tag: _tag) {
        switch (tag) {
            case 'svg':
                return this.createSVG(tag);
            case 'path':
                return this.createSVG(tag);
            default:
                return this.create(tag);
        }
    }

    // Create and return a new HTMLElement
    private create(tag: _tag): HTMLElement {
        const newElement: HTMLElement = document.createElement(tag);
        return newElement;
    }

    private createSVG(tag: _tag): HTMLElement {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', tag);
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        return svg as unknown as HTMLElement;
    }

    // Method to set class list for an HTML element
    private setClassList(element: HTMLElement, classList: _classList | undefined): void {
        if (element.tagName !== 'svg' && element.tagName !== 'path') {
            element.className = '';
        }

        classList?.forEach((el) => {
            let _class: string | undefined = typeof el !== 'function' ? el : el();
            _class = _class.replace(/ /g, '');

            if (_class) {
                element.classList.add(_class);
            }
        });
    }

    // Method to set ID for an HTML element
    private setID(element: HTMLElement, id: _id | undefined): void {
        if (id) {
            element.id = id?.toString() as string;
        }
    }

    // Method to set events for an HTML element
    private setEvents(element: HTMLElement, events: _events | undefined): void {
        for (const key in events) {
            const eventKey = key;
            const eventAction = events[key];

            element.addEventListener(eventKey, eventAction);
        }
    }

    // Method to set components for an HTML element
    private setComponents(element: HTMLElement, components: _components | undefined): void {
        if (typeof components === 'function') {
            components().forEach((el: () => IO) => {
                const component = el();
                component.render().then((data) => {
                    element.appendChild(data);
                });
            });
        } else {
            components?.forEach((el: () => IO) => {
                const component = el();
                component.render().then((data) => {
                    element.appendChild(data);
                });
            });
        }
    }

    // Method to set text content for an HTML element
    private setText(element: HTMLElement, text: _text | undefined): void {
        if (text) {
            if (typeof text === 'string' || typeof text === 'number') {
                element.innerHTML = text.toString();
            } else {
                element.innerHTML = text().toString();
            }
        }
    }

    // Method to set attributes for an HTML element
    private setAtr(element: HTMLElement, atr: _atr | undefined): void {
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
    private setComponentId(element: HTMLElement, elementID: string | undefined): void {
        element.dataset.componentId = elementID;
    }

    // Main method to hydrate an HTML element with provided props
    public async hydrate(_node: IO): Promise<HTMLElement> {
        const { classList, id, events, text, components, atr, tag, elementID } = _node;
        const element = this.tagSwitcher(tag);

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

    public async mutate(_node: IO, _element: HTMLElement): Promise<HTMLElement> {
        const { components } = _node;

        // declare children
        const childNodes = _element.children;
        let componentChildren: IO[] = [];
        if (typeof components === 'function') {
            componentChildren = components().map((el) => el());
        } else if (components) {
            componentChildren = components.map((el) => el());
        }

        // Set children count declaration
        const ioChildrenCount = componentChildren.length;
        const elementChildrenCount = _element.children.length;
        const maxChildrenCount = Math.max(ioChildrenCount, elementChildrenCount);

        // Set self properties for the element
        this.setClassList(_element, _node.classList);
        this.setID(_element, _node.id);
        this.setText(_element, _node.text);

        // Set self attributes for the element
        this.setAtr(_element, _node.atr);

        if (ioChildrenCount === elementChildrenCount) {
            // children iteration if the number of children is the same
            for (let i = 0; i < maxChildrenCount; i++) {
                // declare children
                const IOChild: IO = componentChildren[i];
                const NodeElement: HTMLElement = childNodes[i] as HTMLElement;
                if (!NodeElement) {
                    IOChild.render().then((data) => {
                        _element.appendChild(data);
                    });
                    continue;
                }
                if (!IOChild) {
                    _element.removeChild(NodeElement);
                    continue;
                }

                // Set properties for the element
                this.setClassList(NodeElement, IOChild.classList);
                this.setID(NodeElement, IOChild.id);
                this.setText(NodeElement, IOChild.text);

                // Set attributes for the element
                this.setAtr(NodeElement, IOChild.atr);

                // call mutation
                this.mutate(IOChild, NodeElement as HTMLElement);
            }
        } else {
            // render all array of children
            _node.render().then((data) => {
                _element?.replaceWith(data);
            });
        }

        // return
        return _element;
    }
}
