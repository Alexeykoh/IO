import { IOElement } from './IO/io-element';

const test = new IOElement({ tag: 'p', text: 'hello world' });
test.render();

document.body.appendChild(test.getElement());

console.log(test);
