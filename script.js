document.addEventListener("DOMContentLoaded", function () {

    // --- HAMBURGER MENÜ ---
    const hamburger = document.querySelector(".hamburger");
    const navLinks = document.querySelector(".nav-links");
    const navItems = document.querySelectorAll(".nav-links li a");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            hamburger.classList.toggle("active");
        });
    }

    navItems.forEach(item => {
        item.addEventListener("click", () => {
            if (navLinks.classList.contains("active")) {
                navLinks.classList.remove("active");
                hamburger.classList.remove("active");
            }
        });
    });

    // --- LIGHTBOX (GALERİ BÜYÜTME) ---
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("img-enlarged");
    const galleryImgs = document.querySelectorAll(".gallery-img");
    const closeBtn = document.querySelector(".close-lightbox");

    galleryImgs.forEach(img => {
        img.addEventListener("click", () => {
            lightbox.style.display = "block";
            lightboxImg.src = img.src;
            document.body.style.overflow = "hidden"; // Sayfa kaymasını durdur
        });
    });

    closeBtn.addEventListener("click", () => {
        lightbox.style.display = "none";
        document.body.style.overflow = "auto"; // Sayfa kaymasını aç
    });

    // Boşluğa tıklayınca kapatma
    lightbox.addEventListener("click", (e) => {
        if (e.target === lightbox) {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        }
    });

    // --- NAVBAR SCROLL ---
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = "0 4px 10px rgba(0,0,0,0.1)";
        } else {
            navbar.style.boxShadow = "none";
        }
    });

    // --- EVENTS SLIDER ---
    const sliderContainer = document.querySelector('.slider-container');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (sliderContainer && prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({ left: -320, behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            sliderContainer.scrollBy({ left: 320, behavior: 'smooth' });
        });
    }
});