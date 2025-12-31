// Mobile Menu Toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        }
    });
});

// Navbar Scroll Effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Waitlist Form Submission
const waitlistForm = document.getElementById('waitlistForm');
if (waitlistForm) {
    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form data
        const name = document.getElementById('waitlist-name').value;
        const email = document.getElementById('waitlist-email').value;
        
        // Hide any previous messages
        document.getElementById('waitlist-success').style.display = 'none';
        document.getElementById('waitlist-error').style.display = 'none';
        
        // Disable button during submission
        const submitBtn = waitlistForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="btn-icon">⏳</span>Adding you...';
        
        try {
            // Here you would typically send the data to your backend/email service
            // For now, we'll simulate an API call
            console.log('Waitlist submission:', { name, email });
            
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // TODO: Replace with actual API call
            // Example using fetch:
            // const response = await fetch('YOUR_API_ENDPOINT', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({ name, email })
            // });
            // if (!response.ok) throw new Error('Submission failed');
            
            // Show success message
            document.getElementById('waitlist-success').style.display = 'flex';
            
            // Reset form
            waitlistForm.reset();
            
            // Optional: Track with analytics
            if (typeof gtag !== 'undefined') {
                gtag('event', 'waitlist_signup', {
                    'event_category': 'engagement',
                    'event_label': email
                });
            }
            
            // Update counter (optional)
            const counter = document.getElementById('waitlist-count');
            if (counter) {
                const currentCount = parseInt(counter.textContent.replace('+', ''));
                counter.textContent = (currentCount + 1) + '+';
            }
            
        } catch (error) {
            console.error('Waitlist submission error:', error);
            document.getElementById('waitlist-error').style.display = 'flex';
        } finally {
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
        }
    });
}

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Contact form submitted:', data);
        
        // Show success message (you can customize this)
        alert('Thank you for your message! We\'ll get back to you soon.');
        
        // Reset form
        contactForm.reset();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe pricing cards
document.querySelectorAll('.pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});


// Smooth scroll for waitlist links
document.querySelectorAll('a[href="#waitlist"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        document.getElementById('waitlist').scrollIntoView({ behavior: 'smooth' });
    });
});

// Hero Popup State Cycling
const initPopupCycling = () => {
    const states = document.querySelectorAll('.popup-state-simple');
    const browserWindow = document.querySelector('.browser-window');
    if (!states.length || !browserWindow) return;
    
    let currentStep = 1;
    const totalSteps = 3;
    
    setInterval(() => {
        // Remove active class from all states
        states.forEach(state => state.classList.remove('active'));
        
        // Remove all browser state classes
        browserWindow.classList.remove('demo-watching', 'demo-learning', 'demo-running');
        
        // Move to next step
        currentStep = currentStep >= totalSteps ? 1 : currentStep + 1;
        
        // Add active class to current step
        const activeState = document.querySelector(`.popup-state-simple[data-step="${currentStep}"]`);
        if (activeState) {
            activeState.classList.add('active');
        }
        
        // Add corresponding browser state
        if (currentStep === 1) {
            browserWindow.classList.add('demo-watching');
        } else if (currentStep === 2) {
            browserWindow.classList.add('demo-learning');
        } else if (currentStep === 3) {
            browserWindow.classList.add('demo-running');
        }
    }, 3000); // Change every 3 seconds
};

// Initialize on DOM load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPopupCycling);
} else {
    initPopupCycling();
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

