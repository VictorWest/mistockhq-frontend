# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Environment variables

- Create a `.env` file at project root or use `.env.local` with the following:

```
VITE_API_BASE=http://localhost:3000
```

This tells the app where to send API requests to the backend (default: http://localhost:3000).

Tip for deploys: On Vercel (or any static host) set `VITE_API_BASE` as an environment variable in the project settings (Build & Preview) to your backend base URL, then rebuild — Vite injects this value at build time.
