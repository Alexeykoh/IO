import { IO } from '../IO';
import { IOCore } from './core.io';
import { Observable, Observer } from './observer.io';

export class IOState extends IOCore {
    private observable: Observable<IO>;
    constructor() {
        super();
        this.observable = new Observable();
    }
    subscribe() {
        const newSubscriber = new Observer<IO>((data) => {
            this.onNotify(data);
        });
        this.observable.subscribe(newSubscriber);

        return newSubscriber;
    }

    private onNotify(data: IO) {
        if (data) {
            const componentInDOM = this.getRef(data.elementID);
            const newComponent = data.render();
            componentInDOM?.replaceWith(newComponent);
        }
    }
}

export const stateElementor = new IOState();
