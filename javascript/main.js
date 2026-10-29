/**
 * Eco-Roots Main Website Controller Script (main.js)
 * Manages mobile navigation toggle, active page state, scroll-to-top, and UX enhancements.
 */
document.addEventListener('DOMContentLoaded', function() {
    
    // ==========================================
    // 1. ACTIVE NAVIGATION HIGHLIGHTING
    // ==========================================
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.site-nav a');

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href').split('/').pop();
        if (linkPath === currentPath) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });

    // ==========================================
    // 2. MOBILE NAVIGATION MENU TOGGLE
    // ==========================================
    const headerInner = document.querySelector('.header-inner');
    const siteNav = document.querySelector('.site-nav');

    if (headerInner && siteNav) {
        // Create Mobile Menu Button
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'mobile-nav-toggle';
        toggleBtn.setAttribute('aria-label', 'Toggle Navigation Menu');
        toggleBtn.setAttribute('aria-expanded', 'false');
        toggleBtn.innerHTML = `
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                <line x1="3" y1="12" x2="21" y2="12"></line>
                <line x1="3" y1="6" x2="21" y2="6"></line>
                <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
        `;

        // Style Mobile Toggle Button
        toggleBtn.style.cssText = `
            display: none;
            background: transparent;
            border: none;
            color: #ffffff;
            cursor: pointer;
            padding: 0.5rem;
        `;

        headerInner.appendChild(toggleBtn);

        // Inject Media Rule for Toggle Button
        const mobileStyle = document.createElement('style');
        mobileStyle.textContent = `
            @media (max-width: 768px) {
                .mobile-nav-toggle { display: block !important; }
                .site-nav { 
                    display: none; 
                    width: 100%; 
                    flex-direction: column; 
                    gap: 0.5rem; 
                    padding-top: 1rem;
                }
                .site-nav.is-open { display: flex !important; }
            }
        `;
        document.head.appendChild(mobileStyle);

        toggleBtn.addEventListener('click', function() {
            const isOpen = siteNav.classList.toggle('is-open');
            toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
        });
    }

    // ==========================================
    // 3. BACK TO TOP BUTTON
    // ==========================================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.setAttribute('aria-label', 'Scroll to top');
    backToTopBtn.innerHTML = '&#8679;';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 42px;
        height: 42px;
        background-color: var(--primary, #123c69);
        color: #ffffff;
        border: 2px solid var(--accent, #f4b41a);
        border-radius: 50%;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        z-index: 999;
        transition: opacity 0.3s ease, transform 0.2s ease;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    `;

    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================================
    // 4. DYNAMIC COPYRIGHT YEAR
    // ==========================================
    const copyrightParagraph = document.querySelector('.footer-bottom p');
    if (copyrightParagraph) {
        const year = new Date().getFullYear();
        copyrightParagraph.innerHTML = copyrightParagraph.innerHTML.replace(/\b20\d{2}\b/, year);
    }
});