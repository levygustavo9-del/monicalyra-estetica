# Mônica Lyra — Beauté & Esthétique

Site institucional estático, feito com HTML semântico, CSS e JavaScript nativo. O layout e a identidade visual existentes foram preservados; a estrutura agora separa conteúdo, estilos e comportamentos para facilitar manutenção.

## Estrutura

```text
index.html
assets/
  css/
    style.css
    responsive.css
    components.css
  icons/
    favicon.svg
  js/
    main.js
    navigation.js
    animations.js
    forms.js
    experiences-carousel.js
pages/
  politica-de-privacidade.html
  termos-de-uso.html
robots.txt
README.md
.gitignore
```

As fotografias ilustrativas são servidas pelo Unsplash e as fontes pelo Google Fonts. Por isso, esses recursos dependem de conexão à internet. Imagens oficiais podem ser adicionadas em `assets/images/`; fotos autorizadas de experiências devem ficar em `imagens/experiencias/`.

## Como executar

- Abra `index.html` diretamente em um navegador; ou
- Publique a pasta do projeto como site estático no Netlify.

Não há compilação, instalação de pacotes, banco de dados ou servidor de aplicação necessários.

## Funcionalidades

- Navegação por âncoras e menu mobile acessível por teclado.
- Carrossel de procedimentos que agrupa automaticamente os cards em páginas de cinco, com informações individuais em janelas acessíveis.
- Animações discretas de entrada ao rolar a página, independentes da preferência de movimento do sistema.
- Formulário com validação nativa de nome, e-mail e mensagem.
- Ano do rodapé atualizado automaticamente.
- Links de WhatsApp preparados para ativação após configurar o telefone.
- Carrossel Swiper de experiências com fotos estáticas de antes e depois lado a lado; cartões-modelo são claramente sinalizados para substituição por conteúdo autorizado.
- Páginas informativas preliminares de privacidade e termos.

### Experiências e resultados

Os três cartões iniciais da lista `experiences` em `assets/js/experiences-carousel.js` são apenas modelos: as áreas de imagem e os textos entre colchetes precisam ser substituídos, e não representam clientes, procedimentos, resultados ou depoimentos reais. Cada cartão mostra as fotos estáticas de antes e depois lado a lado, sem comparador interativo. Para publicar uma experiência, coloque as fotos autorizadas de antes, depois e, opcionalmente, perfil em `imagens/` e substitua um dos modelos por um registro como:

```js
{
    id: "experiencia-01",
    authorized: true,
    beforeImage: "imagens/experiencias/antes-01.webp",
    afterImage: "imagens/experiencias/depois-01.webp",
    beforeAlt: "Descrição objetiva da foto de antes",
    afterAlt: "Descrição objetiva da foto de depois",
    procedure: "Nome confirmado do procedimento",
    detail: "Informação complementar confirmada", // opcional
    clientName: "Identificação autorizada", // opcional
    age: "Idade autorizada", // opcional
    profileImage: "imagens/experiencias/perfil-01.webp", // opcional
    rating: 5, // opcional; somente avaliação real
    testimonial: "Relato fornecido pela cliente" // opcional
}
```

Remova `demo: true` do cartão-modelo e defina `authorized: true` somente após obter autorização para publicar as imagens e as informações. Use fotos próprias da mesma cliente, com enquadramento e iluminação comparáveis, e não as altere digitalmente. Avaliações, idade e depoimento devem ser incluídos apenas quando reais e autorizados. Os controles do Swiper aparecem automaticamente com mais de um cartão.

### Formulário

O formulário atual **não envia nem armazena dados**. A validação acontece somente no navegador e a interface informa essa limitação. Antes da publicação, conecte-o a um provedor de formulários estáticos (por exemplo, Netlify Forms ou Formspree) ou a um endpoint próprio, implemente o tratamento de sucesso e erro e revise os textos de privacidade.

### WhatsApp e redes sociais

Configure o telefone internacional, somente com dígitos, na constante `whatsappPhone` em `assets/js/main.js` (exemplo de formato: código do país + DDD + número). Os botões passam a apontar para o WhatsApp somente quando um número válido for informado. O perfil social ainda precisa ser confirmado e vinculado no rodapé.

## Bibliotecas e serviços

- Bibliotecas JavaScript: nenhuma.
- Fontes: Google Fonts (Italiana, Italianno e Manrope, com DM Sans como alternativa).
- Fotografias provisórias: Unsplash.

## Antes de publicar

- Confirmar nome/registro profissional, serviços, contatos, endereço e redes sociais.
- Substituir ou aprovar as imagens ilustrativas e validar o logotipo final.
- Integrar e testar o formulário; revisar aviso de privacidade e termos com base na operação real.
- Confirmar licenças e créditos dos materiais visuais usados.
- Adicionar `sitemap.xml` depois de definir o domínio público, usando URLs absolutas corretas; o domínio ainda não foi informado.
- Revisar metadados sociais e testar a versão implantada.

Não há backend, PostgreSQL, autenticação ou agendamento implementados. A separação atual permite adicionar uma API ou serviço futuro sem introduzir frameworks no frontend.
