import { IO } from '../IO';

export function map<T>(params: T[], template: (params: T, ind?: number) => IO) {
    const newList = params.map((el, ind) => {
        return () => template(el, ind);
    });
    return newList;
}

// example usage

// interface iData {
//     text: string;
// }
// const data: iData[] = [{ text: 'test text 1' }, { text: 'test text 2' }];

// function testTemplate({ text }: iData) {
//     const io = new IO(tag.DIV);
//     io.text = text;
//     return io;
// }
// const newIOArray = ioMap<iData>(data, testTemplate);
// console.log(newIOArray);
