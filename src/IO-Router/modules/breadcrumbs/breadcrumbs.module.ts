import { navigate } from '../../../IO-Root/root.io';
import { IO } from '../../../IO/IO';
import { tag } from '../../../IO/libs/types/types.io';
import { map } from '../../../IO/utils/map';
import { path, routerMap } from '../../types/types';

interface iBreadcrumbsModule {
    routing: routerMap;
    domain: string;
    navigate: (path: path) => void;
}

export class BreadcrumbsModule {
    private _domain: string;

    constructor({ domain }: iBreadcrumbsModule) {
        this._domain = domain;
    }

    private getRoutes() {
        // convert location href to BreadcrumbItems object for destruct href to link items
        const routes: { slug: string; link: string }[] = [];
        const link = window.location.href.replace(this._domain, '');
        link.split('/').reduce((a, b) => {
            routes.push({ slug: b, link: a + b + '/' });
            return a + b + '/';
        }, '');

        return routes;
    }

    public breadcrumbs() {
        const routeItem = this.getRoutes();

        const routesComponents = map(routeItem, (params, ind) => {
            let name = params.slug || 'main';
            if (params.slug.includes('?name')) {
                const queryList = params.slug.split('?')[1].split('&');
                const nameQuery = queryList.find((el) => el.includes('name')) as string;
                name = nameQuery?.replace('name=', '');
                name = decodeURIComponent(name).replace(/%20/g, ' ');
            }
            const link = params.link.replace(/\/$/, '') || '/';
            const isLink = routeItem.length !== (ind as number) + 1 ? true : false;

            return this.item(name, link, isLink);
        });

        const io = new IO(tag.SECTION);
        io.classList = ['breadcrumbs'];
        io.components = [...routesComponents];
        return io;
    }

    private item(name: string, link: string, isLink: boolean) {
        const io = new IO(tag.A);

        io.classList = ['breadcrumb--link', isLink ? 'enable' : 'disable'];
        io.text = name;

        if (isLink) {
            // conditional href attribute for prevent clickable element if this select on current page
            io.atr = { href: link };
            io.events = {
                click: (e) => {
                    e?.preventDefault();
                    navigate(link as path);
                },
            };
        }

        return io;
    }
}
