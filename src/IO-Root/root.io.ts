import { IORouter } from '../IO-Router/router.io';
import { iConfig } from '../IO-Router/types/types';
import { IO } from '../IO/IO';

// declare global variable
let navigator: (path: `/${string}`) => void;
let NextHistoryEvent: () => void;
let PreviousHistoryEvent: () => void;
let getBreadcrumbs: () => IO;

function navigate(path: `/${string}`) {
    // global navigate
    if (navigator) {
        navigator(path);
    } else {
        throw new Error('"navigator" does not exist!');
    }
}

function history(vector: 'next' | 'back') {
    // global history
    if (vector == 'back') {
        PreviousHistoryEvent();
    }
    if (vector == 'next') {
        NextHistoryEvent();
    }
}

function breadcrumbs(): IO {
    // global breadcrumbs
    return getBreadcrumbs();
}

// export init
export function init(config: iConfig) {
    const router = new IORouter({
        root: config.root,
        domain: config.domain,
        routes: config.routes,
        auth: config.auth,
        middleware: config.middleware,
        layout: config.layout,
    });

    // insert navigate
    navigator = router.navigate.bind(router);
    NextHistoryEvent = router.HistoryNext;
    PreviousHistoryEvent = router.HistoryPrevious;
    getBreadcrumbs = router.breadcrumbs();

    // insert init
    router.init();
}

// export modules
export { history as HistoryNavigate, breadcrumbs, navigate };
