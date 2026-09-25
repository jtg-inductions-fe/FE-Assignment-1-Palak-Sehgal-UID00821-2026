import { initCarousel } from './carousel.js';
import { initDropdown } from './footer-dropdown.js';
import { initNavigation } from './navigation.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCarousel();
    initDropdown();
});
