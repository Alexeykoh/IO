export function getRef(id: string) {
    return document.querySelector(`[data-component-id="${id}"]`) as HTMLElement;
}
