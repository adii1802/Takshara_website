# CAIRNLOOP TECHNOLOGIES Website & API

Fullstack repository for the Cairnloop Technologies website, structured into separate `frontend/` and `backend/` services.

> **Primary Tagline:** Powering the Future of Digital Payments.  
> **Supporting Description:** Cairnloop Technologies builds modern payment and payout infrastructure that helps businesses simplify transactions, streamline operations, and scale with confidence.

## Project Structure

```text
cairnloop-website/
├── frontend/          # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   ├── public/
│   │   └── image.png  # Cairnloop Technologies Logo
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/           # Express + Nodemailer Contact API
│   ├── server.js
│   ├── routes/
│   │   └── contact.routes.js
│   ├── controllers/
│   │   └── contact.controller.js
│   ├── services/
│   │   └── email.service.js
│   ├── package.json
│   ├── .env           (git ignored - configure SMTP credentials here)
│   └── .env.example
│
├── package.json       # Root scripts
├── .gitignore
└── README.md
```

## Getting Started

### 1. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend app will run on `http://localhost:5173`.*

### 2. Backend Setup
```bash
cd backend
npm install
npm start
```
*Backend API will run on `http://localhost:5000`.*

---

### Root Shortcut Scripts

From the repository root folder, you can also run:
- `npm run dev:frontend` - Starts the frontend dev server.
- `npm run dev:backend` - Starts the backend API server.
- `npm run build:frontend` - Builds the production bundle in `frontend/dist/`.
