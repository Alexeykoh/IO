import { IO } from '../../../IO';
import { Route } from '../routes/route.io';

// types
export type path = `/${string}`;
export type iRoutes = iRoute[];
export type routerMap = Map<string, Route>;
export type routeIO = (data: string) => IO;

// interfaces
export interface iRouteParams {
    isActive?: boolean;
    isPrivate?: boolean;
    redirectTo?: path;
}

export interface iRoute {
    name?: string;
    path: path;
    template: routeIO;
    params?: iRouteParams;
    includes?: iRoutes;
}
export interface iIORouter {
    root?: HTMLElement;
    auth?: () => boolean;
    middleware?: (data: iMiddlewareData) => void;
    domain: `http://${string}` | `https://${string}`;
    routes: iRoutes;
}

export interface iMiddlewareData {
    domain: string;
    routes: [string, Route][];
    href: path;
}
