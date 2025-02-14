# Cardápio Digital

Este é um projeto de Cardápio Digital para o Restaurante Benito Gomes, desenvolvido com React, TypeScript, Zustand e Tailwind CSS. O projeto permite que os usuários visualizem o cardápio e façam pedidos online, enquanto os administradores podem gerenciar os pratos e horários de funcionamento.

## Funcionalidades

- **Usuários:**
  - Visualizar pratos principais e opções adicionais.
  - Adicionar itens ao carrinho e fazer pedidos.
  - Verificar se o restaurante está aberto ou fechado.

- **Administradores:**
  - Login administrativo.
  - Gerenciar pratos principais e opções adicionais.
  - Atualizar horários de funcionamento.
  - Gerar relatórios de pedidos em PDF.

## Tecnologias Utilizadas

- **Frontend:**
  - [React](https://reactjs.org/)
  - [TypeScript](https://www.typescriptlang.org/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Zustand](https://zustand-demo.pmnd.rs/)

- **Backend:**
  - [Supabase](https://supabase.com/) (para banco de dados e autenticação)
  - IndexedDB (via [idb](https://github.com/jakearchibald/idb))

- **Ferramentas de Desenvolvimento:**
  - [Vite](https://vitejs.dev/)
  - [ESLint](https://eslint.org/)
  - [PostCSS](https://postcss.org/)
  - [Lucide React](https://lucide.dev/)
 
Como Executar o Projeto

Clone o repositório:
git clone 
https://github.com/Raphaelmsp/Cardapio-Online

cd cardapio-digital

Instale as dependências:

npm install

Configure o Supabase:

Crie um projeto no Supabase.
Crie as tabelas necessárias para pratos principais, opções adicionais e pedidos.
Configure as variáveis de ambiente no arquivo .env com as chaves do Supabase.
Execute o projeto em modo de desenvolvimento:
npm run dev
Construa o projeto para produção:
npm run build
Visualize a versão de produção:
npm run preview
Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

Licença
Este projeto está licenciado sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

## Estrutura do Projeto

```plaintext
.bolt/
  config.json
  prompt
.env
.gitignore
.hintrc
eslint.config.js
index.html
package.json
postcss.config.js
README.md
src/
  App.tsx
  assets/
    background-food.png
    Logo-cinbal.png
  components/
    AdminPanel.tsx
    UserPanel.tsx
  constants.ts
  index.css
  lib/
    db.ts
  main.tsx
  store/
    authStore.ts
    businessHoursStore.ts
    menuStore.ts
  vite-env.d.ts
tailwind.config.js
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
