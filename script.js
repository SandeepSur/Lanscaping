document.addEventListener("DOMContentLoaded", () => {
    // Add hero-loaded class for hero entrance animations
    setTimeout(() => {
        document.body.classList.add('hero-loaded');
    }, 100);

    const heroBg = document.getElementById("hero-bg");
    const rotatingLeaves = document.getElementById("rotating-leaves");
    const navbar = document.querySelector(".navbar");
    const mobileToggle = document.querySelector(".mobile-toggle");
    
    if (mobileToggle) {
        mobileToggle.addEventListener("click", () => {
            navbar.classList.toggle("mobile-menu-open");
            // Change SVG icon to X when open
            if (navbar.classList.contains("mobile-menu-open")) {
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
            } else {
                mobileToggle.innerHTML = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>';
            }
        });
    }

    window.addEventListener("scroll", () => {
        // Get the current scroll position
        const scrollPosition = window.pageYOffset;
        
        // Navbar sticky styling on scroll
        if (navbar) {
            if (scrollPosition > 50) {
                navbar.classList.add('is-scrolled');
            } else {
                navbar.classList.remove('is-scrolled');
            }
        }
        
        // Calculate the translation amount for hero background.
        const yPos = scrollPosition * 0.4;
        
        // Calculate the zoom (scale) amount
        const scale = 1 + scrollPosition * 0.0005;
        
        // Apply the transformation to hero background
        if (heroBg) {
            heroBg.style.transform = `translateY(${yPos}px) scale(${scale})`;
        }

        // Apply rotation to the leaves in the Why Choose Us section
        if (rotatingLeaves) {
            // Rotating slightly based on scroll position
            rotatingLeaves.style.transform = `rotate(${scrollPosition * 0.1}deg)`;
        }
    });

    // Intersection Observer for scroll reveal animations
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-fade, .reveal-scale');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -10% 0px',
        threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Carousel logic
    const track = document.getElementById("carousel-track");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");

    if (track && prevBtn && nextBtn) {
        // Scroll amount is card width (450px) + gap (30px)
        const scrollAmount = 480;

        prevBtn.addEventListener("click", () => {
            track.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        });

        nextBtn.addEventListener("click", () => {
            track.scrollBy({ left: scrollAmount, behavior: "smooth" });
        });
    }

});
