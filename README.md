# Takshara Website & Email API

Fullstack repository for the Takshara Technologies website, structured into separate `frontend/` and `backend/` services.

## Project Structure

```text
Takshara_website/
├── frontend/          # React + Vite + Tailwind CSS Frontend
│   ├── src/
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── backend/           # Express + Nodemailer Contact API
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   └── contact.routes.js
│   │   ├── controllers/
│   │   │   └── contact.controller.js
│   │   └── services/
│   │       └── email.service.js
│   ├── package.json
│   ├── .env           (git ignored - configure SMTP credentials here)
│   └── .env.example
│
├── .gitignore
└── README.md
```

## Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
# Ensure backend/.env contains your SMTP credentials:
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@example.com
# SMTP_PASS=your-app-password

npm start
```
*Backend API will run on `http://localhost:5000`.*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*Frontend app will run on `http://localhost:5173`.*

---

### Root Shortcut Scripts

From the repository root folder, you can also run:
- `npm run dev:frontend` - Starts the frontend dev server.
- `npm run dev:backend` - Starts the backend API server.
- `npm run build:frontend` - Builds the production bundle in `frontend/dist/`.
