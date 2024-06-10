export class BreadcrumbItems {
    public routePath: string;
    public routeList: { name: string; link: string }[];

    constructor(params: { routePath: string; routeList: { name: string; link: string }[] }) {
        this.routePath = params.routePath;
        this.routeList = params.routeList;
    }
}
