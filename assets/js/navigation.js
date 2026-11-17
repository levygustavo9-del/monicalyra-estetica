(() => {
    const header = document.querySelector(".site-header");
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#primary-navigation");

    if (!header || !menuToggle || !navigation) {
        return;
    }

    function updateHeaderHideOffset() {
        header.style.setProperty("--header-hide-offset", `-${header.offsetHeight}px`);
    }

    updateHeaderHideOffset();

    function setMenuOpen(isOpen) {
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        navigation.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
        if (isOpen) {
            header.classList.remove("is-hidden");
        }
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") !== "true";
        setMenuOpen(isOpen);

        if (isOpen) {
            navigation.querySelector("a")?.focus();
        }
    });

    navigation.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => setMenuOpen(false));
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (
            menuToggle.getAttribute("aria-expanded") === "true" &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        updateHeaderHideOffset();
        if (window.innerWidth > 760 && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
        }
    });
    window.addEventListener("load", updateHeaderHideOffset, { once: true });

    let lastScrollY = Math.max(0, window.scrollY);
    let downwardTravel = 0;
    let upwardTravel = 0;
    let scrollFrame = null;

    function updateHeaderVisibility() {
        const currentScrollY = Math.max(0, window.scrollY);
        const delta = currentScrollY - lastScrollY;
        const menuIsOpen = menuToggle.getAttribute("aria-expanded") === "true";

        if (currentScrollY <= 24 || menuIsOpen) {
            header.classList.remove("is-hidden");
            downwardTravel = 0;
            upwardTravel = 0;
        } else if (delta > 0) {
            downwardTravel += delta;
            upwardTravel = 0;
            if (downwardTravel >= 12 && currentScrollY > header.offsetHeight) {
                header.classList.add("is-hidden");
            }
        } else if (delta < 0) {
            upwardTravel += -delta;
            downwardTravel = 0;
            if (upwardTravel >= 8) {
                header.classList.remove("is-hidden");
            }
        }

        lastScrollY = currentScrollY;
        scrollFrame = null;
    }

    window.addEventListener("scroll", () => {
        if (scrollFrame === null) {
            scrollFrame = window.requestAnimationFrame(updateHeaderVisibility);
        }
    }, { passive: true });
})();
