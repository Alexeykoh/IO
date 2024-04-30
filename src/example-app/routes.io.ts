import { iRoutes } from '../IO-Router/types/types';
import { AuthPage } from './pages/auth/page';
import { MainPage } from './pages/main/page';
import { ProductsPage } from './pages/products/page';
import { ProductsPageID } from './pages/products/pageId';

export const ioRoutes: iRoutes = [
    { name: 'Main', path: '/', template: MainPage },
    { name: 'Products', path: '/products', template: ProductsPage },
    {
        name: 'Products',
        path: '/products/[id]',
        template: (id) => ProductsPageID(id),
    },
    { name: 'Auth', path: '/auth', template: AuthPage },
];
