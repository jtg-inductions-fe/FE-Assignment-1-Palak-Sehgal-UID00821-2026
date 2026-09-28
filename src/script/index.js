import { initCarousel, renderTestimonials } from './carousel.js';
import { initDropdown } from './footer-dropdown.js';
import { initNavigation } from './navigation.js';
import { renderStats } from './stats.js';

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initCarousel();
    initDropdown();
    renderStats();
    renderTestimonials();
});
