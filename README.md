# ABC General Store – MERN Stack Web App

Live Website: https://abc-general-store-1.onrender.com  
GitHub Repository: https://github.com/MohdAbdulRah/abc-general-store

## Overview

ABC General Store is a full-stack web application built using the MERN Stack (MongoDB, Express, React, Node.js).  
It allows users to browse products, add them to the cart, place orders, and manage store inventory efficiently.

## Features

### User Features
- Browse available products  
- Add items to the cart and remove them  
- Place orders  
- Login and Signup functionality  
- Responsive user interface  

### Admin Features (if implemented)
- Add, edit, and delete products  
- View customer orders  
- Manage inventory and stock  

## Tech Stack

| Technology     | Description                            |
|----------------|----------------------------------------|
| MongoDB        | Database for products and users        |
| Express.js     | Backend framework                      |
| React.js       | Frontend user interface                |
| Node.js        | Server-side runtime environment        |
| Render         | Hosting and deployment platform        |

## Environment Variables

### Backend (.env)

```
PORT=5000
MONGO_URI=your_mongo_connection_string
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
CLIENT_ORIGIN=http://localhost:3000
```

### Frontend (.env)

```
VITE_BACKEND_URL=http://localhost:5000
VITE_RAZORPAY_KEY_ID=your_razorpay_key_id
```

## Installation and Setup (Local)

### 1. Clone the repository

```
git clone https://github.com/MohdAbdulRah/abc-general-store.git
cd abc-general-store
```

### 2. Install dependencies

#### Backend

```
cd server
npm install
```

#### Frontend

```
cd client
npm install
```

### 3. Add environment variables

Create `.env` files in both `server` and `client` directories using the formats shown above.

### 4. Start the application

#### Backend

```
cd server
npm start
```

#### Frontend

```
cd client
npm start
```

### Application URLs

- Frontend: http://localhost:3000  
- Backend: http://localhost:5000

## Project Structure

```
abc-general-store/
├── client/          # React frontend
├── server/          # Express and Node.js backend
├── models/          # MongoDB models
├── routes/          # API routes
└── README.md
```

## Future Enhancements

- Implement Razorpay payment gateway  
- Add admin dashboard  
- Add product categories and search functionality  
- Enable order history for users  
- Add invoice download feature (PDF)

## Contributing

1. Fork the repository  
2. Create a new branch  
3. Make your changes  
4. Submit a pull request  

