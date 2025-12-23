/*=============== MENU SHOW Y HIDDEN ===============*/
const navMenu = document.getElementById('nav-menu');
const navToggle = document.getElementById('nav-toggle');
const navClose = document.getElementById('nav-close');

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu');
    });
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu');
    });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link');

function linkAction() {
    const navMenu = document.getElementById('nav-menu');
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu');
}
navLink.forEach(n => n.addEventListener('click', linkAction));

/*=============== ACCORDION SKILLS ===============*/
const skillsContent = document.getElementsByClassName('skills__content');
const skillsHeader = document.querySelectorAll('.skills__content-header');

function toggleSkills() {
    let itemClass = this.parentNode.className;

    for (i = 0; i < skillsContent.length; i++) {
        skillsContent[i].className = 'skills__content skills__close';
    }
    if (itemClass === 'skills__content skills__close') {
        this.parentNode.className = 'skills__content skills__open';
    }
}

skillsHeader.forEach((el) => {
    el.addEventListener('click', toggleSkills);
});

/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const nav = document.getElementById('nav');
    // When the scroll is greater than 200 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header');
    else nav.classList.remove('scroll-header');
}
window.addEventListener('scroll', scrollHeader);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]');

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link');
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link');
        }
    });
}
window.addEventListener('scroll', scrollActive);

/*=============== SMOOTH SCROLLING ===============*/
const scrollLinks = document.querySelectorAll('a[href^="#"]');

scrollLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 70; // Account for fixed header

            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

/*=============== CONTACT FORM ===============*/
const contactForm = document.getElementById('contact-form');
const contactName = document.getElementById('contact-name');
const contactEmail = document.getElementById('contact-email');
const contactProject = document.getElementById('contact-project');
const contactMessage = document.getElementById('contact-message');

// EmailJS configuration
const EMAILJS_PUBLIC_KEY = '_z_CUrvnpbrvDDQiC'; // Replace with your EmailJS public key
const EMAILJS_SERVICE_ID = 'service_yzsw3ad';   // Replace with your EmailJS service ID
const EMAILJS_TEMPLATE_ID = 'template_iijiiul'; // Replace with your EmailJS template ID

// Initialize EmailJS when the SDK is available
let emailJsReady = false;
if (typeof emailjs !== 'undefined') {
    try {
        emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
        emailJsReady = true;
    } catch (err) {
        console.error('EmailJS init failed:', err);
    }
} else {
    console.error('EmailJS SDK not loaded');
}

// Show message function
const showMessage = (message, isSuccess = true) => {
    // Remove any existing messages
    const existingMessage = document.querySelector('.contact__message');
    if (existingMessage) {
        existingMessage.remove();
    }

    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = `contact__message ${isSuccess ? 'contact__message--success' : 'contact__message--error'}`;
    messageElement.textContent = message;

    // Insert message before form
    contactForm.parentNode.insertBefore(messageElement, contactForm);

    // Remove message after 5 seconds
    setTimeout(() => {
        messageElement.remove();
    }, 5000);
};

// Form validation
const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validateForm = () => {
    let isValid = true;
    const errors = [];

    // Check required fields
    if (!contactName.value.trim()) {
        errors.push('Name is required');
        isValid = false;
    }

    if (!contactEmail.value.trim()) {
        errors.push('Email is required');
        isValid = false;
    } else if (!validateEmail(contactEmail.value.trim())) {
        errors.push('Please enter a valid email address');
        isValid = false;
    }

    if (!contactMessage.value.trim()) {
        errors.push('Message is required');
        isValid = false;
    }

    if (!isValid) {
        showMessage(errors.join(', '), false);
    }

    return isValid;
};

