# TravelEase – Vehicle Booking & Trip Management Platform

A full-stack MERN application delivering seamless vehicle exploration, booking, and management — optimized for scalability, clean UI, and a modern user journey.

## 🚀 Live Demo
🔗 Live Site: https://travelease-4bacc.web.app  
🔗 Client Repo: https://github.com/Islamul-Hoque/Travel-Ease-Client    
🔗 Server Repo: https://github.com/Islamul-Hoque/Travel-Ease-Server

---

## 📝 Description
TravelEase is a full-stack vehicle booking and trip management platform where users can explore vehicles, view details, and place booking requests. Authenticated users can list their own vehicles, update or delete them, and manage bookings effortlessly.  
The platform is built using MongoDB, Express, React, Node.js, with Firebase Authentication, modern UI/UX principles, and advanced filtering.

---

## 📸 Screenshot
![TravelEase Screenshot](./project-view.png)

---

## ✨ Key Features
- Explore all vehicles with sorting & filtering (price, category, location).  
- Firebase Authentication with Google Sign-In.  
- Authenticated users can add, update, and delete their vehicle listings.  
- Users can place booking requests stored in MongoDB.  
- Dark/Light theme toggle.  
- Homepage includes recent 6 vehicles + static informative sections.  
- Fully responsive UI across devices.  
- Toast notifications for success/error messages.  
- Smooth animations using Framer Motion.  
- date-fns used for formatting timestamps.  
- Protected private routes with persistent login (no redirect on reload).

---

## 🧰 Tech Stack

### Frontend
- React.js  
- React Router  
- Tailwind CSS  
- DaisyUI  
- Framer Motion  
- Axios  
- date-fns  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- CORS  
- dotenv  

### Authentication
- Firebase Authentication (Email/Password + Google OAuth)

---

## 📦 Dependencies

### Client
- react  
- react-router
- axios  
- firebase  
- tailwindcss  
- daisyui  
- framer-motion  
- date-fns  
- react-toastify
- react-sweetalert2

### Server
- express  
- cors  
- mongodb
- dotenv  

---

## 🛠 Installation & Run Locally

### Clone the repositories
```bash
git clone <client-repo-url>
git clone <server-repo-url>
```

---

## 📁 Client Setup
```bash
cd client
npm install
```

Create a `.env` file:
```
VITE_apiKey=your_key  
VITE_authDomain=your_auth_domain  
VITE_projectId=your_project_id  
VITE_storageBucket=your_storage  
VITE_messagingSenderId=your_sender_id  
VITE_appId=your_app_id  
VITE_server_url=your_backend_url
```

Run the client:
```bash
npm run dev
```

---

## 🗄 Server Setup
```bash
cd server
npm install
```

Create a `.env` file:
```
DB_USER=your_project_user_name
DB_PASS=your_project_pass
```

Run the server:
```bash
node index.js
```

---

## 🧪 Deployment

### Client
Deployed to Firebase / Netlify / Surge.  
Ensure domain is added in Firebase Authentication → Authorized Domains.

### Server
Deployed to Vercel.  
Ensure all environment variables are configured correctly.

---

## 🔐 Private Routes
- /addVehicle  
- /myVehicles  
- /myBookings  
- /updateVehicle/:id  
- /vehicle/:id  

---

## 🎯 Advanced Features
- price-based sorting (All Vehicles page)   
- Top-Categories vehicles section  
- Custom loading spinner  
- Custom 404 page  

---

## 📄 License
This project is for educational & portfolio use only.

## 👤 Author

**Islamul Hoque**  
*MERN Stack Web Developer*  

📍 **Chattogram, Bangladesh**  
📧 **islamulhoque2006@gmail.com**  

🔗 **Social Links:**  
- [LinkedIn](https://linkedin.com/Islamul-Hoque)  
- [Facebook](https://facebook.com/ISLAMUL.HOQUE.ISHFAK.OFFICIAL)  
- [Twitter](https://twitter.com/ISHFAK2003)
