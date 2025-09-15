// Azentra Website JavaScript - Fixed Version

// Global state
let currentPage = 'home';

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing app...');
    initializeApp();
});

function initializeApp() {
    setupNavigation();
    setupMobileMenu();
    setupContactForm();
    setupScrollEffects();
    setupButtonHandlers();
    
    // Show home page by default
    showPage('home');
    console.log('App initialized successfully');
}

// Navigation Management - Fixed
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Nav link clicked:', this.getAttribute('href'));
            
            const targetId = this.getAttribute('href').substring(1);
            showPage(targetId);
            updateActiveNav(this);
            
            // Close mobile menu if open
            closeMobileMenu();
        });
    });
    
    console.log('Navigation setup complete');
}

function showPage(pageId) {
    console.log('Showing page:', pageId);
    
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => {
        page.classList.remove('active');
        page.style.display = 'none';
    });
    
    // Show target page
    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.style.display = 'block';
        targetPage.classList.add('active');
        currentPage = pageId;
        
        // Smooth scroll to top of page
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Update page title
        updatePageTitle(pageId);
        
        // Trigger animations after a short delay
        setTimeout(() => {
            triggerPageAnimations(targetPage);
        }, 100);
        
        console.log('Page shown successfully:', pageId);
    } else {
        console.error('Page not found:', pageId);
    }
}

function updatePageTitle(pageId) {
    const titles = {
        'home': 'Azentra - Web & AI Solutions Startup',
        'services': 'Our Services - Azentra',
        'packages': 'Pricing Packages - Azentra', 
        'portfolio': 'Portfolio - Azentra',
        'about': 'About Us - Azentra',
        'contact': 'Contact Us - Azentra'
    };
    
    document.title = titles[pageId] || 'Azentra - Web & AI Solutions Startup';
}

function updateActiveNav(activeLink) {
    // Remove active class from all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to clicked link
    if (activeLink) {
        activeLink.classList.add('active');
    }
}

// Mobile Menu Management - Fixed
function setupMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            console.log('Mobile menu toggle clicked');
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                closeMobileMenu();
            }
        });
        
        console.log('Mobile menu setup complete');
    }
}

function closeMobileMenu() {
    const navMenu = document.getElementById('navMenu');
    const navToggle = document.getElementById('navToggle');
    
    if (navMenu && navToggle) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    }
}

// Contact Form Management - Fixed
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmission);
        
        // Add input validation
        const inputs = contactForm.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('blur', validateInput);
            input.addEventListener('input', clearValidation);
        });
        
        console.log('Contact form setup complete');
    }
}

function handleFormSubmission(e) {
    e.preventDefault();
    console.log('Form submitted');
    
    const form = e.target;
    
    // Validate all fields
    if (!validateForm(form)) {
        console.log('Form validation failed');
        return;
    }
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');
    
    // Simulate form submission (replace with actual form handling)
    setTimeout(() => {
        showSuccessMessage(form);
        resetForm(form);
        
        // Reset button
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.classList.remove('loading');
        
        console.log('Form submission completed');
    }, 2000);
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!validateInput({ target: input })) {
            isValid = false;
        }
    });
    
    return isValid;
}

function validateInput(e) {
    const input = e.target;
    const value = input.value.trim();
    let isValid = true;
    let message = '';
    
    // Remove existing validation
    clearValidation({ target: input });
    
    // Required field validation
    if (input.hasAttribute('required') && !value) {
        isValid = false;
        message = 'This field is required';
    }
    
    // Email validation
    if (input.type === 'email' && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) {
            isValid = false;
            message = 'Please enter a valid email address';
        }
    }
    
    // Show validation message
    if (!isValid) {
        showValidationError(input, message);
    }
    
    return isValid;
}

function clearValidation(e) {
    const input = e.target;
    const errorElement = input.parentNode.querySelector('.validation-error');
    if (errorElement) {
        errorElement.remove();
    }
    input.classList.remove('error');
}

function showValidationError(input, message) {
    input.classList.add('error');
    
    // Create error element
    const errorElement = document.createElement('div');
    errorElement.className = 'validation-error';
    errorElement.textContent = message;
    errorElement.style.color = 'var(--color-error)';
    errorElement.style.fontSize = 'var(--font-size-sm)';
    errorElement.style.marginTop = 'var(--space-4)';
    
    // Insert after input
    input.parentNode.appendChild(errorElement);
}

