Car Store Application

Welcome to the Car Store Application, a full-featured e-commerce platform for buying and selling cars. Built with TypeScript, Node.js, Express.js, and MongoDB (Mongoose), this application ensures secure authentication, smooth product management, and an optimized shopping experience.

Features

🚗 Car Management

Add, view, update, and delete car details

Real-time inventory tracking

🛒 Order Management

Place and manage orders seamlessly

Automatic stock update upon order placement

🔍 Category Filtering

Search cars by brand, model, or category

Advanced filters for price, availability, and model year

💰 Revenue Calculation

Track and aggregate total revenue from completed orders

🔐 Authentication & Security

Secure user registration and login

Role-based authentication (Admin/User)

Password hashing with bcrypt.js

JWT-based authentication for session management

💳 Payment Integration

Secure online payment processing via SurjoPay

⚡ User Experience Enhancements

Responsive and mobile-friendly design

Loading states and error handling

Toast notifications for key actions

🔧 Tech Stack

Frontend

React.js (with Tailwind CSS for styling)

React Router for navigation

Backend

Node.js with Express.js

MongoDB with Mongoose ORM

Authentication & Security

JWT Authentication

bcrypt.js for password hashing

Secure API routes with middleware

Payment Integration

SurjoPay

🚀 Installation & Setup

1️⃣ Clone the Repository

git clone https://github.com/skrehad/carstore.git
cd carstore

2️⃣ Install Dependencies

npm install # Install frontend dependencies
cd server
npm install # Install backend dependencies

3️⃣ Setup Environment Variables

Create a .env file in the server directory and add:

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

4️⃣ Run the Application

Start the Frontend

npm start

Start the Backend

cd server
npm run dev

5️⃣ Access the App

Frontend: http://localhost:3000

Backend: http://localhost:5000

🎯 Project Completion

All core features, including authentication, product management, order tracking, and payment integration, have been successfully implemented. The application is fully responsive and optimized for smooth user experience.
