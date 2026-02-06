document.addEventListener("DOMContentLoaded", function () {

    // --- VERİ ÇEKME VE DİNAMİK RENDER ---
    const BASE_PATH = ""; // GitHub Pages project site için: "/repo-adi" gibi base path ekleyin

    async function fetchData(url) {
        try {
            const res = await fetch(BASE_PATH + url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return await res.json();
        } catch (err) {
            console.error("Veri yüklenemedi:", url, err);
            return null;
        }
    }

    async function loadAndRender() {
        const [upcomingData, pastData, galleryData, sponsorsData] = await Promise.all([
            fetchData("data/upcoming-events.json"),
            fetchData("data/past-events.json"),
            fetchData("data/gallery.json"),
            fetchData("data/sponsors.json"),
        ]);

        if (upcomingData && upcomingData.events) {
            renderUpcomingEvents(upcomingData.events);
        }
        if (pastData && pastData.events) {
            renderPastEvents(pastData.events);
        }

        if (galleryData && galleryData.gallery) {
            renderGallery(galleryData.gallery);
        }

        if (sponsorsData && sponsorsData.sponsors) {
            renderSponsors(sponsorsData.sponsors);
        }
    }

    function getImagePath(img) {
        if (!img) return "";
        if (img.startsWith("/") || img.startsWith("http")) return img;
        return BASE_PATH + "/" + img;
    }

    function renderUpcomingEvents(events) {
        const container = document.getElementById("upcoming-events-container");
        if (!container) return;
        container.innerHTML = events.map(e => `
            <div class="event-card">
                <img src="${getImagePath(e.image)}" alt="${e.title}">
                <div class="event-card-content">
                    <h3>${e.title}</h3>
                    <p>Tarih: ${e.date}</p>
                    <p>${e.description}</p>
                </div>
            </div>
        `).join("");
    }

    function renderPastEvents(events) {
        const container = document.getElementById("past-events-container");
        if (!container) return;
        container.innerHTML = events.map(e => `
            <div class="event-card">
                <img src="${getImagePath(e.image)}" alt="${e.title}">
                <div class="event-card-content">
                    <h3>${e.title}</h3>
                    <p>Tarih: ${e.date}</p><br>
                    <p>${e.description}</p>
                </div>
            </div>
        `).join("");
        initLightboxForDynamicContent();
    }

    function renderGallery(items) {
        const container = document.getElementById("gallery-container");
        if (!container) return;
        container.innerHTML = items.map(item => `
            <img src="${getImagePath(item.image)}" alt="${item.alt || item.title || ''}" class="gallery-img" data-caption="${item.title || item.alt || ''}">
        `).join("");
        initLightboxForDynamicContent();
    }

    function renderSponsors(items) {
        const container = document.getElementById("sponsors-container");
        if (!container) return;
        if (!items.length) {
            container.innerHTML = '<p class="sponsor-placeholder">Henüz sponsor eklenmemiş.</p>';
            return;
        }
        container.innerHTML = items.map(s => {
            const link = s.website ? `<a href="${s.website}" target="_blank" rel="noopener">` : "";
            const linkEnd = s.website ? "</a>" : "";
            return `
            <div class="sponsor-item">${link}<img src="${getImagePath(s.logo)}" alt="${s.name}">${linkEnd}</div>
            `;
        }).join("");
    }

    function initLightboxForDynamicContent() {
        const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("img-enlarged");
        const captionEl = document.getElementById("caption");
        const closeBtn = document.querySelector(".close-lightbox");
        const galleryImgs = document.querySelectorAll(".gallery-img");

        galleryImgs.forEach(img => {
            img.onclick = null;
            img.addEventListener("click", () => {
                lightbox.style.display = "block";
                lightboxImg.src = img.src;
                captionEl.textContent = img.dataset.caption || "";
                document.body.style.overflow = "hidden";
            });
        });

        if (closeBtn) {
            closeBtn.onclick = () => {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            };
        }

        if (lightbox) {
            lightbox.onclick = (e) => {
                if (e.target === lightbox) {
                    lightbox.style.display = "none";
                    document.body.style.overflow = "auto";
                }
            };
        }
    }

    loadAndRender();

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

    // --- LIGHTBOX (ilk yükleme için, dinamik içerik loadAndRender sonrası initLightboxForDynamicContent ile) ---
    const lightbox = document.getElementById("lightbox");
    const closeBtn = document.querySelector(".close-lightbox");
    if (lightbox && closeBtn) {
        closeBtn.addEventListener("click", () => {
            lightbox.style.display = "none";
            document.body.style.overflow = "auto";
        });
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = "none";
                document.body.style.overflow = "auto";
            }
        });
    }

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
