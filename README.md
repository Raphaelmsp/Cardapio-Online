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


