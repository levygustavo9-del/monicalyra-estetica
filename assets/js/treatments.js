(() => {
    const dialog = document.querySelector("#treatment-details-dialog");
    const dialogTitle = dialog?.querySelector("#treatment-dialog-title");
    const dialogContent = dialog?.querySelector(".treatment-dialog-content");
    const closeButton = dialog?.querySelector(".treatment-dialog-close");
    const contactLink = dialog?.querySelector(".treatment-dialog-contact");

    if (!dialog || typeof dialog.showModal !== "function" || !dialogTitle || !dialogContent) {
        console.error("Não foi possível inicializar as informações dos tratamentos.");
        return;
    }

    document.querySelectorAll(".treatment-card .card-arrow").forEach((trigger) => {
        const card = trigger.closest(".treatment-card");
        const title = card?.querySelector(".treatment-content h3");
        const details = card?.querySelector("template.treatment-details");

        if (!title || !details) {
            console.error("Um tratamento está sem título ou informações complementares.", card);
            return;
        }

        trigger.addEventListener("click", () => {
            dialogTitle.textContent = title.textContent;
            dialogContent.replaceChildren(details.content.cloneNode(true));
            dialog.showModal();
        });
    });

    closeButton?.addEventListener("click", () => dialog.close());
    contactLink?.addEventListener("click", () => dialog.close());

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && dialog.open) {
            event.preventDefault();
            dialog.close();
        }
    });

    dialog.addEventListener("click", (event) => {
        if (event.target === dialog) {
            dialog.close();
        }
    });
})();
