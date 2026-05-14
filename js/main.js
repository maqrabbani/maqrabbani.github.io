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
    handleScroll();

    // ==========================================
    // 5. Counters (Optimized with IntersectionObserver)
    // ==========================================
    const counters = document.querySelectorAll('.counter');
    const speed = 120;
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const inc = target / speed;
                const updateCount = () => {
                    count += inc;
                    if (count < target) {
                        counter.innerText = Math.ceil(count);
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // ==========================================
    // 6. Carousels (Using Swiper.js)
    // ==========================================
    if (document.querySelector('.platforms-carousel')) {
        new Swiper('.platforms-carousel', {
            loop: true,
            autoplay: { delay: 3000, disableOnInteraction: false },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 30 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1000: { slidesPerView: 4, spaceBetween: 30 }
            }
        });
    }
    if (document.querySelector('.tech-carousel')) {
        new Swiper('.tech-carousel', {
            loop: true,
            autoplay: { delay: 4000, disableOnInteraction: false },
            breakpoints: {
                0: { slidesPerView: 1, spaceBetween: 30 },
                768: { slidesPerView: 2, spaceBetween: 30 },
                1000: { slidesPerView: 4, spaceBetween: 30 }
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

    // ==========================================
    // 9. Mega Menu (Full-width) Logic (Robust + Responsive)
    // ==========================================
    (function() {
        const megaDropdown = document.querySelector('.mega-dropdown');
        const megaMenu = document.querySelector('.mega-menu');
        if (!megaDropdown || !megaMenu) return;
        let mode = null;
        let mobileClickHandler = null;
        let outsideHandler = null;

        function closeMenu() {
            megaMenu.style.display = 'none';
        }
        function openMenu() {
            megaMenu.style.display = 'block';
        }

        function onDesktop() {
            megaDropdown.addEventListener('mouseenter', openMenu);
            megaDropdown.addEventListener('mouseleave', closeMenu);
            megaMenu.addEventListener('mouseenter', openMenu);
            megaMenu.addEventListener('mouseleave', closeMenu);
        }
        function offDesktop() {
            megaDropdown.removeEventListener('mouseenter', openMenu);
            megaDropdown.removeEventListener('mouseleave', closeMenu);
            megaMenu.removeEventListener('mouseenter', openMenu);
            megaMenu.removeEventListener('mouseleave', closeMenu);
        }

        function onMobile() {
            const dropdownLink = megaDropdown.querySelector('a');
            if (!dropdownLink) return;
            mobileClickHandler = function(e) {
                e.preventDefault();
                megaMenu.style.display = (megaMenu.style.display === 'block') ? 'none' : 'block';
            };
            dropdownLink.addEventListener('click', mobileClickHandler);
            outsideHandler = function(e) {
                if (!megaMenu.contains(e.target) && !dropdownLink.contains(e.target)) {
                    closeMenu();
                }
            };
            document.addEventListener('click', outsideHandler);
        }
        function offMobile() {
            const dropdownLink = megaDropdown.querySelector('a');
            if (dropdownLink && mobileClickHandler) dropdownLink.removeEventListener('click', mobileClickHandler);
            if (outsideHandler) document.removeEventListener('click', outsideHandler);
            closeMenu();
        }

        function updateMegaMenuBehaviour() {
            if (window.innerWidth > 1000 && mode !== 'desktop') {
                mode = 'desktop';
                offMobile();
                onDesktop();
                closeMenu();
            } else if (window.innerWidth <= 1000 && mode !== 'mobile') {
                mode = 'mobile';
                offDesktop();
                onMobile();
                closeMenu();
            }
        }

        // Initial call
        updateMegaMenuBehaviour();
        // Responsive: Update on resize
        window.addEventListener('resize', updateMegaMenuBehaviour);

    })();

});