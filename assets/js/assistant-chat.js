(() => {
    const catalog = window.monicaTreatmentCatalog;
    const treatments = Array.isArray(catalog) ? catalog : [];
    const treatmentsById = new Map(treatments.map((treatment) => [treatment.id, treatment]));
    const whatsappPhone = document.body.dataset.whatsappPhone || "";
    const hasWhatsapp = /^\d{8,15}$/.test(whatsappPhone);

    if (!Array.isArray(catalog)) {
        console.error("O catálogo de tratamentos não foi carregado para a assistente virtual.");
    }

    const treatmentCategories = [
        {
            id: "facial",
            label: "Face e pele",
            treatmentIds: [
                "bioestimuladores", "hidragloss", "skinbooster", "preenchimento-facial",
                "peelings", "toxina-botulinica", "fios-pdo"
            ]
        },
        {
            id: "corporal",
            label: "Corpo",
            treatmentIds: [
                "enzimas-metabolicas", "emagrecimento-intradermoterapia",
                "harmonizacao-corporal", "tratamento-flacidez"
            ]
        },
        {
            id: "capilar",
            label: "Capilar",
            treatmentIds: ["tratamento-capilar"]
        },
        {
            id: "outros",
            label: "Outros cuidados",
            treatmentIds: ["prp", "nutraceuticos"]
        }
    ];

    const beautyServices = [
        {
            id: "maquiagem",
            label: "Maquiagem",
            description: "Maquiagem é uma das áreas de atuação Beauté de Mônica. Para conversar sobre proposta, disponibilidade e valores, fale diretamente com ela."
        },
        {
            id: "cabelo-penteado",
            label: "Cabelos e penteados",
            description: "Cabelos e penteados fazem parte da atuação Beauté de Mônica. A conversa com ela ajuda a alinhar o serviço desejado, disponibilidade e valores."
        }
    ];

    const needMatches = [
        {
            pattern: /\bmanchas?\b|\bmelasma\b|\bpigmentacao\b/,
            ids: ["peelings"]
        },
        {
            pattern: /\bflacidez\b|\bfirmeza\b/,
            ids: ["tratamento-flacidez", "bioestimuladores", "fios-pdo"]
        },
        {
            pattern: /\bqueda\b|\bcouro cabeludo\b|\bcabelo ralo\b|\bcapilar\b/,
            ids: ["tratamento-capilar", "prp"]
        },
        {
            pattern: /\bpele\b|\bhidratacao\b|\btextura\b|\bporos\b/,
            ids: ["skinbooster", "peelings", "bioestimuladores"]
        },
        {
            pattern: /\blabios?\b|\blabial\b/,
            ids: ["hidragloss", "preenchimento-facial"]
        },
        {
            pattern: /\brugas?\b|\blinhas de expressao\b|\bexpressao facial\b/,
            ids: ["toxina-botulinica", "preenchimento-facial"]
        },
        {
            pattern: /\bvolume\b|\bcontorno facial\b|\bharmonizacao facial\b/,
            ids: ["preenchimento-facial", "fios-pdo"]
        },
        {
            pattern: /\bemagrec\w*\b|\bgordura\b|\bcontorno corporal\b|\bmedidas\b/,
            ids: [
                "emagrecimento-intradermoterapia", "enzimas-metabolicas",
                "harmonizacao-corporal"
            ]
        }
    ];

    const createElement = (tagName, className, text) => {
        const element = document.createElement(tagName);
        if (className) {
            element.className = className;
        }
        if (text !== undefined) {
            element.textContent = text;
        }
        return element;
    };

    const normalize = (value) => value
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .replace(/[^\p{L}\p{N}\s-]/gu, " ")
        .replace(/\s+/g, " ")
        .trim();

    const inPagesDirectory = /\/pages\//i.test(window.location.pathname);
    const siteRoot = new URL(inPagesDirectory ? "../" : "./", document.baseURI);
    const imageUrl = (imagePath) => new URL(imagePath.replace(/^\.\//, ""), siteRoot).href;

    const launcher = createElement("button", "assistant-launcher");
    launcher.type = "button";
    launcher.setAttribute("aria-label", "Conversar com a assistente virtual Mônica Lyra");
    launcher.setAttribute("aria-expanded", "false");
    launcher.setAttribute("aria-controls", "assistant-chat-panel");
    launcher.innerHTML = '<svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29" fill="#eee7de" stroke="#bc8a62" stroke-width="1.2"/><path d="M13.2 53.8c2.4-9.5 9.4-14.4 18.8-14.4s16.4 4.9 18.8 14.4" fill="#ad6a3d"/><path d="M23.2 37.5v-6.1h17.6v6.1l-8.8 5.4z" fill="#d7b6a7"/><path d="M19.2 24.7c0-11.2 5.4-17.4 13-17.4s13 6.2 13 17.4v4.7c0 9.2-5.8 15.3-13 15.3s-13-6.1-13-15.3z" fill="#5f2d14"/><path d="M23.7 23.8c0-7.5 3.4-11.5 8.5-11.5s8.5 4 8.5 11.5v5.8c0 7.1-3.7 11.5-8.5 11.5s-8.5-4.4-8.5-11.5z" fill="#d7b6a7"/><path d="M22.4 21.3c1.2-7.7 4.6-11.1 9.8-11.1 5.3 0 8.5 3.3 9.5 9.5-3.5-.3-6.9-2.5-9.4-5.3-2.1 3.2-5.5 5.7-9.9 6.9z" fill="#5f2d14"/><path d="M28.5 29.5h.2m6.6 0h.2" stroke="#5f2d14" stroke-width="1.6" stroke-linecap="round"/><path d="M29 34.2c1.8 1.4 4.2 1.4 6 0" fill="none" stroke="#ad6a3d" stroke-width="1.2" stroke-linecap="round"/></svg>';

    const invite = createElement("aside", "assistant-invite");
    invite.id = "assistant-chat-invite";
    invite.setAttribute("aria-label", "Convite para conversar com a assistente virtual");
    const inviteCopy = createElement("span", "", "Olá! Posso te ajudar por aqui? ✨");
    const inviteDismiss = createElement("button", "assistant-invite-dismiss");
    inviteDismiss.type = "button";
    inviteDismiss.setAttribute("aria-label", "Dispensar convite do assistente");
    inviteDismiss.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m7 7 10 10M17 7 7 17"/></svg>';
    invite.append(inviteCopy, inviteDismiss);
    launcher.setAttribute("aria-describedby", invite.id);

    const panel = createElement("section", "assistant-chat-panel");
    panel.id = "assistant-chat-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-labelledby", "assistant-chat-title");
    panel.setAttribute("aria-hidden", "true");
    panel.inert = true;

    const header = createElement("header", "assistant-chat-header");
    const identity = createElement("div", "assistant-chat-identity");
    const identityMonogram = createElement("span", "assistant-chat-monogram", "ml");
    identityMonogram.setAttribute("aria-hidden", "true");
    const identityText = createElement("div", "assistant-chat-identity-text");
    const title = createElement("h2", "", "Mônica Lyra");
    title.id = "assistant-chat-title";
    const subtitle = createElement("span", "", "Assistente virtual");
    identityText.append(title, subtitle);
    identity.append(identityMonogram, identityText);

    const headerActions = createElement("div", "assistant-chat-header-actions");
    const resetButton = createElement("button", "assistant-chat-icon-button");
    resetButton.type = "button";
    resetButton.setAttribute("aria-label", "Reiniciar conversa");
    resetButton.title = "Reiniciar conversa";
    resetButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20 7v5h-5"/><path d="M19 12a7 7 0 1 1-2.05-4.95L20 12"/></svg>';

    const minimizeButton = createElement("button", "assistant-chat-icon-button");
    minimizeButton.type = "button";
    minimizeButton.setAttribute("aria-label", "Minimizar conversa");
    minimizeButton.title = "Minimizar";
    minimizeButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14"/></svg>';

    const closeButton = createElement("button", "assistant-chat-icon-button");
    closeButton.type = "button";
    closeButton.setAttribute("aria-label", "Fechar conversa");
    closeButton.title = "Fechar";
    closeButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>';
    headerActions.append(resetButton, minimizeButton, closeButton);
    header.append(identity, headerActions);

    const thread = createElement("div", "assistant-chat-thread");
    thread.setAttribute("role", "log");
    thread.setAttribute("aria-label", "Conversa com a assistente virtual");
    thread.setAttribute("aria-live", "polite");
    thread.setAttribute("aria-relevant", "additions");

    const form = createElement("form", "assistant-chat-form");
    form.setAttribute("aria-label", "Enviar uma mensagem");
    const input = createElement("input", "assistant-chat-input");
    input.type = "text";
    input.name = "message";
    input.maxLength = 500;
    input.autocomplete = "off";
    input.placeholder = "Escreva sua mensagem...";
    input.setAttribute("aria-label", "Escreva sua mensagem");
    const sendButton = createElement("button", "assistant-chat-send");
    sendButton.type = "submit";
    sendButton.setAttribute("aria-label", "Enviar mensagem");
    sendButton.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
    form.append(input, sendButton);
    const privacyNote = createElement("p", "assistant-chat-note",
        "Não envie dados pessoais ou informações de saúde.");

    panel.append(header, thread, form, privacyNote);
    document.body.append(launcher, invite, panel);

    let activeTreatmentId = "";
    let activeBeautyService = "";
    let currentNeed = "";
    let visitorName = "";
    let awaitingName = true;
    let preRegistration = {};
    let preRegistrationStep = "";
    let currentTurn = null;
    let turnSequence = 0;
    let turnTimer = 0;
    let typingIndicator = null;
    let isThinking = false;
    const inviteStorageKey = "monica-lyra-assistant-invite-dismissed";
    let inviteTimer = 0;

    const readInviteDismissal = () => {
        try {
            return window.sessionStorage.getItem(inviteStorageKey) === "true";
        } catch (error) {
            console.warn("Não foi possível lembrar a dispensa do convite nesta sessão.", error);
            return false;
        }
    };

    const hideInvite = () => {
        window.clearTimeout(inviteTimer);
        invite.classList.remove("is-visible");
        invite.classList.add("is-dismissed");
        invite.setAttribute("aria-hidden", "true");
        launcher.removeAttribute("aria-describedby");
        try {
            window.sessionStorage.setItem(inviteStorageKey, "true");
        } catch (error) {
            console.warn("Não foi possível lembrar a dispensa do convite nesta sessão.", error);
        }
    };

    if (readInviteDismissal()) {
        invite.classList.add("is-dismissed");
        invite.setAttribute("aria-hidden", "true");
        launcher.removeAttribute("aria-describedby");
    } else {
        invite.setAttribute("aria-hidden", "false");
        inviteTimer = window.setTimeout(() => invite.classList.add("is-visible"), 850);
    }

    const scrollToLatest = () => {
        thread.scrollTop = thread.scrollHeight;
    };

    const setThinking = (thinking) => {
        isThinking = thinking;
        panel.setAttribute("aria-busy", String(thinking));
        const waitingForChoice = [
            "disclosure", "area", "treatment-category", "treatment", "availability", "consent"
        ].includes(preRegistrationStep);
        input.disabled = thinking || waitingForChoice;
        sendButton.disabled = thinking || waitingForChoice;
        panel.querySelectorAll(".assistant-quick-reply").forEach((button) => {
            button.disabled = thinking || button.dataset.actionCompleted === "true";
        });
    };

    const showTypingIndicator = () => {
        if (typingIndicator) {
            return;
        }
        typingIndicator = createElement("div", "assistant-typing");
        typingIndicator.setAttribute("role", "status");
        typingIndicator.setAttribute("aria-label", "A assistente está digitando");
        typingIndicator.innerHTML = "<span></span><span></span><span></span>";
        thread.append(typingIndicator);
        scrollToLatest();
    };

    const hideTypingIndicator = () => {
        typingIndicator?.remove();
        typingIndicator = null;
    };

    const cancelCurrentTurn = () => {
        turnSequence += 1;
        window.clearTimeout(turnTimer);
        turnTimer = 0;
        currentTurn = null;
        hideTypingIndicator();
        thread.querySelectorAll(".assistant-message.is-pending").forEach((message) => message.remove());
        setThinking(false);
    };

    const addMessage = (role, text) => {
        const message = createElement("article", `assistant-message assistant-message--${role}`);
        const bubble = createElement("div", "assistant-message-bubble");
        const copy = createElement("p", "assistant-message-copy", text);
        bubble.append(copy);
        message.append(bubble);
        if (role === "assistant" && currentTurn) {
            message.classList.add("is-pending");
            message.setAttribute("aria-hidden", "true");
            currentTurn.messages.push(message);
        }
        thread.append(message);
        scrollToLatest();
        return bubble;
    };

    const revealTurnMessages = (turn, index = 0) => {
        if (turn.id !== turnSequence) {
            return;
        }

        if (index >= turn.messages.length) {
            hideTypingIndicator();
            turnTimer = 0;
            setThinking(false);
            return;
        }

        if (index > 0) {
            showTypingIndicator();
        }

        turnTimer = window.setTimeout(() => {
            if (turn.id !== turnSequence) {
                return;
            }

            hideTypingIndicator();
            const message = turn.messages[index];
            message.classList.remove("is-pending");
            message.removeAttribute("aria-hidden");
            message.classList.add("is-entering");
            window.requestAnimationFrame(() => message.classList.remove("is-entering"));
            scrollToLatest();
            revealTurnMessages(turn, index + 1);
        }, index === 0 ? 420 : 260);
    };

    const runAssistantTurn = (userText, response) => {
        if (isThinking) {
            return;
        }

        if (userText) {
            addMessage("user", userText);
        }
        setThinking(true);
        showTypingIndicator();
        const turn = { id: ++turnSequence, messages: [] };
        currentTurn = turn;
        response();
        currentTurn = null;
        revealTurnMessages(turn);
    };

    const addQuickReplies = (bubble, options, modifier = "") => {
        const replies = createElement("div", `assistant-quick-replies${modifier ? ` ${modifier}` : ""}`);
        options.forEach(({ label, action, value = "" }) => {
            const button = createElement("button", "assistant-quick-reply", label);
            button.type = "button";
            button.disabled = isThinking;
            button.dataset.chatAction = action;
            if (value) {
                button.dataset.chatValue = value;
            }
            replies.append(button);
        });
        bubble.append(replies);
        scrollToLatest();
    };

    const makeWhatsAppUrl = (context) => {
        if (!hasWhatsapp) {
            return "";
        }
        const message = `Olá, Mônica! Vim pelo site e gostaria de ${context}.`;
        return `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
    };

    const addWhatsAppLink = (bubble, context, label = "Conversar com a Mônica pelo WhatsApp") => {
        const url = makeWhatsAppUrl(context);
        if (!url) {
            const unavailable = createElement("p", "assistant-chat-unavailable",
                "O WhatsApp não está disponível no momento. Você pode usar o formulário de contato do site.");
            const contactLink = createElement("a", "assistant-chat-link", "Ir para o formulário de contato");
            contactLink.href = inPagesDirectory ? "../index.html#contato" : "#contato";
            bubble.append(unavailable, contactLink);
            return;
        }

        const link = createElement("a", "assistant-whatsapp-link", label);
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", `${label}; uma mensagem será aberta para você revisar e enviar`);
        link.innerHTML += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 11.5a8.4 8.4 0 0 1-12.4 7.4L4 20l1.1-3.4A8.4 8.4 0 1 1 20 11.5Z"/><path d="M8.8 8.5c.3-.6.5-.6.8-.6h.4c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .7.5.8 1.3 1.5 2.1 1.9.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.5.7"/></svg>';
        bubble.append(link);
    };

    const addReturnOptions = (bubble) => {
        addQuickReplies(bubble, [
            { label: "Menu principal", action: "home" },
            { label: "Recomeçar conversa", action: "restart" }
        ]);
    };

    const showWelcome = () => {
        input.placeholder = "Seu primeiro nome";
        input.setAttribute("aria-label", "Seu primeiro nome");
        const bubble = addMessage("assistant",
            "Olá! Que bom ter você por aqui. ✨\n\nSou a assistente virtual da Mônica Lyra e estou aqui para te ajudar a conhecer nossos tratamentos, esclarecer suas dúvidas e encontrar o que você procura.\n\nAntes de começarmos, como posso te chamar?");
        addQuickReplies(bubble, [
            { label: "Prefiro seguir sem informar", action: "skip-name" }
        ]);
    };

    const showHome = () => {
        input.placeholder = "Ou escreva uma dúvida específica";
        input.setAttribute("aria-label", "Escreva uma dúvida específica");
        const bubble = addMessage("assistant", "Como posso te ajudar hoje?");
        addHomeOptions(bubble);
    };

    const addHomeOptions = (bubble) => {
        addQuickReplies(bubble, [
            { label: "Conhecer tratamentos", action: "treatments" },
            { label: "Encontrar algo para o que desejo melhorar", action: "need" },
            { label: "Conhecer a Beauté", action: "beauty" },
            { label: "Tirar uma dúvida", action: "questions" },
            { label: "Consultar valores ou agendar", action: "booking" },
            { label: "Fazer pré-cadastro", action: "pre-registration" }
        ], "assistant-quick-replies--home");
    };

    const showTreatmentCategories = () => {
        if (!treatments.length) {
            addMessage("assistant", "Não consegui abrir o catálogo agora. Se preferir, posso te encaminhar à Mônica para conversar sobre as opções.");
            const bubble = thread.lastElementChild.querySelector(".assistant-message-bubble");
            addWhatsAppLink(bubble, "conhecer os tratamentos disponíveis");
            addReturnOptions(bubble);
            return;
        }

        addMessage("assistant", "Claro! Na Estética, posso te mostrar as opções por tema. Se preferir, você também pode conhecer os serviços Beauté.");
        const bubble = thread.lastElementChild.querySelector(".assistant-message-bubble");
        addQuickReplies(bubble, [
            { label: "Estética", action: "aesthetic" },
            { label: "Beauté", action: "beauty" },
            { label: "Voltar ao menu", action: "home" }
        ]);
    };

    const categoryTreatments = (categoryId) => {
        const category = treatmentCategories.find(({ id }) => id === categoryId);
        if (!category) {
            return [];
        }
        return category.treatmentIds
            .map((id) => treatmentsById.get(id))
            .filter(Boolean);
    };

    const showTreatmentList = (categoryId = "all") => {
        const selectedCategory = treatmentCategories.find(({ id }) => id === categoryId)
            || (categoryId === "unassigned" ? { label: "Outros tratamentos" } : null);
        const groupedIds = new Set(treatmentCategories.flatMap(({ treatmentIds }) => treatmentIds));
        const list = categoryId === "all-treatments"
            ? treatments
            : categoryId === "unassigned"
                ? treatments.filter(({ id }) => !groupedIds.has(id))
                : categoryId === "all"
                    ? []
                    : categoryTreatments(categoryId);

        const intro = selectedCategory
            ? `Na categoria “${selectedCategory.label}”, encontrei estas opções. Se alguma chamar sua atenção, posso te contar um pouco mais.`
            : categoryId === "all-treatments"
                ? "Aqui estão os tratamentos de Estética cadastrados no site. Toque em um deles para conhecer os detalhes."
                : "Em Estética, os serviços estão organizados por tema. Qual deles você gostaria de conhecer?";
        addMessage("assistant", intro);
        const bubble = thread.lastElementChild.querySelector(".assistant-message-bubble");

        if (categoryId === "all") {
            const availableCategories = treatmentCategories.filter(({ treatmentIds }) =>
                treatmentIds.some((id) => treatmentsById.has(id)));
            if (treatments.some(({ id }) => !groupedIds.has(id))) {
                availableCategories.push({ id: "unassigned", label: "Outros tratamentos" });
            }
            addQuickReplies(bubble, availableCategories.map(({ id, label }) => ({
                label,
                action: "category",
                value: id
            })), "assistant-quick-replies--catalog");
            addQuickReplies(bubble, [
                { label: "Ver todos os tratamentos", action: "category", value: "all-treatments" },
                { label: "Voltar às áreas", action: "treatments" },
                { label: "Menu principal", action: "home" }
            ]);
            return;
        }

        if (!list.length) {
            bubble.append(createElement("p", "assistant-chat-unavailable",
                "Não encontrei itens cadastrados nesta categoria."));
        } else {
            addQuickReplies(bubble, list.map((treatment) => ({
                label: treatment.name,
                action: "treatment",
                value: treatment.id
            })), "assistant-quick-replies--catalog");
        }
        addQuickReplies(bubble, [
            { label: "Outras categorias", action: "category", value: "all" },
            { label: "Menu principal", action: "home" }
        ]);
    };

    const showTreatment = (treatmentId) => {
        const treatment = treatmentsById.get(treatmentId);
        if (!treatment) {
            addMessage("assistant", "Não encontrei esse serviço no catálogo. Posso te mostrar outras opções ou encaminhar sua dúvida à Mônica.");
            const bubble = thread.lastElementChild.querySelector(".assistant-message-bubble");
            addQuickReplies(bubble, [
                { label: "Contar o que procuro", action: "need" },
                { label: "Menu principal", action: "home" }
            ]);
            return;
        }

        activeTreatmentId = treatment.id;
        activeBeautyService = "";
        const bubble = addMessage("assistant", `Claro! Vou te apresentar o que está disponível sobre ${treatment.name}.`);
        const card = createElement("div", "assistant-treatment-card");
        const cardHeading = createElement("div", "assistant-treatment-heading");
        const image = createElement("img", "assistant-treatment-image");
        image.src = imageUrl(treatment.image);
        image.alt = treatment.alt || "";
        image.loading = "lazy";
        image.decoding = "async";
        image.addEventListener("error", () => image.remove(), { once: true });
        const headingText = createElement("div", "assistant-treatment-heading-copy");
        headingText.append(
            createElement("span", "assistant-treatment-area", "Estética"),
            createElement("h3", "", treatment.name)
        );
        cardHeading.append(image, headingText);
        card.append(cardHeading, createElement("p", "assistant-treatment-summary", treatment.summary));

        const detailSections = [
            ["O que é", treatment.details.what],
            ["Quando pode ser conversado", treatment.details.when],
            ["Como funciona o planejamento", treatment.details.planning],
            ["O que considerar", treatment.details.consider]
        ];
        detailSections.forEach(([label, copy]) => {
            const details = createElement("details", "assistant-treatment-detail");
            const summary = createElement("summary", "", label);
            details.append(summary, createElement("p", "", copy));
            card.append(details);
        });
        bubble.append(card);

        const context = `conversar sobre ${treatment.name} e seus valores ou agendamento`;
        addWhatsAppLink(bubble, context);
        addQuickReplies(bubble, [
            { label: "Outros tratamentos", action: "category", value: "all" },
            { label: "Menu principal", action: "home" }
        ]);
    };

    const showBeautyServices = () => {
        addMessage("assistant", "Que bom! Na Beauté, a Mônica atua com maquiagem, cabelos e penteados. O que você gostaria de conhecer?");
        const bubble = thread.lastElementChild.querySelector(".assistant-message-bubble");
        addQuickReplies(bubble, beautyServices.map(({ id, label }) => ({
            label,
            action: "beauty-service",
            value: id
        })), "assistant-quick-replies--catalog");
        addQuickReplies(bubble, [
            { label: "Conhecer Estética", action: "aesthetic" },
            { label: "Menu principal", action: "home" }
        ]);
    };

    const showBeautyService = (serviceId) => {
        const service = beautyServices.find(({ id }) => id === serviceId);
        if (!service) {
            showBeautyServices();
            return;
        }

        activeTreatmentId = "";
        activeBeautyService = service.label;
        const bubble = addMessage("assistant", service.description);
        addWhatsAppLink(bubble,
            `conversar sobre ${service.label} e consultar disponibilidade, valores ou agendamento`);
        addQuickReplies(bubble, [
            { label: "Outro serviço Beauté", action: "beauty" },
            { label: "Menu principal", action: "home" }
        ]);
    };

    const showBooking = (context = "") => {
        const detail = context
            ? `Claro! A Mônica pode orientar você diretamente sobre ${context}.`
            : "Valores e disponibilidade são informados diretamente pela Mônica, de acordo com o serviço e o atendimento.";
        const bubble = addMessage("assistant", `${detail} O site não faz agendamentos automáticos.`);
        const interest = activeTreatmentId
            ? `${treatmentsById.get(activeTreatmentId)?.name || "um tratamento"} e seus valores ou agendamento`
            : activeBeautyService
                ? `${activeBeautyService} e seus valores ou agendamento`
                : currentNeed
                ? `uma conversa sobre ${currentNeed} e opções de atendimento`
                : "informações sobre valores e agendamento";
        addWhatsAppLink(bubble, interest);
        addReturnOptions(bubble);
    };

    const showNeedPrompt = () => {
        addMessage("assistant",
            "Entendi. O que você gostaria de melhorar ou conhecer? Posso mostrar serviços relacionados, mas a escolha e a indicação dependem sempre de uma avaliação profissional.");
        const bubble = thread.lastElementChild.querySelector(".assistant-message-bubble");
        addQuickReplies(bubble, [
            { label: "Manchas", action: "need-example", value: "Quero conhecer opções para manchas" },
            { label: "Flacidez", action: "need-example", value: "Estou incomodada com flacidez" },
            { label: "Queda de cabelo", action: "need-example", value: "Estou tendo queda de cabelo" },
            { label: "Hidratação da pele", action: "need-example", value: "Quero cuidar da hidratação da pele" },
            { label: "Falar com a Mônica", action: "booking" },
            { label: "Menu principal", action: "home" }
        ], "assistant-quick-replies--catalog");
        input.placeholder = "Ou descreva brevemente o que procura";
        input.setAttribute("aria-label", "Descreva brevemente o que gostaria de melhorar");
    };

    const resetChatInput = () => {
        input.type = "text";
        input.inputMode = "text";
        input.maxLength = 500;
        input.placeholder = "Ou escreva uma dúvida específica";
        input.setAttribute("aria-label", "Escreva uma dúvida específica");
    };

    const setPreRegistrationTextStep = (step) => {
        const fields = {
            fullName: { label: "Nome completo", placeholder: "Nome e sobrenome", maxLength: 120, inputMode: "text" },
            cpf: { label: "CPF", placeholder: "Digite os 11 números do CPF", maxLength: 14, inputMode: "numeric" },
            email: { label: "E-mail", placeholder: "seuemail@exemplo.com", maxLength: 254, inputMode: "email" },
            phone: { label: "Telefone ou WhatsApp", placeholder: "(00) 00000-0000", maxLength: 15, inputMode: "tel" },
            birthDate: { label: "Data de nascimento", placeholder: "DD/MM/AAAA", maxLength: 10, inputMode: "numeric" }
        };
        const field = fields[step];
        if (!field) {
            console.error("Etapa de texto inválida no pré-cadastro.");
            return;
        }

        preRegistrationStep = step;
        input.type = "text";
        input.inputMode = field.inputMode;
        input.maxLength = field.maxLength;
        input.placeholder = field.placeholder;
        input.setAttribute("aria-label", field.label);
    };

    const addRegistrationChoices = (bubble, options) => {
        addQuickReplies(bubble, [
            ...options,
            { label: "Cancelar pré-cadastro", action: "pre-registration-cancel" }
        ], "assistant-quick-replies--catalog");
    };

    const addPrivacyPolicyLink = (bubble) => {
        const link = createElement("a", "assistant-chat-link", "Política de Privacidade");
        link.href = new URL("pages/politica-de-privacidade.html", siteRoot).href;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        bubble.append(link);
    };

    const showPreRegistrationDisclosure = () => {
        if (!hasWhatsapp) {
            const bubble = addMessage("assistant",
                "O pré-cadastro pelo WhatsApp está indisponível no momento. Você pode usar o formulário de atendimento do site.");
            const link = createElement("a", "assistant-chat-link", "Ir para o formulário de atendimento");
            link.href = inPagesDirectory ? "../index.html#contato" : "#contato";
            bubble.append(link);
            return;
        }

        preRegistrationStep = "disclosure";
        const bubble = addMessage("assistant",
            "Posso te guiar pelo mesmo pré-cadastro do site: nome completo, CPF, e-mail, telefone, data de nascimento, área, serviço e preferência de horário. As respostas ficam temporariamente na memória desta página e não são salvas em um cadastro pelo site. No final, uma mensagem será preparada no WhatsApp para você revisar; a clínica só recebe os dados se você decidir enviá-la.");
        addPrivacyPolicyLink(bubble);
        addRegistrationChoices(bubble, [
            { label: "Concordo e continuar", action: "pre-registration-start" }
        ]);
    };

    const askPreRegistrationField = (step, prompt) => {
        setPreRegistrationTextStep(step);
        const bubble = addMessage("assistant", prompt);
        addRegistrationChoices(bubble, []);
    };

    const startPreRegistration = () => {
        preRegistration = {};
        input.value = "";
        privacyNote.textContent = "Dados do pré-cadastro ficam temporários e só vão ao WhatsApp após sua autorização.";
        askPreRegistrationField("fullName",
            "Vamos começar pelo seu nome completo, com nome e sobrenome.");
    };

    const showPreRegistrationAreaChoices = () => {
        preRegistrationStep = "area";
        const bubble = addMessage("assistant", "Obrigada. Para qual área você gostaria de solicitar atendimento?");
        addRegistrationChoices(bubble, [
            { label: "Estética", action: "pre-registration-area", value: "estetica" },
            { label: "Beauté", action: "pre-registration-area", value: "beaute" }
        ]);
    };

    const showPreRegistrationCategories = () => {
        preRegistrationStep = "treatment-category";
        const groupedIds = new Set(treatmentCategories.flatMap(({ treatmentIds }) => treatmentIds));
        const categories = treatmentCategories
            .filter(({ treatmentIds }) => treatmentIds.some((id) => treatmentsById.has(id)))
            .map(({ id, label }) => ({ label, action: "pre-registration-category", value: id }));
        if (treatments.some(({ id }) => !groupedIds.has(id)) || !categories.length) {
            categories.push({
                label: "Outros cuidados",
                action: "pre-registration-category",
                value: "unassigned"
            });
        }

        const bubble = addMessage("assistant", "Qual tema de Estética combina melhor com o que você deseja solicitar?");
        addRegistrationChoices(bubble, categories);
    };

    const showPreRegistrationTreatments = (categoryId = "") => {
        preRegistrationStep = "treatment";
        let options = [];
        if (preRegistration.serviceArea === "beaute") {
            options = beautyServices.map(({ id, label }) => ({
                label,
                action: "pre-registration-treatment",
                value: id
            }));
            options.push(
                {
                    label: "Outro serviço de Beauté",
                    action: "pre-registration-treatment",
                    value: "outro-servico-beaute"
                },
                {
                    label: "Ainda não sei, quero uma avaliação",
                    action: "pre-registration-treatment",
                    value: "avaliacao-beaute"
                }
            );
        } else {
            const selectedCategory = treatmentCategories.find(({ id }) => id === categoryId);
            const groupedIds = new Set(treatmentCategories.flatMap(({ treatmentIds }) => treatmentIds));
            const list = selectedCategory
                ? categoryTreatments(categoryId)
                : categoryId === "unassigned"
                    ? treatments.filter(({ id }) => !groupedIds.has(id))
                    : [];
            options = list.map((treatment) => ({
                label: treatment.name,
                action: "pre-registration-treatment",
                value: treatment.id
            }));
            options.push(
                {
                    label: "Outro tratamento de Estética",
                    action: "pre-registration-treatment",
                    value: "outro-tratamento-estetica"
                },
                {
                    label: "Ainda não sei, quero uma avaliação",
                    action: "pre-registration-treatment",
                    value: "avaliacao-estetica"
                }
            );
        }

        const bubble = addMessage("assistant", "Qual serviço você gostaria de incluir no pré-cadastro?");
        addRegistrationChoices(bubble, options);
    };

    const selectPreRegistrationTreatment = (treatmentId) => {
        const treatment = treatmentsById.get(treatmentId);
        const beautyService = beautyServices.find(({ id }) => id === treatmentId);
        const otherServiceLabels = {
            "outro-tratamento-estetica": "Outro tratamento de Estética",
            "avaliacao-estetica": "Ainda não sei, quero uma avaliação",
            "outro-servico-beaute": "Outro serviço de Beauté",
            "avaliacao-beaute": "Ainda não sei, quero uma avaliação"
        };
        const label = treatment?.name || beautyService?.label || otherServiceLabels[treatmentId];
        if (!label) {
            console.error("Serviço não reconhecido no pré-cadastro.");
            showPreRegistrationTreatments();
            return;
        }
        preRegistration.treatment = label;
        showPreRegistrationAvailability();
    };

    const showPreRegistrationAvailability = () => {
        preRegistrationStep = "availability";
        const bubble = addMessage("assistant", "Agora, escolha sua preferência de dia e horário. Isso não confirma disponibilidade.");
        addRegistrationChoices(bubble, [
            {
                label: "Terça-feira — 13h às 19h30",
                action: "pre-registration-availability",
                value: "Terça-feira, das 13h às 19h30"
            },
            {
                label: "Quinta-feira — 7h às 13h",
                action: "pre-registration-availability",
                value: "Quinta-feira, das 7h às 13h"
            },
            {
                label: "Segunda, quarta, sexta ou sábado — com hora marcada",
                action: "pre-registration-availability",
                value: "Segunda, quarta, sexta ou sábado — somente com hora marcada"
            },
            {
                label: "Somente informações, sem preferência",
                action: "pre-registration-availability",
                value: "Somente informações, sem preferência"
            }
        ]);
    };

    const showPreRegistrationConsent = () => {
        preRegistrationStep = "consent";
        const bubble = addMessage("assistant",
            "Antes de preparar a mensagem, confirme se autoriza incluir esses dados no texto pré-preenchido do WhatsApp e se aceita a Política de Privacidade. Você poderá revisar tudo antes de enviar; nada é enviado automaticamente.");
        addPrivacyPolicyLink(bubble);
        addRegistrationChoices(bubble, [
            { label: "Autorizo e preparar mensagem", action: "pre-registration-consent" }
        ]);
    };

    const formatCpf = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        return digits
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    };

    const calculateCpfDigit = (digits, initialWeight) => {
        const sum = digits.split("").reduce(
            (total, digit, index) => total + Number(digit) * (initialWeight - index),
            0
        );
        const remainder = (sum * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };

    const isValidCpf = (value) => {
        const digits = value.replace(/\D/g, "");
        if (digits.length !== 11 || /^(\d)\1{10}$/.test(digits)) {
            return false;
        }

        const expected = `${calculateCpfDigit(digits.slice(0, 9), 10)}${calculateCpfDigit(digits.slice(0, 10), 11)}`;
        return digits.slice(9) === expected;
    };

    const formatPhone = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        if (digits.length <= 2) {
            return digits ? `(${digits}` : "";
        }
        const areaCode = digits.slice(0, 2);
        const subscriber = digits.slice(2);
        const subscriberLength = digits.length === 11 ? 5 : 4;
        if (subscriber.length <= subscriberLength) {
            return `(${areaCode}) ${subscriber}`;
        }
        return `(${areaCode}) ${subscriber.slice(0, subscriberLength)}-${subscriber.slice(subscriberLength)}`;
    };

    const validatePreRegistrationValue = (step, value) => {
        if (step === "fullName") {
            const fullName = value.trim().replace(/\s+/g, " ");
            return fullName.length <= 120 && fullName.split(" ").length >= 2 ? fullName : "";
        }
        if (step === "cpf") {
            const cpf = formatCpf(value);
            return isValidCpf(cpf) ? cpf : "";
        }
        if (step === "email") {
            const email = value.trim();
            return email.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email : "";
        }
        if (step === "phone") {
            const digits = value.replace(/\D/g, "");
            return digits.length === 10 || digits.length === 11 ? formatPhone(digits) : "";
        }
        if (step === "birthDate") {
            const match = value.trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
            if (!match) {
                return "";
            }
            const [, dayText, monthText, yearText] = match;
            const day = Number(dayText);
            const month = Number(monthText);
            const year = Number(yearText);
            const date = new Date(year, month - 1, day);
            const today = new Date();
            today.setHours(23, 59, 59, 999);
            if (date.getFullYear() !== year || date.getMonth() !== month - 1
                || date.getDate() !== day || date > today) {
                return "";
            }
            return `${dayText}/${monthText}/${yearText}`;
        }
        return "";
    };

    const processPreRegistrationText = (value) => {
        const step = preRegistrationStep;
        const validatedValue = validatePreRegistrationValue(step, value);
        if (!validatedValue) {
            const errorMessages = {
                fullName: "Para continuar, informe nome e sobrenome.",
                cpf: "Confira o CPF e tente novamente. Ele precisa ser válido.",
                email: "Esse e-mail não parece completo. Confira e tente novamente.",
                phone: "Informe um telefone com DDD, com 10 ou 11 números.",
                birthDate: "Informe uma data válida no formato DD/MM/AAAA, sem data futura."
            };
            runAssistantTurn("", () => {
                const bubble = addMessage("assistant", errorMessages[step] || "Confira essa informação e tente novamente.");
                addRegistrationChoices(bubble, []);
            });
            return false;
        }

        preRegistration[step] = validatedValue;
        input.value = "";
        runAssistantTurn("", () => {
            switch (step) {
                case "fullName":
                    askPreRegistrationField("cpf", "Obrigada. Agora, informe seu CPF.");
                    break;
                case "cpf":
                    askPreRegistrationField("email", "Certo. Qual é o seu e-mail?");
                    break;
                case "email":
                    askPreRegistrationField("phone", "Obrigada. Qual telefone ou WhatsApp podemos incluir?");
                    break;
                case "phone":
                    askPreRegistrationField("birthDate", "Para finalizar seus dados, informe sua data de nascimento no formato DD/MM/AAAA.");
                    break;
                case "birthDate":
                    showPreRegistrationAreaChoices();
                    break;
                default:
                    console.error("Não foi possível avançar a etapa do pré-cadastro.");
            }
        });
        return true;
    };

    const completePreRegistration = () => {
        const requiredFields = [
            "fullName", "cpf", "email", "phone", "birthDate", "serviceArea", "treatment", "availability"
        ];
        if (!hasWhatsapp || requiredFields.some((field) => !preRegistration[field])) {
            console.error("O pré-cadastro não contém todos os dados necessários para continuar.");
            const bubble = addMessage("assistant",
                "Não foi possível preparar o pré-cadastro. Você pode tentar novamente ou usar o formulário do site.");
            addRegistrationChoices(bubble, [
                { label: "Tentar novamente", action: "pre-registration" }
            ]);
            preRegistration = {};
            preRegistrationStep = "";
            resetChatInput();
            privacyNote.textContent = "Não envie dados pessoais ou informações de saúde.";
            return;
        }

        const area = preRegistration.serviceArea === "beaute" ? "Beauté" : "Estética";
        const message = [
            "Olá! Gostaria de solicitar atendimento com a clínica Mônica Lyra.",
            "",
            `Nome completo: ${preRegistration.fullName}`,
            `CPF: ${preRegistration.cpf}`,
            `E-mail: ${preRegistration.email}`,
            `Telefone / WhatsApp: ${preRegistration.phone}`,
            `Data de nascimento: ${preRegistration.birthDate}`,
            `Atendimento para: ${area}`,
            `Tratamento/serviço de interesse: ${preRegistration.treatment}`,
            `Preferência de dia/horário: ${preRegistration.availability}`,
            "",
            "Autorizo incluir os dados informados nesta mensagem pré-preenchida do WhatsApp e aceito a Política de Privacidade."
        ].join("\n");
        const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
        const bubble = addMessage("assistant",
            "Seu pré-cadastro está pronto. Abra a mensagem para revisar os dados e envie somente se estiver tudo certo. A clínica só receberá as informações quando você enviar pelo WhatsApp.");
        const link = createElement("a", "assistant-whatsapp-link", "Revisar e continuar pelo WhatsApp");
        link.href = url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.setAttribute("aria-label", "Revisar o pré-cadastro e continuar pelo WhatsApp");
        link.innerHTML += '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 11.5a8.4 8.4 0 0 1-12.4 7.4L4 20l1.1-3.4A8.4 8.4 0 1 1 20 11.5Z"/><path d="M8.8 8.5c.3-.6.5-.6.8-.6h.4c.2 0 .4.1.5.4l.7 1.6c.1.2.1.4-.1.6l-.6.7c-.2.2-.2.4 0 .7.5.8 1.3 1.5 2.1 1.9.2.1.4.1.6-.1l.8-.9c.2-.2.4-.2.6-.1l1.5.7"/></svg>';
        link.addEventListener("click", () => {
            window.setTimeout(() => {
                link.removeAttribute("href");
                preRegistration = {};
            }, 0);
        }, { once: true });
        bubble.append(link);
        preRegistrationStep = "";
        preRegistration = {};
        resetChatInput();
        privacyNote.textContent = "Não envie dados pessoais ou informações de saúde.";
        addReturnOptions(bubble);
    };

    const cancelPreRegistration = () => {
        preRegistration = {};
        preRegistrationStep = "";
        input.value = "";
        resetChatInput();
        privacyNote.textContent = "Não envie dados pessoais ou informações de saúde.";
        const bubble = addMessage("assistant", "Tudo bem, cancelei o pré-cadastro. Como posso te ajudar agora?");
        addHomeOptions(bubble);
    };

    const findTreatmentMention = (normalizedText) => {
        const aliases = [
            ["bioestimuladores", ["bioestimulador", "bioestimuladores"]],
            ["hidragloss", ["hidragloss"]],
            ["tratamento-capilar", ["tratamento capilar"]],
            ["enzimas-metabolicas", ["enzimas", "enzima metabolica", "enzimas metabolicas"]],
            ["skinbooster", ["skinbooster"]],
            ["preenchimento-facial", ["preenchimento facial", "preenchimento"]],
            ["prp", ["prp", "plasma rico em plaquetas"]],
            ["peelings", ["peeling", "peelings"]],
            ["nutraceuticos", ["nutraceutico", "nutraceuticos"]],
            ["emagrecimento-intradermoterapia", ["intradermoterapia", "emagrecimento"]],
            ["toxina-botulinica", ["toxina botulinica"]],
            ["harmonizacao-corporal", ["harmonizacao corporal"]],
            ["tratamento-flacidez", ["tratamento contra flacidez"]],
            ["fios-pdo", ["fios de pdo", "fio pdo"]]
        ];

        const catalogMatch = treatments.find((treatment) =>
            normalizedText.includes(normalize(treatment.name)));
        if (catalogMatch) {
            return catalogMatch;
        }
        const aliasMatch = aliases.find(([, terms]) =>
            terms.some((term) => normalizedText.includes(normalize(term))));
        return aliasMatch ? treatmentsById.get(aliasMatch[0]) : null;
    };

    const respondToNeed = (text, normalizedText) => {
        const matchingIds = new Set();
        needMatches.forEach(({ pattern, ids }) => {
            if (pattern.test(normalizedText)) {
                ids.forEach((id) => {
                    if (treatmentsById.has(id)) {
                        matchingIds.add(id);
                    }
                });
            }
        });
        const matches = [...matchingIds].map((id) => treatmentsById.get(id)).slice(0, 5);
        if (!matches.length) {
            const bubble = addMessage("assistant",
                "Ainda não consegui relacionar o que você procura a um serviço do site. Se quiser, tente descrever de outro jeito ou escolha uma das opções para continuarmos.");
            addQuickReplies(bubble, [
                { label: "Conhecer tratamentos", action: "treatments" },
                { label: "Tentar outra descrição", action: "need" },
                { label: "Conversar com a Mônica", action: "booking" },
                { label: "Menu principal", action: "home" }
            ]);
            return;
        }

        currentNeed = text.trim();
        const introduction = visitorName
            ? `Entendi, ${visitorName}. Encontrei alguns serviços que podem estar relacionados ao que você procura. A indicação depende de uma avaliação profissional.`
            : "Entendi. Encontrei alguns serviços que podem estar relacionados ao que você procura. A indicação depende de uma avaliação profissional.";
        addMessage("assistant", introduction);
        const bubble = thread.lastElementChild.querySelector(".assistant-message-bubble");
        addQuickReplies(bubble, matches.map((treatment) => ({
            label: treatment.name,
            action: "treatment",
            value: treatment.id
        })), "assistant-quick-replies--catalog");
        addQuickReplies(bubble, [
            { label: "Conversar sobre minha necessidade", action: "booking" },
            { label: "Menu principal", action: "home" }
        ]);
    };

    const respondToQuestion = (text) => {
        const normalizedText = normalize(text);
        if (/\b(quanto custa|quanto e|preco|precos|valor|valores|orcamento|agendar|agendamento|marcar consulta|marcar horario)\b/.test(normalizedText)) {
            const mentionedTreatment = findTreatmentMention(normalizedText);
            const mentionedBeauty = beautyServices.find(({ label }) =>
                normalizedText.includes(normalize(label)));
            if (mentionedTreatment) {
                activeTreatmentId = mentionedTreatment.id;
                activeBeautyService = "";
            } else if (mentionedBeauty) {
                activeTreatmentId = "";
                activeBeautyService = mentionedBeauty.label;
            }
            showBooking();
            return;
        }

        if (/\b(efeito colateral|efeitos colaterais|reacao|alergia|contraindicacao|contraindicado|complicacao|dor intensa|inchaço|inchaco|infeccao)\b/.test(normalizedText)) {
            const bubble = addMessage("assistant",
                "Sinto muito que esteja passando por isso. Não consigo avaliar sintomas ou reações por aqui. Converse diretamente com a Mônica; se os sintomas forem intensos ou piorarem rapidamente, procure um serviço de saúde.");
            addWhatsAppLink(bubble, "conversar com a Mônica sobre uma dúvida que precisa de avaliação");
            addReturnOptions(bubble);
            return;
        }

        if (/\b(horario|horarios|funciona|aberto|atendimento)\b/.test(normalizedText)) {
            const bubble = addMessage("assistant",
                "O site informa atendimento às terças, das 13h às 19h30, e às quintas, das 7h às 13h. Nos outros dias, o atendimento é com hora marcada; aos domingos, a clínica fecha. A disponibilidade pode ser confirmada com a Mônica.");
            addWhatsAppLink(bubble, "confirmar disponibilidade de atendimento");
            addReturnOptions(bubble);
            return;
        }

        if (/\b(endereco|localizacao|onde fica|onde e a clinica|como chegar)\b/.test(normalizedText)) {
            const bubble = addMessage("assistant",
                "Não encontrei o endereço da clínica nas informações do site. A Mônica pode te passar a localização correta.");
            addWhatsAppLink(bubble, "solicitar o endereço da clínica");
            addReturnOptions(bubble);
            return;
        }

        if (/\b(avaliacao|consulta|preciso de uma avaliacao)\b/.test(normalizedText)) {
            const bubble = addMessage("assistant",
                "A avaliação individual é um momento para conversar sobre seus objetivos e conhecer as possibilidades com segurança. Por aqui, não consigo dizer qual serviço é indicado para você.");
            addWhatsAppLink(bubble, "conversar sobre uma avaliação individual");
            addReturnOptions(bubble);
            return;
        }

        const treatment = findTreatmentMention(normalizedText);
        if (treatment) {
            showTreatment(treatment.id);
            return;
        }

        if (needMatches.some(({ pattern }) => pattern.test(normalizedText))) {
            respondToNeed(text, normalizedText);
            return;
        }

        if (/\b(beleza|beaute|maquiagem|penteado|cabelo|cabelos)\b/.test(normalizedText)) {
            showBeautyServices();
            return;
        }

        respondToNeed(text, normalizedText);
    };

    const handleAction = (action, value = "") => {
        switch (action) {
            case "home":
                showHome();
                break;
            case "restart":
                resetConversation();
                break;
            case "skip-name":
                awaitingName = false;
                input.placeholder = "Ou escreva uma dúvida específica";
                input.setAttribute("aria-label", "Escreva uma dúvida específica");
                addMessage("assistant", "Sem problema. Vamos começar por onde for mais útil para você.");
                showHome();
                break;
            case "treatments":
                showTreatmentCategories();
                break;
            case "aesthetic":
                showTreatmentList("all");
                break;
            case "category":
                showTreatmentList(value || "all");
                break;
            case "treatment":
                showTreatment(value);
                break;
            case "need":
                showNeedPrompt();
                break;
            case "beauty":
                showBeautyServices();
                break;
            case "beauty-service":
                showBeautyService(value);
                break;
            case "questions":
                addMessage("assistant", "Claro! Posso te ajudar com algumas informações rápidas ou você pode escrever uma pergunta específica.");
                const questionBubble = thread.lastElementChild.querySelector(".assistant-message-bubble");
                addQuickReplies(questionBubble, [
                    { label: "Horários de atendimento", action: "faq", value: "Qual é o horário de atendimento?" },
                    { label: "Endereço da clínica", action: "faq", value: "Qual é o endereço da clínica?" },
                    { label: "Preciso de uma avaliação?", action: "faq", value: "Preciso de uma avaliação?" },
                    { label: "Como funciona um tratamento?", action: "treatments" }
                ], "assistant-quick-replies--catalog");
                break;
            case "faq":
                respondToQuestion(value);
                break;
            case "need-example":
                respondToQuestion(value);
                break;
            case "booking":
                showBooking();
                break;
            case "pre-registration":
                showPreRegistrationDisclosure();
                break;
            case "pre-registration-start":
                startPreRegistration();
                break;
            case "pre-registration-cancel":
                cancelPreRegistration();
                break;
            case "pre-registration-area":
                preRegistration.serviceArea = value;
                if (value === "estetica") {
                    showPreRegistrationCategories();
                } else if (value === "beaute") {
                    showPreRegistrationTreatments();
                } else {
                    console.error("Área de atendimento não reconhecida no pré-cadastro.");
                    showPreRegistrationAreaChoices();
                }
                break;
            case "pre-registration-category":
                showPreRegistrationTreatments(value);
                break;
            case "pre-registration-treatment":
                selectPreRegistrationTreatment(value);
                break;
            case "pre-registration-availability":
                preRegistration.availability = value;
                showPreRegistrationConsent();
                break;
            case "pre-registration-consent":
                completePreRegistration();
                break;
            default:
                console.error("Ação não reconhecida na assistente virtual.");
        }
    };

    const resetConversation = () => {
        preRegistration = {};
        preRegistrationStep = "";
        cancelCurrentTurn();
        thread.replaceChildren();
        activeTreatmentId = "";
        activeBeautyService = "";
        currentNeed = "";
        visitorName = "";
        awaitingName = true;
        input.value = "";
        resetChatInput();
        privacyNote.textContent = "Não envie dados pessoais ou informações de saúde.";
        showWelcome();
    };

    const submitVisitorMessage = (message) => {
        if (!awaitingName) {
            runAssistantTurn(message, () => respondToQuestion(message));
            return;
        }

        const nameCandidate = message
            .replace(/^(?:meu nome (?:é|e)|sou|me chamo|pode me chamar de)\s+/i, "")
            .trim();
        const normalizedText = normalize(message);
        const resemblesRequest = /[?]/.test(message)
            || /\b(preco|precos|valor|valores|orcamento|agendar|agendamento|horario|endereco|tratamento|mancha|flacidez|queda|pele|maquiagem|penteado)\b/.test(normalizedText)
            || Boolean(findTreatmentMention(normalizedText))
            || needMatches.some(({ pattern }) => pattern.test(normalizedText));

        if (resemblesRequest) {
            awaitingName = false;
            input.placeholder = "Ou escreva uma dúvida específica";
            input.setAttribute("aria-label", "Escreva uma dúvida específica");
            runAssistantTurn(message, () => {
                addMessage("assistant", "Claro, posso te ajudar com isso. Você não precisa informar seu nome para continuar.");
                respondToQuestion(message);
            });
            return;
        }

        const firstName = nameCandidate.split(/\s+/)[0].replace(/[^\p{L}'-]/gu, "");
        if (firstName.length < 2 || firstName.length > 30 || nameCandidate.length > 80) {
            runAssistantTurn("", () => {
                const bubble = addMessage("assistant",
                    "Para deixar a conversa mais pessoal, pode me dizer seu primeiro nome? Se preferir, também pode seguir sem informar.");
                addQuickReplies(bubble, [
                    { label: "Prefiro seguir sem informar", action: "skip-name" }
                ]);
            });
            return;
        }

        visitorName = firstName.charAt(0).toLocaleUpperCase("pt-BR")
            + firstName.slice(1).toLocaleLowerCase("pt-BR");
        awaitingName = false;
        input.placeholder = "Ou escreva uma dúvida específica";
        input.setAttribute("aria-label", "Escreva uma dúvida específica");
        runAssistantTurn(visitorName, () => {
            addMessage("assistant", `Prazer, ${visitorName}! Que bom ter você por aqui.`);
            const bubble = addMessage("assistant", "Como posso te ajudar hoje?");
            addHomeOptions(bubble);
        });
    };

    const openChat = () => {
        hideInvite();
        panel.classList.add("is-open");
        panel.setAttribute("aria-hidden", "false");
        panel.inert = false;
        launcher.setAttribute("aria-expanded", "true");
        window.requestAnimationFrame(() => {
            const focusTarget = window.matchMedia("(max-width: 600px)").matches
                ? closeButton
                : input;
            focusTarget.focus();
        });
    };

    const closeChat = (returnFocus = true) => {
        panel.classList.remove("is-open");
        panel.setAttribute("aria-hidden", "true");
        panel.inert = true;
        launcher.setAttribute("aria-expanded", "false");
        if (returnFocus) {
            launcher.focus();
        }
    };

    launcher.addEventListener("click", openChat);
    inviteDismiss.addEventListener("click", hideInvite);
    minimizeButton.addEventListener("click", () => closeChat());
    closeButton.addEventListener("click", () => closeChat());
    resetButton.addEventListener("click", () => handleAction("restart"));
    panel.addEventListener("click", (event) => {
        const button = event.target.closest("[data-chat-action]");
        if (button && panel.contains(button) && !isThinking) {
            const action = button.dataset.chatAction;
            button.closest(".assistant-quick-replies")
                ?.querySelectorAll(".assistant-quick-reply")
                .forEach((reply) => {
                    reply.dataset.actionCompleted = "true";
                    reply.disabled = true;
                });
            if (action === "restart") {
                resetConversation();
            } else {
                runAssistantTurn(button.textContent.trim(), () =>
                    handleAction(action, button.dataset.chatValue || ""));
            }
        }
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        const message = input.value.trim();
        if (["fullName", "cpf", "email", "phone", "birthDate"].includes(preRegistrationStep)) {
            processPreRegistrationText(message);
            return;
        }
        if (!message) {
            input.focus();
            return;
        }
        input.value = "";
        submitVisitorMessage(message);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && panel.classList.contains("is-open")) {
            closeChat();
        }
    });

    runAssistantTurn("", showWelcome);
})();
