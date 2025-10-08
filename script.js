document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Плавна прокрутка для навігації (Без змін) ---
    const navLinks = document.querySelectorAll('header nav ul a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // Відступ для фіксованого хедера
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 2. Анімація елементів при прокрутці (ОНОВЛЕНО) ---
    // Тепер анімація спрацьовує щоразу, коли елемент з'являється на екрані.
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Якщо елемент у полі зору - додаємо клас
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } 
            // Інакше (елемент зник з поля зору) - прибираємо клас
            else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, {
        threshold: 0.1 // Спрацює, коли 10% елемента видно
    });
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });


    // --- 3. Анімація друкування для заголовка (Без змін) ---
    const typingElement = document.getElementById('typing-hero-h1');
    if (typingElement) {
        const textToType = typingElement.getAttribute('data-text');
        let i = 0;
        typingElement.innerHTML = ""; // Очищуємо текст перед початком

        function typeWriter() {
            if (i < textToType.length) {
                typingElement.innerHTML += textToType.charAt(i);
                i++;
                setTimeout(typeWriter, 100); // Швидкість друкування
            } else {
                typingElement.style.borderRight = 'none';
                typingElement.style.animation = 'none';
            }
        }
        typeWriter();
    }

    // --- 4. 3D-ефект для карток (Без змін) ---
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const rotateY = (x / (rect.width / 2)) * 15;
            const rotateX = (-y / (rect.height / 2)) * 15;

            card.style.setProperty('--rotateY', `${rotateY}deg`);
            card.style.setProperty('--rotateX', `${rotateX}deg`);
        });

        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--rotateY', '0deg');
            card.style.setProperty('--rotateX', '0deg');
        });
    });

    // --- 5. Керування панеллю прогресу, кнопкою "Нагору" та активними посиланнями (Без змін) ---
    const progressBar = document.querySelector('.scroll-progress-bar');
    const backToTopBtn = document.querySelector('.back-to-top-btn');
    const sections = document.querySelectorAll('.section');
    const navLinksForScroll = document.querySelectorAll('.nav-link');

    function handleScroll() {
        // Панель прогресу
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        if (progressBar) {
            progressBar.style.width = `${scrollPercent}%`;
        }

        // Кнопка "Нагору"
        if (backToTopBtn) {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }

        // Підсвічування активних посилань
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollTop >= sectionTop - 150) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        if (scrollTop < 500) {
            currentSectionId = 'hero';
        }

        navLinksForScroll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);

});