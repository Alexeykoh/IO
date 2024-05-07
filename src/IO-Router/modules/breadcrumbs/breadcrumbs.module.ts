import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import { map } from '../../../IO/utils/map';
import { path, routerMap } from '../../types/types';
import { BreadcrumbItems } from './breadcrumb-items';

interface iBreadcrumbsModule {
    routing: routerMap;
    domain: string;
    navigate: (path: path) => void;
}

export class BreadcrumbsModule {
    private _routing: routerMap;
    private _domain: string;
    private _navigate: (path: path) => void;

    constructor({ routing, domain, navigate }: iBreadcrumbsModule) {
        this._routing = routing;
        this._domain = domain;
        this._navigate = navigate;
    }

    private getRoutes() {
        // convert location href to BreadcrumbItems object for destruct href to link items
        const preRoutes = window.location.href.replace(this._domain, '');
        const routes = preRoutes.length === 1 ? [''] : preRoutes.split('/');
        return new BreadcrumbItems({ routePath: routes.join('/'), routeList: routes });
    }

    public breadcrumbs() {
        const routeItem = this.getRoutes();

        // create IO items from BreadcrumbItems
        const routesComponents = map(routeItem.routeList, (params, ind) => {
            return this.item(params, (ind as number) + 1 !== routeItem.routeList.length);
        });
        const io = new IO(tag.SECTION);

        io.classList = ['breadcrumbs'];
        io.components = [...routesComponents];

        return io;
    }

    private item(name: string, isLink: boolean) {
        const io = new IO(tag.A);

        io.classList = ['breadcrumb--link', isLink ? 'enable' : 'disable'];
        io.text = name || 'main';

        if (isLink) {
            // conditional href attribute for prevent clickable element if this select on current page
            io.atr = { href: `/${name}` };
        }

        return io;
    }
}
