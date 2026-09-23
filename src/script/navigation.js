/**
 * Initializes the header navigation toggling and mobile menu state.
 * Handles menu toggle interaction, nav link clicks, outside click, and Escape key for accessibility.
 *
 * @returns {void}
 */
export const initNavigation = () => {
    const toggleBtn = document.querySelector('.header__toggle');
    const navMenu = document.querySelector('.header__nav');

    if (toggleBtn && navMenu) {
        const setMenuState = (isOpen) => {
            navMenu.classList.toggle('header__nav--open', isOpen);
            toggleBtn.setAttribute('aria-expanded', isOpen);
        };

        toggleBtn.addEventListener('click', () => {
            const isExpanded =
                toggleBtn.getAttribute('aria-expanded') === 'true';
            setMenuState(!isExpanded);
        });

        // Close menu when clicking any link inside navMenu (Event Delegation)
        navMenu.addEventListener('click', (event) => {
            if (event.target.closest('a')) {
                setMenuState(false);
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (
                !toggleBtn.contains(event.target) &&
                !navMenu.contains(event.target)
            ) {
                setMenuState(false);
            }
        });

        // Close menu on Escape key press & return focus to toggle button
        document.addEventListener('keydown', (event) => {
            const isExpanded =
                toggleBtn.getAttribute('aria-expanded') === 'true';
            if (event.key === 'Escape' && isExpanded) {
                setMenuState(false);
                toggleBtn.focus();
            }
        });
    }
};
