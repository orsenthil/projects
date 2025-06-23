// Technical Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initProjectCards();
    initContactForm();
    initAccessibility();
    initAnimations();
    

    
    // Project cards functionality
    function initProjectCards() {
        const projectCards = document.querySelectorAll('.project-card');
        
        projectCards.forEach(card => {
            // Add keyboard navigation support
            card.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    const link = this.querySelector('.card-footer-item');
                    if (link) {
                        link.click();
                    }
                }
            });
            
            // Add hover effect for touch devices
            card.addEventListener('touchstart', function() {
                this.classList.add('is-touched');
            });
            
            card.addEventListener('touchend', function() {
                setTimeout(() => {
                    this.classList.remove('is-touched');
                }, 300);
            });
            
            // Add loading state for images
            const image = card.querySelector('.project-image');
            if (image) {
                image.addEventListener('load', function() {
                    this.style.opacity = '1';
                });
                
                image.addEventListener('error', function() {
                    this.src = 'https://via.placeholder.com/400x300/CCCCCC/666666?text=Image+Not+Available';
                    this.alt = 'Image not available';
                });
            }
        });
    }
    
    // Contact form functionality
    function initContactForm() {
        const form = document.querySelector('#contact .box');
        const inputs = form.querySelectorAll('input, textarea');
        const submitButton = form.querySelector('button[type="submit"]');
        
        // Form validation
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Form submission
        if (submitButton) {
            submitButton.addEventListener('click', handleFormSubmission);
        }
        
        function validateField(e) {
            const field = e.target;
            const value = field.value.trim();
            
            // Remove existing error styling
            field.classList.remove('is-danger');
            
            // Validate required fields
            if (field.hasAttribute('required') && !value) {
                field.classList.add('is-danger');
                showFieldError(field, 'This field is required');
                return false;
            }
            
            // Validate email format
            if (field.type === 'email' && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    field.classList.add('is-danger');
                    showFieldError(field, 'Please enter a valid email address');
                    return false;
                }
            }
            
            return true;
        }
        
        function showFieldError(field, message) {
            // Remove existing error message
            const existingError = field.parentNode.querySelector('.help.is-danger');
            if (existingError) {
                existingError.remove();
            }
            
            // Add new error message
            const errorDiv = document.createElement('p');
            errorDiv.className = 'help is-danger';
            errorDiv.textContent = message;
            field.parentNode.appendChild(errorDiv);
        }
        
        function clearFieldError(e) {
            const field = e.target;
            field.classList.remove('is-danger');
            
            const errorMessage = field.parentNode.querySelector('.help.is-danger');
            if (errorMessage) {
                errorMessage.remove();
            }
        }
        
        function handleFormSubmission(e) {
            e.preventDefault();
            
            // Validate all fields
            let isValid = true;
            inputs.forEach(input => {
                if (!validateField({ target: input })) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                showNotification('Please fix the errors in the form', 'is-danger');
                return;
            }
            
            // Simulate form submission
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="icon"><i class="fas fa-spinner fa-spin"></i></span><span>Sending...</span>';
            submitButton.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'is-success');
                
                // Reset form
                inputs.forEach(input => {
                    input.value = '';
                    input.classList.remove('is-danger');
                });
                
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
                
            }, 2000);
        }
    }
    
    // Accessibility enhancements
    function initAccessibility() {
        // Skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#projects';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #3273dc;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 4px;
            z-index: 1000;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '6px';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add ARIA labels for better screen reader support
        const projectCards = document.querySelectorAll('.project-card');
        projectCards.forEach((card, index) => {
            const title = card.querySelector('.title');
            const description = card.querySelector('.project-description');
            
            if (title && description) {
                card.setAttribute('aria-label', `Project ${index + 1}: ${title.textContent}. ${description.textContent}`);
            }
        });
        
        // Add focus management for modals (if any)
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                // Close any open modals or dropdowns
                const activeElements = document.querySelectorAll('.is-active');
                activeElements.forEach(element => {
                    element.classList.remove('is-active');
                });
            }
        });
    }
    
    // Animation and scroll effects
    function initAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const animateElements = document.querySelectorAll('.project-card, .content, .box');
        animateElements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            observer.observe(element);
        });
        
        // Add visible class when element comes into view
        document.addEventListener('scroll', function() {
            const visibleElements = document.querySelectorAll('.is-visible');
            visibleElements.forEach(element => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            });
        });
    }
    
    // Utility function for notifications
    function showNotification(message, type = 'is-info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notification => notification.remove());
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification ${type} is-light`;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 1000;
            max-width: 400px;
            animation: slideIn 0.3s ease-out;
        `;
        
        notification.innerHTML = `
            <button class="delete" aria-label="Close notification"></button>
            ${message}
        `;
        
        document.body.appendChild(notification);
        
        // Add close functionality
        const closeButton = notification.querySelector('.delete');
        closeButton.addEventListener('click', function() {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
        
        // Auto-remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-out';
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }
        }, 5000);
    }
    
    // Add CSS animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .project-card.is-touched {
            transform: translateY(-4px);
            box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
        }
    `;
    document.head.appendChild(style);
    
    // Performance optimization: Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Service Worker registration for PWA capabilities
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(function(registration) {
                    console.log('ServiceWorker registration successful');
                })
                .catch(function(err) {
                    console.log('ServiceWorker registration failed');
                });
        });
    }
}); 