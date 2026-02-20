// ===== NOXNETWORK Landing Page JavaScript =====

document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initMobileMenu();
    initScrollAnimations();
    initTestimonialCarousel();
    initSmoothScroll();
    initFAQAccordion();
    initFloatingWhatsApp();
});

// ===== NAVBAR =====
function initNavbar() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Add scrolled class for blur effect
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    });
}

// ===== MOBILE MENU =====
function initMobileMenu() {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (!menuBtn || !navMenu) return;

    menuBtn.addEventListener('click', () => {
        menuBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close menu when clicking a link
    navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
    // Add reveal class to elements
    const revealElements = document.querySelectorAll(
        '.about-card, .section-title, .cta-content, .footer-grid > div'
    );

    revealElements.forEach(el => {
        el.classList.add('reveal');
    });

    // Intersection Observer for reveal animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => {
        observer.observe(el);
    });
}

// ===== TESTIMONIAL CAROUSEL =====
function initTestimonialCarousel() {
    const carousel = document.querySelector('.testimonial-carousel');
    const videos = document.querySelectorAll('.testimonial-carousel .testimonial-video');

    if (!carousel || videos.length === 0) return;

    // Clone the video divs for infinite scroll
    const originalVideos = Array.from(videos);

    // Create enough copies for smooth infinite scroll
    for (let i = 0; i < 2; i++) {
        originalVideos.forEach(video => {
            const clone = video.cloneNode(true);
            carousel.appendChild(clone);
        });
    }

    // Clone everything for the second half of the loop
    const currentVideos = carousel.querySelectorAll('.testimonial-video');
    currentVideos.forEach(video => {
        const clone = video.cloneNode(true);
        carousel.appendChild(clone);
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');

            if (href === '#') return;

            e.preventDefault();

            const target = document.querySelector(href);

            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== UTILITY FUNCTIONS =====

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function (...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ===== FAQ ACCORDION =====
function initFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        if (!question) return;

        question.addEventListener('click', () => {
            // Close other open items
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });

            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ===== FLOATING WHATSAPP BUTTON =====
function initFloatingWhatsApp() {
    const floatingBtn = document.getElementById('floating-whatsapp');
    const hero = document.querySelector('.hero');

    if (!floatingBtn || !hero) return;

    function checkScroll() {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollPosition = window.pageYOffset;

        if (scrollPosition > heroBottom - 200) {
            floatingBtn.classList.add('visible');
        } else {
            floatingBtn.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', throttle(checkScroll, 100));
    checkScroll(); // Check initial state
}
