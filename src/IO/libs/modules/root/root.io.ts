import { IORouter } from '../../../../IO-Router/router.io';
import { iConfig } from '../../../../IO-Router/types/types';

let navigator: (path: `/${string}`) => void;
let NextHistoryEvent: () => void;
let PreviousHistoryEvent: () => void;

export function navigate(path: `/${string}`) {
    if (navigator) {
        navigator(path);
    } else {
        throw new Error('"navigator" does not exist!');
    }
}
export function HistoryNavigate(vector: 'next' | 'back') {
    if (vector == 'back') {
        PreviousHistoryEvent();
    }
    if (vector == 'next') {
        NextHistoryEvent();
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
    NextHistoryEvent = router.HistoryNext;
    PreviousHistoryEvent = router.HistoryPrevious;

    router.init();
}
