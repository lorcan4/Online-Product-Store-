🛍️ Online Product Store – Full-Stack Web App
A complete online product management system built with Node.js, featuring product CRUD operations, image uploads, and user authentication for admin control.

✅ Key Features
🛒 Product Management
Add, edit, delete products

Upload product images using multer

Store product details like:

Name

Description

Price

Category

🔍 Product Browsing
Filter/search products (by name, category, etc.)

Display product listings dynamically using EJS

🔐 Authentication
Admin Login/Signup

Protected routes using express-session and custom middleware

Flash messages for login/signup feedback

🧾 Optional Features
Add to Cart (using sessions or database)

Basic Order Tracking

Role separation between Admin and Customer views

🛠️ Tech Stack
Tool	Purpose
Node.js	Backend runtime
Express.js	Web server framework
MySQL / SQLite	Product data and user account storage
Multer	File/image upload handling
EJS	Template rendering for frontend
express-session	Session-based authentication
bcrypt	Password hashing
Flash	User feedback messages (success/error)
UUID	Unique user/product IDs

📁 Project Structure (suggested)
pgsql
نسخ
تحرير
OnlineProductStore/
├── controllers/
│   └── admin.js
│   └── upload.js
│   └── authController.js
├── middleware/
│   └── authmiddleware.js
├── models/
│   └── User.js
├── storage-img/
│   └── (uploaded images)
├── routes/
│   └── admin-auth.js
│   └── auth.js
├── views/
│   └── admin.ejs
│   └── login.ejs
│   └── dashboard.ejs
├── app.js
└── package.json
🚀 How to Run
Clone the repo

Install dependencies: npm install

Set up your database (e.g. MySQL) and configure connection

Run the server: nodemon app.js

Visit: http://localhost:3200



