(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#primary-navigation");

    if (!menuToggle || !navigation) {
        return;
    }

    function setMenuOpen(isOpen) {
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        navigation.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("menu-open", isOpen);
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
        if (window.innerWidth > 760 && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
        }
    });
})();
