(() => {
    const journeyList = document.querySelector("[data-journey-list]");

    if (!journeyList) {
        console.error("Não foi possível inicializar a jornada de atendimento.");
        return;
    }

    const journeySteps = [
        {
            number: "01",
            title: "O primeiro contato",
            description: "Você conhece a marca e entra em contato pelo Instagram, WhatsApp, site, por indicação ou presencialmente."
        },
        {
            number: "02",
            title: "Atendimento personalizado",
            description: "Entendemos suas expectativas, necessidades e objetivos, esclarecendo as primeiras dúvidas."
        },
        {
            number: "03",
            title: "Agendamento e preparação",
            description: "Organizamos as próximas etapas do atendimento e as orientações necessárias."
        },
        {
            number: "04",
            title: "Dia do procedimento",
            description: "Você é recebida para a realização do procedimento, com atenção, cuidado e profissionalismo."
        },
        {
            number: "05",
            title: "Acompanhamento",
            description: "Após o procedimento, são fornecidas orientações e acompanhamento conforme as necessidades do atendimento."
        }
    ];

    const steps = journeySteps.map((step, index) => {
        const item = document.createElement("li");
        item.className = "journey-step";
        item.dataset.journeyStep = String(index);

        const marker = document.createElement("span");
        marker.className = "journey-marker";
        marker.textContent = step.number;
        marker.setAttribute("aria-hidden", "true");

        const copy = document.createElement("div");
        copy.className = "journey-step-copy";

        const title = document.createElement("h3");
        title.className = "journey-step-title";
        title.textContent = step.title;

        const description = document.createElement("p");
        description.className = "journey-step-description";
        description.textContent = step.description;

        copy.append(title, description);
        item.append(marker, copy);
        journeyList.append(item);

        return item;
    });

    const markers = steps.map((step) => step.querySelector(".journey-marker"));
    const stepCopies = steps.map((step) => step.querySelector(".journey-step-copy"));
    const journeyArtwork = journeyList.closest(".journey")?.querySelector(".journey-artwork");
    let activeIndex = -1;
    let currentProgress = 0;
    let animationFrame = 0;
    let lastFrameTime = 0;

    function setActiveStep(nextIndex) {
        if (nextIndex === activeIndex) {
            return;
        }

        activeIndex = nextIndex;
        steps.forEach((item, index) => {
            const isActive = index === activeIndex;
            item.classList.toggle("is-active", isActive);

            if (isActive) {
                item.setAttribute("aria-current", "step");
            } else {
                item.removeAttribute("aria-current");
            }
        });
    }

    function updateProgress(timestamp = performance.now()) {
        animationFrame = 0;

        const listBounds = journeyList.getBoundingClientRect();
        const firstMarker = markers[0].getBoundingClientRect();
        const lastMarker = markers[markers.length - 1].getBoundingClientRect();
        const firstCenter = firstMarker.top + firstMarker.height / 2;
        const lastCenter = lastMarker.top + lastMarker.height / 2;
        const lineLength = lastCenter - firstCenter;
        const lineStart = firstCenter - listBounds.top;
        const lineEnd = listBounds.bottom - lastCenter;

        journeyList.style.setProperty("--journey-line-start", `${lineStart}px`);
        journeyList.style.setProperty("--journey-line-end", `${lineEnd}px`);

        const readingPoint = window.innerHeight * 0.54;
        const targetProgress = lineLength > 0
            ? Math.min(1, Math.max(0, (readingPoint - firstCenter) / lineLength))
            : 0;
        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const remainingProgress = targetProgress - currentProgress;
        const elapsedTime = lastFrameTime
            ? Math.min((timestamp - lastFrameTime) / 1000, 0.05)
            : 1 / 60;
        lastFrameTime = timestamp;

        currentProgress = prefersReducedMotion || Math.abs(remainingProgress) < 0.001
            ? targetProgress
            : currentProgress + remainingProgress * (1 - Math.exp(-elapsedTime / 0.22));

        journeyList.style.setProperty("--journey-progress", String(currentProgress));
        const progressPosition = currentProgress * (steps.length - 1);
        const parallaxRange = Math.max(72, Math.min(172, window.innerWidth * 0.14));
        stepCopies.forEach((copy, index) => {
            const distance = Math.abs(progressPosition - index);
            const proximity = Math.max(0, 1 - distance);
            const focus = proximity * proximity * (3 - 2 * proximity);

            copy.style.setProperty("--journey-step-focus-percent", `${(focus * 100).toFixed(1)}%`);
            copy.style.setProperty("--journey-step-opacity", (0.14 + focus * 0.86).toFixed(3));
            copy.style.setProperty("--journey-step-offset", `${((1 - focus) * 30).toFixed(2)}px`);
        });
        if (journeyArtwork) {
            journeyArtwork.style.setProperty("--journey-parallax-rings", `${(currentProgress * parallaxRange * 0.45).toFixed(2)}px`);
            journeyArtwork.style.setProperty("--journey-parallax-arcs", `${(currentProgress * parallaxRange * -0.75).toFixed(2)}px`);
            journeyArtwork.style.setProperty("--journey-parallax-details", `${(currentProgress * parallaxRange).toFixed(2)}px`);
        }
        setActiveStep(Math.min(steps.length - 1, Math.round(currentProgress * (steps.length - 1))));

        if (!prefersReducedMotion && Math.abs(targetProgress - currentProgress) >= 0.001) {
            animationFrame = window.requestAnimationFrame(updateProgress);
        }
    }

    function scheduleProgressUpdate() {
        if (!animationFrame) {
            animationFrame = window.requestAnimationFrame(updateProgress);
        }
    }

    window.addEventListener("scroll", scheduleProgressUpdate, { passive: true });
    window.addEventListener("resize", scheduleProgressUpdate);
    updateProgress();
})();
