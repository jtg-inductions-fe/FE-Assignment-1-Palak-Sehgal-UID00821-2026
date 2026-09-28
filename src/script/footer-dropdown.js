/**
 * Initializes the footer navigation accordion dropdown for mobile viewports.
 * Handles click and keyboard accessibility events, as well as breakpoint resize resets.
 *
 * CSS open state is driven solely by [aria-expanded="true"] via the :has() selector —
 * no separate modifier class is needed, keeping ARIA and visual state synchronized.
 *
 * @returns {void}
 */
export const initDropdown = () => {
    const footerNavButtons = document.querySelectorAll('.footer__nav-button');
    const TABLET_BREAKPOINT = 431;

    // Handle Click and Keyboard Access via native button.
    // aria-expanded is the single source of truth — CSS reacts to it directly.
    footerNavButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (window.innerWidth < TABLET_BREAKPOINT) {
                const isOpen = button.getAttribute('aria-expanded') === 'true';
                button.setAttribute('aria-expanded', String(!isOpen));
            }
        });
    });

    // Prevent mobile state from breaking tablet/desktop layouts
    const tabletBreakpoint = window.matchMedia(
        `(min-width: ${TABLET_BREAKPOINT}px)`,
    );

    const handleResize = (e) => {
        if (e.matches) {
            footerNavButtons.forEach((button) => {
                button.setAttribute('aria-expanded', 'false');
                button.setAttribute('tabindex', '-1');
            });
        } else {
            footerNavButtons.forEach((button) => {
                button.removeAttribute('tabindex');
            });
        }
    };

    tabletBreakpoint.addEventListener('change', handleResize);

    // Call the reset routine immediately based on the initial state
    if (tabletBreakpoint.matches) {
        handleResize(tabletBreakpoint);
    }
};
