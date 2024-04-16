import { IO } from '../IO';
import { iIORoot } from './types.io';

// Represents a page configuration with a name and its corresponding page component
export interface iPages<T> {
    name: T;                // Name of the page
    page: () => IO;         // Function returning the page component
}

// Represents the root element and its associated components and pages
export class IORoot<routerLink> {
    public rootElement: HTMLElement;            // Root HTML element to render components
    private _rootComponent: (() => IO) | null;  // Function returning the root component
    private _pages: iPages<routerLink>[] | null; // List of available pages
    public layout: ((rootComponent: () => IO) => IO) | null; // Function to wrap components in a layout
    private layoutComponent: IO | null;         // Layout component

    // Constructor for creating an instance of IORoot
    constructor({ rootElement, rootComponent }: iIORoot) {
        this.rootElement = rootElement;
        this._rootComponent = rootComponent;
        this._pages = null;
        this.layout = null;
        this.layoutComponent = null;
    }

    // Method to set the list of available pages
    public pages(pagesList: iPages<routerLink>[]) {
        this._pages = pagesList;
        this.start(); // Start rendering
    }

    // Method to navigate to a specific page based on the provided link
    public route(link: routerLink) {
        if (this._pages) {
            const page = this._pages.find((el) => el.name === link);
            if (page) {
                this.render(page?.page); // Render the selected page
            }
        }
    }

    // Setter for the root component
    set rootComponent(component: () => IO) {
        this._rootComponent = component;
    }

    // Method to render a given element
    private render(element: () => IO) {
        this.rootElement.innerHTML = ''; // Clear the root element
        if (this.layout) {
            const layout = this.layout(element); // Apply layout if available
            this.layoutComponent = layout;
            this.rootElement.appendChild(layout.render()); // Render the layout
        } else {
            this.rootElement.appendChild(element().render()); // Render the component directly
        }
    }

    // Method to start rendering the root component
    public start() {
        if (this._rootComponent) {
            this.render(this._rootComponent); // Render the root component
        } else {
            throw Error('_rootComponent cannot be empty'); // Throw an error if root component is not set
        }
    }
}
