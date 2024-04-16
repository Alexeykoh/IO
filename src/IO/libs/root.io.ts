import { IO } from '../IO';
import { iIORoot } from './types.io';

export interface iPages<T> {
    name: T;
    page: () => IO;
}

export class IORoot<routerLink> {
    public rootElement: HTMLElement;
    private _rootComponent: (() => IO) | null;
    private _pages: iPages<routerLink>[] | null;
    public layout: ((rootComponent: () => IO) => IO) | null;
    private layoutComponent: IO | null;

    constructor({ rootElement, rootComponent }: iIORoot) {
        this.rootElement = rootElement;
        this._rootComponent = rootComponent;
        this._pages = null;
        this.layout = null;
        this.layoutComponent = null;
    }

    public pages(pagesList: iPages<routerLink>[]) {
        this._pages = pagesList;
        this.start();
    }
    public route(link: routerLink) {
        if (this._pages) {
            const page = this._pages.find((el) => el.name === link);
            if (page) {
                this.render(page?.page);
            }
        }
    }

    set rootComponent(component: () => IO) {
        this._rootComponent = component;
    }

    private render(element: () => IO) {
        this.rootElement.innerHTML = '';
        if (this.layout) {
            const layout = this.layout(element);
            this.layoutComponent = layout;
            this.rootElement.appendChild(layout.render());
        } else {
            this.rootElement.appendChild(element().render());
        }
    }

    public start() {
        if (this._rootComponent) {
            this.render(this._rootComponent);
        } else {
            throw Error('_rootComponent is cannot by empty');
        }
    }
}
