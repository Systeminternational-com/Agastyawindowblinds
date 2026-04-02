// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "919133315053"; 

// --- EDIT YOUR PRODUCT NAMES AND CATEGORIES HERE ---
// You can change the "name" to whatever you like. 
// "category" must be either "home", "office", or "more" to match the filters.
const productData = [
    { id: 1, name: "Premium Zebra Blind", category: "home" },
    { id: 2, name: "Office Roller Blind", category: "office" },
    { id: 3, name: "Classic Wooden Blind", category: "more" },
    { id: 4, name: "Blackout Roller Blind", category: "home" },
    { id: 5, name: "Motorized Smart Blind", category: "office" },
    { id: 6, name: "Vertical Fabric Blind", category: "more" },
    { id: 7, name: "Translucent Roller", category: "home" },
    { id: 8, name: "Corporate Dual Blind", category: "office" },
    { id: 9, name: "Bamboo Pattern Blind", category: "more" },
    { id: 10, name: "Living Room Zebra", category: "home" },
    { id: 11, name: "Conference Room Blind", category: "office" },
    { id: 12, name: "Custom Printed Blind", category: "more" },
    { id: 13, name: "Bedroom Blackout", category: "home" },
    { id: 14, name: "Executive Office Blind", category: "office" },
    { id: 15, name: "Patio Sunscreen", category: "more" },
    { id: 16, name: "Kitchen Roller Blind", category: "home" },
    { id: 17, name: "Reception Zebra Blind", category: "office" },
    { id: 18, name: "Luxury Roman Blind", category: "more" }
];

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. DYNAMICALLY GENERATE 18 PRODUCT CARDS 
    const galleryGrid = document.getElementById('gallery-grid');
    
    productData.forEach(product => {
        const message = `Hi Agastya Window Blinds, I am interested in buying the ${product.name}. Can you provide more details?`;
        const encodedMessage = encodeURIComponent(message);
        const waLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        
        // This ensures it still loads assets/design1.jpg, assets/design2.jpg, etc.
        const imgPath = `assets/design${product.id}.jpg`;
        
        // Generate a random rating between 4.5 and 5.0 for aesthetics
        const rating = (Math.random() * (5.0 - 4.5) + 4.5).toFixed(1);

        const cardHTML = `
            <div class="product-card fade-up" data-category="${product.category}">
                <div class="img-container" onclick="openLightbox('${imgPath}')">
                    <img src="${imgPath}" alt="${product.name}" loading="lazy">
                </div>
                <div class="product-info">
                    <h3>${product.name} 
                        <span>
                            <span class="stars">★★★★★</span>
                            <span class="rating-text">${rating}</span>
                        </span>
                    </h3>
                    <a href="${waLink}" target="_blank" class="btn-wa">Book Now on WhatsApp</a>
                </div>
            </div>
        `;
        galleryGrid.insertAdjacentHTML('beforeend', cardHTML);
    });

    // 2. PRODUCT FILTERS LOGIC
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active state from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active state to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                    setTimeout(() => { card.style.opacity = '1'; card.style.transform = 'translateY(0)'; }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => { card.classList.add('hide'); }, 400); // Wait for transition
                }
            });
        });
    });

    // 3. IOS FULLSCREEN MENU LOGIC
    const menuBtn = document.getElementById('menu-btn');
    const closeMenuBtn = document.getElementById('close-menu-btn');
    const iosMenu = document.getElementById('ios-menu');
    const menuLinkDesigns = document.getElementById('menu-link-designs');

    const toggleMenu = () => {
        iosMenu.classList.toggle('active');
        if(iosMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden'; // Stop background scrolling
        } else {
            document.body.style.overflow = 'auto';
        }
    };

    menuBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);
    menuLinkDesigns.addEventListener('click', toggleMenu); // Close menu when clicking the button

    // 4. IOS LIGHTBOX (IMAGE VIEWER) LOGIC
    const lightbox = document.getElementById('ios-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox .close-btn');

    window.openLightbox = (src) => {
        lightboxImg.src = src;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
        setTimeout(() => { lightboxImg.src = ''; }, 400);
    };

    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if(e.target === lightbox) closeLightbox();
    });

    // 5. SMOOTH SCROLL ANIMATIONS (INTERSECTION OBSERVER)
    const observerOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
});
