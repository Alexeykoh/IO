# IOData

The `IOData` class represents a base class for creating IO elements with data management capabilities.

## Properties

- `tag: _tag`: Represents the HTML tag of the element.
- `classList?: _classList`: Represents the CSS classes of the element.
- `id?: _id`: Represents the ID of the element.
- `events?: _events`: Represents the event handlers of the element.
- `atr?: _atr`: Represents additional attributes of the element.
- `children?: _children`: Represents the children elements of the element.
- `components?: _components`: Represents the components of the element.
- `text?: _text`: Represents the text content of the element.
- `_inner: _inner`: Represents the inner HTML content of the element.
- `elementID: string`: Represents the unique ID of the element.
associated with this instance.
- `_state: Map<string, unknown>`: Represents the map to store state data associated with this instance.
- `$stateElementor: Observer<IO>`: Represents the observer for global state changes.

## Constructor

### `constructor(tag: _tag, props?: iIO, children?: _components)`

Creates an instance of the `IOData` class.

#### Parameters

- `tag: _tag`: The HTML tag of the element.
- `props?: iIO`: Optional properties of the element.
- `children?: _components`: Optional children elements of the element.

## Methods

### `set inner(value: string)`

Sets the inner HTML content of the element.

#### Parameters

- `value: string`: The inner HTML content to set.
