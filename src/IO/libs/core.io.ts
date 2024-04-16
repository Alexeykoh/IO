export class IOCore {
    protected getID() {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        const charactersLength = characters.length;
        for (let i = 0; i < 10; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }

        return result;
    }
    protected getRef(id: string) {
        return document.querySelector(`[data-component-id="${id}"]`) as HTMLElement;
    }
}
