(() => {
    const mosaic = document.querySelector("[data-space-mosaic]");

    if (!mosaic) {
        return;
    }

    const tiles = Array.from(mosaic.querySelectorAll("[data-space-tile]"));

    if (!tiles.length) {
        console.error("O mosaico do espaço não possui células para animar.");
        return;
    }

    let active = true;
    let nextTile = 0;
    let intervalId = 0;

    function stopSequence() {
        window.clearInterval(intervalId);
        intervalId = 0;
    }

    function syncSequence() {
        if (!active) {
            stopSequence();
            return;
        }

        if (intervalId) {
            return;
        }

        intervalId = window.setInterval(() => {
            tiles[nextTile].classList.toggle("is-word");
            nextTile = (nextTile + 1) % tiles.length;
        }, 1800);
    }

    function updateVisibility() {
        const bounds = mosaic.getBoundingClientRect();
        active = bounds.bottom > 0 && bounds.top < window.innerHeight;
        syncSequence();
    }

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            if (!document.hidden) {
                active = entries.some((entry) => entry.isIntersecting);
            }

            syncSequence();
        }, { threshold: 0.08 });

        observer.observe(mosaic);
    }

    document.addEventListener("visibilitychange", () => {
        if (!document.hidden) {
            updateVisibility();
        }
    });

    syncSequence();
})();
