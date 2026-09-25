export const initDropdown = () => {
    const footerNavTitles = document.querySelectorAll('.footer__nav-title');
    const footerNavGroups = document.querySelectorAll('.footer__nav-group');

    // 1. Handle Click (Accordion functionality)
    footerNavTitles.forEach((title) => {
        title.addEventListener('click', () => {
            // Only allow toggling if the window is in mobile view
            // (assuming 768px is your tablet breakpoint)
            if (window.innerWidth < 768) {
                const group = title.closest('.footer__nav-group');
                group.classList.toggle('is-open');
            }
        });
    });

    // 2. Prevent mobile state from breaking tablet/desktop layouts
    const tabletBreakpoint = window.matchMedia('(min-width: 768px)');

    const handleResize = (e) => {
        if (e.matches) {
            // Screen is tablet or wider: close all mobile accordions
            footerNavGroups.forEach((group) => {
                group.classList.remove('is-open');
            });
        }
    };

    // Listen for window resize crossing the breakpoint
    tabletBreakpoint.addEventListener('change', handleResize);
};
