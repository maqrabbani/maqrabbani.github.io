document.addEventListener("DOMContentLoaded", function() {

    // ==========================================
    // 1. Mobile Dropdown Fix
    // ==========================================
    const dropdownLinks = document.querySelectorAll('.dropdown > a');
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // Only run the click logic on mobile/tablet screens (1000px or smaller)
            if (window.innerWidth <= 1000) {
                const menu = this.nextElementSibling;
                if (menu.style.display === 'block') {
                    menu.style.display = 'none';
                } else {
                    menu.style.display = 'block';
                }
            }
        });
    });

    // ==========================================
    // 2. & 3. Mobile Menu Toggle Logic
    // ==========================================
    const menuBtn = document.querySelector('.fa-bars');
    const navbar = document.querySelector('.navbar');
    
    if (menuBtn && navbar) {
        // Toggle menu open/close
        menuBtn.addEventListener('click', function() {
            this.classList.toggle('fa-times');
            navbar.classList.toggle('nav-toggle');
        });

        // Close menu on link click
        const standardLinks = document.querySelectorAll('.navbar ul li a:not(.dropdown > a)');
        standardLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuBtn.classList.remove('fa-times');
                navbar.classList.remove('nav-toggle');
            });
        });
    }

    // ==========================================
    // 4. Header Scroll Logic
    // ==========================================
    const header = document.querySelector('.header');
    
    function handleScroll() {
        // Close the mobile menu on scroll
        if (menuBtn) menuBtn.classList.remove('fa-times');
        if (navbar) navbar.classList.remove('nav-toggle');

        // Toggle scrolled class for header styling
        if (window.scrollY > 35) {
            if (header) header.classList.add('scrolled');
        } else {
            if (header) header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run once on load to catch initial state

    // ==========================================
    // 5. Counters (Optimized with IntersectionObserver)
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const speed = 120;

    // This ensures counters only start animating when scrolled into view
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0; // Start from 0 to ensure proper calculation
                const inc = target / speed;

                const updateCount = () => {
                    count += inc;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount); // Smoother than setTimeout
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter); // Stop observing once counted
            }
        });
    }, { threshold: 0.5 }); // Trigger when 50% visible

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ==========================================
    // 6. Carousels (Using Swiper.js)
    // ==========================================
    // Note: Make sure your HTML uses standard Swiper classes: 
    // <div class="swiper clients-carousel"> <div class="swiper-wrapper"> <div class="swiper-slide">...
    
    if (document.querySelector('.clients-carousel')) {
        new Swiper('.clients-carousel', {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                0: { slidesPerView: 2, spaceBetween: 10 },
                768: { slidesPerView: 4, spaceBetween: 20 },
                900: { slidesPerView: 6, spaceBetween: 30 }
            }
        });
    }

    if (document.querySelector('.testimonials-carousel')) {
        new Swiper('.testimonials-carousel', {
            loop: true,
            autoplay: { delay: 5000, disableOnInteraction: false },
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 10 },
                576: { slidesPerView: 2, spaceBetween: 20 },
                768: { slidesPerView: 3, spaceBetween: 30 },
                992: { slidesPerView: 4, spaceBetween: 30 }
            }
        });
    }

    // ==========================================
    // 7. Back to Top Button
    // ==========================================
    const backToTopBtn = document.querySelector('.back-to-top');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                backToTopBtn.style.display = 'block';
                // Optional: add CSS transition for opacity in your stylesheet
                backToTopBtn.style.opacity = '1'; 
            } else {
                backToTopBtn.style.opacity = '0';
                setTimeout(() => {
                    if(window.scrollY <= 100) backToTopBtn.style.display = 'none';
                }, 300);
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ==========================================
    // 8. FAQ Accordion
    // ==========================================
    const accordionHeaders = document.querySelectorAll('.accordion-header');
            
    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const allBodies = document.querySelectorAll('.accordion .accordion-body');
            const allSpans = document.querySelectorAll('.accordion .accordion-header span');
            
            const body = this.nextElementSibling;
            const span = this.querySelector('span');
            
            const isOpen = body.style.display === 'block';

            // Close all
            allBodies.forEach(b => b.style.display = 'none');
            allSpans.forEach(s => s.innerText = '+');

            // Toggle target
            if (!isOpen) {
                body.style.display = 'block';
                if (span) span.innerText = '-';
            }
        });
    });

});