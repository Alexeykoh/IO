# IO Module Documentation

-   version: 2.1.0.
-   date: 18.04.2024.

## Counter Function

### Description

Creates a counter component with buttons to increment and decrement the counter value.

### Implementation

-   Creates an IO instance with a DIV tag.
-   Manages the counter state using the `state` method.
-   Defines components for increment and decrement buttons.
-   Returns the IO instance representing the counter component.

## Pages

### Main Page Function

#### Description

Creates the main page component.

#### Implementation

-   Creates an IO instance with a SECTION tag.
-   Sets the text content of the section to 'page_1'.
-   Returns the IO instance representing the main page component.

### Second Page Function

#### Description

Creates the second page component with a counter.

#### Implementation

-   Creates an IO instance with a SECTION tag.
-   Sets the text content of the section to 'page_2'.
-   Includes the Counter component inside the section.
-   Returns the IO instance representing the second page component.

## Root Configuration

### Description

Configures the root element and routes for the application.

### Implementation

-   Creates an IORoot instance with the document body as the root element.
-   Sets the root component as a MAIN tag.
-   Defines an array of page configurations.
-   Routes to the main page initially and switches to the second page after a timeout.

## Dependencies

-   **IO**: Imported from './IO/IO'. Represents an IO element.
-   **IORoot, iPages**: Imported from './IO/libs/root.io'. Manages the root element and routes.
-   **tag**: Imported from './IO/libs/types.io'. Enumerates HTML tag types.
