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
