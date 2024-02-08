![pokemon](https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/International_Pok%C3%A9mon_logo.svg/300px-International_Pok%C3%A9mon_logo.svg.png)

# **Teste Front-End ReactJS**

## 📝 **Fluxo e Funcionalidades da aplicação**

- [x] Landing page com um botão para iniciar a aplicação (qualquer url inexistente deve redirecionar o usuário para essa landing page).
- [x] Personagem no centro da página.
- [x] Barra na esquerda indicando quantos Pokémons ele já capturou (limite de 6) + botão de criação.
- [x] Ao passar o mouse no personagem é exibido o tooltip correspondente.
- [x] Ao clicar no personagem é feita uma busca por um Pokémon aleatório (id de 1 a 807).
- [x] Com o resultado da busca é aberto um modal mostrando os detalhes do Pokémon.
- [x] Usuário tem a opção de capturá-lo, clicando na pokébola, ou fechar o modal.
- [x] Se ele capturar o Pokémon, esse Pokémon é exibido na SideBar e o modal de captura desaparece.
- [x] Usuário pode capturar até 6 Pokémons.
- [x] Selecionando qualquer Pokémon na SideBar o usuário pode ver os detalhes do Pokémon.
- [x] O(s) tipo(s) do Pokémon deve ser traduzido (ex: water => Água).
- [x] Usuário pode editar SOMENTE o nome de um Pokémon que foi capturado.
- [x] Na SideBar o usuário tem a possibilidade de criar um Pokémon (um Pokémon pode ter no máximo 2 "tipos").
- [x] O formulário de criação de Pokémon deve conter validações em todos os campos.
- [x] Caso algum campo não esteja preenchido, o botão de criação deve ficar bloqueado.
- [x] Para um Pokémon criado o usuário pode editar qualquer informação ou liberá-lo.
- [x] Sempre que liberar um Pokémon é possível capturar outro através da busca ou criar um customizado.
- [x] Caso as 6 posições estejam ocupadas o usuário não pode mais buscar nem criar novos Pokémons.
- [x] Responsividade para resoluções desktop e mobile. (Ex: 1280 x 720, 360 x 740)

## 🚀 **Tecnologias**

#### **Para a resolução do desafio, fique a vontade para utilizar as tecnologias citadas abaixo:**

- vite
- vitest
- zustand
- react-query
- axios
- eslint
- styled-components
- typescript
- react-hook-form
- react-testing-library
- zod

## ➕ **Opcional**

#### **Tests**

- Os testes foram feitos em áreas estratégicas para que o foco fosse funcionalidade.
  - Store (onde todas requisicoes de CREATE / UPDATE / DELETE devem acontecer)
  - Adapters (onde os dados são simplificados para o uso real)

#### **Decisões Técnicas**

- Uso do styled-components: Facilita pois não há necessidade de transicionar entre o diretório src/components e assets/styles/sass/components
- Algumas estruturas de layout foram alteradas para simplificar o desenvolvimento
  - Botões de salvar e fechar edição
  - Novo input de URL de imagem, valida se a imagem tem os formator png e jpg
- O modal não possui a funcionalidade 'click-outside', foi um débito que decidi ter para facilitar o desenvolvimento
- Uso do react-query: manejar a interação do cliente com as requisições, mas por ser uma unica requisição de busca o axios ou mesmo a fetch-api supriria a necessidade sozinho, acabei adicionando no projeto pela frequência que uso em projetos maiores.
- Zustand para gerenciamento de estado: simplifica o setup de um reducer e possibilita o uso de funções assíncronas que ocorreriam na evolução do app.
- Zod para validação de formulários: Há uma grande competição com a lib Yup, mas o Zod trás consigo formas sincronas de validação e uma variadade de utilitárias que melhoram o DX com typescript.
- Vite: Como por padrão de projetos com javascript, utilizo sempre o typescript para evitar problemas futuros, o Vite ajudou por ter um setup simples e rápido já integrado. Caso uma evolução do app venha a ter autenticação, permissionamento e afins, o Nextjs pode ser mais util por conta de libs que facilitam o setup inicial (NextAuth, Clerk).
- O arquivo de formulário poderia ser simplificado em outros pequenos componentes.
- Hook-form: performance e DX, com suas APIs bem documentadas, uso de refs para o gerenciamento de estados e componentes que facilitam a customização de inputs.
