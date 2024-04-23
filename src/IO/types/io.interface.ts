import { IONode } from '../IONode';
import { tag } from './enums.enum';

// constructor types
export type _tag = tag;
export type _params = nodeParams;
export type _children = IONode[];

// parameter types
export type _text = string | null;
export type _classList = string[] | null;
export type _eventList = { [key: string]: (e?: Event) => void } | null;
export type _attributeList = { [key: string]: string } | null;

// extra fields
export type _id = string;

// interfaces
export interface nodeParams {
    text?: _text;
    classList?: _classList;
    eventList?: _eventList;
    attributeList?: _attributeList;
}
