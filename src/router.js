const routes = {
    '#/dashboard': () => import('./pages/dashboard.js'),
    '#/students': () => import('./pages/students.js'),
    '#/assessments': () => import('./pages/assessments.js'),
    '#/resources': () => import('./pages/resources.js'),
    '#/bookings': () => import('./pages/bookings.js'),
    '#/messages': () => import('./pages/messages.js'),
};

export function initRouter({ appElement, announcerElement, defaultRoute = '#/dashboard', baseTitle = 'Clinical Supervisor Portal' }) {
    if (!appElement) {
        throw new Error('Router requires an appElement to render into.');
    }

    const state = {
        appElement,
        announcerElement,
        defaultRoute,
        baseTitle,
        context: {},
        started: false,
        currentHash: null,
    };

    async function renderRoute(hash) {
        const loader = routes[hash];
        if (!loader) {
            return;
        }

        try {
            const module = await loader();
            const section = module.render ? module.render({ ...state.context }) : null;

            if (!(section instanceof HTMLElement)) {
                throw new Error(`Route ${hash} did not return a valid HTMLElement.`);
            }

            state.appElement.innerHTML = '';
            state.appElement.appendChild(section);

            const pageTitle = module.pageTitle || 'Clinical Supervisor Portal';
            document.title = `${pageTitle} | ${state.baseTitle}`;

            if (state.announcerElement) {
                state.announcerElement.textContent = '';
                state.announcerElement.textContent = `Navigated to ${pageTitle}`;
            }

            const heading = section.querySelector('h1');
            if (heading) {
                requestAnimationFrame(() => {
                    heading.focus();
                });
            }
        } catch (error) {
            console.error(`Failed to render route ${hash}:`, error);
        }
    }

    async function handleNavigation() {
        if (!state.started) {
            return;
        }

        let hash = window.location.hash || state.defaultRoute;
        if (!routes[hash]) {
            hash = state.defaultRoute;
            window.location.hash = hash;
        }

        if (hash === state.currentHash) {
            await renderRoute(hash);
            return;
        }

        state.currentHash = hash;
        await renderRoute(hash);
    }

    function start() {
        if (state.started) {
            return;
        }

        state.started = true;
        window.addEventListener('hashchange', handleNavigation);
        handleNavigation();
    }

    function navigate(hash) {
        if (!state.started) {
            return;
        }

        if (window.location.hash === hash) {
            handleNavigation();
        } else {
            window.location.hash = hash;
        }
    }

    function setContext(nextContext = {}) {
        state.context = { ...state.context, ...nextContext };
    }

    function refresh() {
        if (state.started) {
            handleNavigation();
        }
    }

    return {
        start,
        navigate,
        setContext,
        refresh,
    };
}
