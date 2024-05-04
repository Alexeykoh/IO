import { IO } from '../IO';
import { tag } from '../libs/types/types.io';

describe('IO Component', () => {
    let io: IO;

    test('Tag enum test', () => {
        const enumArray = Object.values(tag).map((el) => el.toUpperCase());
        enumArray.forEach((el) => {
            io = new IO(el);
            expect(io.tag).toBe(el);
            expect(io.render().tagName).toBe(el);
        });
    });

    test('ClassList "undefined"', () => {
        io = new IO('DIV');
        expect(io.classList).toBe(undefined);
        expect(io.render().classList.value).toBe('');
    });

    test('ClassList "array"', () => {
        io = new IO('DIV', { classList: ['a', 'b', 'c'] });
        expect(io.classList).toEqual(['a', 'b', 'c']);
        expect(io.render().classList.value).toBe('a b c');
    });

    test('ClassList "spaces"', () => {
        io = new IO('DIV', { classList: ['space', 'space space', 'moreSpace  moreSpace'] });
        // проверяет экземпляр new IO
        expect(io.classList).toEqual(['space', 'space space', 'moreSpace  moreSpace']);
        // проверяет рендер
        expect(io.render().classList.value).toBe('space spacespace moreSpacemoreSpace');
    });

    test('ClassList "empty"', () => {
        io = new IO('DIV', { classList: ['value', '', 'newValue', '  '] });
        expect(io.classList).toEqual(['value', '', 'newValue', '  ']);
        expect(io.render().classList.value).toBe('value newValue');
    });

    test('ClassList "function"', () => {
        io = new IO('DIV', { classList: ['value', () => 'newValue'] });
        expect(io.render().classList.value).toBe('value newValue');
    });

    test('ID "declaration text id"', () => {
        io = new IO('DIV', { id: 'testID' });
        expect(io.id).toBe('testID');
        expect(io.render().id).toBe('testID');
    });

    test('ID "declaration number id"', () => {
        io = new IO('DIV', { id: 666 });
        expect(io.id).toBe(666);
        expect(io.render().id).toBe('666');
    });
});
