(() => {
    const form = document.querySelector("[data-service-request-form]");
    if (!form) {
        return;
    }

    const status = form.querySelector("#service-request-status");
    const nameField = form.querySelector("#service-request-name");
    const cpfField = form.querySelector("#service-request-cpf");
    const emailField = form.querySelector("#service-request-email");
    const phoneField = form.querySelector("#service-request-phone");
    const birthDateField = form.querySelector("#service-request-birthdate");
    const areaField = form.querySelector("#service-request-area");
    const treatmentField = form.querySelector("#service-request-treatment");
    const availabilityField = form.querySelector("#service-request-availability");
    const consentField = form.querySelector("#service-request-consent");
    const submitButton = form.querySelector(".service-request-submit");
    const whatsappPhone = document.body.dataset.whatsappPhone;

    if (!status || !nameField || !cpfField || !emailField || !phoneField || !birthDateField
        || !areaField || !treatmentField || !availabilityField || !consentField || !submitButton) {
        console.error("Não foi possível inicializar o formulário de atendimento.");
        if (status) {
            status.textContent = "O formulário está indisponível. Tente novamente mais tarde.";
        }
        return;
    }

    const context = `${document.body.dataset.serviceArea || ""} ${window.location.pathname}`
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase();
    areaField.value = context.includes("beaute") ? "beaute" : "estetica";

    const treatmentCatalog = [
        ...[...document.querySelectorAll(".treatment-card")].map((card) => ({
            area: "estetica",
            value: card.id,
            label: card.querySelector(".treatment-content h3")?.textContent.trim()
        })).filter(({ label }) => label),
        { area: "estetica", value: "outro-tratamento-estetica", label: "Outro tratamento de Estética" },
        { area: "estetica", value: "avaliacao-estetica", label: "Ainda não sei, quero uma avaliação" },
        { area: "beaute", value: "maquiagem", label: "Maquiagem" },
        { area: "beaute", value: "cabelo-penteado", label: "Cabelos e penteados" },
        { area: "beaute", value: "outro-servico-beaute", label: "Outro serviço de Beauté" },
        { area: "beaute", value: "avaliacao-beaute", label: "Ainda não sei, quero uma avaliação" }
    ];

    const populateTreatments = () => {
        const placeholder = document.createElement("option");
        placeholder.value = "";
        placeholder.disabled = true;
        placeholder.selected = true;
        placeholder.textContent = "Selecione um tratamento ou serviço";
        treatmentField.replaceChildren(placeholder);

        treatmentCatalog
            .filter(({ area }) => area === areaField.value)
            .forEach(({ value, label }) => {
                const option = document.createElement("option");
                option.value = value;
                option.textContent = label;
                treatmentField.append(option);
            });
    };

    populateTreatments();
    areaField.addEventListener("change", populateTreatments);

    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset());
    birthDateField.max = today.toISOString().slice(0, 10);

    const formatCpf = (value) => {
        const digits = value.replace(/\D/g, "").slice(0, 11);
        return digits
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d)/, "$1.$2")
            .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
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

    const validateName = () => {
        const fullName = nameField.value.trim();
        nameField.setCustomValidity(fullName.split(/\s+/).filter(Boolean).length < 2
            ? "Informe seu nome e sobrenome."
            : "");
    };

    const validateCpf = () => {
        const empty = !cpfField.value.trim();
        cpfField.setCustomValidity(!empty && !isValidCpf(cpfField.value) ? "Informe um CPF válido." : "");
    };

    const validatePhone = () => {
        const digits = phoneField.value.replace(/\D/g, "");
        phoneField.setCustomValidity(digits && digits.length !== 10 && digits.length !== 11
            ? "Informe um telefone com DDD."
            : "");
    };

    if (/^\d{8,15}$/.test(whatsappPhone || "")) {
        submitButton.disabled = false;
    } else {
        status.textContent = "O WhatsApp da clínica não está configurado. Tente novamente mais tarde.";
        console.error("Não foi possível encontrar um número de WhatsApp válido para a solicitação.");
        return;
    }

    nameField.addEventListener("input", validateName);
    nameField.addEventListener("blur", validateName);
    cpfField.addEventListener("input", () => {
        cpfField.value = formatCpf(cpfField.value);
        validateCpf();
    });
    cpfField.addEventListener("blur", validateCpf);
    phoneField.addEventListener("input", () => {
        phoneField.value = formatPhone(phoneField.value);
        validatePhone();
    });
    phoneField.addEventListener("blur", validatePhone);

    form.addEventListener("submit", (event) => {
        event.preventDefault();
        validateName();
        validateCpf();
        validatePhone();
        if (!form.reportValidity()) {
            return;
        }

        const area = areaField.selectedOptions[0].textContent;
        const treatment = treatmentField.selectedOptions[0].textContent.trim();
        const availability = availabilityField.selectedOptions[0].textContent.trim();
        const birthDate = birthDateField.value.split("-").reverse().join("/");
        const message = [
            "Olá! Gostaria de solicitar atendimento com a clínica Mônica Lyra.",
            "",
            `Nome completo: ${nameField.value.trim()}`,
            `CPF: ${cpfField.value}`,
            `E-mail: ${emailField.value.trim()}`,
            `Telefone / WhatsApp: ${phoneField.value}`,
            `Data de nascimento: ${birthDate}`,
            `Atendimento para: ${area}`,
            `Tratamento/serviço de interesse: ${treatment}`,
            `Preferência de dia/horário: ${availability}`
        ].join("\n");
        const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
        status.textContent = "Abrindo o WhatsApp. Revise os dados e envie a mensagem somente se estiver de acordo.";
        window.location.assign(whatsappUrl);
    });
})();
