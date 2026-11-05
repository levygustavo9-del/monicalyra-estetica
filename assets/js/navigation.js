(() => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navigation = document.querySelector("#primary-navigation");
    const treatmentsDropdown = navigation?.querySelector(".nav-dropdown");
    const treatmentsToggle = treatmentsDropdown?.querySelector(".nav-dropdown-toggle");

    if (!menuToggle || !navigation) {
        return;
    }

    function setTreatmentsOpen(isOpen) {
        if (!treatmentsDropdown || !treatmentsToggle) {
            return;
        }

        treatmentsDropdown.classList.toggle("is-open", isOpen);
        treatmentsToggle.setAttribute("aria-expanded", String(isOpen));
    }

    function setMenuOpen(isOpen) {
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
        navigation.classList.toggle("is-open", isOpen);
        document.body.classList.toggle("menu-open", isOpen);

        if (!isOpen) {
            setTreatmentsOpen(false);
        }
    }

    treatmentsToggle?.addEventListener("click", () => {
        const isOpen = treatmentsToggle.getAttribute("aria-expanded") !== "true";
        setTreatmentsOpen(isOpen);
    });

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
        } else if (event.key === "Escape" && treatmentsToggle?.getAttribute("aria-expanded") === "true") {
            setTreatmentsOpen(false);
            treatmentsToggle.focus();
        }
    });

    document.addEventListener("click", (event) => {
        if (
            menuToggle.getAttribute("aria-expanded") === "true" &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            setMenuOpen(false);
        } else if (treatmentsDropdown && !treatmentsDropdown.contains(event.target)) {
            setTreatmentsOpen(false);
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 760 && menuToggle.getAttribute("aria-expanded") === "true") {
            setMenuOpen(false);
        }
    });
})();
