import { IO } from '../../IO';
import { tag } from '../types.io';
import { IOAuthPage } from './authentication/auth-page/auth-page.io';
import { DynamicRoute } from './routes/dynamic-route.io';
import { Route } from './routes/route.io';
import { iIORouter, iRoute, iRoutes, path, routeIO, routerMap } from './types/types';

export class IORouter {
    private readonly _routes: iRoutes;
    private readonly _domain: string;
    private readonly _authMethod: () => boolean;
    private readonly _authRoute: Route;
    private readonly _root: HTMLElement;
    private readonly _href: path;
    private readonly _routesMap: routerMap;
    private readonly _404: Route;

    constructor(params: iIORouter) {
        // 404
        this._404 = new Route(() => new IO(tag.SECTION, { text: '404 page' }), '/', {}, '404');

        // params
        this._root = params.root || document.body;
        this._domain = params.domain;
        this._routes = params.routes;
        this._routesMap = new Map();
        this._href = this.editPath(window.location.href);

        // auth
        this._authRoute = new Route(() => IOAuthPage(), '/auth', {}, 'io-auth');
        this._authMethod = params.auth || (() => false);

        // root method
        this.addRootAuthRoute();
        this.addRoutesToMap();
        this.loadPage(this._href);

        console.log(this);
    }

    private addRootAuthRoute() {
        if (!this._routesMap.has('/auth')) {
            this._routesMap.set('/auth', this._authRoute);
        }
    }

    private editPath(path: string) {
        const edited = path.replace(this._domain, '');
        if (edited[edited.length - 1]) {
            edited.slice(0, -1);
        }

        return edited as path;
    }

    private addRoutesToMap() {
        this._routes.forEach((route) => {
            addRoute(route, this._routesMap);
        });

        function addRoute(route: iRoute, map: routerMap, parentPath?: path) {
            let _route: path = route.path;
            let _template: Route | DynamicRoute = new Route(
                route.template as routeIO,
                route.path,
                route.params || {},
                route.name
            );

            if (parentPath) {
                _route = parentPath + route.path;
            }

            if (_route.includes('/[id]')) {
                _template = new DynamicRoute(route.template as routeIO, route.path, route.params || {}, route.name);
            }

            map.set(_route, _template);

            if (route.includes?.length) {
                route.includes.forEach((childRoute) => {
                    addRoute(childRoute, map, _route);
                });
            }
        }
    }
    private renderPage(ioNode: IO) {
        const ioElement = ioNode.render();
        this._root.innerHTML = '';
        this._root.appendChild(ioElement);
    }

    private middleware(routeNode: Route, ioNode: IO, callback: () => void) {
        console.log('middleware');
        const { isPrivate, redirectTo } = routeNode.params;
        if (isPrivate) {
            console.log('isPrivate');
            const authResult = this._authMethod();
            console.log('this.authMethod()', this._authMethod());
            if (!authResult) {
                this.navigate('/auth');
            }
        }
        if (redirectTo) {
            this.navigate(redirectTo);
            return;
        }
        console.log(callback);
        callback();
    }

    private loadPage(path: path) {
        const page = this._routesMap.get(path);
        if (!page) {
            console.log('page not found', path.split('/'));

            const pathSplit = path.split('/');
            const findParams = pathSplit[1];
            const id = pathSplit[pathSplit.length - 1];
            const arrayOfRoutes = Array.from(this._routesMap.keys());
            let dynRoute: { routeNode: DynamicRoute; id: string } | undefined;
            arrayOfRoutes.forEach((el) => {
                if (el.includes(findParams)) {
                    const data = this._routesMap.get(el);
                    if (data) {
                        dynRoute = { routeNode: data, id: id };
                    }
                }
            });
            if (!dynRoute || !id || !findParams) {
                const routeNode = this._404;
                const ioNode = routeNode.io('404');
                document.title = this._404.name;
                this.middleware(routeNode, ioNode, () => {
                    this.renderPage(ioNode);
                });
            } else {
                const routeNode = dynRoute.routeNode;
                const ioNode = routeNode.io(id);
                document.title = routeNode.name;
                this.middleware(routeNode, ioNode, () => {
                    this.renderPage(ioNode);
                });
            }
        } else {
            const routeNode = page;
            const ioNode = routeNode.io('');
            document.title = routeNode.name;
            this.middleware(routeNode, ioNode, () => {
                this.renderPage(ioNode);
            });
        }
    }

    public navigate(path: path) {
        window.location.href = path;
        this.loadPage(path);
    }
}
