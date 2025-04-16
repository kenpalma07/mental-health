import { createInertiaApp } from '@inertiajs/react';
import createServer from '@inertiajs/react/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import ReactDOMServer from 'react-dom/server';
import { type RouteName, route } from 'ziggy-js';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createServer((page) =>
    createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        title: (title) => `${title} - ${appName}`,
        //resolve: (name) => resolvePageComponent(`./pages/${name}.tsx`, import.meta.glob('./pages/**/*.tsx')),
        resolve: (name) => {
            let pages = null;
            let path = null;
    
            // resolve js path
            let parts = name.split("::");
            let type = false;
    
            if (parts.length > 1) {
                type = parts[0];
            }
    
            if (type) {
                let nameVue = parts[1].split(".")[0];
    
                path = `../../Modules/${parts[0]}/resources/assets/js/Pages/${nameVue}.tsx`;
                pages = import.meta.glob(
                    "../../Modules/*/resources/assets/js/**/*.tsx"
                );
            } else {
                path = `./Pages/${name}.vue`;
                pages = import.meta.glob("./Pages/**/*.tsx");
            }
    
            return resolvePageComponent(path, pages);
        },
        setup: ({ App, props }) => {
            /* eslint-disable */
            // @ts-expect-error
            global.route<RouteName> = (name, params, absolute) =>
                route(name, params as any, absolute, {
                    // @ts-expect-error
                    ...page.props.ziggy,
                    // @ts-expect-error
                    location: new URL(page.props.ziggy.location),
                });
            /* eslint-enable */

            return <App {...props} />;
        },
    }),
);
