(() => {
    const accordion = document.querySelector("[data-faq-accordion]");

    if (!accordion) {
        return;
    }

    const items = Array.from(accordion.querySelectorAll(".faq-item"));

    if (!items.length) {
        console.error("Não foi possível encontrar as perguntas do FAQ.");
        return;
    }

    const itemControls = items.map((item) => {
        const trigger = item.querySelector(".faq-trigger");
        const panelId = trigger?.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;

        if (!trigger || !panel || !accordion.contains(panel)) {
            console.error("Não foi possível associar uma pergunta do FAQ à sua resposta.");
            return null;
        }

        return { item, trigger, panel };
    });

    if (itemControls.some((controls) => controls === null)) {
        return;
    }

    itemControls.forEach(({ item, trigger, panel }) => {
        trigger.addEventListener("click", () => {
            const shouldExpand = trigger.getAttribute("aria-expanded") !== "true";

            itemControls.forEach((controls) => {
                const isExpanded = controls.item === item && shouldExpand;
                controls.trigger.setAttribute("aria-expanded", String(isExpanded));
                controls.panel.setAttribute("aria-hidden", String(!isExpanded));
                controls.panel.inert = !isExpanded;
                controls.item.classList.toggle("is-open", isExpanded);
            });
        });
    });
})();
