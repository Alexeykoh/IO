# IO Module Documentation

## Types

### Get State Type (`tGetState<T>`)
Signature: `( ) => T`

### Set State Type (`tSetState<T>`)
Signature: `(value: T) => void`

### State Error Callback Type (`qStateErr`)
Signature: `(err: Error) => void`

### State Loading Callback Type (`qStateLoading`)
Signature: `() => void`

### IO Array Type (`IOArray`)
Signature: `(() => IO)[]`

### HTML Tag Enum (`tag`)
Defines various HTML tag types.

### IO Element Tag Type (`_tag`)
Signature: `tag | string`

### IO Element ClassList Type (`_classList`)
Signature: `(() => string)[] | string[]`

### IO Element ID Type (`_id`)
Signature: `(number | string) | (() => string | number)`

### IO Element Events Type (`_events`)
Signature: `{ [key: string]: (e?: Event) => void }`

### IO Element Attributes Type (`_atr`)
Signature: `{ [key: string]: (() => string) | string }`

### IO Element Children Type (`_children`)
Signature: `IO[]`

### IO Element Components Type (`_components`)
Signature: `IOArray | (() => IOArray)`

### IO Element Text Type (`_text`)
Signature: `(() => string) | string`

### IO Element Inner HTML Type (`_inner`)
Signature: `string | null`

## Interfaces

### IO Element Interface (`iIO`)
Defines the structure of an IO element.

### Query Status Interface (`iQueryStatus<T>`)
Defines the status of a query.

### IO Root Interface (`iIORoot`)
Describes the root element and component.

### Page Interface (`iPage`)
Describes a page.

### State Query Callbacks Interface (`iStateQueryCallbacks<T>`)
Describes callbacks for state queries.
