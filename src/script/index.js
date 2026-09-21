document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.querySelector('.header__toggle');
    const navMenu = document.querySelector('.header__nav');

    if (toggleBtn && navMenu) {
        toggleBtn.addEventListener('click', () => {
            // Toggle open class
            navMenu.classList.toggle('header__nav--open');

            // Accessibility (aria-expanded update)
            const isExpanded = navMenu.classList.contains('header__nav--open');
            toggleBtn.setAttribute('aria-expanded', isExpanded);
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (
                !toggleBtn.contains(event.target) &&
                !navMenu.contains(event.target)
            ) {
                navMenu.classList.remove('header__nav--open');
                toggleBtn.setAttribute('aria-expanded', 'false');
            }
        });
    }
});
