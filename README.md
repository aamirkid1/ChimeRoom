
# ChimeRoom 💬  
### Real-Time Chat Application (MERN Stack)

**Live Demo:**  
👉 https://chimeroom-chatapp.onrender.com  
*(For best experience, please open on a laptop/desktop)*

---

## 🚀 About ChimeRoom

**ChimeRoom** is a real-time chat application built for seamless and secure communication.  
It supports instant messaging, user blocking, smart chat ordering, and Firebase-based authentication.

The app uses **Socket.IO** for real-time communication and follows a **single-deployment** approach where both frontend and backend are served from the same server.

---

## ✨ Features

- 🔐 **Firebase Authentication**
  - Secure sign-up & login
  - Email verification support

- 💬 **Real-time messaging**
  - Powered by Socket.IO

- 🚫 **Block user functionality**
  - Blocked users cannot send messages

- 📌 **Smart chat ordering**
  - Latest conversations automatically move to the top

- 🟢 **Online user tracking**
  - See active users in real time

- 🌐 **Single deployment**
  - Frontend & backend served together

---

## 🛠 Tech Stack

### Frontend
- React (Vite)
- Tailwind CSS / DaisyUI
- Axios
- Socket.IO Client

### Backend
- Node.js
- Express.js
- MongoDB (Atlas)
- Mongoose
- Socket.IO
- Firebase Authentication

### Deployment
- Render (Frontend + Backend)
- MongoDB Atlas (Database)

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/your-username/ChimeRoom.git
cd ChimeRoom
````

### 2️⃣ Backend Setup

```bash
cd Backend
npm install
npm run dev
```

Create a `.env` file inside `Backend/`:

```env
PORT=5002
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### 3️⃣ Frontend Setup

```bash
cd Frontend
npm install
npm run dev
```

---

## 🚀 Deployment

### Build Command (Render)

```bash
npm install && npm install --prefix Frontend && npm run build --prefix Frontend
```

### Start Command

```bash
npm start
```

Frontend is served from `Frontend/dist` using Express in production.

---

## 📌 Notes

* Add your Render domain to **Firebase Authorized Domains**
* Ensure **MongoDB Atlas IP whitelist** allows Render access
* Update frontend API base URL for production (no localhost)

---

## 📈 Future Enhancements

* Group chats
* Media sharing
* Push notifications

---

