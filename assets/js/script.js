// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            const isActive = hamburger.classList.contains('active');
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');

            // Update ARIA attribute
            hamburger.setAttribute('aria-expanded', !isActive);
        });

        // Close mobile menu when clicking on a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnHamburger = hamburger.contains(event.target);

            if (!isClickInsideNav && !isClickOnHamburger && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
            }
        });
    }

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80; // Account for fixed header
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Add scroll effect to navbar
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        let lastScrollTop = 0;
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.backgroundColor = 'rgba(44, 62, 80, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
            } else {
                navbar.style.backgroundColor = '#2c3e50';
                navbar.style.backdropFilter = 'none';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // Add animation to cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards for animation
    const cards = document.querySelectorAll('.feature-card, .level-card, .equipment-card, .step-item, .selection-card, .detail-card, .emergency-card, .tool-safety-card, .access-card, .policy-section, .training-item, .highlight-item, .contact-item, .safety-item, .action-item');
    
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(card);
    });

    // Add hover effects to level cards
    const levelCards = document.querySelectorAll('.level-card, .selection-card');
    levelCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add click-to-expand functionality for equipment details
    const equipmentCards = document.querySelectorAll('.equipment-card');
    equipmentCards.forEach(card => {
        const content = card.querySelector('.equipment-content');
        const header = card.querySelector('.equipment-header');
        
        if (content && header) {
            header.style.cursor = 'pointer';
            
            // Initially hide content for mobile
            if (window.innerWidth <= 768) {
                content.style.display = 'none';
                header.addEventListener('click', function() {
                    const isVisible = content.style.display !== 'none';
                    content.style.display = isVisible ? 'none' : 'block';
                    
                    // Add rotation effect to header
                    if (isVisible) {
                        header.style.transform = 'rotate(0deg)';
                    } else {
                        header.style.transform = 'rotate(2deg)';
                    }
                });
            }
        }
    });

    // Add search functionality for equipment (if search box exists)
    const searchInput = document.querySelector('#equipment-search');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const equipmentCards = document.querySelectorAll('.equipment-card');
            
            equipmentCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                const isVisible = text.includes(searchTerm);
                card.style.display = isVisible ? 'block' : 'none';
                
                if (isVisible) {
                    card.style.animation = 'fadeIn 0.3s ease';
                }
            });
        });
    }

    // Add toggle functionality for FAQ sections (if they exist)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            question.addEventListener('click', function() {
                const isOpen = answer.style.display === 'block';
                
                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    if (otherAnswer && otherQuestion) {
                        otherAnswer.style.display = 'none';
                        otherQuestion.classList.remove('active');
                    }
                });
                
                // Toggle current item
                if (!isOpen) {
                    answer.style.display = 'block';
                    question.classList.add('active');
                } else {
                    answer.style.display = 'none';
                    question.classList.remove('active');
                }
            });
        }
    });

    // Add progress indicator for workshop pages
    const createProgressIndicator = () => {
        const workshopLevels = document.querySelectorAll('.level-detail');
        if (workshopLevels.length > 0) {
            const progressContainer = document.createElement('div');
            progressContainer.className = 'progress-indicator';
            progressContainer.style.cssText = `
                position: fixed;
                top: 50%;
                right: 20px;
                transform: translateY(-50%);
                z-index: 100;
                display: flex;
                flex-direction: column;
                gap: 10px;
            `;
            
            workshopLevels.forEach((level, index) => {
                const dot = document.createElement('div');
                dot.className = 'progress-dot';
                dot.style.cssText = `
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    background: #bdc3c7;
                    cursor: pointer;
                    transition: all 0.3s ease;
                `;
                
                dot.addEventListener('click', () => {
                    level.scrollIntoView({ behavior: 'smooth' });
                });
                
                progressContainer.appendChild(dot);
            });
            
            document.body.appendChild(progressContainer);
            
            // Update active dot on scroll
            const updateProgressDots = () => {
                const scrollPos = window.scrollY + window.innerHeight / 2;
                const dots = progressContainer.querySelectorAll('.progress-dot');
                
                workshopLevels.forEach((level, index) => {
                    const rect = level.getBoundingClientRect();
                    const isActive = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                    
                    if (isActive) {
                        dots[index].style.background = '#e74c3c';
                        dots[index].style.transform = 'scale(1.2)';
                    } else {
                        dots[index].style.background = '#bdc3c7';
                        dots[index].style.transform = 'scale(1)';
                    }
                });
            };
            
            window.addEventListener('scroll', updateProgressDots);
            updateProgressDots(); // Initial call
        }
    };

    // Only create progress indicator on workshop pages
    if (window.location.pathname.includes('workshop')) {
        createProgressIndicator();
    }

    // Add form validation (if forms exist)
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.style.borderColor = '#e74c3c';
                    field.style.backgroundColor = '#fff5f5';
                } else {
                    field.style.borderColor = '#27ae60';
                    field.style.backgroundColor = '#f0fff4';
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                showNotification('Please fill in all required fields.', 'error');
            }
        });
    });

    // Notification system
    const showNotification = (message, type = 'info') => {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 5px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
        `;
        
        switch(type) {
            case 'error':
                notification.style.backgroundColor = '#e74c3c';
                break;
            case 'success':
                notification.style.backgroundColor = '#27ae60';
                break;
            case 'warning':
                notification.style.backgroundColor = '#f39c12';
                break;
            default:
                notification.style.backgroundColor = '#3498db';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    };

    // Add loading states for buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        if (button.getAttribute('href') && button.getAttribute('href').startsWith('http')) {
            button.addEventListener('click', function() {
                const originalText = this.textContent;
                this.textContent = 'Loading...';
                this.style.opacity = '0.7';
                
                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.opacity = '1';
                }, 2000);
            });
        }
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Escape key closes mobile menu
        if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        
        // Arrow keys for workshop level navigation
        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
            const levelDetails = document.querySelectorAll('.level-detail');
            if (levelDetails.length > 0) {
                const currentLevel = Array.from(levelDetails).find(level => {
                    const rect = level.getBoundingClientRect();
                    return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
                });
                
                if (currentLevel) {
                    const currentIndex = Array.from(levelDetails).indexOf(currentLevel);
                    let nextIndex;
                    
                    if (e.key === 'ArrowDown') {
                        nextIndex = Math.min(currentIndex + 1, levelDetails.length - 1);
                    } else {
                        nextIndex = Math.max(currentIndex - 1, 0);
                    }
                    
                    if (nextIndex !== currentIndex) {
                        levelDetails[nextIndex].scrollIntoView({ behavior: 'smooth' });
                        e.preventDefault();
                    }
                }
            }
        }
    });


    // Add accessibility improvements
    const improveAccessibility = () => {
        // Add skip link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -40px;
            left: 6px;
            background: #2c3e50;
            color: white;
            padding: 8px;
            text-decoration: none;
            border-radius: 0 0 4px 4px;
            transition: top 0.3s ease;
        `;
        
        skipLink.addEventListener('focus', function() {
            this.style.top = '0';
        });
        
        skipLink.addEventListener('blur', function() {
            this.style.top = '-40px';
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
        
        // Add main landmark if it doesn't exist
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
        
        // Add aria-labels to interactive elements
        const interactiveElements = document.querySelectorAll('button, .btn, [role="button"]');
        interactiveElements.forEach(element => {
            if (!element.getAttribute('aria-label') && !element.textContent.trim()) {
                element.setAttribute('aria-label', 'Interactive element');
            }
        });
        
        // Add focus indicators
        const style = document.createElement('style');
        style.textContent = `
            .btn:focus,
            .nav-link:focus,
            a:focus {
                outline: 2px solid #e74c3c;
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    };
    
    improveAccessibility();

    // Add performance optimization
    const optimizePerformance = () => {
        // Lazy load images if any exist
        const images = document.querySelectorAll('img');
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        if (img.dataset.src) {
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                        }
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => {
                if (img.dataset.src) {
                    imageObserver.observe(img);
                }
            });
        }
        
        // Debounce scroll events
        let scrollTimeout;
        const originalScrollHandlers = [];
        
        window.addEventListener('scroll', function() {
            if (scrollTimeout) {
                cancelAnimationFrame(scrollTimeout);
            }
            
            scrollTimeout = requestAnimationFrame(function() {
                // Execute scroll handlers
                originalScrollHandlers.forEach(handler => handler());
            });
        }, { passive: true });
    };
    
    optimizePerformance();
});

// Add CSS animations
const addAnimations = () => {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideIn {
            from { transform: translateX(-100%); }
            to { transform: translateX(0); }
        }
        
        @keyframes bounce {
            0%, 20%, 60%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            80% { transform: translateY(-5px); }
        }
        
        .fade-in {
            animation: fadeIn 0.6s ease-out;
        }
        
        .slide-in {
            animation: slideIn 0.5s ease-out;
        }
        
        .bounce {
            animation: bounce 2s infinite;
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
        
        @media (max-width: 768px) {
            .progress-indicator {
                display: none !important;
            }
            
            .print-button {
                display: none !important;
            }
        }
    `;
    document.head.appendChild(style);
};

// Initialize animations when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addAnimations);
} else {
    addAnimations();
}