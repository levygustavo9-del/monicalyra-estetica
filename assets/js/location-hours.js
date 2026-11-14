(() => {
    const status = document.querySelector("[data-opening-status]");
    const statusText = status?.querySelector("[data-opening-status-text]");

    if (!status || !statusText) {
        console.error("Não foi possível encontrar o indicador de horário de atendimento.");
        return;
    }

    const hoursByDay = new Map([
        [0, { opens: 10 * 60, closes: 22 * 60 }],
        [1, { opens: 7 * 60, closes: 21 * 60 + 30 }],
        [2, { opens: 7 * 60, closes: 21 * 60 + 30 }],
        [3, { opens: 8 * 60, closes: 21 * 60 + 30 }],
        [4, { opens: 8 * 60, closes: 21 * 60 + 30 }],
        [5, null],
        [6, { opens: 9 * 60, closes: 17 * 60 }]
    ]);
    const weekdayIndexes = new Map([
        ["Sun", 0],
        ["Mon", 1],
        ["Tue", 2],
        ["Wed", 3],
        ["Thu", 4],
        ["Fri", 5],
        ["Sat", 6]
    ]);
    const maceioClock = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/Maceio",
        weekday: "short",
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
    });

    const updateOpeningStatus = () => {
        const parts = new Map(
            maceioClock.formatToParts(new Date()).map(({ type, value }) => [type, value])
        );
        const day = weekdayIndexes.get(parts.get("weekday"));
        const hour = Number(parts.get("hour"));
        const minute = Number(parts.get("minute"));

        if (day === undefined || !Number.isInteger(hour) || !Number.isInteger(minute)) {
            console.error("Não foi possível calcular o horário local de Maceió.");
            status.dataset.state = "unknown";
            statusText.textContent = "Horário de hoje indisponível";
            return;
        }

        if (!hoursByDay.has(day)) {
            status.dataset.state = "unknown";
            statusText.textContent = "Horário de hoje indisponível";
            return;
        }

        const todayHours = hoursByDay.get(day);
        if (todayHours === null) {
            status.dataset.state = "closed";
            statusText.textContent = "Fechado hoje";
            return;
        }

        const currentTime = hour * 60 + minute;
        const isOpen = currentTime >= todayHours.opens && currentTime < todayHours.closes;

        status.dataset.state = isOpen ? "open" : "closed";
        statusText.textContent = isOpen
            ? "Aberto agora pelo horário informado"
            : "Fechado fora do horário informado";
    };

    updateOpeningStatus();
    window.setInterval(updateOpeningStatus, 60_000);
})();
