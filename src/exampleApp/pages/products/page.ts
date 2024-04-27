import { IO } from '../../../IO/libs/modules/IO';
import { tag } from '../../../IO/libs/modules/types.io';
import { ioMap } from '../../../IO/methods/ioMap';
import { server } from '../../app';
import { Badge } from '../../shared/UI/badge';
import { ButtonLink } from '../../shared/UI/button-link';
import { Description } from '../../shared/UI/description';
import { Title } from '../../shared/UI/title';
import { IProduct } from '../../shared/mockData/mockData';
import './page.scss';

export function ProductsPage() {
    const io = new IO(tag.SECTION, { text: 'products' }, [ProductList]);
    io.classList = ['product-page'];
    return io;
}

export function ProductList() {
    const io = new IO(tag.UL);
    io.stateQuery([], server.getAll(), {
        ok: (data) => {
            io.components = ioMap<IProduct>(data, ProductItem);
        },
    });
    io.classList = ['product-list'];
    return io;
}

export function ProductItem(product: IProduct) {
    const io = new IO(tag.LI);
    const { name, description, price } = product;
    io.classList = ['product-item'];
    io.components = [
        () => Title(name),
        () => Description(description),
        () => Badge(price.toString()),
        () => ButtonLink('to product', `/products/${product.id}`),
    ];
    return io;
}
