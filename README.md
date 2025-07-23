
# 🔐 PRODIGY_FS_01 – Full Stack Authentication App

This is a full-stack **MERN-based secure authentication system** with stylish glassmorphism UI and theme support, built as part of the **Prodigy InfoTech Internship**.

---

## 🚀 Tech Stack

- **Frontend:** React.js, TailwindCSS, TypeScript, React Router, Framer Motion  
- **Backend:** Node.js, Express.js, MongoDB, JWT, Bcrypt  
- **Deployment:** Vercel (Frontend), Render (Backend)

---

## 🧩 Features

- 🔐 **User Authentication** (Register/Login)
- 🌗 **Dark/Light Theme Toggle**
- 💎 **Glassmorphism UI**
- 🔑 **JWT-Based Secure Route Protection**
- 📦 **MongoDB User Data Storage**
- 🧠 **Reusable Components + Clean Structure**
- 🌌 **Particles Background Animation**
- ✅ **Fully Responsive Design**

---

## 📁 Folder Structure

```
📦PRODIGY_FS_01/
├─ 📁client/               # Frontend
│  ├─ 📁src/
│  │  ├─ 📁components/     # UI Components (GlassCard, FloatingInput, etc.)
│  │  ├─ 📁routes/         # Pages (Login, Register, Dashboard)
│  │  ├─ 📁context/        # Theme context
│  │  ├─ 📁api/            # Axios auth API
│  │  └─ App.tsx
│  └─ vite.config.ts
├─ 📁server/               # Backend
│  ├─ 📁models/           # Mongoose User model
│  ├─ 📁routes/           # Auth routes
│  └─ index.js            # Server & MongoDB setup
└─ README.md
```

---

## ⚙️ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start backend:

```bash
npm run dev
```

📍 Server runs at: `http://localhost:5000`

---

## 🎨 Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in `client/`:

```env
VITE_API_BASE_URL=https://prodigy-fs-01-1bcr.onrender.com/api/auth
```

Start frontend:

```bash
npm run dev
```

📍 Frontend runs at: `http://localhost:5173`

---

## 🌐 CORS Configuration

Update your Express app `index.js`:

```js
const cors = require("cors");

app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://prodigy-fs-01-eosin.vercel.app"
  ],
  credentials: true
}));
```

---

## 🧪 Test Cases

### ✅ Authentication Flow

| Scenario               | Expected Behavior                          |
|------------------------|---------------------------------------------|
| ✅ Register new user   | Account created, token stored in cookie     |
| ✅ Login with valid    | Dashboard access + username display         |
| ❌ Wrong credentials   | Error toast shown                           |
| ❌ Duplicate email     | Error toast: "User already exists"          |

### 🔒 Protected Routes

| Condition         | Behavior             |
|------------------|----------------------|
| Token present     | Show dashboard       |
| No/invalid token  | Redirect to login    |
| Expired token     | Force logout + alert |

---

## 🖼 UI Showcase

- 🎇 **Particles Background Animation**
- 💎 **Glassmorphism Cards**
- 🌗 **Dark & Light Mode Toggle**
- ✨ **Floating Labels with Password Toggle**
- 🧼 **Responsive + Animated UI**

---

## 🔗 Live Demo Links

- 🔵 **Frontend (Vercel):**  
  [https://prodigy-fs-01-eosin.vercel.app](https://prodigy-fs-01-eosin.vercel.app)

- 🟣 **Backend (Render):**  
  [https://prodigy-fs-01-1bcr.onrender.com](https://prodigy-fs-01-1bcr.onrender.com)

---

## 👨‍💻 Author

**Sahil R. B.**

- GitHub: [@SahiRB1104](https://github.com/SahiRB1104)
- Internship: Prodigy InfoTech – Full Stack Track
- Quote: _“Build it like you’re shipping it to the world.”_

---

## 📃 License

This project is built for educational and internship purposes.  
© 2025 Sahil R. B. All rights reserved.

---
