/**
 * @typedef {Object} StatItem
 * @property {number} value - The raw numerical metric value.
 * @property {string} label - The descriptive label for the statistic card.
 * @property {boolean} [hasPlus] - Indicates whether a '+' symbol should be appended to the value.
 * @property {string} [icon] - Optional asset URL path for dynamic decorative icon rendering.
 */

/**
 * Array containing statistical metrics data for the Travel Point section.
 * @type {StatItem[]}
 */
export const statsData = [
    {
        value: 500,
        label: 'Holiday Package',
        hasPlus: true,
    },
    {
        value: 100,
        label: 'Luxury Hotel',
        icon: '/assets/logos/ticket-logo.svg',
    },
    {
        value: 7,
        label: 'Premium Airlines',
    },
    {
        value: 2000,
        label: 'Happy Customer',
        hasPlus: true,
    },
];

/**
 * Formats a given numerical value into a human-readable string with dynamic suffixes (k, L, M).
 *
 * @param {number} num - The numerical value to format.
 * @returns {string} The formatted string containing the scaled number and suffix.
 */
export function formatStatNumber(num) {
    if (typeof num !== 'number' || Number.isNaN(num)) {
        return '0';
    }

    if (num >= 1000000) {
        return (num / 1000000).toFixed(0) + 'M'; // Millions
    }
    if (num >= 100000) {
        return (num / 100000).toFixed(0) + 'L'; // Lakhs
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(0) + 'k'; // Thousands
    }
    return num.toString();
}

/**
 * Dynamically constructs and injects HTML representation of statistics cards into the DOM.
 *
 * @param {string} [containerId="travel-point-stats"] - The HTML element ID of the stats wrapper.
 * @returns {void}
 */
export function renderStats(containerId = 'travel-point-stats') {
    const container = document.getElementById(containerId);
    if (!container) return;

    container.innerHTML = statsData
        .map((stat) => {
            const formattedNumber = formatStatNumber(stat.value);
            const displayValue = `${formattedNumber}${stat.hasPlus ? '+' : ''}`;

            const decorIcon = stat.icon
                ? `<div class="travel-point__decor-icon">
                     <img src="${stat.icon}" alt="" aria-hidden="true" class="travel-point__decor-img" />
                   </div>`
                : '';

            return `
                <div class="travel-point__stat-card">
                    <span class="travel-point__stat-number">${displayValue}</span>
                    <span class="travel-point__stat-label">${stat.label}</span>
                    ${decorIcon}
                </div>
            `;
        })
        .join('');
}
