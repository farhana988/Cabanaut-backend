# 🚖 Cabanaut Backend (Ride Booking)

A secure, scalable, and role-based RESTful API backend for a ride booking system (like Uber, Pathao), built with **Express.js**, **TypeScript**, and **MongoDB (Mongoose)**.

This is a robust and scalable backend system developed for a ride-hailing application, similar to platforms like Uber or Pathao. Built with Express.js, TypeScript, and MongoDB, the API provides a structured and secure environment where users can interact based on their roles — Rider, Driver, or Admin.

Riders can register, book rides by providing pickup and destination locations, cancel ride requests under certain conditions, and view their ride history. Drivers, once approved by an admin, can set their availability, accept or reject ride requests, update ride statuses throughout the trip, and review their earnings history. Admins hold elevated privileges that allow them to manage users, approve or suspend drivers, block or unblock accounts, and monitor the overall system.

The application is designed with modularity and security in mind. It implements JWT-based authentication, bcrypt for password hashing, and role-based access control to ensure that every route is protected and accessible only by the appropriate users. With a clean codebase and clear separation of concerns, this serves as a solid foundation for any real-time transportation service or similar platform requiring multi-role user interaction and transactional flow.

## [ Deployment Link](https://cabanaut-backend.vercel.app)

## 📌 Features

- 🔐 **JWT Authentication** with `bcrypt` password hashing
- 🎭 **Role-based access control** for `rider`, `driver`, and `admin`
- 🧍 Rider features: request/cancel rides, view ride history
- 🚗 Driver features: accept rides, update status, view earnings, set availability
- 🛡️ Admin features: manage users, approve/suspend drivers, block accounts
- 🧱 Clean modular code architecture
- 📦 RESTful API conventions with proper validation and error handling

---

## 🧰 Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript
- **Validation**: Zod
- **Hashing**: bcrypt
- **Middleware**: Role-based `checkAuth`

---

## 📌 API Endpoints

---

### 🔐 Auth Routes

| Method | Endpoint               | Description                   | Access        |
| ------ | ---------------------- | ----------------------------- | ------------- |
| POST   | `/auth/login`          | Login with email and password | Public        |
| POST   | `/auth/refresh-token`  | Refresh JWT access token      | Public        |
| POST   | `/auth/logout`         | Logout user                   | Authenticated |
| POST   | `/auth/reset-password` | Change password               | All Roles     |

---

### 👤 User Routes

| Method | Endpoint                            | Description                    | Access             |
| ------ | ----------------------------------- | ------------------------------ | ------------------ |
| POST   | `/user/register`                    | Register a new rider or driver | Public             |
| GET    | `/user/me`                          | Get logged-in user profile     | All Roles          |
| GET    | `/user/all-users`                   | Get all users                  | Admin, Super Admin |
| GET    | `/user/all-riders`                  | Get all riders                 | Super Admin        |
| GET    | `/user/all-drivers`                 | Get all drivers                | Super Admin        |
| PATCH  | `/user/:id`                         | Update user profile by ID      | All Roles          |
| PATCH  | `/user/block-user/:userId`          | Block/unblock user             | Super Admin        |
| PATCH  | `/user/approved-driver-status/:id`  | Approve a driver's account     | Super Admin        |
| PATCH  | `/user/suspended-driver-status/:id` | Suspend a driver               | Super Admin        |

---

### 🚗 Driver Routes

| Method | Endpoint                        | Description                                      | Access |
| ------ | ------------------------------- | ------------------------------------------------ | ------ |
| POST   | `/driver/register`              | Rider applies to become a driver                 | Rider  |
| PATCH  | `/driver/is-online`             | Set driver availability (online/offline)         | Driver |
| PATCH  | `/driver/accept/:rideId`        | Accept a ride request                            | Driver |
| PATCH  | `/driver/reject/:rideId`        | Reject a ride request                            | Driver |
| PATCH  | `/driver/update-status/:rideId` | Update ride status (Picked → Transit → Complete) | Driver |
| GET    | `/driver/earnings`              | View earnings history                            | Driver |

---

### 🚕 Ride (Rider) Routes

| Method | Endpoint               | Description                        | Access |
| ------ | ---------------------- | ---------------------------------- | ------ |
| POST   | `/ride/book-ride`      | Rider books a ride                 | Rider  |
| PATCH  | `/ride/cancel/:rideId` | Rider cancels ride before accepted | Rider  |
| GET    | `/ride/ride-history`   | Rider views past rides             | Rider  |

## 🧪 Development & Running Locally

### Clone the Repository

```bash
git clone https://github.com/farhana988/Cabanaut-backend.git
cd Cabanaut-backend
```

### Install Dependencies

```bash
npm install
```

### Create a .env file and add:

```bash
PORT=5000
DB_USER=your_db_username
DB_URL=your_db_URL
NODE_ENV=Development / Production
BCRYPT_SALT_ROUND=10

JWT_ACCESS_SECRET=your_jwt_secret_here
JWT_ACCESS_EXPIRES=15m

JWT_REFRESH_SECRET=your_refresh_token_secret
JWT_REFRESH_EXPIRES=7d

SUPER_ADMIN_EMAIL=your_email
SUPER_ADMIN_PASSWORD=your_password

BASE_FARE = 50
PER_KM_RATE = 20
CANCEL_TIME_MINUTES=10
```

### Run the Backend

```bash
npm run dev
```
