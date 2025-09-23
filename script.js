document.addEventListener('DOMContentLoaded', () => {

    // --- Fungsi 1: Kursor Kustom 'Cacing' (Liquid Trail) ---
    const cursorContainer = document.querySelector('.cursor-container');
    if (cursorContainer) {
        const interactiveElements = document.querySelectorAll('a, button, .btn, .interest-card, .project-card, .contact-card, .hamburger-menu');
        const dots = [];
        const numDots = 10; // Jumlah dot untuk membuat jejak
        let mouse = { x: 0, y: 0 };

        // Membuat semua dot untuk kursor dan jejaknya
        for (let i = 0; i < numDots; i++) {
            const dot = document.createElement('div');
            dot.classList.add('cursor-dot');
            if (i === 0) dot.classList.add('main-cursor');
            else dot.classList.add('follower');
            
            cursorContainer.appendChild(dot);
            dots.push({
                el: dot,
                x: 0,
                y: 0
            });
        }

        // Event listener untuk posisi mouse
        window.addEventListener('mousemove', e => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        });

        // Event listener untuk efek hover
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorContainer.classList.add('hovered'));
            el.addEventListener('mouseleave', () => cursorContainer.classList.remove('hovered'));
        });

        // Fungsi animasi
        function animateDots() {
            let prevX = mouse.x;
            let prevY = mouse.y;

            dots.forEach((dot, index) => {
                const currentX = dot.x;
                const currentY = dot.y;
                
                // Dot utama mengikuti mouse, dot lain mengikuti dot sebelumnya
                if (index === 0) {
                    dot.x += (mouse.x - currentX) * 0.9;
                    dot.y += (mouse.y - currentY) * 0.9;
                } else {
                    dot.x += (prevX - currentX) * 0.9;
                    dot.y += (prevY - currentY) * 0.9;
                }

                dot.el.style.transform = `translate(${dot.x}px, ${dot.y}px)`;

                prevX = currentX;
                prevY = currentY;
            });

            requestAnimationFrame(animateDots);
        }

        animateDots();
    }

    // --- Fungsi 2: Animasi Muncul saat Scroll (Tidak Diubah) ---
    const sections = document.querySelectorAll('.fade-in-section');
    if (sections.length > 0) {
        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        sections.forEach(section => sectionObserver.observe(section));
    }

    // --- Fungsi 3: Menu Hamburger untuk Mobile (Tidak Diubah) ---
    const hamburger = document.querySelector('.hamburger-menu');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }
});