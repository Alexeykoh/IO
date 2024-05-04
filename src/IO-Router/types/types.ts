import { IO } from '../../IO/IO';
import { Route } from '../routes/route.io';

// types
export type path = `/${string}`;
export type iRoutes = iRoute[];
export type routerMap = Map<string, Route>;
export type routeIO = (data: string) => IO;
export type domain = `http://${string}` | `https://${string}`;
export type middleware = ((data: iMiddlewareData) => void) | undefined;
export type layoutTemplate = ((children: (() => IO)[]) => IO) | undefined;

// interfaces
export interface iRouteParams {
    isActive?: boolean;
    isPrivate?: boolean;
    redirectTo?: path;
}

export interface iRoute {
    path: path;
    name?: string;
    template: routeIO;
    params?: iRouteParams;
    includes?: iRoutes;
}
export interface iIORouter {
    domain: domain;
    routes: iRoutes;
    root?: HTMLElement;
    auth?: () => boolean;
    middleware?: (data: iMiddlewareData) => void;
    layout?: layoutTemplate;
}

export interface iMiddlewareData {
    domain: string;
    routes: [string, Route][];
    href: path;
}

export interface iConfig {
    root: HTMLElement;
    domain: domain;
    routes: iRoutes;
    auth?: (() => boolean) | undefined;
    middleware?: middleware;
    layout?: layoutTemplate;
}
