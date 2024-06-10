import { init } from '../../IO-Root/root.io';
import { MockStoreServer } from './shared/mockData/mockStore';

export const server = new MockStoreServer();

export function AppRouter() {
    init();
}