function showSuccessMessage(form) {
    // Remove existing success message
    const existingMessage = form.querySelector('.success-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.textContent = 'Thank you for your message! We will get back to you soon.';
    
    // Insert at top of form
    form.insertBefore(successMessage, form.firstChild);
    
    // Remove message after 5 seconds
    setTimeout(() => {
        if (successMessage.parentNode) {
            successMessage.remove();
        }
    }, 5000);
}

function resetForm(form) {
    form.reset();
    
    // Clear any validation errors
    const errorElements = form.querySelectorAll('.validation-error');
    errorElements.forEach(element => element.remove());
    
    const errorInputs = form.querySelectorAll('.error');
    errorInputs.forEach(input => input.classList.remove('error'));
}

// Button Handlers - Fixed
function setupButtonHandlers() {
    // Set up all interactive buttons
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // Handle navigation buttons
        if (target.textContent.includes('Get Your Website Today') || 
            target.textContent.includes('Get Quote') ||
            target.onclick && target.onclick.toString().includes('contact')) {
            e.preventDefault();
            scrollToSection('contact');
        }
        
        // Handle package buttons
        if (target.textContent.includes('View Packages') || 
            target.onclick && target.onclick.toString().includes('packages')) {
            e.preventDefault();
            scrollToSection('packages');
        }
        
        // Handle package selection buttons
        if (target.textContent.includes('Choose Plan')) {
            e.preventDefault();
            const packageCard = target.closest('.package-card');
            if (packageCard) {
                const packageName = getPackageName(packageCard);
                selectPackage(packageName);
            }
        }
        
        // Handle WhatsApp buttons
        if (target.textContent.includes('WhatsApp') || target.textContent.includes('📱')) {
            e.preventDefault();
            openWhatsApp();
        }
        
        // Handle Call buttons  
        if (target.textContent.includes('Call') || target.textContent.includes('📞')) {
            e.preventDefault();
            makeCall();
        }
        
        // Handle View Live buttons
        // if (target.textContent.includes('View Live')) {
        //     e.preventDefault();
        //     // You could implement actual portfolio links here
        //     alert('Demo portfolio link - would open actual project in new tab');
        // }
    });
    
    console.log('Button handlers setup complete');
}

function getPackageName(packageCard) {
    const title = packageCard.querySelector('h3');
    if (title) {
        const text = title.textContent.toLowerCase().trim();
        if (text.includes('starter basic')) return 'starter-basic';
        if (text.includes('starter subscription')) return 'starter-subscription';
        if (text.includes('starter premium')) return 'starter-premium';
        if (text.includes('business')) return 'business';
        if (text.includes('pro')) return 'pro';
    }
    return 'starter-basic';
}

// Scroll Effects and Animations
function setupScrollEffects() {
    // Initialize intersection observer for animations
    observeElements();
    console.log('Scroll effects setup complete');
}

function observeElements() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observe all glass cards
    setTimeout(() => {
        document.querySelectorAll('.glass-card').forEach(card => {
            if (!card.style.opacity) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            }
            observer.observe(card);
        });
    }, 500);
}

function triggerPageAnimations(page) {
    const cards = page.querySelectorAll('.glass-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Utility Functions
function scrollToSection(sectionId) {
    console.log('Scrolling to section:', sectionId);
    
    // Show the page
    showPage(sectionId);
    
    // Update active nav
    const targetLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (targetLink) {
        updateActiveNav(targetLink);
    }
}

// Package selection functionality
function selectPackage(packageName) {
    console.log('Package selected:', packageName);
    
    // Navigate to contact page
    showPage('contact');
    
    // Pre-select the package in the form
    setTimeout(() => {
        const packageSelect = document.getElementById('package');
        if (packageSelect) {
            packageSelect.value = packageName;
            console.log('Package pre-selected in form:', packageName);
        }
        
        // Update active nav
        const contactLink = document.querySelector('.nav-link[href="#contact"]');
        if (contactLink) {
            updateActiveNav(contactLink);
        }
    }, 100);
}

// WhatsApp Integration
function openWhatsApp(message = '') {
    const phoneNumber = '918740942286';
    const defaultMessage = message || 'Hi, I\'m interested in your web development services';
    const encodedMessage = encodeURIComponent(defaultMessage);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    console.log('Opening WhatsApp:', whatsappUrl);
    window.open(whatsappUrl, '_blank');
}

// Phone call functionality
function makeCall() {
    const phoneUrl = 'tel:+918740942286';
    console.log('Making call:', phoneUrl);
    window.location.href = phoneUrl;
}

// Email functionality
function sendEmail(subject = '') {
    const email = 'rohitjangirghatwa@gmail.com';
    const defaultSubject = subject || 'Web Development Inquiry';
    const encodedSubject = encodeURIComponent(defaultSubject);
    const emailUrl = `mailto:${email}?subject=${encodedSubject}`;
    
    console.log('Opening email:', emailUrl);
    window.location.href = emailUrl;
}

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu
    if (e.key === 'Escape') {
        closeMobileMenu();
    }
});

// Handle page visibility changes
document.addEventListener('visibilitychange', function() {
    if (document.visibilityState === 'visible') {
        // Re-trigger animations when page becomes visible
        const currentPageElement = document.getElementById(currentPage);
        if (currentPageElement && currentPageElement.classList.contains('active')) {
            triggerPageAnimations(currentPageElement);
        }
    }
});

// Initialize on window load as backup
window.addEventListener('load', function() {
    if (currentPage === '') {
        console.log('Backup initialization triggered');
        initializeApp();
    }
});

// Export functions for global access
window.scrollToSection = scrollToSection;
window.selectPackage = selectPackage;
window.openWhatsApp = openWhatsApp;
window.makeCall = makeCall;
window.sendEmail = sendEmail;
window.showPage = showPage;

// Debug functions
window.debugApp = function() {
    console.log('Current page:', currentPage);
    console.log('Available pages:', Array.from(document.querySelectorAll('.page')).map(p => p.id));
    console.log('Navigation links:', Array.from(document.querySelectorAll('.nav-link')).map(l => l.getAttribute('href')));
};