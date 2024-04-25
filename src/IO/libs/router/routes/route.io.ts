import { iRouteParams, path, routeIO } from '../types/types';

export class Route {
    private _route: routeIO;
    private _name: string;
    private _path: string;
    private _params: iRouteParams;

    constructor(route: routeIO, path: path, params: iRouteParams, name?: string) {
        this._name = name || '';
        this._route = route;
        this._path = path;
        this._params = params;
    }

    get path() {
        return this._path;
    }
    get params() {
        return this._params;
    }
    get io() {
        return this._route;
    }
    get name() {
        return this._name;
    }
}
