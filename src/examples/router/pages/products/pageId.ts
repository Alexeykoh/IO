import { IO } from '../../../../IO/IO';
import { tag } from '../../../../IO/libs/types/types.io';
import { server } from '../../app';
import { Badge } from '../../shared/UI/badge';
import { Description } from '../../shared/UI/description';
import { Title } from '../../shared/UI/title';
import { IProduct } from '../../shared/mockData/mockData';

export function ProductsPageID(id: string) {
    server.getByID(Number(id)).then((data) => {
        setProduct(data);
    });
    const io = new IO(tag.SECTION, { text: 'products: ' + id }, []);
    const [product, setProduct] = io.state<IProduct | null>(null);
    function cond() {
        if (product()) {
            const { name, price, description } = product() as IProduct;
            return new IO(tag.DIV, {}, [
                () => Title(name),
                () => Badge(price.toString()),
                () => Description(description),
            ]);
        } else {
            return Title('loading...');
        }
    }
    io.components = [cond];
    return io;
}
