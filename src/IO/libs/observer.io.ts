// Represents an Observer that notifies subscribed observers with a message of type `dataType`
export class Observer<dataType> {
    // Function to notify the observer with a message
    public notify: (message: dataType) => void;

    // Constructor for creating an Observer instance
    constructor(action: (message: dataType) => void) {
        // Assign the notify function to the provided action
        this.notify = function (message: dataType) {
            action(message);
        };
    }
}

// Represents an Observable that manages a list of observers and sends messages of type `dataType` to them
export class Observable<dataType> {
    // Array to hold registered observers
    private observers: Observer<dataType>[] = [];
    // Array to store sent messages
    private messages: dataType[] = [];

    // Constructor for creating an Observable instance
    constructor() {
        // Function to send a message to subscribed observers
        this.send = function (message: dataType) {
            // Check if the message has not been sent before
            if (!this.messages.includes(message)) {
                // Clear previous messages and add the new message
                this.messages = [];
                this.messages.push(message);

                // Notify all observers with the message
                this.observers.forEach((el) => {
                    el.notify(message);
                });
            }
        };

        // Function to subscribe an observer to the Observable
        this.subscribe = function (observer: Observer<dataType>) {
            this.observers.push(observer);
        };
    }

    // Function to send a message to observers
    private send: (message: dataType) => void;
    // Function to subscribe an observer to the Observable
    public subscribe: (observer: Observer<dataType>) => void;
}
