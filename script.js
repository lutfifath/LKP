document.addEventListener('DOMContentLoaded', function() {
    // Carousel functionality
    const carouselSlides = document.querySelector('.carousel-slides');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevSlide');
    const nextBtn = document.getElementById('nextSlide');
    const indicators = document.querySelectorAll('.indicator');
    
    if (carouselSlides) { // Only run if carousel exists
        let currentIndex = 0;
        const slideCount = slides.length;
        let intervalId;

        function updateCarousel() {
            carouselSlides.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            // Update indicators
            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentIndex);
            });
            
            // Update slide content animation
            slides.forEach((slide, index) => {
                const content = slide.querySelector('.slide-content');
                if (index === currentIndex) {
                    slide.classList.add('active');
                    content.style.transform = 'translateX(0)';
                    content.style.opacity = '1';
                } else {
                    slide.classList.remove('active');
                    content.style.transform = 'translateX(-20px)';
                    content.style.opacity = '0';
                }
            });
        }

        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateCarousel();
        }

        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateCarousel();
        }

        // Event listeners for carousel
        if (nextBtn) nextBtn.addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });

        if (prevBtn) prevBtn.addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
                resetInterval();
            });
        });

        // Auto slide
        function startInterval() {
            intervalId = setInterval(nextSlide, 5000);
        }

        function resetInterval() {
            clearInterval(intervalId);
            startInterval();
        }

        // Touch support
        let touchStartX = 0;
        let touchEndX = 0;

        carouselSlides.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
            clearInterval(intervalId);
        });

        carouselSlides.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
            startInterval();
        });

        function handleSwipe() {
            const difference = touchStartX - touchEndX;
            if (difference > 50) nextSlide();
            if (difference < -50) prevSlide();
        }

        // Initialize carousel
        updateCarousel();
        startInterval();
    }

    // Event section functionality
    // Handle tombol Daftar Sekarang
    const registerButtons = document.querySelectorAll('.card-button');
    registerButtons.forEach(button => {
        button.addEventListener('click', function() {
            window.location.href = 'bayar.html';
        });
    });
    
    // Handle tombol Lihat Semua
    const viewAllButton = document.querySelector('.view-all');
    if (viewAllButton) {
        viewAllButton.addEventListener('click', function() {
            window.location.href = 'all-events.html'; // Ganti dengan URL yang sesuai
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenu = document.getElementById('mobile-menu');
            const contactForm = document.getElementById('contactForm');
            const successMessage = document.getElementById('successMessage');
            const langSwitcherLinks = document.querySelectorAll('.lang-switcher');

            langSwitcherLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault(); 
                    const destinationUrl = this.href; 
                    document.body.classList.add('fade-out');
                    setTimeout(() => {
                        window.location.href = destinationUrl; 
                    }, 400);
                });
            });

            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                successMessage.classList.remove('hidden');
                contactForm.reset();
                setTimeout(() => {
                    successMessage.classList.add('hidden');
                }, 5000);
            });
            
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 70,
                            behavior: 'smooth'
                        });
                        mobileMenu.classList.add('hidden');
                    }
                });
            });
        });
});