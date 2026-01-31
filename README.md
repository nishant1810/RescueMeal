## 🚀 RescueMeals

**RescueMeals** is an innovative food rescue and redistribution platform built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).  
It tackles food waste and hunger by seamlessly connecting:

- 🏪 **Restaurants** willing to donate surplus food  
- 🙋 **Volunteers** who help with collection and delivery  
- 🏥 **NGOs/Receivers** who distribute food to those in need

By transforming excess food into a valuable resource, RescueMeals fosters **sustainability**, encourages **community collaboration**, and creates a meaningful **social impact**.


## Features

- 🍱 Donators can post details of surplus raw or cooked food.
- 🤝 Volunteers can browse and accept donation requests in real time.
- 🛒 Receivers can view and manage available food via a cart system.
- 📊 User dashboard to manage profile and donations.
- 🔒 Secure authentication with **role-based access control**.
- 🔔 Real-time updates on accepted donation requests.
- 🧾 Easy product listing and food management.
- 🏥 Partner NGOs listing and profiles.


## Technologies Used

  - Frontend: React.js
  - Backend: Node.js, Express.js
  - Database: MongoDB
  - Authentication: JSON Web Tokens (JWT)
  - Payment Gateway: Razorpay
  - Email Service: Nodemailer
  - Styling: CSS with Bootstrap
  - Deployment: Heroku for backend, Vercel for frontend


## ⚙️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/nishant1810/RescueMeal.git
cd RescueMeal
```

### 2. Start the Backend

```bash
cd server
npm install
npm start
```

###

### 2. Start the frontend

```bash
cd client
npm install
npm run dev
```

### 4. Environment Variables

Create a `.env` file in the `server` directory and add:

```
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
```

HAPPY CODING!
