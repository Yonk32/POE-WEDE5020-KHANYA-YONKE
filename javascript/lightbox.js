/**
 * Eco-Roots Lightbox Modal Script (lightbox.js)
 * Provides full-screen image preview with controls and accessibility features.
 */
document.addEventListener('DOMContentLoaded', function() {
    // Create lightbox DOM elements dynamically
    const lightbox = document.createElement('div');
    lightbox.id = 'eco-lightbox';
    lightbox.className = 'eco-lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-modal', 'true');
    lightbox.setAttribute('aria-hidden', 'true');

    lightbox.innerHTML = `
        <div class="lightbox-overlay"></div>
        <div class="lightbox-content">
            <button class="lightbox-close" aria-label="Close Lightbox">&times;</button>
            <button class="lightbox-prev" aria-label="Previous Image">&#10094;</button>
            <button class="lightbox-next" aria-label="Next Image">&#10095;</button>
            <img class="lightbox-image" src="" alt="">
            <div class="lightbox-caption"></div>
        </div>
    `;

    document.body.appendChild(lightbox);

    // Apply internal styles for the lightbox modal dynamically
    const style = document.createElement('style');
    style.textContent = `
        .eco-lightbox {
            display: none;
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 10000;
            align-items: center;
            justify-content: center;
        }
        .eco-lightbox.active {
            display: flex;
        }
        .lightbox-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(18, 60, 105, 0.88);
            backdrop-filter: blur(4px);
        }
        .lightbox-content {
            position: relative;
            max-width: 90%;
            max-height: 85%;
            z-index: 10001;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        .lightbox-image {
            max-width: 100%;
            max-height: 75vh;
            border-radius: 8px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            object-fit: contain;
        }
        .lightbox-caption {
            margin-top: 1rem;
            color: #ffffff;
            font-size: 1.1rem;
            text-align: center;
            font-weight: 500;
        }
        .lightbox-close, .lightbox-prev, .lightbox-next {
            position: absolute;
            background: rgba(0, 0, 0, 0.5);
            color: #ffffff;
            border: none;
            cursor: pointer;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background 0.25s ease, transform 0.2s ease;
            z-index: 10002;
        }
        .lightbox-close:hover, .lightbox-prev:hover, .lightbox-next:hover {
            background: var(--accent, #f4b41a);
            color: #0b2942;
        }
        .lightbox-close {
            top: -2.5rem;
            right: 0;
            width: 36px;
            height: 36px;
            font-size: 1.5rem;
        }
        .lightbox-prev {
            left: -3rem;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            font-size: 1.25rem;
        }
        .lightbox-next {
            right: -3rem;
            top: 50%;
            transform: translateY(-50%);
            width: 44px;
            height: 44px;
            font-size: 1.25rem;
        }
        @media (max-width: 768px) {
            .lightbox-prev { left: 0.5rem; }
            .lightbox-next { right: 0.5rem; }
            .lightbox-close { top: -2.8rem; right: 0.5rem; }
        }
    `;
    document.head.appendChild(style);

    // Lightbox Logic & State Management
    let imagesList = [];
    let currentIndex = 0;

    const imgElement = lightbox.querySelector('.lightbox-image');
    const captionElement = lightbox.querySelector('.lightbox-caption');
    const closeBtn = lightbox.querySelector('.lightbox-close');
    const prevBtn = lightbox.querySelector('.lightbox-prev');
    const nextBtn = lightbox.querySelector('.lightbox-next');
    const overlay = lightbox.querySelector('.lightbox-overlay');

    // Collect all image triggers on page (images with .service-image class or data-lightbox)
    function refreshGallery() {
        imagesList = Array.from(document.querySelectorAll('.service-image, img[data-lightbox="true"]'));
        imagesList.forEach((img, index) => {
            img.style.cursor = 'pointer';
            img.setAttribute('data-lightbox-index', index);
            img.addEventListener('click', function() {
                openLightbox(index);
            });
        });
    }

    function openLightbox(index) {
        currentIndex = index;
        updateLightbox();
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden'; // Lock scrolling
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = ''; // Unlock scrolling
    }

    function updateLightbox() {
        if (!imagesList[currentIndex]) return;
        const targetImg = imagesList[currentIndex];
        imgElement.src = targetImg.src;
        imgElement.alt = targetImg.alt || 'Eco-Roots Project View';
        captionElement.textContent = targetImg.alt || targetImg.title || 'Eco-Roots Community Garden';
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % imagesList.length;
        updateLightbox();
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + imagesList.length) % imagesList.length;
        updateLightbox();
    }

    // Event Listeners
    closeBtn.addEventListener('click', closeLightbox);
    overlay.addEventListener('click', closeLightbox);
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Keyboard support
    document.addEventListener('keydown', function(e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
    });

    refreshGallery();
});