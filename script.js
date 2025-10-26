document.addEventListener('DOMContentLoaded', () => {

    // --- LOGIKA UNTUK HALAMAN SAMPUL (INDEX.HTML) ---
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function(e) {
            // Mencegah link langsung pindah halaman
            e.preventDefault(); 
            const destination = this.getAttribute('href');
            const bookCover = document.querySelector('.book-cover');

            // Tambahkan kelas untuk memicu animasi zoom-out
            bookCover.classList.add('zooming-out');

            // Pindah halaman SETELAH animasi selesai
            setTimeout(() => {
                window.location.href = destination;
            }, 1000); // Durasi harus cocok dengan durasi animasi di CSS (1s)
        });
    }

    // --- LOGIKA UNTUK HALAMAN DALAM (INNER PAGES) ---
    const navLinks = document.querySelectorAll('.book-container a');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            // Hanya tambahkan event listener jika link bukan untuk membuka di tab baru
            if (link.target !== '_blank' && link.href && link.href.includes('.html')) {
                link.addEventListener('click', function(e) {
                    e.preventDefault(); 
                    const href = this.getAttribute('href');
                    const pageContent = document.querySelector('.page-content') || document.body;

                    // Tambahkan efek fade-out sebelum pindah halaman
                    pageContent.classList.add('fading-out');
                    
                    // Pindah ke halaman baru setelah animasi selesai
                    setTimeout(() => {
                        window.location.href = href;
                    }, 500); // Durasi harus cocok dengan durasi animasi fade-out
                });
            }
        });
    }
});