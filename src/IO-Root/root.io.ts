import { IORouter } from '../IO-Router/router.io';
import { getRoutes } from '../examples/router/routes.io';
import { Layout } from '../examples/router/shared/layout';

// export init
const router = new IORouter({
    root: document.body,
    domain: window.location.origin,
    routes: getRoutes(),
    auth: async () => {
        return true;
    },
    layout: Layout,
});

// insert modules
export const navigate = router.navigate.bind(router);
export const history = router.history.bind(router);
export const breadcrumbs = router.breadcrumbs();
export const queryParams = router.queryParams();

// insert init
export function init() {
    router.init();
}
