export interface iQueryParams {
    [key: string]: string;
}
export class QueryParamsModule {
    private readonly _domain: string;
    private readonly link: string;

    constructor(domain: string) {
        this._domain = domain;
        this.link = window.location.href.replace(this._domain, '');
    }

    public queryParams(): iQueryParams | null {
        if (this.link.includes('?')) {
            const queryList = this.link.split('?')[1].split('&');
            const queries: iQueryParams = {};
            queryList.forEach((el) => {
                const data = el.split('=');
                queries[data[0]] = data[1];
            });
            return queries;
        } else {
            return null;
        }
    }
}
