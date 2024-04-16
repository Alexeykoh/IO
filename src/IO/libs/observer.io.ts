export class Observer<dataType> {
    public notify: (message: dataType) => void;

    constructor(action: (message: dataType) => void) {
        this.notify = function (message: dataType) {
            action(message);
        };
    }
}

export class Observable<dataType> {
    private observers: Observer<dataType>[] = [];
    private messages: dataType[] = [];

    constructor() {
        this.send = function (message: dataType) {
            if (!this.messages.includes(message)) {
                this.messages = [];
                this.messages.push(message);

                this.observers.forEach((el) => {
                    el.notify(message);
                });
            }
        };

        this.subscribe = function (observer: Observer<dataType>) {
            this.observers.push(observer);
        };
    }

    private send: (message: dataType) => void;
    public subscribe: (observer: Observer<dataType>) => void;
}
