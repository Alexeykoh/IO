import { IO } from '../IO/IO';
import { Page404 } from './pages/404/404.page';
import { IOAuthPage } from './pages/authentication/auth-page/auth-page.io';
import { Route } from './routes/route.io';
import { iIORouter, iRoute, iRoutes, layoutTemplate, middleware, path, routeIO, routerMap } from './types/types';

// Define a class called IORouter
export class IORouter {
    private readonly _routes: iRoutes; // Array of routes
    private readonly _domain: string; // Domain of the application
    private readonly _authMethod: () => boolean; // Method for authentication
    private readonly _authPage: Route; // Route for authentication
    private readonly _root: HTMLElement; // Root element to render content
    private readonly _href: path; // Current path
    private readonly _routesMap: routerMap; // Map of routes
    private readonly _404Page: Route; // Route for 404 page
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
        this._404Page = new Route(() => Page404(this.navigate), '/', {}, '404');

        // Initialize authentication route and method
        this._authPage = new Route(() => IOAuthPage(), '/auth', {}, 'io-auth');
        this._authMethod = params.auth || (() => false);

        // Middleware function
        this._middleware = params?.middleware;

        // Add root authentication route
        this.addRootAuthRoute();
        this.addRoot404Route();

        // Add routes to the map and load the current page
        this.addRoutesToMap();
    }

    // Getters
    get domain() {
        return this._domain;
    }
    get routes() {
        return Array.from(this._routesMap.entries());
    }
    get href() {
        return this._href;
    }

    // Private method to add the root authentication route
    private addRootAuthRoute() {
        if (!this._routesMap.has('/auth')) {
            this._routesMap.set('/auth', this._authPage);
        }
    }
    private addRoot404Route() {
        if (!this._routesMap.has('/404')) {
            this._routesMap.set('/404', this._404Page);
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
            const arrayOfRoutes = Array.from(this._routesMap.keys());
            if (
                arrayOfRoutes.includes('/' + path.split('/')[1]) &&
                arrayOfRoutes.includes('/' + path.split('/')[1] + '/[id]')
            ) {
                const routeNode = this._routesMap.get('/' + path.split('/')[1] + '/[id]');
                if (routeNode) {
                    const ioNode = routeNode.io(path.split('/')[2]);
                    document.title = routeNode.name;
                    this.middleware(routeNode, ioNode, () => {
                        this.renderPage(ioNode);
                    });
                }
            } else {
                this.navigate('/404');
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

    public init() {
        this.loadPage(this._href);
    }

    public HistoryNext() {
        history.forward();
    }
    public HistoryPrevious() {
        history.back();
    }
}
