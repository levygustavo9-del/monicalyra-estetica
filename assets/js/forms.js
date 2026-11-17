(() => {
    const form = document.querySelector("[data-contact-form]");
    const status = document.querySelector("#contact-form-status");

    if (!form || !status) {
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const objectiveField = form.querySelector('[name="objective"]');

    if (!submitButton || !objectiveField) {
        console.error("Não foi possível inicializar o formulário de contato.");
        status.textContent = "O formulário está indisponível. Tente novamente mais tarde.";
        return;
    }

    const whatsappPhone = form.dataset.whatsappPhone;
    if (!/^\d{8,15}$/.test(whatsappPhone || "")) {
        console.error("Não foi possível encontrar um número de WhatsApp válido para o formulário.");
        status.textContent = "O WhatsApp está indisponível. Tente novamente mais tarde.";
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        const formData = new FormData(form);
        const objective = String(formData.get("objective") || "").trim();
        const message = [
            "Olá, Mônica!",
            `Gostaria de conversar sobre: ${objective}.`
        ].join("\n");
        const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;

        status.textContent = "Abrindo o WhatsApp. Revise a mensagem e envie pelo aplicativo.";
        window.location.assign(whatsappUrl);
    });

    submitButton.disabled = false;
})();
