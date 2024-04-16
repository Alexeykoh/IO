# IO Module Documentation

## Classes

### IO
- **Extends**: IOData
- **Description**: Represents an IO element with additional functionality for rendering, state management, and asynchronous state querying.

#### Constructor
- **Parameters**:
  - `tag: _tag`: The HTML tag name or custom tag name for the element.
  - `props?: iIO`: Optional properties for the element.
  - `children?: _components`: Optional array of child components or elements.

#### Methods
- **create()**: Creates and returns a new HTMLElement based on the IO element's tag.
- **render()**: Renders the IO element and returns the hydrated HTMLElement.
- **forceUpdate()**: Forces an update of the element, notifying the state elementor.
- **state\<stateType\>(init: stateType, update?: boolean)**: Manages the state of the element, returning getter and setter functions.
- **stateQuery\<stateType\>(init: stateType, queryPromise: Promise<stateType>, callback?: iStateQueryCallbacks<stateType>)**: Queries the state asynchronously, returning data and refetch functions.

#### Properties
- **\_hydration: Hydration**: An instance of the Hydration class for hydrating elements.

## Dependencies
- **IOData**: Imported from './libs/data.io'. Provides base functionality for IO elements.
- **Hydration**: Imported from './libs/hydration.io'. Handles hydration of IO elements.
- **\_components, \_tag, iIO, iStateQueryCallbacks, tGetState, tSetState**: Imported from './libs/types.io'. Define types and interfaces used by the IO class.
