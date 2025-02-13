// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Enhanced scroll animations
const scrollAnimationOptions = {
    threshold: 0.2,
    rootMargin: '-50px'
};

// Handle scroll animations for different sections
const animateOnScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Hero section animation
            if (entry.target.classList.contains('hero-content')) {
                entry.target.classList.add('visible');
            }
            // Service cards animation
            else if (entry.target.classList.contains('service-card')) {
                entry.target.classList.add('animate-fade-up');
            }
            // About section animation
            else if (entry.target.classList.contains('about-content')) {
                entry.target.classList.add('visible');
            }
            // Contact form animation
            else if (entry.target.classList.contains('contact')) {
                entry.target.querySelector('.container').classList.add('visible');
            }
            // Section headers animation
            else if (entry.target.tagName === 'H2') {
                entry.target.classList.add('animate-slide-left');
            }
            // Portfolio items animation
            else if (entry.target.classList.contains('portfolio-item')) {
                entry.target.classList.add('animate-fade-up');
            }
        }
    });
}, scrollAnimationOptions);

// Observe elements for scroll animations
document.querySelectorAll('.hero-content, .service-card, .about-content, .contact, section h2, .portfolio-item').forEach(element => {
    animateOnScroll.observe(element);
});

// Form submission handling with animation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const data = Object.fromEntries(formData);
        console.log('Form submitted:', data);
        
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message animate-fade-up';
        successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
        this.appendChild(successMessage);
        
        setTimeout(() => {
            successMessage.style.opacity = '0';
            successMessage.style.transform = 'translateY(-20px)';
            setTimeout(() => successMessage.remove(), 300);
        }, 3000);
        
        this.reset();
    });
}

// Parallax scroll effect for shapes
window.addEventListener('scroll', () => {
    const shapes = document.querySelectorAll('.shape-1, .shape-2');
    const scrolled = window.pageYOffset;
    
    shapes.forEach(shape => {
        const speed = shape.classList.contains('shape-1') ? 0.2 : 0.1;
        const yPos = -(scrolled * speed);
        shape.style.transform = `translate3d(0, ${yPos}px, 0)`;
    });
});

// Header scroll effect with enhanced animation
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    const scrolled = window.scrollY > 50;
    
    header.style.backgroundColor = scrolled ? 
        'rgba(18, 18, 18, 0.95)' : 
        'rgba(18, 18, 18, 0.85)';
    header.style.backdropFilter = `blur(${scrolled ? 10 : 0}px)`;
    header.style.transform = scrolled ? 'translateY(0)' : 'translateY(0)';
    header.style.transition = 'all 0.3s ease';
});

// Mouse parallax effect for shapes
window.addEventListener('mousemove', (e) => {
    const shapes = document.querySelectorAll('.shape-1, .shape-2');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    shapes.forEach(shape => {
        const speed = shape.classList.contains('shape-1') ? 20 : 40;
        const x = (mouseX * speed);
        const y = (mouseY * speed);
        shape.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Menu functionality
document.addEventListener('DOMContentLoaded', () => {
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;

    function closeMenu() {
        navLinks.classList.remove('active');
        body.style.overflow = 'auto';
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.add('fa-bars');
            icon.classList.remove('fa-times');
        }
    }

    function openMenu() {
        navLinks.classList.add('active');
        body.style.overflow = 'hidden';
        const icon = menuBtn.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    }

    if (menuBtn && navLinks) {
        // Toggle menu
        menuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (navLinks.classList.contains('active')) {
                closeMenu();
            } else {
                openMenu();
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') && 
                !navLinks.contains(e.target) && 
                !menuBtn.contains(e.target)) {
                closeMenu();
            }
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });

        // Handle escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                closeMenu();
            }
        });
    }
});

// Loading Screen Handler
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    
    // Function to check if all resources are loaded
    const checkResourcesLoaded = () => {
        // Check Font Awesome
        const testIcon = document.createElement('i');
        testIcon.className = 'fas fa-cloud-sun';
        const fontAwesomeLoaded = testIcon.offsetWidth > 0;

        // Check images
        const images = Array.from(document.images);
        const imagesLoaded = images.every((img) => img.complete);

        return fontAwesomeLoaded && imagesLoaded;
    };

    // Hide loading screen with smooth transition
    const hideLoadingScreen = () => {
        loadingScreen.classList.add('hidden');
    };

    // Check resources every 100ms
    const checkInterval = setInterval(() => {
        if (checkResourcesLoaded()) {
            clearInterval(checkInterval);
            hideLoadingScreen();
        }
    }, 100);

    // Fallback: hide loading screen after 3 seconds
    setTimeout(() => {
        clearInterval(checkInterval);
        hideLoadingScreen();
    }, 3000);
});

// Smooth scroll for the scroll indicator
document.querySelector('.scroll-indicator').addEventListener('click', () => {
    const servicesSection = document.getElementById('services');
    servicesSection.scrollIntoView({ behavior: 'smooth' });
});
