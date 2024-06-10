# How to use < IO /> in your project?

## Create first IO component

```typescript
export function MyFirstComponent() {
    const io = new IO(tag.DIV);
    return io;
}
```

### Parameters

> Function MyFirstComponent() return object of IO. You can add
> text, style classes, attributes, events to this component:

```typescript
export function MyFirstComponent() {
    const io = new IO(tag.DIV);
    io.text = 'hello world'
    io.classList = ['array','of','classes']
    io.atr = {id: 'firstId'}
    io.event = {click: ()=>{console.log('I"m log on click!')}
    return io;
}
```

### Nested

> Also, you can add nested components:

```typescript
export function NestComponent() {
    const io = new IO(tag.DIV);
    io.text = 'I"m child of "MyFirstComponent"!'
    return io;
}

export function MyFirstComponent() {
    const io = new IO(tag.DIV);
    io.text = 'hello world'
    io.classList = ['array','of','classes']
    io.atr = {id: 'firstId'}
    io.event = {click: ()=>{console.log('I"m log on click!')}

    // you can add clild like declaration function:
    // io.components = [NestComponent].

	// or like arrow function (recommended):
	io.components = [() =>  NestComponent()];
    return io;
}
```

### Add to DOM

> To add in DOM you can use ".render()" method.
> This method return HTMLElement.

```typescript
export function MyFirstComponent() {
    const io = new IO(tag.DIV);
    io.text = 'hello world';
    // code ...
    return io;
}

document.body(MyFirstComponent().render());
```

### Re-rendering component in DOM

> In order to redraw components in the DOM, you can use two methods:
> **.forceUpdate()** and **.state()**

#### Component update features

> In order to update the component, the IO calls the mutate() method in
> it. If we simply pass variables into the parameters, which we will
> update later, then their assignment will take place in the IO
> constructor and we will never see the updated state.

```typescript
// befor update
export function MyFirstComponent() {
	let componentName = 'hello world'
    const io = new IO(tag.DIV);
    io.text = componentName // <-- text variable.
    io.event = {click: ()=>{
	    componentName = 'new text' // <-- set new text to variable.
	    // if we need to update components, must use .forceUpdate().
	    io.forceUpdate() // <-- call component update .
	}
    return io;
}
// after calling .forceUpdate(),
// we again initialize the same values as we had

// after update
export function MyFirstComponent() {
	let componentName = 'hello world' // <-- variable with prev text.
    const io = new IO(tag.DIV);
    io.text = componentName // <-- text variable with prev text.
    // code ...
    return io;
}
```

> To do this, we need to pass a function into the parameters that will return the value we need.

```typescript
function getValue(): string {
    return 'new text';
}
const value: string = getValue(); // new text
```

```typescript
export function MyFirstComponent() {
    const io = new IO(tag.DIV);
    io.text = 'hello world'
    io.event = {click: ()=>{
	    console.log('I"m log on click!')
	}
    return io;
}
```

> But in order for the function to return updated values to us, we carefully store their state in it.
> To store the state and automatically update the component, we suggest using .state().

#### State update

```typescript
export function MyFirstComponentWithState() {
    const io = new IO(tag.DIV);
    const [name,setName] = io.state<string>('hello world') // <-- implement state()
    io.text = name // <-- IO constructor automatically call "name()" and get data from them.
    io.event = {click: ()=>{
	    setName('I"m log on click!') // <-- set new value of "name"
	}
    return io;
}
```

> After calling setName(), the IO will update the component and receive the updated data from the state.
> When a component is updated, its child components are also updated.

#### Force update

> ".forceUpdate()" allows you to force a component update

```typescript
export function MyFirstComponent() {
    const io = new IO(tag.DIV);
    io.text = 'hello world'
    io.event = {click: ()=>{
	   io.forceUpdate()
	}
    return io;
}
```
