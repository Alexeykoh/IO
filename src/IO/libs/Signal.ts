export interface iSignal<T> {
    value: T;
    effect: null | ((data: T) => void);
}
export function signal<T>(value: T) {
    let proxy = new Proxy<iSignal<T>>(
        { value: value, effect: null },
        {
            get(target, prop: keyof iSignal<T>) {
                if (prop in target) {
                    return target[prop];
                }
            },

            set(target, prop: keyof iSignal<T>, value) {
                target[prop] = value;
                if (target.effect) {
                    target.effect(target.value);
                }
                return true;
            },
        }
    );
    return proxy;
}
