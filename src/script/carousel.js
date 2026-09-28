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

/**
 * @typedef {Object} TestimonialItem
 * @property {number|string} id - Unique identifier for the testimonial entry.
 * @property {string} name - Name of the reviewer or client.
 * @property {string} role - Designation or description of the reviewer.
 * @property {string} avatar - Image asset URL for the reviewer's profile picture.
 * @property {string} [altText] - Accessible alt text description for the avatar image.
 * @property {number} rating - Star rating value (typically 1 to 5).
 * @property {string} quote - Client's testimonial or review commentary.
 */

/**
 * Array containing dynamic client feedback and testimonials data.
 * @type {TestimonialItem[]}
 */
export const testimonialsData = [
    {
        id: 1,
        name: 'Mark Smith',
        role: 'Travel Enthusiast',
        avatar: '/assets/images/testimonial-user-avatar-desktop.png',
        altText: 'Mark Smith wearing VR headset',
        rating: 5,
        quote: 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC.',
    },
    {
        id: 2,
        name: 'Jane Doe',
        role: 'Explorer',
        avatar: '/assets/images/testimonial-user-avatar-desktop.png',
        altText: 'Jane Doe profile picture',
        rating: 5,
        quote: 'Another great review showcasing the amazing experience provided. Highly recommended for any travel enthusiasts!',
    },
    {
        id: 3,
        name: 'Alex Johnson',
        role: 'Adventurer',
        avatar: '/assets/images/testimonial-user-avatar-desktop.png',
        altText: 'Alex Johnson profile picture',
        rating: 5,
        quote: 'An unforgettable journey. The customer service and booking process were smooth from start to finish.',
    },
];

/**
 * Generates HTML icon elements representing a numeric star rating.
 *
 * @param {number} rating - Numeric score representing total active stars.
 * @returns {string} Concatenated string of star icon HTML elements.
 */
export function renderStarRating(rating) {
    const totalStars = Math.min(Math.max(Math.round(rating), 0), 5);
    return Array.from({ length: totalStars })
        .map(() => `<i class="icon-star" aria-hidden="true"></i>`)
        .join('');
}

/**
 * Dynamically constructs testimonial slide elements and injects them into the DOM container.
 *
 * @param {string} [containerId="testimonials-track"] - HTML element ID of the carousel track.
 * @returns {void}
 */
export function renderTestimonials(containerId = 'testimonials-track') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = testimonialsData
        .map((item) => {
            const starsHtml = renderStarRating(item.rating);

            return `
                <div class="testimonials__slide embla__slide">
                    <div class="testimonials__avatar-wrapper">
                        <img
                            src="${item.avatar}"
                            alt="${item.altText || item.name}"
                            class="testimonials__avatar"
                            loading="lazy"
                        />
                    </div>

                    <div class="testimonials__info">
                        <h3 class="testimonials__author">
                            <span class="testimonials__name">${item.name}</span>
                            /
                            <span class="testimonials__role">${item.role}</span>
                        </h3>
                        <div
                            class="testimonials__stars"
                            role="img"
                            aria-label="${item.rating} out of 5 stars"
                        >
                            ${starsHtml}
                        </div>
                    </div>

                    <p class="testimonials__quote">${item.quote}</p>
                </div>
            `;
        })
        .join('');
}
