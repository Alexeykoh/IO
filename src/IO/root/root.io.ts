import { IORouter } from '../libs/router/router.io';
import { iConfig } from '../libs/router/types/types';

let navigator: (path: `/${string}`) => void;

export function navigate(path: `/${string}`) {
    if (navigator) {
        navigator(path);
    } else {
        throw new Error('"navigator" does not exist!');
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

    router.init();
}
