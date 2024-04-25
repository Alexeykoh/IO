import { IO } from './IO/IO';
import { IORouter } from './IO/libs/router/router.io';
import { iRoutes } from './IO/libs/router/types/types';

import { tag } from './IO/libs/modules/types.io';

const routes: iRoutes = [
    { name: 'Main', path: '/', template: () => new IO(tag.DIV, { text: 'main' }, []) },
    { name: 'Products', path: '/products', template: () => new IO(tag.DIV, { text: 'products' }, []) },
    {
        name: 'Products',
        path: '/products/[id]',
        template: (data) =>
            new IO(tag.DIV, {
                text: 'products: ' + data,
            }),
    },
    { name: 'Admin', path: '/admin', template: () => new IO(tag.DIV, { text: 'admin' }), params: { isPrivate: true } },
];

new IORouter({
    root: document.body,
    domain: 'http://localhost:8080',
    routes: routes,
    auth: () => {
        return true;
    },
    middleware: (data) => {
        console.log('middleware', data);
    },
});

//export const navigator = root.navigate;
