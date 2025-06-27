# 🔱 Om Backend – Fullstack Role-Based Project API 🔧

The **Om Backend** is a robust Node.js + Express-based API server designed with modular architecture and role-based access.  
It provides powerful features such as user authentication, admin/employee segregation, and RESTful APIs for scalable frontend integrations.

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
📌 PROJECT FEATURES  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

✅ JWT Authentication (Login/Register)  
🔐 Role-based Access Control (Admin, Employee)  
📦 Product Management (Add, Update, Delete)  
🧾 Sales Reporting with Quantity Control  
👥 Customer Management (Add/View)  
📂 Well-structured MVC with Controllers, Routes, and Middlewares  
🌐 CORS-enabled for frontend integration  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🧱 TECH STACK  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

- Node.js (Runtime)  
- Express.js (Server Framework)  
- MongoDB (Database)  
- Mongoose (ODM)  
- JSON Web Token (Authentication)  
- dotenv (Environment Config)  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
📁 PROJECT STRUCTURE  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Om-backend/  
├── controllers/         → Business logic  
│   ├── authController.js  
│   ├── productController.js  
│   ├── customerController.js  
│   └── saleController.js  
├── middleware/          → Token & Role Check  
│   └── authMiddleware.js  
├── models/              → Mongoose Schemas  
│   ├── User.js  
│   ├── Product.js  
│   ├── Customer.js  
│   └── Sale.js  
├── routes/              → Route Definitions  
│   ├── authRoutes.js  
│   ├── productRoutes.js  
│   ├── customerRoutes.js  
│   └── saleRoutes.js  
├── db.js                → MongoDB Connection  
├── index.js             → Entry point of server  
├── .env                 → Environment config  
└── package.json         → Project metadata  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
⚙️ SETUP INSTRUCTIONS  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

Step 1: Clone the Repository  
git clone https://github.com/Sid9879/Om-backend.git  
cd Om-backend  

Step 2: Install Dependencies  
npm install  

Step 3: Create `.env` File  
PORT=8080  
MONGO_URL=your_mongodb_uri  
JWT_SECRET=your_secret_key  

Step 4: Start the Server  
node index.js  

✅ The server will start at: http://localhost:8080  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
📡 API ROUTES OVERVIEW  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔐 AUTHENTICATION ROUTES  
Method: POST | Route: /api/auth/register → Register a new user  
Method: POST | Route: /api/auth/login → Login user and get JWT  

👥 USER MANAGEMENT (Admin Only)  
Method: GET | Route: /api/user → Get all users  

📦 PRODUCT MANAGEMENT (Admin Only)  
POST   /api/product           → Add a product  
GET    /api/product           → Get all products  
PUT    /api/product/:id       → Update product by ID  
DELETE /api/product/:id       → Delete product by ID  

🧍 CUSTOMER MANAGEMENT (Admin & Employee)  
POST   /api/customer          → Add a customer  
GET    /api/customer          → View all customers  

💰 SALE MANAGEMENT (Admin & Employee)  
POST   /api/sale              → Create new sale record  
GET    /api/sale              → View all sale records  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🔐 AUTH & MIDDLEWARES  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

- `verifyToken`: Verifies the JWT token.  
- `verifyAdmin`: Allows only Admins.  
- `verifyEmployeeOrAdmin`: Allows both roles.  

Example usage in routes:  
router.post("/sale", verifyEmployeeOrAdmin, addSale);  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
📂 SAMPLE .env FILE  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

PORT=8080  
MONGO_URL=mongodb://localhost:27017/om_backend  
JWT_SECRET=mystrongsecret  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
✨ FUTURE ENHANCEMENTS  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

- 🧑 User Profile View/Edit  
- 📊 Sales Analytics Dashboard  
- 🧾 PDF Export for Reports  
- 🔔 Notification System  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
👨‍💻 AUTHOR  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Siddharth Singh**  
GitHub: https://github.com/Sid9879  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  

━━━━━━━━━━━━━━━━━━━━━━━━━━━  
🙏 CLOSING NOTE  
━━━━━━━━━━━━━━━━━━━━━━━━━━━

A clean, secure, and scalable backend built for modern apps.  
Perfect for admin panels, sales dashboards, or enterprise portals.  

🔱 Jai Shree Ram 🔱
