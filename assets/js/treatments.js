(() => {
    const treatments = [
        {
            id: "bioestimuladores",
            name: "Bioestimulador de colágeno",
            image: "imagens/BIOESTIMULADORDECOLAGENO_clean.png",
            alt: "Rosto feminino em tratamento estético facial",
            summary: "Uma abordagem para conversar sobre firmeza e qualidade da pele.",
            details: {
                what: "Bioestimuladores são produtos aplicados por profissional habilitado com a proposta de estimular uma resposta de colágeno na pele. A composição, o mecanismo e o efeito esperado dependem do produto utilizado.",
                when: "Podem ser considerados quando a avaliação identifica uma queixa de firmeza ou qualidade da pele compatível com a abordagem. A indicação leva em conta objetivos, anatomia e histórico de saúde.",
                planning: "A consulta deve esclarecer o produto, a área, a técnica e as alternativas. O profissional também define se há indicação de uma ou mais sessões, os intervalos e o acompanhamento, sem presumir um protocolo igual para todos.",
                consider: "Sensibilidade, inchaço, hematomas, infecção ou nódulos podem ocorrer. Informe doenças, alergias, medicamentos e procedimentos recentes. A segurança depende do produto e da avaliação; não há garantia de resultado."
            }
        },
        {
            id: "hidragloss",
            name: "Hidragloss",
            image: "imagens/hidragloss.png",
            alt: "Cuidado estético de hidratação dos lábios",
            summary: "Cuidado labial planejado conforme a técnica e o protocolo propostos.",
            details: {
                what: "Hidragloss é um nome usado para protocolos de hidratação e cuidado dos lábios; não define sozinho os produtos ou se a abordagem é invasiva. A técnica precisa ser explicada antes do atendimento.",
                when: "Pode ser conversado quando há interesse em melhorar a aparência ou o conforto dos lábios. Ressecamento persistente, feridas ou irritação precisam ser avaliados antes de qualquer procedimento estético.",
                planning: "O profissional examina os lábios, pergunta sobre sensibilidades e histórico de saúde e descreve os produtos, as etapas e os cuidados. A necessidade de retorno ou repetição depende do protocolo e da resposta individual.",
                consider: "Produtos podem causar irritação ou reação alérgica; técnicas invasivas também podem envolver dor, inchaço, hematomas e infecção. Avise sobre alergias e herpes labial; lesões ativas podem exigir adiamento e avaliação clínica."
            }
        },
        {
            id: "tratamento-capilar",
            name: "Tratamento capilar (PRP)",
            image: "imagens/TRATAMENTO CAPILAR ANTI-IDADE, QUEDA E PÓS OPERATORIO(PRP).png",
            alt: "Aplicação profissional durante cuidado terapêutico do couro cabeludo",
            summary: "Cuidado do couro cabeludo com investigação da causa e avaliação individual.",
            details: {
                what: "A proposta capilar pode incluir diferentes cuidados e, quando especificamente indicado, PRP — plasma preparado a partir do sangue da própria pessoa. A expressão “anti-idade” não identifica uma técnica única nem explica a causa da queda.",
                when: "Queda ou rarefação precisam de avaliação para investigar possíveis causas antes da escolha de um cuidado. No pós-operatório, qualquer procedimento deve ser discutido com a equipe responsável pela cirurgia.",
                planning: "A consulta considera couro cabeludo, histórico de saúde e objetivo. Se houver proposta de PRP, o profissional explica coleta, preparo, aplicação, acompanhamento e se há sessões e intervalos previstos para aquele caso.",
                consider: "O PRP não tem resposta garantida e sua adequação depende da situação clínica. Coleta e aplicação podem causar desconforto, hematomas ou infecção. Informe condições de saúde e medicamentos; siga a orientação da equipe cirúrgica no pós-operatório."
            }
        },
        {
            id: "enzimas-metabolicas",
            name: "Enzimas de ativação metabólica",
            image: "./imagens/ENZIMASDEATIVADORMETABOLICO_clean_1080.png",
            alt: "Avaliação estética da região abdominal",
            summary: "Entenda a composição e a finalidade antes de considerar qualquer protocolo.",
            details: {
                what: "“Enzimas de ativação metabólica” é uma expressão usada para protocolos diferentes e não identifica uma substância ou técnica padronizada. O nome, por si só, não comprova ação no metabolismo nem emagrecimento.",
                when: "Só deve ser considerada após esclarecer qual procedimento está sendo proposto, sua finalidade e se ele é apropriado à necessidade individual. Não substitui avaliação de saúde ou acompanhamento para controle de peso.",
                planning: "Antes de decidir, peça o nome e a finalidade de cada produto, a via de uso, a regularização aplicável, as alternativas e o plano de acompanhamento. Sessões e intervalos só podem ser definidos após essa avaliação.",
                consider: "Riscos e contraindicações variam conforme substância e técnica e podem incluir reações locais ou sistêmicas. Não prossiga sem informação clara sobre composição, evidências, riscos e qualificação do profissional; resultados não são garantidos."
            }
        },
        {
            id: "skinbooster",
            name: "Skinbooster",
            image: "imagens/SKINBOOSTER.png",
            alt: "Aplicação estética facial com foco na qualidade da pele",
            summary: "Uma abordagem de hidratação e qualidade da pele, sem foco em mudar traços.",
            details: {
                what: "Skinbooster é uma abordagem estética que pode envolver a aplicação de produtos injetáveis, frequentemente à base de ácido hialurônico, com foco na hidratação e na qualidade da pele — não em transformar os traços do rosto.",
                when: "A indicação depende da avaliação da pele, dos objetivos e do histórico de saúde. A consulta também ajuda a esclarecer se essa abordagem é adequada ou se outra opção faz mais sentido.",
                planning: "O profissional explica o produto e a técnica propostos, as áreas a tratar, o número de sessões e o intervalo entre elas. O plano pode variar conforme cada caso.",
                consider: "Converse sobre benefícios esperados, limitações, possíveis efeitos e cuidados após o procedimento. A resposta individual varia e não há garantia de resultado."
            }
        },
        {
            id: "preenchimento-facial",
            name: "Preenchimento facial",
            image: "imagens/preenchimento facial.png",
            alt: "Procedimento de preenchimento estético na região dos lábios",
            summary: "Planejamento cuidadoso de volume e contorno, respeitando a anatomia.",
            details: {
                what: "Preenchimento facial é a aplicação de um material injetável em áreas definidas para modificar contorno ou volume. O produto e a finalidade variam e devem ser informados; não é uma técnica única para todo o rosto.",
                when: "Pode ser avaliado quando há um objetivo específico de contorno ou volume compatível com a anatomia e com a saúde da pessoa. A consulta deve considerar proporções e alternativas, inclusive não realizar o procedimento.",
                planning: "O profissional apresenta o material, a área, a quantidade planejada, os limites e o acompanhamento. A decisão sobre sessões e intervalos depende do produto, da avaliação e da evolução individual.",
                consider: "Dor, inchaço, hematomas, infecção, nódulos e assimetria são possíveis. Raramente, uma obstrução vascular pode causar lesão grave ou alteração visual. Procure atendimento urgente diante de dor intensa, mudança de cor da pele ou alteração visual."
            }
        },
        {
            id: "prp",
            name: "PRP – Plasma Rico em Plaquetas",
            image: "imagens/PRP - PLASMA RICO ENM PLAQUETAS.png",
            alt: "Atendimento estético facial relacionado ao plasma rico em plaquetas",
            summary: "Uma opção que utiliza material preparado do próprio sangue, após avaliação.",
            details: {
                what: "PRP é o plasma obtido após coleta e processamento do sangue da própria pessoa, com concentração de plaquetas conforme o método utilizado. Sua preparação, aplicação e usos propostos variam entre protocolos.",
                when: "A possibilidade depende da finalidade clínica ou estética, da evidência para essa finalidade e do histórico de saúde. A avaliação deve esclarecer o que se espera no caso concreto, sem promessa de regeneração ou resultado.",
                planning: "O profissional explica coleta, processamento, condições de assepsia, área e modo de aplicação, além do acompanhamento. Eventuais sessões e intervalos dependem do método e da resposta individual.",
                consider: "A coleta pode causar dor ou hematoma; a aplicação pode causar sensibilidade, inchaço ou infecção. Condições de saúde, medicamentos e alterações relacionadas ao sangue precisam ser informados. O PRP não é indicado automaticamente para todos."
            }
        },
        {
            id: "peelings",
            name: "Peelings",
            image: "imagens/peeling.png",
            alt: "Tratamento profissional de renovação da pele",
            summary: "Renovação cutânea escolhida conforme o tipo e o momento da pele.",
            details: {
                what: "Peeling é um procedimento que promove esfoliação controlada da pele. Agentes, intensidade e profundidade variam; por isso, “peeling” pode descrever abordagens com cuidados e períodos de recuperação diferentes.",
                when: "Pode ser considerado após avaliar a pele, a queixa, a sensibilidade e a exposição solar. A indicação e o tipo de peeling dependem da avaliação profissional, não apenas de uma preocupação estética isolada.",
                planning: "O profissional identifica a abordagem proposta, explica a preparação, as etapas, os cuidados posteriores e o tempo de recuperação esperado. Sessões e intervalos são planejados conforme a pele e a resposta observada.",
                consider: "Vermelhidão, ardor e descamação podem ocorrer; também há risco de queimadura, manchas ou cicatriz. Infecções, irritações e alguns medicamentos podem exigir adiamento ou outra conduta. Proteção solar e cuidados prescritos são importantes."
            }
        },
        {
            id: "nutraceuticos",
            name: "Nutracêuticos",
            image: "imagens/nutraceuticos.png",
            alt: "Suplementos apresentados em contexto de cuidado e bem-estar",
            summary: "Suplementação só faz sentido quando avaliada em contexto de saúde e rotina.",
            details: {
                what: "Nutracêuticos são produtos orais apresentados como suplementos de nutrientes ou outros componentes. A composição e a finalidade variam, e a categoria não significa que o produto seja necessário ou que trate uma condição.",
                when: "Podem ser discutidos quando há uma necessidade identificada por avaliação adequada. Sintomas ou suspeita de deficiência devem ser investigados; suplementos não substituem alimentação variada nem tratamento médico indicado.",
                planning: "A avaliação considera alimentação, condições de saúde, medicamentos e outros suplementos. O profissional esclarece composição, dose, duração proposta e se há necessidade de acompanhamento, sem recomendar uso indiscriminado.",
                consider: "Suplementos podem interagir com medicamentos, causar efeitos adversos ou ser inadequados em algumas condições e fases da vida. Informe tudo o que utiliza e não inicie, interrompa ou substitua tratamento sem orientação profissional."
            }
        },
        {
            id: "emagrecimento-intradermoterapia",
            name: "Emagrecimento – Intradermoterapia",
            image: "imagens/EMGRACIMENTO-INTRADERMOTERAPIA_final_1080.png",
            alt: "Procedimento corporal realizado por profissional em região localizada",
            summary: "Esclareça substâncias, limites e riscos; não é uma solução garantida para emagrecer.",
            details: {
                what: "Intradermoterapia é a aplicação de substâncias na pele por meio de injeções. Os produtos e protocolos variam, e o nome não assegura redução de gordura ou perda de peso.",
                when: "A adequação precisa ser avaliada individualmente, com esclarecimento sobre a finalidade e a autorização aplicável a cada substância. Não substitui uma abordagem abrangente de saúde e controle de peso.",
                planning: "A consulta deve identificar cada produto, sua composição e via de aplicação, discutir alternativas e avaliar saúde e medicamentos. Número de sessões e intervalos dependem do protocolo e só devem ser definidos após essa conversa.",
                consider: "Podem ocorrer dor, hematomas, irritação, infecção, nódulos e reações alérgicas ou sistêmicas. Como os riscos dependem da substância, não aceite aplicações sem identificação clara dos produtos e sem explicação de riscos e limites."
            }
        },
        {
            id: "toxina-botulinica",
            name: "Toxina botulínica",
            image: "imagens/TOXINA BUTOLINICA.png",
            alt: "Aplicação estética facial planejada por profissional habilitado",
            summary: "A indicação e a aplicação dependem da avaliação dos músculos e da expressão.",
            details: {
                what: "A toxina botulínica é aplicada em pontos definidos para reduzir temporariamente a atividade de músculos selecionados. Produto, finalidade e áreas devem ser avaliados e explicados pelo profissional.",
                when: "Pode ser considerada para objetivos compatíveis com a indicação do produto e a avaliação facial. A decisão leva em conta expressão, anatomia, histórico e expectativas, sem buscar apagar características individuais.",
                planning: "O profissional avalia movimentos e simetria, discute pontos e limites e explica cuidados e acompanhamento. Se houver necessidade de nova aplicação, o momento deve ser decidido após reavaliação, não por um intervalo presumido.",
                consider: "Sensibilidade, hematomas, dor de cabeça, assimetria ou queda temporária da pálpebra podem ocorrer. Informe doenças neuromusculares, medicamentos, gestação ou amamentação e procedimentos recentes; a adequação depende de avaliação."
            }
        },
        {
            id: "harmonizacao-corporal",
            name: "Harmonização corporal",
            image: "imagens/harmonizacao corpotal clean.png",
            alt: "Avaliação estética profissional de uma região corporal",
            summary: "Um plano corporal precisa especificar cada procedimento e seus limites.",
            details: {
                what: "Harmonização corporal é uma expressão ampla, não o nome de uma técnica única. Pode designar planos distintos para proporções ou contornos do corpo, com métodos e riscos próprios.",
                when: "Só pode ser considerada depois de identificar a queixa e esclarecer quais procedimentos estão sendo propostos. A avaliação deve respeitar saúde, anatomia, objetivos realistas e a possibilidade de não intervir.",
                planning: "Peça uma descrição de cada etapa, produto ou equipamento, área, alternativas, custos e acompanhamento. O plano e os intervalos devem ser definidos para cada método; nenhum deles deve ser presumido a partir do termo genérico.",
                consider: "Os riscos dependem de cada procedimento e podem incluir dor, hematomas, infecção ou outras complicações. Converse sobre contraindicações, limites e sinais de alerta antes de consentir; não há resultado garantido."
            }
        },
        {
            id: "tratamento-flacidez",
            name: "Tratamento contra flacidez",
            image: "imagens/TRATAMENTO CONTRA FLACIDEZ.jpeg",
            alt: "Avaliação da firmeza e qualidade da pele do rosto",
            summary: "A abordagem depende da região, das características da pele e da causa.",
            details: {
                what: "Flacidez é uma queixa que pode ter diferentes causas e envolver pele ou outras estruturas. O termo “tratamento contra flacidez” não corresponde a um procedimento único; as opções variam conforme a região e a avaliação.",
                when: "Pode ser conversado quando a pessoa deseja avaliar mudanças de firmeza. A consulta ajuda a distinguir a queixa, entender objetivos e verificar se existe uma abordagem apropriada, incluindo cuidados não procedimentais.",
                planning: "O profissional examina a região e explica o método específico, o que pode ou não modificar, as alternativas e o acompanhamento. Sessões e intervalos dependem da técnica selecionada e da resposta observada.",
                consider: "Benefícios, limites, recuperação e riscos são próprios de cada método; podem existir desconforto, irritação, hematomas ou outras reações. Peça informações sobre contraindicações e expectativas realistas antes de decidir."
            }
        },
        {
            id: "fios-pdo",
            name: "Fios de PDO para sustentação",
            image: "imagens/FIOSDEPDOPARASUSTENTACAO_clean.png",
            alt: "Representação estética de sustentação facial com fios",
            summary: "Fios absorvíveis podem ser considerados apenas após avaliar indicação e limites.",
            details: {
                what: "Fios de PDO são fios absorvíveis de polidioxanona inseridos sob a pele. Dependendo do tipo e da técnica, podem ser propostos para suporte temporário; não equivalem a cirurgia nem garantem efeito de lifting.",
                when: "A indicação depende da anatomia, da qualidade da pele, do objetivo e do tipo de fio. A avaliação deve esclarecer se a expectativa é compatível ou se outra opção, inclusive nenhuma intervenção, é mais adequada.",
                planning: "O profissional informa o tipo de fio, os pontos e a técnica, as etapas, os cuidados e o acompanhamento. Quantidade, sessões e intervalo variam conforme a avaliação e não devem ser definidos sem consulta.",
                consider: "Dor, inchaço, hematomas, irregularidades, assimetria, fio palpável ou visível e infecção podem ocorrer; complicações mais sérias também são possíveis. Informe doenças, medicamentos e procedimentos prévios e siga as orientações recebidas."
            }
        }
    ];

    window.monicaTreatmentCatalog = treatments;

    const grid = document.querySelector("#treatments-grid");
    const dialog = document.querySelector("#treatment-details-dialog");
    const dialogTitle = dialog?.querySelector("#treatment-dialog-title");
    const dialogContent = dialog?.querySelector(".treatment-dialog-content");
    const closeButton = dialog?.querySelector(".treatment-dialog-close");
    const contactLink = dialog?.querySelector(".treatment-dialog-contact");

    const resolveServiceArea = () => {
        const context = `${document.body.dataset.serviceArea || ""} ${window.location.pathname}`
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();
        return context.includes("beaute") ? "Beauté" : "Estética";
    };

    if (!grid && !dialog) {
        return;
    }

    if (!grid || !dialog || typeof dialog.showModal !== "function" || !dialogTitle || !dialogContent) {
        console.error("Não foi possível inicializar a seção de tratamentos.");
        return;
    }

    if (treatments.some(({ image }) => !image)) {
        console.error("Um ou mais tratamentos estão sem imagem.");
        return;
    }

    treatments.forEach((treatment, index) => {
        const card = document.createElement("article");
        card.className = `treatment-card reveal${index % 3 ? ` reveal-delay-${index % 3}` : ""}`;
        card.id = treatment.id;

        const image = document.createElement("img");
        image.src = treatment.image;
        image.alt = treatment.alt;
        image.loading = "lazy";
        image.decoding = "async";
        card.append(image);

        const number = document.createElement("span");
        number.className = "treatment-number";
        number.textContent = String(index + 1).padStart(2, "0");
        card.append(number);

        const content = document.createElement("div");
        content.className = "treatment-content";

        const title = document.createElement("h3");
        title.textContent = treatment.name;
        content.append(title);

        const summary = document.createElement("p");
        summary.textContent = treatment.summary;
        content.append(summary);
        card.append(content);

        const trigger = document.createElement("button");
        trigger.className = "card-arrow";
        trigger.type = "button";
        trigger.setAttribute("aria-label", `Saiba mais sobre ${treatment.name}`);
        trigger.setAttribute("aria-haspopup", "dialog");
        trigger.setAttribute("aria-controls", "treatment-details-dialog");
        trigger.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" /></svg>';
        trigger.addEventListener("click", () => {
            dialogTitle.textContent = treatment.name;
            dialogContent.replaceChildren();

            [
                ["O que é", treatment.details.what],
                ["Quando pode ser indicado", treatment.details.when],
                ["Como é o planejamento", treatment.details.planning],
                ["O que considerar", treatment.details.consider]
            ].forEach(([heading, copy]) => {
                const sectionTitle = document.createElement("h3");
                sectionTitle.textContent = heading;
                const paragraph = document.createElement("p");
                paragraph.textContent = copy;
                dialogContent.append(sectionTitle, paragraph);
            });

            const whatsappPhone = contactLink?.dataset.whatsappPhone;
            if (contactLink && /^\d{8,15}$/.test(whatsappPhone || "")) {
                const area = treatment.area || resolveServiceArea();
                const message = [
                    `Olá! Estava navegando pelo site da Mônica Lyra na área de ${area} e gostaria de saber mais informações sobre o serviço ${treatment.name}.`,
                    "",
                    `Poderiam me explicar um pouco mais sobre esse procedimento e como funciona o atendimento?`
                ].join("\n");
                contactLink.href = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(message)}`;
                contactLink.target = "_blank";
                contactLink.rel = "noopener noreferrer";
            } else if (contactLink) {
                contactLink.href = "#contato";
                contactLink.removeAttribute("target");
                contactLink.removeAttribute("rel");
                console.error("Não foi possível preparar o contato do tratamento pelo WhatsApp.");
            }

            dialog.showModal();
        });
        card.append(trigger);
        grid.append(card);
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
