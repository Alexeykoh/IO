import { iConfig } from '../IO/libs/router/types/types';
import { ioInit } from '../IO/root/root.io';
import { ioRoutes } from './routes.io';
import { Layout } from './shared/layout';
import { MockStoreServer } from './shared/mockData/mockStore';

export const server = new MockStoreServer();

export const rootConfig: iConfig = {
    root: document.body,
    domain: 'http://localhost:8080',
    routes: ioRoutes,
    auth: undefined,
    middleware: undefined,
    layout: Layout,
};

export function APP() {
    ioInit(rootConfig);
}
