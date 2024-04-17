# Hydration

The `Hydration` class provides methods for hydrating an HTML element with provided properties.

## Methods

### `hydrate(_node: IO)`

Hydrates an HTML element with provided props.

#### Parameters

-   `element: HTMLElement`: The HTML element to hydrate.
-   `props: iIO`: The properties to apply to the element.
-   `elementID: string`: The ID of the element.

#### Returns

-   `HTMLElement`: The hydrated HTML element.

### `private setClassList(element: HTMLElement, classList: _classList | undefined)`

Sets class list for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set the class list for.
-   `classList: _classList | undefined`: The class list to apply to the element.

### `private setID(element: HTMLElement, id: _id | undefined)`

Sets ID for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set the ID for.
-   `id: _id | undefined`: The ID to apply to the element.

### `private setEvents(element: HTMLElement, events: _events | undefined)`

Sets events for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set events for.
-   `events: _events | undefined`: The events to apply to the element.

### `private setChildren(element: HTMLElement, children: _children | undefined)`

Sets children for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set children for.
-   `children: _children | undefined`: The children to append to the element.

### `private setComponents(element: HTMLElement, components: _components | undefined)`

Sets components for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set components for.
-   `components: _components | undefined`: The components to append to the element.

### `private setText(element: HTMLElement, text: _text | undefined)`

Sets text content for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set text content for.
-   `text: _text | undefined`: The text content to apply to the element.

### `private setAtr(element: HTMLElement, atr: _atr | undefined)`

Sets attributes for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set attributes for.
-   `atr: _atr | undefined`: The attributes to apply to the element.

### `private setComponentId(element: HTMLElement, elementID: string | undefined)`

Sets component ID for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set the component ID for.
-   `elementID: string | undefined`: The ID of the component to apply to the element.

### `private setInner(element: HTMLElement, _inner: _inner | undefined)`

Sets inner HTML content for an HTML element.

#### Parameters

-   `element: HTMLElement`: The HTML element to set inner HTML content for.
-   `_inner: _inner | undefined`: The inner HTML content to apply to the element.
