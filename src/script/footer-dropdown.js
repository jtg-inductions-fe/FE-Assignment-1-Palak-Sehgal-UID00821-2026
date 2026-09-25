export const initDropdown = () => {
    const footerNavTitles = document.querySelectorAll('.footer__nav-title');

    footerNavTitles.forEach((title) => {
        title.addEventListener('click', () => {
            const group = title.closest('.footer__nav-group');

            group.classList.toggle('is-open');
        });
    });
};
