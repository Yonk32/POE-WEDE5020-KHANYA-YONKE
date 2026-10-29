/**
 * Eco-Roots Live Search & Filter Script (search.js)
 * Enables real-time content filtering across service cards and listings.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Look for existing search input or inject search bar into header if container exists
    let searchInput = document.getElementById('site-search-input');
    const cardsGrid = document.querySelector('.services-grid');

    // If search bar is not manually coded into HTML, create a search widget above cards
    if (!searchInput && cardsGrid) {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-widget-container';
        searchContainer.style.cssText = 'margin-bottom: 2rem; display: flex; justify-content: center;';

        searchContainer.innerHTML = `
            <div style="position: relative; width: 100%; max-width: 500px;">
                <input 
                    type="text" 
                    id="site-search-input" 
                    placeholder="Search services, workshops, or programs..." 
                    aria-label="Search content"
                    style="width: 100%; padding: 0.75rem 1rem 0.75rem 2.5rem; border: 2px solid var(--border, #d8e2ec); border-radius: 25px; font-size: 1rem; outline: none; transition: border-color 0.25s ease;"
                >
                <svg style="position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #718096;" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>
        `;

        cardsGrid.parentNode.insertBefore(searchContainer, cardsGrid);
        searchInput = document.getElementById('site-search-input');
    }

    if (searchInput && cardsGrid) {
        // Create "No results" message container
        const noResultsMsg = document.createElement('div');
        noResultsMsg.className = 'no-search-results';
        noResultsMsg.style.cssText = 'display: none; text-align: center; padding: 2rem; color: #718096; width: 100%; grid-column: 1 / -1;';
        noResultsMsg.innerHTML = '<p style="font-size: 1.1rem;">No matching services or programs found. Try searching for "training", "supply", or "seeds".</p>';
        cardsGrid.appendChild(noResultsMsg);

        // Highlight input on focus
        searchInput.addEventListener('focus', function() {
            this.style.borderColor = 'var(--primary, #123c69)';
        });
        searchInput.addEventListener('blur', function() {
            this.style.borderColor = 'var(--border, #d8e2ec)';
        });

        // Search Filter Event
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();
            const cards = cardsGrid.querySelectorAll('.service-card');
            let visibleCount = 0;

            cards.forEach(card => {
                const title = card.querySelector('h3') ? card.querySelector('h3').textContent.toLowerCase() : '';
                const body = card.querySelector('p') ? card.querySelector('p').textContent.toLowerCase() : '';
                
                if (title.includes(query) || body.includes(query)) {
                    card.style.display = '';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Toggle No Results display
            if (visibleCount === 0 && query !== '') {
                noResultsMsg.style.display = 'block';
            } else {
                noResultsMsg.style.display = 'none';
            }
        });
    }
});