import { IORouter } from '../libs/router/router.io';
import { iConfig } from '../libs/router/types/types';

let navigator: (path: `/${string}`) => void;
let NextHIstorEvent: () => void;
let PreviosHIstorEvent: () => void;
export function navigate(path: `/${string}`) {
    if (navigator) {
        navigator(path);
    } else {
        throw new Error('"navigator" does not exist!');
    }
}

export function Historynavigate(vector: 'next' | 'back') {
  console.log(history);
    if (vector == 'back') {
        PreviosHIstorEvent();
    }
    if (vector == 'next') {
        NextHIstorEvent();
    }
}

export function ioInit(config: iConfig) {
    const router = new IORouter({
        root: config.root,
        domain: config.domain,
        routes: config.routes,
        auth: config.auth,
        middleware: config.middleware,
        layout: config.layout,
    });

    // insert navigate
    navigator = router.navigate;
    NextHIstorEvent = router.HistoryNext;
    PreviosHIstorEvent = router.HistoryPrevios;
    router.init();
}
