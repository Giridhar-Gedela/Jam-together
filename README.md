# 🎵 JamTogether

<div align="center">

# Listen. Chat. Sync.

A modern social music streaming platform where users can discover music, save favorites, and enjoy synchronized listening sessions with friends in real time.

**Live Demo:** https://jam-together.vercel.app

</div>

---

## 📌 Overview

JamTogether is a full-stack MERN-inspired music streaming application that combines music discovery with real-time collaboration.

Users can:

- 🔍 Search millions of songs using the iTunes Search API
- ❤️ Save favorite songs securely
- 👥 Create or join listening sessions
- 🎧 Synchronize playback across multiple users
- 💬 Chat with participants in real time
- 📱 Enjoy a fully responsive experience across desktop, tablet, and mobile

The project demonstrates authentication, REST APIs, Socket.IO communication, MongoDB integration, and responsive frontend development.

---

# 🚀 Live Demo

### Frontend

https://jam-together.vercel.app

### Backend

https://jam-together-2tcx.onrender.com

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Secure Login
- JWT Authentication
- Password Hashing using bcrypt
- Persistent Login

---

## 🎵 Music Search

- Search songs
- Search artists
- Browse albums
- Album track listing
- Music preview playback
- iTunes Search API integration

---

## ❤️ Favorites

- Save favorite songs
- Remove favorites
- MongoDB storage
- Persistent user library

---

## 👥 Listen Together

Real-time collaborative listening.

Features include:

- Create listening session
- Join existing session
- Unique Session ID generation
- Shared playback controls
- Synchronized playback
- Multi-user support

Powered by Socket.IO.

---

## 💬 Live Chat

Inside every listening session users can

- Send messages instantly
- Receive messages in real time
- See participant activity
- Chat while listening together

---

## 🎨 Responsive UI

Designed for

- Desktop
- Laptop
- Tablet
- Mobile

Responsive layout with modern dark theme.

---

# 🛠 Tech Stack

## Frontend

- React 18
- Vite
- Socket.IO Client
- CSS3
- JavaScript ES6

---

## Backend

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Socket.IO
- JWT
- bcryptjs

---

## APIs

- iTunes Search API

---

## Deployment

- Vercel
- Render
- MongoDB Atlas

---

# 📂 Folder Structure

```text
JamTogether
│
├── frontend
│   ├── public
│   ├── src
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── backend
│   ├── server.js
│   ├── package.json
│   └── .env
│
└── README.md
```

---

# ⚙️ Installation

## 1 Clone Repository

```bash
git clone https://github.com/Giridhar-Gedela/Jam-together.git

cd Jam-together
```

---

## 2 Backend

```bash
cd backend

npm install
```

Create a `.env`

```env
PORT=3001

JWT_SECRET=your_jwt_secret

MONGO_URI=your_mongodb_connection_string
```

Run backend

```bash
npm start
```

---

## 3 Frontend

```bash
cd frontend

npm install

npm run dev
```

Application

```
http://localhost:5173
```

---

# 🌐 Environment Variables

```env
PORT=

JWT_SECRET=

MONGO_URI=
```

---

# 🔌 API Endpoints

## Authentication

### Signup

```
POST /api/auth/signup
```

### Login

```
POST /api/auth/signin
```

---

## Favorites

### Get Favorites

```
GET /api/favorites
```

### Add Favorite

```
POST /api/favorites
```

### Remove Favorite

```
DELETE /api/favorites/:trackId
```

---

# ⚡ Socket.IO Events

## Client → Server

```
join_session

playback_control

chat_message
```

---

## Server → Client

```
user_joined

update_playback

new_message
```

---

# 🧩 System Architecture

```text
                React Frontend
                      │
                      │ REST API
                      ▼
              Express Backend
                      │
         ┌────────────┴─────────────┐
         │                          │
    MongoDB Atlas              Socket.IO
         │                          │
         └────────────┬─────────────┘
                      │
               Connected Clients
```

---

# 📸 Screenshots

## Home

_Add Screenshot_

---

## Music Player

_Add Screenshot_

---

## Listen Together

_Add Screenshot_

---

## Chat

_Add Screenshot_

---

## Favorites

_Add Screenshot_

---

# 📈 Future Improvements

- Spotify OAuth Integration
- Playlist Creation
- User Profiles
- Recently Played
- Music Recommendations
- Friend Requests
- Activity Feed
- Voice Chat
- WebRTC Audio Streaming
- AI Playlist Generator
- Lyrics Integration
- PWA Support
- Dark & Light Themes
- Offline Support

---

# 💡 What I Learned

While building this project I gained practical experience in

- Full Stack Development
- REST API Design
- MongoDB Atlas
- JWT Authentication
- Password Encryption
- Socket.IO
- Real-time Communication
- Responsive UI Design
- Deployment using Render & Vercel
- Git Branching & Pull Requests
- API Integration
- State Management
- Error Handling

---

# 🚀 Deployment

Frontend

```
Vercel
```

Backend

```
Render
```

Database

```
MongoDB Atlas
```

---

# 👨‍💻 Author

**Giridhar Gedela**

GitHub

https://github.com/Giridhar-Gedela

LinkedIn

(Add your LinkedIn URL)

---

# ⭐ Support

If you like this project,

⭐ Star this repository

🍴 Fork it

🛠 Contribute

---

# 📄 License

This project is licensed under the MIT License.

---

<div align="center">

## 🎧 JamTogether

**Connecting people through music.**

Built with ❤️ by **Giridhar Gedela**

</div>