// Handle form submission with EmailJS
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        if (!emailJsReady) {
            showMessage('Email service is unavailable right now. Please try again or email me directly.', false);
            return;
        }

        if (validateForm()) {
            // Show loading state
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sending... <i class="ri-loader-4-line"></i>';
            submitButton.disabled = true;

            // Prepare template parameters
            const templateParams = {
                from_name: contactName.value.trim(),
                from_email: contactEmail.value.trim(),
                project: contactProject.value.trim() || 'Not specified',
                message: contactMessage.value.trim(),
                to_name: 'Oasis Pandey'
            };

            // Send email using EmailJS
            emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, EMAILJS_PUBLIC_KEY)
                .then(() => {
                    showMessage('Thank you! Your message has been sent successfully. I\'ll get back to you soon.', true);
                    contactForm.reset();
                })
                .catch((error) => {
                    console.error('EmailJS Error:', error);
                    const reason = error?.text || error?.message || 'Unknown error';
                    showMessage(`Sorry, there was an error sending your message (${reason}). Please try again or contact me directly.`, false);
                })
                .finally(() => {
                    // Reset button
                    submitButton.innerHTML = originalText;
                    submitButton.disabled = false;
                });
        }
    });
}

/*=============== TYPING ANIMATION ===============*//*=============== TYPING ANIMATION ===============*/
const typingText = document.querySelector('.home__title-color');
if (typingText) {
    const text = 'Oasis Pandey';
    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            typingText.textContent = text.substring(0, index + 1);
            index++;
            setTimeout(typeWriter, 100);
        }
    }

    // Start typing animation when page loads
    window.addEventListener('load', () => {
        typingText.textContent = '';
        setTimeout(typeWriter, 1000);
    });
}

/*=============== INTERSECTION OBSERVER FOR ANIMATIONS ===============*/
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.section, .work__card, .skills__content, .about__img, .home__img');
animateElements.forEach(el => {
    observer.observe(el);
});

/*=============== PERFORMANCE OPTIMIZATIONS ===============*/
// Debounce function for scroll events
function debounce(func, wait = 20, immediate = true) {
    let timeout;
    return function () {
        const context = this, args = arguments;
        const later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

// Throttle scroll events
const throttledScrollHeader = debounce(scrollHeader);
const throttledScrollActive = debounce(scrollActive);

// Remove default listeners and add throttled ones
window.removeEventListener('scroll', scrollHeader);
window.removeEventListener('scroll', scrollActive);

window.addEventListener('scroll', throttledScrollHeader);
window.addEventListener('scroll', throttledScrollActive);

/*=============== LAZY LOADING IMAGES ===============*/
const images = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => imageObserver.observe(img));

/*=============== PRELOAD CRITICAL RESOURCES ===============*/
function preloadResource(href, as, type) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
}

// Preload Google Fonts
if (!document.querySelector('link[href*="fonts.googleapis.com"]')) {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = 'https://fonts.googleapis.com';
    document.head.appendChild(link);

    const link2 = document.createElement('link');
    link2.rel = 'preconnect';
    link2.href = 'https://fonts.gstatic.com';
    link2.crossOrigin = 'anonymous';
    document.head.appendChild(link2);

    const link3 = document.createElement('link');
    link3.rel = 'stylesheet';
    link3.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
    document.head.appendChild(link3);
}

/*=============== DARK MODE TOGGLE (OPTIONAL) ===============*/
const darkModeToggle = document.getElementById('dark-mode-toggle');
const body = document.body;

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        localStorage.setItem('dark-mode', body.classList.contains('dark-theme'));
    });

    // Check for saved dark mode preference
    const savedDarkMode = localStorage.getItem('dark-mode');
    if (savedDarkMode === 'true') {
        body.classList.add('dark-theme');
    }
}

/*=============== COPY EMAIL TO CLIPBOARD ===============*/

