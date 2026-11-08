(() => {
    const accordion = document.querySelector("[data-about-accordion]");

    if (!accordion) {
        return;
    }

    const items = Array.from(accordion.querySelectorAll(".about-point"));

    if (!items.length) {
        console.error("Não foi possível encontrar os tópicos do accordion Sobre.");
        return;
    }

    const setExpanded = (item, isExpanded) => {
        const trigger = item.querySelector(".about-accordion-trigger");
        const panelId = trigger?.getAttribute("aria-controls");
        const panel = panelId ? document.getElementById(panelId) : null;

        if (!trigger || !panel) {
            console.error("Não foi possível associar um tópico do accordion ao seu conteúdo.");
            return;
        }

        trigger.setAttribute("aria-expanded", String(isExpanded));
        panel.setAttribute("aria-hidden", String(!isExpanded));
        panel.inert = !isExpanded;
        item.classList.toggle("is-open", isExpanded);
    };

    items.forEach((item) => {
        const trigger = item.querySelector(".about-accordion-trigger");

        if (!trigger) {
            console.error("Foi encontrado um tópico do accordion sem botão de expansão.");
            return;
        }

        trigger.addEventListener("click", () => {
            const shouldExpand = trigger.getAttribute("aria-expanded") !== "true";
            items.forEach((otherItem) => setExpanded(otherItem, otherItem === item && shouldExpand));
        });
    });
})();
