````md
# 🍱 RescueMeal – Food Donation & Distribution Platform

RescueMeal is a full-stack MERN application designed to reduce food wastage by connecting food donors, NGOs, and delivery volunteers through a real-time food rescue system.

The platform allows donors to donate excess food, NGOs to claim available food, and volunteers to manage deliveries efficiently.

---

# 🚀 Features

## 👤 Authentication & Authorization
- JWT-based authentication
- Secure login & registration
- Role-based access:
  - Donor
  - NGO
  - Volunteer

---

## 🍛 Food Donation System
- Donate food with:
  - Food image
  - Quantity
  - Category
  - Expiry time
  - Pickup location
  - Description

- Image upload support using Multer

---

## 🏢 NGO Dashboard
- View all available food
- Claim food donations
- Real-time updates using Socket.IO

---

## 🚚 Volunteer System
- Assign deliveries
- Track delivery status
- Mark food as delivered

---

## 📊 Dashboard Analytics
- Total donations
- Available food
- Claimed food
- Delivered food
- Delivery tracking
- Interactive charts using Recharts

---

## ⚡ Real-Time Features
- Real-time food updates
- Live dashboard refresh
- Socket.IO integration

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- React Hot Toast
- Recharts
- Socket.IO Client

---

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Socket.IO
- Express Middleware

---

# 📁 Project Structure

```bash
RescueMeal/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── src/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   └── server.js
│   │
│   ├── uploads/
│   └── package.json
│
└── README.md
````

---

# ⚙️ Installation

## 1️⃣ Clone Repository

```bash
git clone https://github.com/nishant1810/RescueMeal.git
```

---

## 2️⃣ Install Client Dependencies

```bash
cd client
npm install
```

---

## 3️⃣ Install Server Dependencies

```bash
cd ../server
npm install
```

---

# 🔐 Environment Variables

Create `.env` inside `server/`

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key
```

---

# ▶️ Run Project

## Start Backend

```bash
cd server
npm run dev
```

---

## Start Frontend

```bash
cd client
npm run dev
```

---

# 🌐 API Routes

## Auth Routes

<!-- | Method | Endpoint                | Description   |
| ------ | ----------------------- | ------------- |
| POST   | `/api/v1/auth/register` | Register user |
| POST   | `/api/v1/auth/login`    | Login user    | -->

---

<!-- ## Food Routes

| Method | Endpoint                    | Description     |
| ------ | --------------------------- | --------------- |
| POST   | `/api/v1/food/donate`       | Donate food     |
| GET    | `/api/v1/food/all`          | Get all food    |
| PUT    | `/api/v1/food/claim/:id`    | Claim food      |
| GET    | `/api/v1/food/my-donations` | Donor food      |
| GET    | `/api/v1/food/claimed-food` | Claimed food    |
| GET    | `/api/v1/food/stats`        | Dashboard stats | -->

---

# 📸 Screenshots

## 🏠 Home Page

* Modern responsive landing page

## 🔐 Authentication

* Beautiful login & register pages

## 📊 Dashboard

* Real-time analytics
* Interactive charts
* Donation tracking

---

# 🔥 Future Improvements

* Google Maps integration
* Live delivery tracking
* Email notifications
* AI-based food expiry prediction
* PWA support
* Docker deployment
* Cloudinary image storage
* Admin dashboard

---


---

# 👨‍💻 Author

## Nishant Gaur

---

# 📜 License

This project is licensed under the MIT License.


