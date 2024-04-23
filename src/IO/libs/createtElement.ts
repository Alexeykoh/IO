import { IONode } from '../IONode';
import { _attributeList, _classList, _eventList, _tag, _text } from '../types/io.interface';

interface iCreateElement {
    //extra fields
    _id: string;

    // tag fields
    _tag: _tag;

    // params fields
    _string: string;
    _classList: _classList;
    _eventList: _eventList;
    _attributeList: _attributeList;
}

function writeText(element: HTMLElement, text: _text) {
    if (!text) {
        return;
    }
    element.innerText = text;
}

function writeClassList(element: HTMLElement, classList: _classList) {
    if (!classList) {
        return;
    }
    classList.forEach((el) => {
        element.classList.add(el);
    });
}

function writeEventList(element: HTMLElement, eventList: _eventList) {
    if (!eventList) {
        return;
    }
    for (const key in eventList) {
        element.addEventListener(key, eventList[key]);
    }
}

function writeAttributeList(element: HTMLElement, attributeList: _attributeList) {
    if (!attributeList) {
        return;
    }
    for (const key in attributeList) {
        element.setAttribute(key, attributeList[key]);
    }
}

export function CreateElement(params: IONode) {
    const element = document.createElement(params.tag);
    // element.setAttribute('io-id', params.id);
    element.id = params.id;
    writeText(element, params.text);
    writeClassList(element, params.classList);
    writeAttributeList(element, params.attributeList);
    writeEventList(element, params.eventList);
    return element;
}
