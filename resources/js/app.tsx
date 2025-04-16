import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { initializeTheme } from './hooks/use-appearance';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

createInertiaApp({
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
            path = `./Pages/${name}.tsx`;
            pages = import.meta.glob("./Pages/**/*.tsx");
        }

        return resolvePageComponent(path, pages);
    },
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(<App {...props} />);
    },
    progress: {
        color: '#4B5563',
    },
});

// This will set light / dark mode on load...
initializeTheme();
