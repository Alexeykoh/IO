import { IO } from '../modules/IO';
import { Page404 } from './404/404.page';
import { IOAuthPage } from './authentication/auth-page/auth-page.io';
import { Route } from './routes/route.io';
import { iIORouter, iRoute, iRoutes, layoutTemplate, middleware, path, routeIO, routerMap } from './types/types';

// Define a class called IORouter
export class IORouter {
    private readonly _routes: iRoutes; // Array of routes
    private readonly _domain: string; // Domain of the application
    private readonly _authMethod: () => boolean; // Method for authentication
    private readonly _authRoute: Route; // Route for authentication
    private readonly _root: HTMLElement; // Root element to render content
    private readonly _href: path; // Current path
    private readonly _routesMap: routerMap; // Map of routes
    private readonly _404: Route; // Route for 404 page
    private readonly _layout: layoutTemplate; // Layout function
    public _middleware: middleware; // Middleware function

    // Constructor for the IORouter class
    constructor(params: iIORouter) {
        // Initialize parameters
        this._root = params.root || document.body;
        this._domain = params.domain;
        this._routes = params.routes;
        this._routesMap = new Map();
        this._layout = params.layout || undefined;
        this._href = this.editPath(window.location.href);

        // Initialize the 404 route
        this._404 = new Route(() => Page404(this.navigate), '/', {}, '404');

        // Initialize authentication route and method
        this._authRoute = new Route(() => IOAuthPage(), '/auth', {}, 'io-auth');
        this._authMethod = params.auth || (() => false);

        // Middleware function
        this._middleware = params?.middleware;

        // Add root authentication route
        this.addRootAuthRoute();
        this.addRoot404Route();

        // Add routes to the map and load the current page
        this.addRoutesToMap();
    }

    // Getter for the domain property
    get domain() {
        return this._domain;
    }

    // Getter for the routes property
    get routes() {
        return Array.from(this._routesMap.entries());
    }

    // Getter for the href property
    get href() {
        return this._href;
    }

    // Private method to add the root authentication route
    private addRootAuthRoute() {
        if (!this._routesMap.has('/auth')) {
            this._routesMap.set('/auth', this._authRoute);
        }
    }
    private addRoot404Route() {
        if (!this._routesMap.has('/404')) {
            this._routesMap.set('/404', this._404);
        }
    }

    // Private method to edit the path
    private editPath(path: string) {
        const edited = path.replace(this._domain, '');
        if (edited[edited.length - 1]) {
            edited.slice(0, -1);
        }

        return edited as path;
    }

    // Private method to add routes to the map
    private addRoutesToMap() {
        this._routes.forEach((route) => {
            addRoute(route, this._routesMap);
        });

        function addRoute(route: iRoute, map: routerMap, parentPath?: path) {
            let _route: path = route.path;
            let _template: Route = new Route(route.template as routeIO, route.path, route.params || {}, route.name);

            if (parentPath) {
                _route = parentPath + route.path;
            }

            if (_route.includes('/[id]')) {
                _template = new Route(route.template as routeIO, route.path, route.params || {}, route.name);
            }

            map.set(_route, _template);

            if (route.includes?.length) {
                route.includes.forEach((childRoute) => {
                    addRoute(childRoute, map, _route);
                });
            }
        }
    }

    // Private method to render the page
    private renderPage(ioNode: IO) {
        this._root.innerHTML = '';
        let ioElement: HTMLElement;
        if (this._layout) {
            ioElement = this._layout([() => ioNode]).render();
        } else {
            ioElement = ioNode.render();
        }
        this._root.appendChild(ioElement);
    }

    // Private method for middleware
    private middleware(routeNode: Route, ioNode: IO, callback: () => void) {
        if (this._middleware) {
            this._middleware({ domain: this._domain, routes: this.routes, href: this.href });
        }
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

        callback();
    }

    // Private method to load a page
    private loadPage(path: path) {
        const page = this._routesMap.get(path);
        if (!page) {
            console.log('page not found', path.split('/'));

            const pathSplit = path.split('/');
            const findParams = pathSplit[1];
            const id = pathSplit[pathSplit.length - 1];
            const arrayOfRoutes = Array.from(this._routesMap.keys());
            let dynRoute: { routeNode: Route; id: string } | undefined;
            arrayOfRoutes.forEach((el) => {
                if (el.includes(findParams)) {
                    const data = this._routesMap.get(el);
                    if (data) {
                        dynRoute = { routeNode: data, id: id };
                    }
                }
            });
            if (!dynRoute || !id || !findParams) {
                this.navigate('/404');
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

    // Public method to navigate to a path
    public navigate(path: path) {
        window.location.href = path;
        this.loadPage(path);
    }

    public HistoryNext() {
        history.forward();
        console.log('next page');
    }
    public HistoryPrevios() {
        history.back();
        console.log('previos page');
    }
    public init() {
        this.loadPage(this._href);
    }
}
