# Food Fest Website

A modern, responsive food festival website built with **HTML, CSS, and JavaScript** on the frontend, and **pure Node.js** (no frameworks) on the backend.

## 📁 Project Structure

```
food-fest-website/
├── html/           # All HTML pages
├── css/            # Page stylesheets
├── js/             # Frontend scripts
├── backend/        # Native Node.js HTTP server + database
├── pictures/       # Images
├── videos/         # Video assets
└── README.md       # This file
```

## ✅ Features Overview

### **Front-End Features (No Frameworks Used)**
- Pure HTML5, CSS3, and vanilla JavaScript
- Multi-page site with consistent navigation across pages
- Hero video section and animated gallery on the homepage
- Upcoming and previous events displayed in card layout
- Additional content sections (highlights, vendors, FAQ, guidelines)
- Fully responsive layout for desktop, tablet, and mobile
- Shared multi-column footer on all non-profile pages

### **Authentication & Profile**
- Login, register, OTP verification, and password reset flows
- Profile pages for account info, orders, returns, and password change
- Local storage used for session and user display data

### **Backend Features (Native Node.js - No Express Framework)**
- Built using Node.js built-in `http` module (no Express.js framework)
- RESTful API structure with modular route handlers
- MySQL database schema with users, events, orders, tickets, and returns
- Volunteer application endpoint with database persistence
- Manual JSON parsing and routing
- CORS headers configured manually

## 🎯 Key Features

✅ **No frameworks used** - Pure HTML/CSS/JS frontend, native Node.js backend  
✅ Clean, simple code - easy to understand and modify  
✅ Responsive design - works on all devices  
✅ Smooth animations - professional feel  
✅ Native Node.js HTTP server for APIs  
✅ Volunteer form posts to the backend  
✅ Shared multi-column footer on non-profile pages  
✅ Well-commented code - know what each section does

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MySQL (v8 or higher)

### Installation

1. **Backend Setup**
```bash
cd backend
npm install
```

2. **Configure Environment**
Create a `.env` file in the `backend` folder:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=food_fest
JWT_SECRET=your_secret_key
PORT=3000
```

3. **Initialize Database**
```bash
npm run init-db
```

4. **Start Backend Server**
```bash
npm start
```

5. **Run Frontend**
Open `html/index.html` in a browser or use a local server:
```bash
# In project root
npx http-server -c-1 -o
```

## 📝 Important Note

This project is built **without using any frameworks**:
- Frontend: Pure HTML, CSS, and vanilla JavaScript (no React, Angular, Vue, etc.)
- Backend: Native Node.js HTTP module (no Express.js, no Koa, no Fastify)
- All routing, JSON parsing, and CORS handling done manually

Perfect for educational purposes and understanding web fundamentals!