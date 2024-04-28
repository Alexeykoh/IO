import { IProduct, products } from './mockData';

export class MockStoreServer {
    data: IProduct[];

    constructor() {
        this.data = products;
    }

    mockRequest<T>(callback: () => T) {
        return new Promise<T>((req) => {
            setTimeout(() => {
                req(callback());
            }, 500);
        });
    }

    getAll() {
        return this.mockRequest<IProduct[]>(() => this.data);
    }

    getByID(id: number) {
        return this.mockRequest<IProduct>(
            () =>
                this.data.filter((el) => {
                    return el.id === id;
                })[0]
        );
    }
}
