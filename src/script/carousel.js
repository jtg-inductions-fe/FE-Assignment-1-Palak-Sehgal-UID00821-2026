import EmblaCarousel from 'embla-carousel';
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

    // Handle Dots (Pagination)
    const generateDots = () => {
        dotsContainer.innerHTML = emblaApi
            .scrollSnapList()
            .map(
                () =>
                    `<button class="testimonials__dot" type="button" aria-label="Go to slide"></button>`,
            )
            .join('');
    };

    const updateDots = () => {
        const dots = dotsContainer.querySelectorAll('.testimonials__dot');
        const currentIndex = emblaApi.selectedScrollSnap();

        dots.forEach((dot, index) => {
            dot.classList.toggle(
                'testimonials__dot--active',
                index === currentIndex,
            );
        });
    };

    const addDotClicks = () => {
        const dots = dotsContainer.querySelectorAll('.testimonials__dot');
        dots.forEach((dot, index) => {
            dot.addEventListener(
                'click',
                () => emblaApi.scrollTo(index),
                false,
            );
        });
    };

    // Bootstrap pagination
    emblaApi.on('init', () => {
        generateDots();
        updateDots();
        addDotClicks();
    });

    emblaApi.on('select', updateDots);
    emblaApi.reInit(); // trigger init setup
};
