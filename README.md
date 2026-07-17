# ResumeCraft 📄✨
> A premium, full-stack **MERN (MongoDB, Express, React, Node.js)** resume builder featuring real-time editing, live A4 vector previews, customizable themes, and clean print-to-PDF output.

---

## 🚀 Key Features

* **🔐 Secure Authentication**: Signup, login, and token-based private sessions using JWT and hashed passwords (`bcryptjs`).
* **📊 Document Dashboard**: Manage multiple resumes (create, edit, delete) with template badges and date tracking.
* **⚡ Split-Screen Real-time Editor**: Dynamic multi-step form entry (Personal Details, Work History, Education, Skills, Projects) synced instantly with the preview canvas.
* **💾 Debounced Autosaving**: Automatically saves modifications to the database after 1.5 seconds of typing inactivity, featuring visual save-state indicators.
* **🎨 Custom Design Tokens**: Switch layout templates, change typography fonts, and choose from curated color palettes (or select custom hex codes) on the fly.
* **🖨️ ATS-Friendly Vector PDF Exports**: Custom `@media print` style overrides hide editor components and re-format the document as a perfect A4 vector PDF directly from the browser's print dialog.

---

## 🛠️ Tech Stack

* **Frontend**: React (Vite), React Router DOM, Lucide Icons, Custom CSS (Glassmorphism & dark UI).
* **Backend**: Node.js, Express.js.
* **Database**: MongoDB & Mongoose (supports local MongoDB or remote cloud Atlas URIs).
* **Authentication**: JSON Web Tokens (JWT), HTTP Bearer Authorization headers.

---

## 📂 Project Structure

```text
resume-builder/
├── backend/
│   ├── config/          # MongoDB connection handler
│   ├── controllers/     # Authentication & Resume CRUD controllers
│   ├── middleware/      # JWT route guard middleware
│   ├── models/          # User & Resume Mongoose schemas
│   ├── routes/          # Express API route endpoints
│   ├── .env.example     # Template environment config
│   ├── package.json     # Node scripts & server dependencies
│   └── server.js        # Express app entry point
├── frontend/
│   ├── src/
│   │   ├── components/  # Core UI headers, footers, & templates
│   │   │   ├── builder/ # Form steps & design customizer
│   │   │   └── templates/ # Modern, Minimalist, Corporate styling
│   │   ├── context/     # Auth, Resume, and Toast state contexts
│   │   ├── pages/       # Dashboard, Login, Signup, Builder workspace
│   │   ├── App.css      # Grid structures & authentication layouts
│   │   ├── index.css    # Colors variables, global reset, print resets
│   │   └── App.jsx      # Navigation routing tree
│   ├── package.json     # React scripts & modules
│   └── vite.config.js
└── .gitignore           # Keeps node_modules & credentials private
