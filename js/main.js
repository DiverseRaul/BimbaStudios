// Basic script file for future interactivity

document.addEventListener('DOMContentLoaded', () => {
    console.log('Bimba Studios website loaded.');

    // --- Header Scroll Effect --- //
    const header = document.getElementById('main-header');
    const scrollThreshold = 50; // Pixels to scroll before changing header

    const handleScroll = () => {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    // Initial check in case the page loads already scrolled
    handleScroll();

    // --- Smooth Scroll for Nav Links --- //
    document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Products Carousel Functionality --- //
    const carousel = document.querySelector('.products-carousel');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const cards = carousel.querySelectorAll('.product-card');
    
    // Number of cards visible at once (we'll calculate this)
    let visibleCards = 3;
    let currentIndex = 0;
    let cardWidth = 0;
    let totalSlides = 0;
    
    // Calculate how many cards can be shown at once based on viewport
    const calculateVisibleCards = () => {
        const carouselWidth = carousel.clientWidth;
        // First card's full width (including margin)
        cardWidth = cards[0].offsetWidth + 25; // 25px is the right margin
        
        // Calculate how many can fit (floor to ensure they fit)
        visibleCards = Math.floor(carouselWidth / cardWidth);
        
        // Ensure at least 1 card is shown
        visibleCards = Math.max(1, visibleCards);
        
        // Calculate total possible slides based on cards
        totalSlides = Math.ceil((cards.length - visibleCards) / 1) + 1;
        
        // Make sure we have the right number of indicators
        updateIndicators();
    };
    
    // Update or create indicator dots based on the number of slides
    const updateIndicators = () => {
        const indicatorContainer = document.querySelector('.carousel-indicators');
        
        // Clear existing indicators
        indicatorContainer.innerHTML = '';
        
        // Create new indicators
        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('span');
            indicator.classList.add('indicator');
            if (i === currentIndex) {
                indicator.classList.add('active');
            }
            indicator.setAttribute('data-index', i);
            
            // Add click event
            indicator.addEventListener('click', () => {
                goToSlide(i);
            });
            
            indicatorContainer.appendChild(indicator);
        }
    };
    
    // Navigate to a specific slide
    const goToSlide = (index) => {
        // Bound the index
        currentIndex = Math.max(0, Math.min(index, totalSlides - 1));
        
        // Calculate scroll position
        const scrollPos = currentIndex * cardWidth;
        
        // Scroll smoothly to the position
        carousel.scrollTo({
            left: scrollPos,
            behavior: 'smooth'
        });
        
        // Update active indicator
        document.querySelectorAll('.indicator').forEach((ind, i) => {
            if (i === currentIndex) {
                ind.classList.add('active');
            } else {
                ind.classList.remove('active');
            }
        });
        
        // Enable/disable navigation buttons
        updateNavButtons();
    };
    
    // Update the state of navigation buttons
    const updateNavButtons = () => {
        prevBtn.style.opacity = currentIndex <= 0 ? '0.5' : '1';
        nextBtn.style.opacity = currentIndex >= totalSlides - 1 ? '0.5' : '1';
        
        prevBtn.style.pointerEvents = currentIndex <= 0 ? 'none' : 'auto';
        nextBtn.style.pointerEvents = currentIndex >= totalSlides - 1 ? 'none' : 'auto';
    };
    
    // Next button click
    nextBtn.addEventListener('click', () => {
        goToSlide(currentIndex + 1);
    });
    
    // Previous button click
    prevBtn.addEventListener('click', () => {
        goToSlide(currentIndex - 1);
    });
    
    // Initialize carousel
    const initCarousel = () => {
        calculateVisibleCards();
        goToSlide(0);
    };
    
    // Run on load and resize
    initCarousel();
    window.addEventListener('resize', initCarousel);
    
    // Add scroll event listener to update indicator when scrolling manually
    carousel.addEventListener('scroll', () => {
        // Debounce to avoid performance issues
        clearTimeout(carousel.scrollTimeout);
        carousel.scrollTimeout = setTimeout(() => {
            const scrollPos = carousel.scrollLeft;
            const newIndex = Math.round(scrollPos / cardWidth);
            
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                
                // Update indicators without triggering another scroll
                document.querySelectorAll('.indicator').forEach((ind, i) => {
                    if (i === currentIndex) {
                        ind.classList.add('active');
                    } else {
                        ind.classList.remove('active');
                    }
                });
                
                updateNavButtons();
            }
        }, 100);
    });

    // --- Particle Canvas Animation --- //
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    const numberOfParticles = 200; // Adjust particle count
    let animationFrameId; // To store the requestAnimationFrame ID
    let mouse = {
        x: null,
        y: null,
        radius: 150 // Radius of mouse influence in pixels
    };

    // Set canvas dimensions
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; // Match hero section height initially

    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        // Re-adjust height based on the current hero section height if needed
        // For now, keep it full viewport height on resize for simplicity
        canvas.height = window.innerHeight;
        initParticles(); // Reinitialize particles on resize
    });

    // Particle class
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 1; // Particle size
            this.baseSize = this.size; // Store original size for reference
            this.speedX = Math.random() * 1 - 0.5; // Horizontal speed
            this.speedY = Math.random() * 1 - 0.5; // Vertical speed
            this.color = 'rgba(255, 126, 31, 0.6)'; // Updated to match new orange
        }

        update() {
            // Calculate distance from mouse
            if (mouse.x !== null && mouse.y !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                // Mouse repulsion effect
                if (distance < mouse.radius) {
                    const angle = Math.atan2(dy, dx);
                    const pushFactor = (mouse.radius - distance) / mouse.radius;
                    
                    // Push away from mouse
                    this.x -= Math.cos(angle) * pushFactor * 2;
                    this.y -= Math.sin(angle) * pushFactor * 2;
                    
                    // Increase size when near mouse
                    this.size = this.baseSize + (this.baseSize * pushFactor * 2);
                } else {
                    // Return to original size
                    this.size = this.baseSize;
                }
            }
            
            // Movement and bouncing off edges
            if (this.x + this.size > canvas.width || this.x - this.size < 0) {
                this.speedX = -this.speedX;
            }
            if (this.y + this.size > canvas.height || this.y - this.size < 0) {
                this.speedY = -this.speedY;
            }
            this.x += this.speedX;
            this.y += this.speedY;
        }

        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
    }

    // Initialize particles
    function initParticles() {
        particlesArray = [];
        for (let i = 0; i < numberOfParticles; i++) {
            particlesArray.push(new Particle());
        }
    }

    // Connect particles
    function connectParticles() {
        let opacityValue = 1;
        const maxDistance = 80; // Max distance to draw a line
        for (let a = 0; a < particlesArray.length; a++) {
            for (let b = a; b < particlesArray.length; b++) {
                let distance = Math.sqrt(
                    Math.pow(particlesArray[a].x - particlesArray[b].x, 2) +
                    Math.pow(particlesArray[a].y - particlesArray[b].y, 2)
                );

                if (distance < maxDistance) {
                    opacityValue = 1 - (distance / maxDistance);
                    ctx.strokeStyle = 'rgba(255, 111, 97, ' + opacityValue * 0.4 + ')'; // Lighter, more transparent lines
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                    ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < particlesArray.length; i++) {
            particlesArray[i].update();
            particlesArray[i].draw();
        }
        connectParticles();
        animationFrameId = requestAnimationFrame(animateParticles);
    }

    // Start animation
    initParticles();
    animateParticles();

    // Stop animation when tab is not visible to save resources
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animationFrameId);
        } else {
            // Check if particles need reinitialization (e.g., after long inactivity)
            if (!particlesArray || particlesArray.length === 0) {
                initParticles();
            }
            animateParticles();
        }
    });

    // Track mouse position
    window.addEventListener('mousemove', (event) => {
        mouse.x = event.x;
        mouse.y = event.y;
    });
    
    // Reset mouse position when mouse leaves canvas
    window.addEventListener('mouseout', () => {
        mouse.x = null;
        mouse.y = null;
    });

    // Contact Form Handling
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Show loading state
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send form data using FormSubmit service (no server setup required)
            const formActionUrl = 'https://formsubmit.co/contact@bimba.studio';
            
            // Create a hidden form for FormSubmit
            const hiddenForm = document.createElement('form');
            hiddenForm.method = 'POST';
            hiddenForm.action = formActionUrl;
            hiddenForm.style.display = 'none';
            
            // Add form data to hidden form
            for (const key in formData) {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = formData[key];
                hiddenForm.appendChild(input);
            }
            
            // Add FormSubmit specific fields
            const ajaxInput = document.createElement('input');
            ajaxInput.type = 'hidden';
            ajaxInput.name = '_ajax';
            ajaxInput.value = 'true';
            hiddenForm.appendChild(ajaxInput);
            
            // Add success page redirect
            const redirectInput = document.createElement('input');
            redirectInput.type = 'hidden';
            redirectInput.name = '_next';
            redirectInput.value = window.location.href + '?message=success';
            hiddenForm.appendChild(redirectInput);
            
            // Add captcha
            const captchaInput = document.createElement('input');
            captchaInput.type = 'hidden';
            captchaInput.name = '_captcha';
            captchaInput.value = 'true';
            hiddenForm.appendChild(captchaInput);
            
            // Add to body and submit
            document.body.appendChild(hiddenForm);
            
            // Use fetch instead of form submission for better UX
            fetch(formActionUrl, {
                method: 'POST',
                body: new FormData(hiddenForm),
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    // Success
                    formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
                    formStatus.className = 'form-status success';
                    contactForm.reset();
                } else {
                    // Error
                    throw new Error('Network response was not ok');
                }
            })
            .catch(error => {
                // Handle error
                formStatus.textContent = 'There was a problem sending your message. Please try again later.';
                formStatus.className = 'form-status error';
                console.error('Error:', error);
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                
                // Clean up
                document.body.removeChild(hiddenForm);
                
                // Scroll to form status
                formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            });
        });
    }
    
    // Check for success message in URL (after redirect)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('message') === 'success') {
        formStatus.textContent = 'Message sent successfully! We\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        // Remove the query parameter without reloading the page
        const url = new URL(window.location);
        url.searchParams.delete('message');
        window.history.replaceState({}, '', url);
    }

    // Add more interactive elements and animations here later

});
