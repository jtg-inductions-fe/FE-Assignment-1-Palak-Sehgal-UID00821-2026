/**
 * Initializes the footer navigation accordion dropdown for mobile viewports.
 * Handles click and keyboard accessibility events, as well as breakpoint resize resets.
 *
 * @returns {void}
 */
export const initDropdown = () => {
    const footerNavTitles = document.querySelectorAll('.footer__nav-title');
    const footerNavGroups = document.querySelectorAll('.footer__nav-group');
    const TABLET_BREAKPOINT = 431;

    // Toggle function for accordion
    const toggleAccordion = (title) => {
        if (window.innerWidth < TABLET_BREAKPOINT) {
            const group = title.closest('.footer__nav-group');
            if (group) {
                group.classList.toggle('footer__nav-group--open');
            }
        }
    };

    footerNavTitles.forEach((title) => {
        // Accessibility attributes for keyboard focus
        title.setAttribute('tabindex', '0');
        title.setAttribute('role', 'button');

        // Mouse click handler
        title.addEventListener('click', () => {
            toggleAccordion(title);
        });

        // Keyboard handler (Enter & Space keys)
        title.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault(); // Space press karne par page scroll roklega
                toggleAccordion(title);
            }
        });
    });

    // Handle screen resize across breakpoint
    const tabletBreakpoint = window.matchMedia(
        `(min-width: ${TABLET_BREAKPOINT}px)`,
    );

    const handleResize = (e) => {
        if (e.matches) {
            footerNavGroups.forEach((group) => {
                group.classList.remove('footer__nav-group--open');
            });
        }
    };

    tabletBreakpoint.addEventListener('change', handleResize);
};
