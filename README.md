E-commerce API Project
This is a simple E-commerce API built with Node.js and Express, designed to handle product listings, cart management, order creation, and user authentication with role-based access (customer and admin). The API uses JSON Web Tokens (JWT) for securing routes and includes a basic HTML frontend for interaction. It implements all core requirements and optional features like pagination and product search for extra credit.

Overview
Backend: A RESTful API server written in JavaScript using Express, managing products, carts, orders, and user authentication.
Frontend: A basic HTML page with forms and buttons to interact with the API.
Authentication: JWT-based with two roles: customer (view products, manage cart, place orders) and admin (manage products).
Database: In-memory store (for simplicity; replace with a database like MongoDB for production).
Features
Product Listings: Fetch a list of available products with pagination and search by name or category.
Cart Management: Add, update, and remove items from the shopping cart (customer-only).
Order Creation: Create orders from the cart (customer-only).
User Authentication: Login with JWT, supporting customer and admin roles.
Admin Features: Add, update, and delete products (admin-only).
Optional Features:
Pagination for product listings.
Product search by name or category.
Prerequisites
Node.js and npm installed (download from nodejs.org).
A code editor (e.g., VS Code).
Installation
Clone the repository:
bash
git clone https://github.com/your-username/ecommerce-api.git
cd ecommerce-api
Install dependencies:
cmd
npm install
Start the server:
cmd
node ecommerce-api.js
Usage
Open your browser and navigate to http://localhost:3000.
Login Credentials:
Customer: Username: customer1, Password: pass123
Admin: Username: admin1, Password: admin123
Customer Actions:
View products, search/filter, add to cart, update quantities, remove items, and create orders.
Admin Actions:
After logging in, manage products (add/delete) via the admin section.
API Endpoints
POST /api/login: Authenticate and get a JWT token.
GET /api/products: List products (with page, limit, search, category query params).
GET /api/cart: View cart (customer-only).
POST /api/cart: Add to cart (customer-only).
PUT /api/cart/:productId: Update cart item quantity (customer-only).
DELETE /api/cart/:productId: Remove from cart (customer-only).
POST /api/orders: Create order from cart (customer-only).
POST /api/products: Add product (admin-only).
PUT /api/products/:id: Update product (admin-only).
DELETE /api/products/:id: Delete product (admin-only).
Development
Running Tests: No tests are included (add using a framework like Jest).
Improvements:
Replace in-memory store with a database (e.g., MongoDB).
Use environment variables for JWT_SECRET (e.g., with dotenv).
Add input validation and error handling.
Enhance the frontend with a framework like React.
License
This project is open-source. Feel free to contribute or modify it under the MIT License.

Acknowledgments
Built as part of an assignment to demonstrate REST API development with Node.js.
Thanks to the xAI community for guidance and support.
How to Add to GitHub
Initialize a Git Repository:
In the ecommerce-api directory, run:
cmd
git init
Create README.md:
Create a file named README.md in the ecommerce-api directory using Command Prompt:
cmd
echo. > README.md
Open README.md in a text editor and paste the description above. Save it.
Add Files to Git:
Stage all files:
cmd
git add .
Commit Changes:
Create an initial commit:
cmd
git commit -m "Initial commit: E-commerce API project with backend and frontend"
Create a Repository on GitHub:
Go to GitHub, log in, and click "New" to create a repository (e.g., name it ecommerce-api).
Do not initialize with a README (since you’re adding your own).
Link and Push to GitHub:
Copy the repository URL (e.g., https://github.com/your-username/ecommerce-api.git).
Set the remote and push:
cmd
git remote add origin https://github.com/your-username/ecommerce-api.git
git push -u origin master
If master is not the default branch, use main instead (check your GitHub settings).
Notes
Current Date and Time: It’s 10:58 AM IST on Wednesday, July 09, 2025.
Customization: Update the GitHub URL, username, and any personal acknowledgments in the README.md.
gitignore: Consider adding a .gitignore file to exclude node_modules/ and other temporary files. You can create one with:
cmd
echo node_modules >> .gitignore
echo package-lock.json >> .gitignore
git add .gitignore
git commit -m "Add .gitignore"
git push
This README.md provides a comprehensive overview and setup guide for your project on GitHub. Let me know if you need help with the Git process or further refinements!

2.7s