/*=============== INITIALIZE ON DOM CONTENT LOADED ===============*/
document.addEventListener('DOMContentLoaded', function () {
    // Add animation classes
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .contact__message {
            padding: 1rem;
            border-radius: 0.5rem;
            margin-bottom: 1rem;
            font-weight: 500;
        }
        
        .contact__message--success {
            background-color: #d4edda;
            border: 1px solid #c3e6cb;
            color: #155724;
        }
        
        .contact__message--error {
            background-color: #f8d7da;
            border: 1px solid #f5c6cb;
            color: #721c24;
        }
        
        .ri-loader-4-line {
            animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Initialize skills accordion (first one open by default)
    if (skillsContent.length > 0) {
        skillsContent[0].className = 'skills__content skills__open';
    }

    // Tech icons interactive behavior with drag functionality
    const techIcons = document.querySelectorAll('.tech-icon');
    let draggedIcon = null;
    let originalPosition = {};
    let isDragging = false;
    let startX, startY, initialX, initialY;

    techIcons.forEach(icon => {
        // Store original position
        const computedStyle = window.getComputedStyle(icon);
        icon.originalTop = computedStyle.top;
        icon.originalRight = computedStyle.right;

        // Hover effects (only when not dragging)
        icon.addEventListener('mouseenter', function () {
            if (!isDragging) {
                this.style.transform = 'scale(1.15) rotate(5deg)';
                this.style.filter = 'brightness(1.2)';
            }
        });

        icon.addEventListener('mouseleave', function () {
            if (!isDragging) {
                this.style.transform = 'scale(1)';
                this.style.filter = 'brightness(1)';
            }
        });

        // Drag functionality
        icon.addEventListener('mousedown', function (e) {
            e.preventDefault();
            isDragging = true;
            draggedIcon = this;

            // Get current position before any changes
            const rect = this.getBoundingClientRect();
            const containerRect = this.parentElement.getBoundingClientRect();

            // Store initial mouse and element positions
            startX = e.clientX;
            startY = e.clientY;
            initialX = rect.left - containerRect.left;
            initialY = rect.top - containerRect.top;

            // Change cursor and styling
            this.style.cursor = 'grabbing';
            this.style.zIndex = '1000';
            this.style.transform = 'scale(1.2)';
            this.style.transition = 'none';

            // Switch to absolute positioning for dragging
            this.style.position = 'absolute';
            this.style.left = initialX + 'px';
            this.style.top = initialY + 'px';
            this.style.right = 'auto';
        });

        // Add pointer events for better UX
        icon.style.pointerEvents = 'auto';
        icon.style.cursor = 'grab';

        // Click interaction (only if not dragged)
        icon.addEventListener('click', function (e) {
            if (!isDragging) {
                const tech = this.getAttribute('data-tech');
                showMessage(`You clicked on ${tech}! 🚀`, true);
            }
        });
    });

    // Global mouse move handler
    document.addEventListener('mousemove', function (e) {
        if (isDragging && draggedIcon) {
            e.preventDefault();

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            draggedIcon.style.left = (initialX + deltaX) + 'px';
            draggedIcon.style.top = (initialY + deltaY) + 'px';
        }
    });

    // Global mouse up handler
    document.addEventListener('mouseup', function (e) {
        if (isDragging && draggedIcon) {
            isDragging = false;

            // Reset cursor and styling
            draggedIcon.style.cursor = 'grab';
            draggedIcon.style.zIndex = '';

            // Smooth transition back to original position
            draggedIcon.style.transition = 'all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
            draggedIcon.style.position = 'absolute';
            draggedIcon.style.top = draggedIcon.originalTop;
            draggedIcon.style.right = draggedIcon.originalRight;
            draggedIcon.style.left = 'auto';
            draggedIcon.style.transform = 'scale(1)';

            // Clean up after animation
            setTimeout(() => {
                if (draggedIcon) {
                    draggedIcon.style.transition = '';
                    draggedIcon.style.position = 'absolute';
                }
            }, 500);

            draggedIcon = null;
        }
    });

    // Prevent text selection during drag
    document.addEventListener('selectstart', function (e) {
        if (isDragging) {
            e.preventDefault();
        }
    });
});
