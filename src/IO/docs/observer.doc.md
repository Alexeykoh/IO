# Observer<dataType>

The `Observer` class represents an observer that notifies subscribed observers with a message of type `dataType`.

## Constructor

### `constructor(action: (message: dataType) => void)`

Creates an instance of the `Observer` class.

#### Parameters

- `action: (message: dataType) => void`: The action to be performed when notifying observers with a message.

## Properties

- `notify: (message: dataType) => void`: A function to notify the observer with a message.

# Observable<dataType>

The `Observable` class represents an observable that manages a list of observers and sends messages of type `dataType` to them.

## Constructor

### `constructor()`

Creates an instance of the `Observable` class.

## Properties

- `observers: Observer<dataType>[]`: An array to hold registered observers.
- `messages: dataType[]`: An array to store sent messages.

## Methods

### `send(message: dataType)`

Sends a message to subscribed observers.

#### Parameters

- `message: dataType`: The message to send to observers.

### `subscribe(observer: Observer<dataType>)`

Subscribes an observer to the observable.

#### Parameters

- `observer: Observer<dataType>`: The observer to subscribe to the observable.
