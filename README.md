# Wedding Save the Date

A small React app for Anson & Joyce's save-the-date invitation. Guests start on a landing page, go through a quick 5-question quiz, and either get redirected to the official save-the-date link or get denied with feedback and a prompt to try again.

## Running locally

Requires Node.js and npm.

```bash
npm install
npm run dev
```

## Building for production

```bash
npm run build
npm run preview
```

## Editing content

- `src/config/weddingConfig.js` — couple names, photo path, copy, and the external save-the-date URL
- `src/data/questions.js` — quiz questions, options, fail flags, and custom feedback
- `public/` — couple photo asset
