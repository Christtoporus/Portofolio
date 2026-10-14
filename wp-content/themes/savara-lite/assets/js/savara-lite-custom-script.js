(function () {
    'use strict';

    const DELAY = 300; // ms
    const SUBMENU_SELECTOR = '.wp-block-navigation-submenu';
    const ACTIVE_CLASS = 'tm-hover-active';

    const timers = new WeakMap();

    function injectCSS() {
        const style = document.createElement('style');
        style.textContent = `
            .${ACTIVE_CLASS} .wp-block-navigation__submenu-container {
                height: auto !important;
                min-width: 200px !important;
                opacity: 1 !important;
                overflow: visible !important;
                visibility: visible !important;
                width: auto !important;
            }
        `;
        document.head.appendChild(style);
    }

    injectCSS();

    document.addEventListener(
        'mouseenter',
        (event) => {
            const li = event.target?.closest?.(SUBMENU_SELECTOR);
            if (!li) return;

            const t = timers.get(li);
            if (t) {
                clearTimeout(t);
                timers.delete(li);
            }

            li.classList.add(ACTIVE_CLASS);
        },
        true
    );

    document.addEventListener(
        'mouseleave',
        (event) => {
            const li = event.target?.closest?.(SUBMENU_SELECTOR);
            if (!li) return;

            const timeout = setTimeout(() => {
                li.classList.remove(ACTIVE_CLASS);
                timers.delete(li);
            }, DELAY);

            timers.set(li, timeout);
        },
        true
    );
})();