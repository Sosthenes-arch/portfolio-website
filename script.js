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

// ========================================
// Mouse Cloud Effect
// ========================================
const mouseCloudContainer = document.getElementById('mouse-clouds');
const clouds = [];
// Reduce particle count on mobile for performance
const isMobile = window.innerWidth < 768;
const maxClouds = isMobile ? 6 : 15;
let mouseX = 0;
let mouseY = 0;
let isMouseMoving = false;
let mouseTimeout;

// Create mouse glow element
const mouseGlow = document.createElement('div');
mouseGlow.className = 'mouse-glow';
document.body.appendChild(mouseGlow);

// Cloud class for managing individual cloud particles
class CloudParticle {
    constructor(x, y) {
        this.element = document.createElement('div');
        this.inner = document.createElement('div');

        const type = Math.floor(Math.random() * 3) + 1;
        this.element.className = `mouse-cloud type-${type}`;
        this.inner.className = 'mouse-cloud-inner';
        this.element.appendChild(this.inner);

        this.size = Math.random() * 80 + 60;
        this.element.style.width = `${this.size}px`;
        this.element.style.height = `${this.size}px`;

        this.x = x - this.size / 2;
        this.y = y - this.size / 2;
        this.targetX = this.x;
        this.targetY = this.y;

        this.velocityX = (Math.random() - 0.5) * 2;
        this.velocityY = (Math.random() - 0.5) * 2;
        this.friction = 0.98;
        this.attractionStrength = 0.02 + Math.random() * 0.03;

        this.opacity = 0;
        this.maxOpacity = 0.6 + Math.random() * 0.4;
        this.fadeSpeed = 0.02;
        this.life = 1;
        this.decay = 0.001 + Math.random() * 0.002;

        this.driftX = (Math.random() - 0.5) * 0.5;
        this.driftY = -0.2 - Math.random() * 0.3; // Slight upward drift

        this.pulseOffset = Math.random() * Math.PI * 2;
        this.pulseSpeed = 0.02 + Math.random() * 0.02;

        this.element.style.opacity = '0';
        this.element.style.transform = `translate(${this.x}px, ${this.y}px)`;

        mouseCloudContainer.appendChild(this.element);
    }

    update(mouseX, mouseY, isActive) {
        // Calculate attraction to mouse
        if (isActive) {
            const dx = mouseX - this.size / 2 - this.x;
            const dy = mouseY - this.size / 2 - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance > 50) {
                this.velocityX += (dx / distance) * this.attractionStrength;
                this.velocityY += (dy / distance) * this.attractionStrength;
            }
        }

        // Add drift
        this.velocityX += this.driftX * 0.01;
        this.velocityY += this.driftY * 0.01;

        // Apply friction
        this.velocityX *= this.friction;
        this.velocityY *= this.friction;

        // Update position
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Fade in
        if (this.opacity < this.maxOpacity && this.life > 0.5) {
            this.opacity += this.fadeSpeed;
        }

        // Life decay
        this.life -= this.decay;

        // Fade out when life is low
        if (this.life < 0.3) {
            this.opacity -= this.fadeSpeed * 2;
        }

        // Pulse effect
        const pulse = Math.sin(Date.now() * this.pulseSpeed + this.pulseOffset) * 0.1 + 1;

        // Apply transforms
        this.element.style.transform = `translate(${this.x}px, ${this.y}px) scale(${pulse})`;
        this.element.style.opacity = Math.max(0, this.opacity);

        return this.life > 0 && this.opacity > 0;
    }

    destroy() {
        if (this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
    }
}

// Spawn new cloud at mouse position
function spawnCloud(x, y) {
    if (clouds.length >= maxClouds) {
        const oldCloud = clouds.shift();
        oldCloud.destroy();
    }

    const cloud = new CloudParticle(x, y);
    clouds.push(cloud);
}

// Animation loop
function animateClouds() {
    // Update mouse glow position
    mouseGlow.style.left = `${mouseX}px`;
    mouseGlow.style.top = `${mouseY}px`;
    mouseGlow.style.opacity = isMouseMoving ? '1' : '0.3';

    // Update all clouds
    for (let i = clouds.length - 1; i >= 0; i--) {
        const alive = clouds[i].update(mouseX, mouseY, isMouseMoving);
        if (!alive) {
            clouds[i].destroy();
            clouds.splice(i, 1);
        }
    }

    requestAnimationFrame(animateClouds);
}

// Mouse move handler
let spawnCounter = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    isMouseMoving = true;

    // Spawn clouds at intervals
    spawnCounter++;
    if (spawnCounter >= 8) { // Spawn every 8th mouse event
        spawnCloud(mouseX, mouseY);
        spawnCounter = 0;
    }

    // Reset mouse moving state after delay
    clearTimeout(mouseTimeout);
    mouseTimeout = setTimeout(() => {
        isMouseMoving = false;
    }, 150);
});

// Touch support for mobile
document.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
        isMouseMoving = true;

        spawnCounter++;
        if (spawnCounter >= 5) {
            spawnCloud(mouseX, mouseY);
            spawnCounter = 0;
        }

        clearTimeout(mouseTimeout);
        mouseTimeout = setTimeout(() => {
            isMouseMoving = false;
        }, 150);
    }
});

// Start animation loop
animateClouds();

console.log('Mouse cloud effect initialized! ☁️');
