# 🚀 SkillSwap – Peer Learning Platform (MEAN Stack)

SkillSwap is a full-stack peer learning platform built using the **MEAN Stack** (MongoDB, Express.js, Angular, Node.js).

It allows users to exchange skills by teaching what they know and learning what they want — with built-in session management, messaging, and feedback system.

---

## ✨ Core Features

### 🔐 Authentication
- JWT-based login & registration
- Secure route protection
- Persistent login using token storage

### 👤 Profile Management
- Add bio & availability
- Add skills you teach
- Add skills you want to learn
- Public profile view

### 🔍 Skill Discovery
- Search users by skill
- View teacher profiles
- Request learning sessions

### 📩 Session Workflow
- Send session requests
- Accept / Reject requests
- Mark session completed
- Track session history

### 💬 Real-Time Style Messaging
- One-to-one session-based chat
- Message history stored in MongoDB
- Access chat only after acceptance

### ⭐ Feedback & Rating
- Learners can rate completed sessions
- Ratings update teacher profile
- Reviews visible publicly

---

## 🛠 Tech Stack

### Frontend
- Angular (Standalone Components)
- Reactive Forms
- Angular Router
- Custom CSS (Modern UI Design)

### Backend
- Node.js
- Express.js
- MongoDB (Mongoose ODM)
- JWT Authentication

### Architecture
- RESTful API
- MVC Pattern (Controllers, Routes, Models)
- Protected Middleware for authorization
