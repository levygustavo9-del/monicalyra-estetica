(() => {
    const carousel = document.querySelector("[data-experience-carousel]");

    if (!carousel) {
        return;
    }

    // Replace these clearly marked templates with client content only after authorization.
    const experiences = [
        {
            id: "modelo-01",
            demo: true,
            procedure: "[Nome do procedimento]",
            detail: "[Descrição confirmada do procedimento ou resultado]",
            clientName: "[Identificação autorizada da cliente]",
            testimonial: "[Inserir depoimento real autorizado]"
        },
        {
            id: "modelo-02",
            demo: true,
            procedure: "[Nome do procedimento]",
            detail: "[Informação complementar confirmada]",
            clientName: "[Identificação autorizada da cliente]",
            testimonial: "[Inserir depoimento real autorizado]"
        },
        {
            id: "modelo-03",
            demo: true,
            procedure: "[Nome do procedimento]",
            detail: "[Descrição confirmada do procedimento ou resultado]",
            clientName: "[Identificação autorizada da cliente]",
            testimonial: "[Inserir depoimento real autorizado]"
        }
    ];
    const track = carousel.querySelector("[data-experience-track]");
    const emptyState = carousel.querySelector("[data-experience-empty]");
    const controls = carousel.querySelector("[data-experience-controls]");
    const previousButton = carousel.querySelector(".experience-prev");
    const nextButton = carousel.querySelector(".experience-next");
    const pagination = carousel.querySelector("[data-experience-pagination]");
    const pageIndicator = carousel.querySelector("[data-experience-page]");
    const sectionNote = carousel.closest(".testimonials")?.querySelector("[data-experience-note]");

    if (!track || !emptyState || !controls || !previousButton || !nextButton || !pagination || !pageIndicator) {
        console.error("Não foi possível inicializar a seção de experiências.");
        return;
    }

    const validExperiences = experiences.filter((experience) => {
        if (experience.demo === true) {
            return true;
        }

        if (experience.authorized !== true) {
            console.warn(`Experiência "${experience.id || "sem identificação"}" ignorada: autorização não confirmada.`);
            return false;
        }

        const requiredFields = ["beforeImage", "afterImage", "procedure", "beforeAlt", "afterAlt"];
        const missingFields = requiredFields.filter((field) =>
            typeof experience[field] !== "string" || experience[field].trim() === ""
        );
        const localImages = ["beforeImage", "afterImage"].every((field) =>
            experience[field]?.startsWith("imagens/")
        );
        const localProfileImage = !experience.profileImage || experience.profileImage.startsWith("imagens/");

        if (missingFields.length || !localImages || !localProfileImage) {
            console.error(
                `Experiência "${experience.id || "sem identificação"}" ignorada: informe os campos obrigatórios e use fotos locais em imagens/.`,
                missingFields
            );
            return false;
        }

        return true;
    });

    const createImage = (source, alt, isFirstCard) => {
        const image = document.createElement("img");
        image.src = source;
        image.alt = alt;
        image.loading = isFirstCard ? "eager" : "lazy";
        image.decoding = "async";
        image.addEventListener("error", () => {
            console.error(`Não foi possível carregar a imagem de experiência: ${source}`);
            image.hidden = true;
        });
        return image;
    };

    const createPhoto = (experience, label, imageSource, imageAlt, index) => {
        const figure = document.createElement("figure");
        figure.className = "result-photo";

        if (experience.demo) {
            const placeholder = document.createElement("div");
            placeholder.className = "result-photo-placeholder";
            placeholder.setAttribute("role", "img");
            placeholder.setAttribute("aria-label", `${label}: inserir foto autorizada`);

            const caption = document.createElement("span");
            caption.textContent = "Inserir foto autorizada";
            placeholder.append(caption);
            figure.append(placeholder);
        } else {
            const image = createImage(imageSource, imageAlt, index === 0);
            image.className = "result-photo-image";
            figure.append(image);
        }

        const labelElement = document.createElement("figcaption");
        labelElement.className = "result-photo-label";
        labelElement.textContent = label;
        figure.append(labelElement);
        return figure;
    };

    const createCard = (experience, index) => {
        const card = document.createElement("article");
        card.className = "result-slide";
        card.setAttribute("aria-label", `Experiência: ${experience.procedure}`);

        const gallery = document.createElement("div");
        gallery.className = "result-gallery";
        gallery.setAttribute("role", "group");
        gallery.setAttribute("aria-label", `Fotos de antes e depois: ${experience.procedure}`);
        gallery.append(
            createPhoto(experience, "ANTES", experience.beforeImage, experience.beforeAlt, index),
            createPhoto(experience, "DEPOIS", experience.afterImage, experience.afterAlt, index)
        );
        card.append(gallery);

        const details = document.createElement("div");
        details.className = "result-details";

        if (experience.demo) {
            const notice = document.createElement("span");
            notice.className = "result-demo-notice";
            notice.textContent = `Modelo demonstrativo ${String(index + 1).padStart(2, "0")} · substituir`;
            details.append(notice);
        }

        const procedure = document.createElement("div");
        procedure.className = "result-procedure";
        const procedureLabel = document.createElement("span");
        procedureLabel.className = "result-kicker";
        procedureLabel.textContent = "Procedimento";
        const procedureName = document.createElement("h3");
        procedureName.textContent = experience.procedure;
        procedure.append(procedureLabel, procedureName);

        if (experience.detail) {
            const detail = document.createElement("p");
            detail.className = "result-procedure-detail";
            detail.textContent = experience.detail;
            procedure.append(detail);
        }

        details.append(procedure);

        const client = document.createElement("div");
        client.className = "result-client";
        if (!experience.demo && experience.profileImage) {
            const profile = createImage(experience.profileImage, "", index === 0);
            profile.className = "result-client-photo";
            profile.alt = "";
            client.append(profile);
        } else {
            const avatar = document.createElement("span");
            avatar.className = "result-client-avatar";
            avatar.setAttribute("aria-hidden", "true");
            avatar.textContent = experience.demo ? "＋" : "•";
            client.append(avatar);
        }

        const identity = document.createElement("div");
        identity.className = "result-client-identity";
        const name = document.createElement("strong");
        name.textContent = experience.clientName || "Cliente com identificação preservada";
        identity.append(name);
        if (experience.age) {
            const age = document.createElement("span");
            age.textContent = experience.age;
            identity.append(age);
        }
        client.append(identity);
        details.append(client);

        if (Number.isInteger(experience.rating) && experience.rating >= 1 && experience.rating <= 5) {
            const rating = document.createElement("div");
            rating.className = "result-rating";
            rating.setAttribute("role", "img");
            rating.setAttribute("aria-label", `Avaliação real: ${experience.rating} de 5 estrelas`);
            rating.textContent = `${"★".repeat(experience.rating)}${"☆".repeat(5 - experience.rating)}`;
            details.append(rating);
        }

        if (experience.testimonial) {
            const testimonial = document.createElement("blockquote");
            testimonial.className = "result-testimonial";
            testimonial.textContent = `“${experience.testimonial}”`;
            details.append(testimonial);
        }

        card.append(details);
        return card;
    };

    if (!validExperiences.length) {
        track.hidden = true;
        controls.hidden = true;
        emptyState.hidden = false;
        return;
    }

    const wrapper = track.querySelector(".swiper-wrapper");
    if (!wrapper) {
        console.error("Não foi possível inicializar a lista de experiências.");
        return;
    }

    emptyState.hidden = true;
    track.hidden = false;
    controls.hidden = validExperiences.length < 2;
    if (sectionNote) {
        sectionNote.textContent = validExperiences.some((experience) => experience.demo)
            ? "Os cartões identificados como modelos são apenas demonstrativos e não representam clientes, procedimentos ou resultados reais. Substitua-os por conteúdo autorizado antes de publicar."
            : "Resultados são individuais e variam de cliente para cliente. Fotografias comparativas devem manter o enquadramento e não ser alteradas digitalmente.";
    }
    wrapper.replaceChildren(...validExperiences.map((experience, index) => {
        const slide = createCard(experience, index);
        slide.classList.add("swiper-slide");
        return slide;
    }));

    if (typeof Swiper === "undefined") {
        console.error("A biblioteca Swiper não foi carregada.");
        return;
    }

    const swiper = new Swiper(track, {
        slidesPerView: 1.04,
        spaceBetween: 14,
        speed: 700,
        freeMode: false,
        watchOverflow: true,
        keyboard: {
            enabled: true,
            onlyInViewport: true
        },
        navigation: {
            prevEl: previousButton,
            nextEl: nextButton
        },
        breakpoints: {
            640: {
                slidesPerView: 1.06,
                spaceBetween: 18
            },
            1024: {
                slidesPerView: 1.08,
                spaceBetween: 22
            }
        },
        a11y: {
            prevSlideMessage: "Experiências anteriores",
            nextSlideMessage: "Próximas experiências",
            slideLabelMessage: "Experiência {{index}} de {{slidesLength}}"
        },
        on: {
            init: updateControls,
            slideChange: updateControls,
            resize: updateControls
        }
    });

    pagination.replaceChildren(...validExperiences.map((experience, index) => {
        const dot = document.createElement("button");
        dot.className = "experience-dot";
        dot.type = "button";
        dot.setAttribute("aria-label", `Ver cartão ${index + 1}: ${experience.procedure}`);
        dot.setAttribute("aria-current", String(index === 0));
        dot.addEventListener("click", () => swiper.slideTo(index));
        return dot;
    }));

    updateControls(swiper);

    function updateControls(instance) {
        if (!instance) {
            return;
        }

        previousButton.disabled = instance.isBeginning;
        nextButton.disabled = instance.isEnd;
        pageIndicator.textContent = `${instance.realIndex + 1} / ${instance.slides.length}`;
        pagination.querySelectorAll("button").forEach((dot, index) => {
            dot.setAttribute("aria-current", String(index === instance.realIndex));
        });
    }
})();
