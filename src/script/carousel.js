import EmblaCarousel from 'embla-carousel';

/**
 * Initializes the Embla carousel for testimonials along with navigation controls and pagination dots.
 *
 * @returns {void}
 */
export const initCarousel = () => {
    const emblaNode = document.querySelector('#testimonials-carousel');
    if (!emblaNode) return;

    const viewportNode = emblaNode.querySelector('.embla__viewport');
    const prevBtnNode = emblaNode.querySelector('.embla__prev');
    const nextBtnNode = emblaNode.querySelector('.embla__next');
    const dotsContainer = emblaNode.querySelector('.embla__dots');

    // Initialize Embla
    const emblaApi = EmblaCarousel(viewportNode, { loop: true });

    // Handle Arrows
    prevBtnNode.addEventListener('click', () => emblaApi.scrollPrev(), false);
    nextBtnNode.addEventListener('click', () => emblaApi.scrollNext(), false);

    /**
     * Generates HTML button elements for carousel pagination dots with data-index and numbered ARIA labels.
     *
     * @returns {void}
     */
    const generateDots = () => {
        dotsContainer.innerHTML = emblaApi
            .scrollSnapList()
            .map(
                (_, index) =>
                    `<button class="testimonials__dot" type="button" data-index="${index}" aria-label="Go to slide ${index + 1}"></button>`,
            )
            .join('');
    };

    /**
     * Updates active visual state class and ARIA current state for pagination dots.
     *
     * @returns {void}
     */
    const updateDots = () => {
        const dots = dotsContainer.querySelectorAll('.testimonials__dot');
        const currentIndex = emblaApi.selectedScrollSnap();

        dots.forEach((dot, index) => {
            const isActive = index === currentIndex;
            dot.classList.toggle('testimonials__dot--active', isActive);
            dot.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    };

    /**
     * Sets up event delegation on the dots container to handle pagination clicks.
     *
     * @returns {void}
     */
    const setupDotDelegation = () => {
        dotsContainer.addEventListener('click', (e) => {
            const dot = e.target.closest('.testimonials__dot');
            if (!dot) return;

            const index = Number(dot.dataset.index);
            if (!isNaN(index)) {
                emblaApi.scrollTo(index);
            }
        });
    };

    // 1. Immediate pagination setup (Embla is already initialized)
    generateDots();
    updateDots();
    setupDotDelegation();

    // 2. React to active slide changes and re-initialization events
    emblaApi.on('select', updateDots);
    emblaApi.on('reInit', () => {
        generateDots();
        updateDots();
    });
};
