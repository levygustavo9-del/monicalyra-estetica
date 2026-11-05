(() => {
    const carousel = document.querySelector(".treatments-carousel");
    const pageIndicator = document.querySelector(".treatments-carousel-page");
    const previousButton = document.querySelector(".treatments-carousel-prev");
    const nextButton = document.querySelector(".treatments-carousel-next");

    if (!carousel || !pageIndicator || !previousButton || !nextButton) {
        console.error("Não foi possível inicializar o carrossel de procedimentos.");
        return;
    }

    const wrapper = carousel.querySelector(".swiper-wrapper");
    const existingSlides = wrapper
        ? Array.from(wrapper.children).filter((child) => child.classList.contains("swiper-slide"))
        : [];
    const treatmentCards = existingSlides.flatMap((slide) =>
        Array.from(slide.querySelectorAll(".treatments-grid > .treatment-card"))
    );

    if (!wrapper || !treatmentCards.length) {
        console.error("Não foi possível encontrar os cards de procedimentos para o carrossel.");
        return;
    }

    wrapper.replaceChildren();

    treatmentCards.forEach((card, index) => {
        const pageIndex = Math.floor(index / 5);
        let slide = wrapper.children[pageIndex];
        let grid = slide?.querySelector(".treatments-grid");

        if (!slide) {
            slide = document.createElement("div");
            slide.className = "swiper-slide";
            grid = document.createElement("div");
            grid.className = "treatments-grid";
            slide.append(grid);
            wrapper.append(slide);
        }

        grid.append(card);
    });

    if (typeof Swiper === "undefined") {
        console.error("A biblioteca Swiper não foi carregada.");
        return;
    }

    new Swiper(carousel, {
        slidesPerView: 1,
        autoHeight: true,
        speed: 700,
        watchOverflow: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        navigation: {
            prevEl: previousButton,
            nextEl: nextButton
        },
        a11y: {
            prevSlideMessage: "Procedimentos anteriores",
            nextSlideMessage: "Próximos procedimentos",
            slideLabelMessage: "Procedimentos {{index}} de {{slidesLength}}"
        },
        on: {
            init: updatePageIndicator,
            slideChange: updatePageIndicator
        }
    });

    function updatePageIndicator(swiper) {
        const currentPage = String(swiper.realIndex + 1).padStart(2, "0");
        const pageCount = String(swiper.slides.length).padStart(2, "0");
        pageIndicator.textContent = `${currentPage} / ${pageCount}`;
    }
})();
