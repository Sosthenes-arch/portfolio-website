// ========================================
// Navigation
// ========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Scroll effect for navbar
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');

function updateActiveNav() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLink.classList.add('active');
            } else {
                navLink.classList.remove('active');
            }
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ========================================
// Scroll Reveal Animations
// ========================================
function reveal() {
    const reveals = document.querySelectorAll('.timeline-item, .project-card, .cert-card, .testimonial-card, .award-card, .skill-item');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

// Add reveal class styles dynamically
const style = document.createElement('style');
style.textContent = `
    .timeline-item,
    .project-card,
    .cert-card,
    .testimonial-card,
    .award-card,
    .skill-item {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }
    
    .timeline-item.revealed,
    .project-card.revealed,
    .cert-card.revealed,
    .testimonial-card.revealed,
    .award-card.revealed,
    .skill-item.revealed {
        opacity: 1;
        transform: translateY(0);
    }
    
    .project-card:nth-child(2) { transition-delay: 0.1s; }
    .project-card:nth-child(3) { transition-delay: 0.2s; }
    .project-card:nth-child(4) { transition-delay: 0.3s; }
    
    .skill-item:nth-child(2) { transition-delay: 0.05s; }
    .skill-item:nth-child(3) { transition-delay: 0.1s; }
    .skill-item:nth-child(4) { transition-delay: 0.15s; }
    .skill-item:nth-child(5) { transition-delay: 0.2s; }
    .skill-item:nth-child(6) { transition-delay: 0.25s; }
`;
document.head.appendChild(style);

window.addEventListener('scroll', reveal);
window.addEventListener('load', reveal);

// ========================================
// Smooth scroll for anchor links
// ========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ========================================
// Typing effect for hero (optional enhancement)
// ========================================
const heroTitle = document.querySelector('.hero-title');
if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    heroTitle.style.opacity = '1';

    let i = 0;
    function typeWriter() {
        if (i < text.length) {
            heroTitle.textContent += text.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }

    // Start typing after initial animations
    setTimeout(typeWriter, 1000);
}

// ========================================
// Parallax effect for hero image
// ========================================
const heroImage = document.querySelector('.hero-image');
if (heroImage) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    });
}

// ========================================
// Counter animation for stats (if added later)
// ========================================
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);

    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }

    updateCounter();
}

// ========================================
// Intersection Observer for performance
// ========================================
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
        }
    });
}, observerOptions);

// Observe all animatable elements
document.querySelectorAll('.timeline-item, .project-card, .cert-card, .testimonial-card, .award-card, .skill-item').forEach(el => {
    observer.observe(el);
});

// ========================================
// Preloader (optional)
// ========================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

console.log('Portfolio loaded successfully! 🚀');
