// Technical Portfolio JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize all functionality
    initNavigation();
    initProjectCards();
    initContactForm();
    initQuote();
    initAccessibility();
    initAnimations();
    
    // Navigation functionality
    function initNavigation() {
        const navbar = document.querySelector('.navbar');
        const navbarItems = document.querySelectorAll('.navbar-item[href^="#"]');
        
        // Smooth scrolling for navigation links
        navbarItems.forEach(item => {
            item.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const navbarHeight = navbar.offsetHeight;
                    const targetPosition = targetSection.offsetTop - navbarHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update active navigation item
                    updateActiveNavItem(targetId);
                }
            });
        });
        
        // Update active navigation item on scroll
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section[id]');
            const scrollPosition = window.scrollY + 100;
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    updateActiveNavItem('#' + sectionId);
                }
            });
        });
        
        function updateActiveNavItem(activeId) {
            navbarItems.forEach(item => {
                item.classList.remove('is-active');
                if (item.getAttribute('href') === activeId) {
                    item.classList.add('is-active');
                }
            });
        }
    }
    
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
        const form = document.querySelector('form[name="contact"]');
        const inputs = form ? form.querySelectorAll('input, textarea') : [];
        const submitButton = form ? form.querySelector('button[type="submit"]') : null;
        
        // Form validation
        inputs.forEach(input => {
            input.addEventListener('blur', validateField);
            input.addEventListener('input', clearFieldError);
        });
        
        // Form submission with Netlify Forms support
        if (form) {
            form.addEventListener('submit', handleFormSubmission);
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
            
            // Show loading state
            const originalText = submitButton.innerHTML;
            submitButton.innerHTML = '<span class="icon"><i class="fas fa-spinner fa-spin"></i></span><span>Sending...</span>';
            submitButton.disabled = true;
            
            // Submit to Netlify
            const formData = new FormData(form);
            
            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
            .then(() => {
                showNotification('Thank you! Your message has been sent successfully.', 'is-success');
                
                // Reset form
                form.reset();
                inputs.forEach(input => {
                    input.classList.remove('is-danger');
                    const errorMessage = input.parentNode.querySelector('.help.is-danger');
                    if (errorMessage) {
                        errorMessage.remove();
                    }
                });
            })
            .catch((error) => {
                console.error('Error:', error);
                showNotification('Sorry, there was an error sending your message. Please try again.', 'is-danger');
            })
            .finally(() => {
                // Reset button
                submitButton.innerHTML = originalText;
                submitButton.disabled = false;
            });
        }
    }
    
    // Quote functionality
    function initQuote() {
        const quoteText = document.getElementById('quote-text');
        const quoteAuthor = document.getElementById('quote-author');
        
        if (!quoteText || !quoteAuthor) {
            console.warn('Quote elements not found');
            return;
        }
        
        // Fetch quote from the API
        fetchRandomQuote();
        
        // Add click handler to refresh quote
        const quoteContainer = document.getElementById('quote-container');
        if (quoteContainer) {
            quoteContainer.style.cursor = 'pointer';
            quoteContainer.title = 'Click to get a new quote';
            quoteContainer.addEventListener('click', fetchRandomQuote);
        }
        
        function fetchRandomQuote() {
            // Show loading state
            quoteText.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading inspiring quote...';
            quoteAuthor.textContent = '';
            
            // Use a CORS proxy to bypass CORS restrictions
            const apiUrl = 'https://quotes-1271.appspot.com/json';
            const proxyUrl = 'https://api.allorigins.win/get?url=' + encodeURIComponent(apiUrl);
            
            fetch(proxyUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(proxyData => {
                    // Parse the actual quote data from the proxy response
                    const data = JSON.parse(proxyData.contents);
                    // Clean up the quote text by removing escape characters
                    let cleanQuote = data.quote
                        .replace(/\\u2019/g, "'")  // Replace unicode apostrophe
                        .replace(/\\"/g, '"')      // Replace escaped quotes
                        .replace(/\\n/g, ' ')      // Replace newlines with spaces
                        .replace(/\s+/g, ' ')      // Replace multiple spaces with single space
                        .trim();
                    
                    // Format the quote with proper quotation marks
                    if (!cleanQuote.startsWith('"')) {
                        cleanQuote = `"${cleanQuote}"`;
                    }
                    
                    // Clean up author information
                    let cleanAuthor = data.author
                        .replace(/For\s+/i, '')    // Remove "For " prefix
                        .replace(/,\s*\d{2}-\d{2}-\d{4}/, '') // Remove date
                        .trim();
                    
                    // Update the DOM with animation
                    quoteText.style.opacity = '0';
                    quoteAuthor.style.opacity = '0';
                    
                    setTimeout(() => {
                        quoteText.innerHTML = cleanQuote;
                        quoteAuthor.textContent = `— ${cleanAuthor}`;
                        
                        quoteText.style.opacity = '1';
                        quoteAuthor.style.opacity = '1';
                    }, 200);
                })
                .catch(error => {
                    console.error('Error fetching quote:', error);
                    
                    // Try direct API call as fallback (might work on some browsers/networks)
                    fetch('https://quotes-1271.appspot.com/json')
                        .then(response => response.json())
                        .then(data => {
                            let cleanQuote = data.quote
                                .replace(/\\u2019/g, "'")
                                .replace(/\\"/g, '"')
                                .replace(/\\n/g, ' ')
                                .replace(/\s+/g, ' ')
                                .trim();
                            
                            if (!cleanQuote.startsWith('"')) {
                                cleanQuote = `"${cleanQuote}"`;
                            }
                            
                            let cleanAuthor = data.author
                                .replace(/For\s+/i, '')
                                .replace(/,\s*\d{2}-\d{2}-\d{4}/, '')
                                .trim();
                            
                            quoteText.innerHTML = cleanQuote;
                            quoteAuthor.textContent = `— ${cleanAuthor}`;
                            quoteText.style.opacity = '1';
                            quoteAuthor.style.opacity = '1';
                        })
                        .catch(() => {
                            // Final fallback quote
                            quoteText.innerHTML = '"The only way to do great work is to love what you do."';
                            quoteAuthor.textContent = '— Steve Jobs';
                            quoteText.style.opacity = '1';
                            quoteAuthor.style.opacity = '1';
                        });
                });
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
        
        #quote-text, #quote-author {
            transition: opacity 0.3s ease-in-out;
        }
        
        #quote-container:hover {
            background-color: #f1f3f5 !important;
            transform: translateY(-1px);
            transition: all 0.2s ease-in-out;
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