export class BreadcrumbItems {
    public routePath: string;
    public routeList: string[];

    constructor(params: { routePath: string; routeList: string[] }) {
        this.routePath = params.routePath;
        this.routeList = params.routeList;
    }
}
