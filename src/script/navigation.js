/**
 * Initializes the header navigation toggling and mobile menu state.
 * Handles menu toggle interaction and outside click handler for accessibility.
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

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (
                !toggleBtn.contains(event.target) &&
                !navMenu.contains(event.target)
            ) {
                setMenuState(false);
            }
        });
    }
};
