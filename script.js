document.addEventListener('DOMContentLoaded', () => {
    // Cek dulu apakah ini perangkat sentuh atau bukan
    const IS_TOUCH_DEVICE = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // --- Fungsi 1: Menu Hamburger untuk Mobile ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // --- Fungsi 2: Animasi Muncul saat Scroll ---
    const sections = document.querySelectorAll('.fade-in-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });

    // --- Fungsi 3: Kursor Kustom (Hanya aktif di non-touch device) ---
    if (!IS_TOUCH_DEVICE) {
        const cursorContainer = document.querySelector('.cursor-container');
        if (cursorContainer) {
            const NUM_DOTS = 15;
            const dots = [];
            const mouse = { x: 0, y: 0 };

            for (let i = 0; i < NUM_DOTS; i++) {
                const dot = document.createElement('div');
                dot.classList.add('cursor-dot');
                if (i > 0) dot.classList.add('follower');
                cursorContainer.appendChild(dot);
                dots.push({ element: dot, x: 0, y: 0 });
            }

            window.addEventListener('mousemove', (e) => {
                mouse.x = e.clientX;
                mouse.y = e.clientY;
            });

            function animateDots() {
                let prevX = mouse.x;
                let prevY = mouse.y;

                dots.forEach((dot, index) => {
                    const currentX = dot.x;
                    const currentY = dot.y;
                    
                    if (index === 0) {
                        dot.x = mouse.x;
                        dot.y = mouse.y;
                    } else {
                        dot.x += (prevX - currentX) * 0.25;
                        dot.y += (prevY - currentY) * 0.25;
                    }
                    // Offset dikurangi setengah ukuran dot agar pusatnya pas dengan kursor
                    dot.element.style.transform = `translate(${dot.x - (dot.element.offsetWidth / 2)}px, ${dot.y - (dot.element.offsetHeight / 2)}px)`;
                    prevX = dot.x;
                    prevY = dot.y;
                });
                requestAnimationFrame(animateDots);
            }
            animateDots();
            
            // Elemen interaktif yang akan memicu efek hover pada kursor
            const interactiveElements = document.querySelectorAll('a, button, .btn, .hamburger-menu, .project-card, .interest-card, .contact-card');
            interactiveElements.forEach(el => {
                el.addEventListener('mouseenter', () => cursorContainer.classList.add('hovered'));
                el.addEventListener('mouseleave', () => cursorContainer.classList.remove('hovered'));
            });
        }
    }
});