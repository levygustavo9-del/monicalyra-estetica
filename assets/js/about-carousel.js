(() => {
    const slideshow = document.querySelector("[data-about-carousel]");

    if (!slideshow) {
        return;
    }

    if (slideshow.dataset.initialized === "true") {
        return;
    }

    const slides = Array.from(slideshow.querySelectorAll(".about-slide"));

    if (slides.length < 2) {
        console.error("Não foi possível encontrar as fotografias para o carrossel Sobre.");
        return;
    }

    slideshow.dataset.initialized = "true";
    let activeIndex = 0;

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
