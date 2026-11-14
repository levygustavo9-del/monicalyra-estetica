(() => {
    const slideshow = document.querySelector("[data-hours-carousel]");

    if (!slideshow || slideshow.dataset.initialized === "true") {
        return;
    }

    const slides = Array.from(slideshow.querySelectorAll(".hours-gallery-slide"));

    if (slides.length < 2) {
        console.error("Não foi possível encontrar as imagens da apresentação de horários.");
        return;
    }

    slideshow.dataset.initialized = "true";
    const initialIndex = slides.findIndex((slide) => slide.classList.contains("is-active"));
    let activeIndex = initialIndex >= 0 ? initialIndex : 0;

    const showSlide = (index) => {
        slides.forEach((slide, slideIndex) => {
            const isActive = slideIndex === index;
            slide.classList.toggle("is-active", isActive);
            slide.setAttribute("aria-hidden", String(!isActive));
        });
        activeIndex = index;
    };

    showSlide(activeIndex);

    let rotation;

    const startRotation = () => {
        if (rotation || document.hidden) {
            return;
        }

        rotation = window.setInterval(() => {
            showSlide((activeIndex + 1) % slides.length);
        }, 3500);
    };

    const stopRotation = () => {
        window.clearInterval(rotation);
        rotation = undefined;
    };

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            stopRotation();
            return;
        }

        startRotation();
    });

    startRotation();
})();
