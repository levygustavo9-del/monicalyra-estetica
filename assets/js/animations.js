(() => {
    const elements = document.querySelectorAll(".reveal");

    if (!elements.length) {
        return;
    }

    if (!("IntersectionObserver" in window)) {
        elements.forEach((element) => element.classList.add("is-visible"));
        return;
    }

    document.documentElement.classList.add("motion-ready");

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    elements.forEach((element) => revealObserver.observe(element));
})();

(() => {
    const hero = document.querySelector(".hero");

    if (!hero) {
        return;
    }

    const smallScreen = window.matchMedia("(max-width: 760px)");
    let animationFrame = 0;
    let currentPhase = 0;
    let lastFrameTime = 0;

    function updateParallax(timestamp = performance.now()) {
        animationFrame = 0;

        const bounds = hero.getBoundingClientRect();
        const range = (window.innerHeight + bounds.height) / 2;
        const targetPhase = Math.max(-1, Math.min(1,
            (window.innerHeight / 2 - (bounds.top + bounds.height / 2)) / range
        ));
        const elapsed = lastFrameTime
            ? Math.min((timestamp - lastFrameTime) / 1000, 0.05)
            : 1 / 60;
        const easing = 1 - Math.exp(-elapsed / 0.22);
        lastFrameTime = timestamp;
        currentPhase += (targetPhase - currentPhase) * easing;

        const scale = smallScreen.matches ? 0.7 : 1;
        const setOffset = (name, distance) => {
            hero.style.setProperty(name, `${(currentPhase * distance * scale).toFixed(2)}px`);
        };

        setOffset("--hero-photo-parallax", 36);
        setOffset("--hero-eyebrow-parallax", -62);
        setOffset("--hero-title-parallax", -100);
        setOffset("--hero-copy-parallax", -115);
        setOffset("--hero-button-parallax", -130);
        setOffset("--hero-note-parallax", 70);

        if (Math.abs(targetPhase - currentPhase) > 0.001) {
            animationFrame = window.requestAnimationFrame(updateParallax);
        }
    }

    function scheduleParallaxUpdate() {
        if (!animationFrame) {
            animationFrame = window.requestAnimationFrame(updateParallax);
        }
    }

    window.addEventListener("scroll", scheduleParallaxUpdate, { passive: true });
    window.addEventListener("resize", scheduleParallaxUpdate);
    updateParallax();
})();
