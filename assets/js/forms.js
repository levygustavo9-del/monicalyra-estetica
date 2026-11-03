(() => {
    const form = document.querySelector("[data-contact-form]");
    const status = document.querySelector("#contact-form-status");

    if (!form || !status) {
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    if (!submitButton) {
        return;
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!form.reportValidity()) {
            return;
        }

        status.textContent =
            "Os campos foram validados, mas a mensagem não foi enviada. Este formulário precisa ser conectado a um serviço antes da publicação.";
    });

    submitButton.disabled = false;
})();
