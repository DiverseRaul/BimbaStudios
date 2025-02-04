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
