// Responsive Slideshow JavaScript for Erhart's Catering

(function() {
    'use strict';
    
    // Slideshow class for managing multiple slideshows
    class Slideshow {
        constructor(containerId, interval = 5000) {
            this.container = document.getElementById(containerId);
            this.slides = this.container ? this.container.querySelectorAll('.slide') : [];
            this.currentSlide = 0;
            this.interval = interval;
            this.timer = null;
            this.isPlaying = true;
            
            if (this.slides.length > 1) {
                this.init();
            }
        }
        
        init() {
            // Add event listeners for touch/swipe support
            this.addTouchSupport();
            
            // Add pause on hover
            this.container.addEventListener('mouseenter', () => this.pause());
            this.container.addEventListener('mouseleave', () => this.play());
            
            // Start the slideshow
            this.play();
        }
        
        showSlide(index) {
            if (this.slides.length === 0) return;
            
            // Hide all slides
            this.slides.forEach(slide => {
                slide.classList.remove('active');
            });
            
            // Show the current slide
            this.slides[index].classList.add('active');
            this.currentSlide = index;
        }
        
        nextSlide() {
            const next = (this.currentSlide + 1) % this.slides.length;
            this.showSlide(next);
        }
        
        prevSlide() {
            const prev = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
            this.showSlide(prev);
        }
        
        play() {
            if (!this.isPlaying || this.slides.length <= 1) return;
            
            this.timer = setInterval(() => {
                this.nextSlide();
            }, this.interval);
        }
        
        pause() {
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
        
        stop() {
            this.pause();
            this.isPlaying = false;
        }
        
        addTouchSupport() {
            let startX = 0;
            let endX = 0;
            
            this.container.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });
            
            this.container.addEventListener('touchmove', (e) => {
                e.preventDefault(); // Prevent scrolling
            });
            
            this.container.addEventListener('touchend', (e) => {
                endX = e.changedTouches[0].clientX;
                this.handleSwipe(startX, endX);
            });
        }
        
        handleSwipe(startX, endX) {
            const threshold = 50; // Minimum distance for a swipe
            const diff = startX - endX;
            
            if (Math.abs(diff) > threshold) {
                if (diff > 0) {
                    // Swipe left - next slide
                    this.nextSlide();
                } else {
                    // Swipe right - previous slide
                    this.prevSlide();
                }
            }
        }
    }
    
    // Initialize slideshows when DOM is ready
    function initSlideshows() {
        // Different intervals for variety
        const slideshows = [
            new Slideshow('taglineSlides', 6000),
            new Slideshow('heroSlideshow', 5000),
            new Slideshow('venuesSlideshow', 5000),
            new Slideshow('menusSlideshow', 5000),
            new Slideshow('servicesSlideshow', 5000)
        ];
        
        // Store slideshows globally for debugging if needed
        window.erhartSlideshows = slideshows;
    }
    
    // Intersection Observer for performance optimization
    function setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    const slideshow = window.erhartSlideshows?.find(s => 
                        s.container === entry.target
                    );
                    
                    if (slideshow) {
                        if (entry.isIntersecting) {
                            slideshow.play();
                        } else {
                            slideshow.pause();
                        }
                    }
                });
            }, {
                threshold: 0.1
            });
            
            // Observe all slideshow containers
            document.querySelectorAll('[id$="Slideshow"], [id$="Slides"]').forEach(container => {
                observer.observe(container);
            });
        }
    }
    
    // Responsive behavior
    function handleResize() {
        // Adjust slideshow behavior based on screen size
        const isMobile = window.innerWidth <= 768;
        
        if (window.erhartSlideshows) {
            window.erhartSlideshows.forEach(slideshow => {
                if (slideshow.container) {
                    // Longer intervals on mobile to reduce battery usage
                    slideshow.interval = isMobile ? 7000 : 5000;
                }
            });
        }
    }
    
    // Keyboard navigation
    function setupKeyboardNavigation() {
        document.addEventListener('keydown', (e) => {
            if (!window.erhartSlideshows) return;
            
            // Find the slideshow container that's currently focused or in view
            const focusedSlideshow = window.erhartSlideshows.find(slideshow => 
                slideshow.container && slideshow.container.contains(document.activeElement)
            ) || window.erhartSlideshows[0]; // Default to first slideshow
            
            if (focusedSlideshow) {
                switch(e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        focusedSlideshow.prevSlide();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        focusedSlideshow.nextSlide();
                        break;
                    case ' ': // Spacebar
                        e.preventDefault();
                        if (focusedSlideshow.timer) {
                            focusedSlideshow.pause();
                        } else {
                            focusedSlideshow.play();
                        }
                        break;
                }
            }
        });
    }
    
    // Initialize everything when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            initSlideshows();
            setupIntersectionObserver();
            setupKeyboardNavigation();
            handleResize();
        });
    } else {
        initSlideshows();
        setupIntersectionObserver();
        setupKeyboardNavigation();
        handleResize();
    }
    
    // Handle window resize
    window.addEventListener('resize', handleResize);
    
    // Handle page visibility changes to pause/resume slideshows
    document.addEventListener('visibilitychange', () => {
        if (window.erhartSlideshows) {
            window.erhartSlideshows.forEach(slideshow => {
                if (document.hidden) {
                    slideshow.pause();
                } else {
                    slideshow.play();
                }
            });
        }
    });
    
})();