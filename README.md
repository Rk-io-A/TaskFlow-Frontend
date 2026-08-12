# TaskFlow Frontend

React frontend for the TaskFlow engineering demo.

> **Status:** portfolio project / local demo. Pair it with `Rk-io-A/TaskFlow-Backend`; it is not a production Sirmint product.

## Stack

- React 19
- Vite
- TypeScript
- Tailwind CSS
- React Query
- Zustand

## Local setup

```bash
npm install
cp .env.example .env.local 2>/dev/null || true
npm run dev
```

Configure the API URL for the local backend:

```text
VITE_API_URL=http://localhost:5000/api
```

## Backend

```text
Rk-io-A/TaskFlow-Backend
```

The backend now requires explicit local secrets and has no compiled default administrator password.

## Deployment

This frontend can be adapted to Azure Static Web Apps, Vercel or another static host. For any public deployment:

- use the actual HTTPS API URL;
- restrict backend CORS to the deployed frontend origin;
- never expose JWT signing/database secrets through `VITE_*` variables;
- do not present demo users/data as real customer activity.
