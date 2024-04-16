import { IO } from '../IO'; // Importing IO interface
import { IOCore } from './core.io'; // Importing IOCore class
import { Observable, Observer } from './observer.io'; // Importing Observable and Observer classes

// Represents the state management for IO components
export class IOState extends IOCore {
    private observable: Observable<IO>; // Observable instance for managing state changes

    constructor() {
        super(); // Call to superclass constructor
        this.observable = new Observable(); // Initialize Observable instance
    }

    // Method to subscribe to state changes
    subscribe() {
        // Create a new Observer instance that handles state changes
        const newSubscriber = new Observer<IO>((data) => {
            this.onNotify(data); // Call the onNotify method when a state change occurs
        });

        // Subscribe the new Observer to the Observable
        this.observable.subscribe(newSubscriber);

        return newSubscriber; // Return the newly created Observer for further interactions
    }

    // Method called when a state change is observed
    private onNotify(data: IO) {
        if (data) {
            // Get the component in the DOM using its element ID
            const componentInDOM = this.getRef(data.elementID);

            // Render the new component
            const newComponent = data.render();

            // Replace the existing component in the DOM with the new one
            componentInDOM?.replaceWith(newComponent);
        }
    }
}

// Export an instance of IOState for global use
export const stateElementor = new IOState();
