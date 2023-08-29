## 📜 System Requirement

- Node.js `12.22.0` or later
- MacOS, Windows (including WSL), and Linux are supported

[More info](https://nextjs.org/docs/getting-started#system-requirements)

---

## 🙇🏽‍♂️ Basic commands

- Install dependencies run `npm install`
- Run in local npm `run dev`
- Run Unit Test run `npm test`
- Run linter `npm run lint`

---

## 😎 Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 📚 Folder structure

- `__tests__`: Root files tests with Jest
- `.github`: Config CI github
- `.husky`: Config file pre-commit
- `.next`: NextJs build default folder
- `public`: Resources and assets
- `src`: Source code base

---

## 👨‍💻 Setup

### Visual Studio Code

**Extensions aditionals**

- [Prettier - Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode): Code formatter, with the defined rules in de file `.prettierrc.json`
- [EditorConfig for VS Code](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig): Set the way to edit with your editor, with the rules defined in the file `.editorconfig`
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint): It helps you see the alerts from the linter in real-time in your editor. archive base `.eslintrc.json`

---

## 🔰 Code practice

### The folder styles/

As the main reference it was categorized according to [SMACSS](http://smacss.com/book/categorizing); but a little more personalized, which gives us:

- `base/` for initial configuration files, global values reset, and only that.
- `helpers/` to define variables, mixins, layout (separation or distribution styles)
- `theme/` to specify a particular and reusable background color or style, animations, effects, transitions
- `globals.scss` imports to the files defined in the previous folders. It only brings the main file of each folder defined as `-dir.scss`

---

## 🧐 Learn More

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

- You can start editing the page by modifying `src/pages/index.tsx`. The page auto-updates as you edit the file.

- [API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `src/pages/api/hello.ts`.

- The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!
