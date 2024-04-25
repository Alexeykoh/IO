import { iRouteParams, routeIO } from '../types/types';
import { Route } from './route.io';

export class DynamicRoute extends Route {
    constructor(route: routeIO, path: `/${string}`, params: iRouteParams, name?: string | undefined) {
        super(route, path, params, name);
    }
}
