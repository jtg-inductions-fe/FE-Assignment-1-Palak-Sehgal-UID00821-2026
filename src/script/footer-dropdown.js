/**
 * Initializes the footer navigation accordion dropdown for mobile viewports.
 * Handles click and keyboard accessibility events, as well as breakpoint resize resets.
 *
 * @returns {void}
 */
export const initDropdown = () => {
    const footerNavButtons = document.querySelectorAll('.footer__nav-button');
    const footerNavGroups = document.querySelectorAll('.footer__nav-group');
    const TABLET_BREAKPOINT = 431;

    // Handle Click and Keyboard Access via native button
    footerNavButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (window.innerWidth < TABLET_BREAKPOINT) {
                const group = button.closest('.footer__nav-group');
                if (group) {
                    const isOpen = group.classList.toggle(
                        'footer__nav-group--open',
                    );
                    button.setAttribute('aria-expanded', isOpen);
                }
            }
        });
    });

    // Prevent mobile state from breaking tablet/desktop layouts
    const tabletBreakpoint = window.matchMedia(
        `(min-width: ${TABLET_BREAKPOINT}px)`,
    );

    const handleResize = (e) => {
        if (e.matches) {
            footerNavGroups.forEach((group) => {
                group.classList.remove('footer__nav-group--open');
                const button = group.querySelector('.footer__nav-button');
                if (button) {
                    button.setAttribute('aria-expanded', 'false');
                }
            });
        }
    };

    tabletBreakpoint.addEventListener('change', handleResize);
};
