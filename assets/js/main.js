(() => {
    const whatsappPhone = "";
    const whatsappMessage = "Olá, gostaria de saber mais sobre uma consulta.";
    const phoneDigits = whatsappPhone.replace(/\D/g, "");

    if (phoneDigits.length > 0 && (phoneDigits.length < 8 || phoneDigits.length > 15)) {
        console.error("Configure o WhatsApp com um número internacional válido, usando apenas dígitos.");
    } else if (phoneDigits.length > 0) {
        const whatsappUrl = `https://wa.me/${phoneDigits}?text=${encodeURIComponent(whatsappMessage)}`;

        document.querySelectorAll("[data-whatsapp-link]").forEach((link) => {
            link.href = whatsappUrl;
            link.target = "_blank";
            link.rel = "noopener noreferrer";
        });
    }

    const currentYear = document.querySelector("#current-year");
    if (currentYear) {
        currentYear.textContent = String(new Date().getFullYear());
    }
})();
