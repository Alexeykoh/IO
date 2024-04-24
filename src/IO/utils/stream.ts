// v 1.1

// Define the interface for a subscriber
interface iSubscriber<T> {
    id: string; // Unique identifier for the subscriber
    subscriber: StreamSubscriber<T>; // Reference to the stream subscriber object
}

// Function to generate a unique ID
function generateUniqueId(): string {
    const timestamp: number = Date.now(); // Get current timestamp
    const random: number = Math.floor(Math.random() * 10000); // Generate random number between 0 and 9999
    return `${timestamp}_${random}`; // Concatenate timestamp and random number to create unique ID
}

// Define the Stream class
export class Stream<T> {
    private subscribers: iSubscriber<T>[]; // Array to store subscribers

    constructor() {
        this.subscribers = []; // Initialize subscribers array
    }

    // Method to notify subscribers with a message
    public notify(message: T) {
        this.subscribers.forEach(({ subscriber }) => {
            subscriber.effect(message); // Call the effect method of each subscriber
        });
    }

    // Method to subscribe a new subscriber
    public subscribe(subscriber: iSubscriber<T>) {
        this.subscribers.push(subscriber); // Add the subscriber to the subscribers array
        if (this.subscribers.length >= 50) {
            this.subscribers.shift();
        }
    }

    // Method to unsubscribe a subscriber by ID
    public unsubscribe(id: string) {
        this.subscribers = this.subscribers.filter((el) => {
            return el.id !== id; // Filter out the subscriber with the specified ID
        });
    }
    public clearSubscribers() {
        this.subscribers = [];
    }
}

// Define the StreamSubscriber class
export class StreamSubscriber<T> {
    private callback: (message: T) => void; // Callback function to handle messages
    private id: string; // Unique identifier for the subscriber
    private stream: Stream<T>; // Reference to the stream object

    constructor(stream: Stream<T>, callback: (message: T) => void) {
        this.id = generateUniqueId(); // Generate a unique ID for the subscriber
        this.callback = callback; // Set the callback function
        this.stream = stream; // Set the reference to the stream
        this.stream.subscribe({ id: this.id, subscriber: this }); // Subscribe this object to the stream
    }

    // Method to handle the effect of receiving a message
    effect(message: T) {
        this.callback(message); // Call the callback function with the message
    }

    // Method to unsubscribe from the stream
    unsubscribe() {
        this.stream.unsubscribe(this.id); // Unsubscribe this object from the stream using its ID
    }
}
