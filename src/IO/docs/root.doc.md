# iPages<T>

The `iPages` interface represents a page configuration with a name and its corresponding page component.

## Properties

- `name: T`: The name of the page.
- `page: () => IO`: A function returning the page component.

# IORoot<routerLink>

The `IORoot` class represents the root element and its associated components and pages.

## Constructor

### `constructor({ rootElement, rootComponent }: iIORoot)`

Creates an instance of the `IORoot` class.

#### Parameters

- `{ rootElement: HTMLElement, rootComponent: () => IO }`: An object containing the root HTML element to render components and a function returning the root component.

## Properties

- `rootElement: HTMLElement`: The root HTML element to render components.
- `_rootComponent: (() => IO) | null`: A function returning the root component.
- `_pages: iPages<routerLink>[] | null`: A list of available pages.
- `layout: ((rootComponent: () => IO) => IO) | null`: A function to wrap components in a layout.
- `layoutComponent: IO | null`: The layout component.

## Methods

### `pages(pagesList: iPages<routerLink>[])`

Sets the list of available pages.

#### Parameters

- `pagesList: iPages<routerLink>[]`: The list of available pages.

### `route(link: routerLink)`

Navigates to a specific page based on the provided link.

#### Parameters

- `link: routerLink`: The link to the page to navigate to.

### `start()`

Starts rendering the root component.
