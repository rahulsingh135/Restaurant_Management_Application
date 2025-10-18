🍴 Restaurant Management System – Admin Dashboard

📋 Project Overview
The Restaurant Management System is a full-stack web application designed to streamline and centralize restaurant operations. It empowers administrators to manage menus, categories, orders, customers, billing, and feedback through an intuitive and responsive dashboard interface.
This system enhances operational efficiency, improves customer service, and provides real-time insights into restaurant performance.

🚀 Key Features
🔐 Admin Authentication
- Secure login with username and password
- Prevents unauthorized access to the admin dashboard


🏠 Dashboard Overview
- Displays key performance metrics:
- Total Orders – All orders placed
- Total Customers – Registered customer count
- Total Revenue – Cumulative income
- Total Feedback – Number of feedback entries
- Recent Orders Table – Order ID, Customer, Menu, Quantity, Amount, Status
- Search Bar – Quickly locate orders or customers
- Sidebar Navigation – Easy access to all modules

  
🍽️ Menu Category Management
- Add and manage food categories:
- Menu Name
- Food Type: Veg / Non-Veg / Both
- Status: Enabled / Disabled
- View, edit, or delete categories
- Search functionality for quick access

  
🍛 Menu Management
- Add and manage menu items:
- Menu Name
- Price
- Food Type
- Food Category
- Image Upload
- Status
- View all menu items with edit/delete options
- Search bar for fast item lookup
  
👥 Customer Management
- View customer profiles and order history:
- Customer ID
- Order ID
- Name
- Phone Number
- Email
- Order Status: Completed / Pending

  
📦 Order Management
- Create and manage customer orders:
- Select menu item
- Enter customer details
- Set order status: In-Process / Completed
- Real-time order updates
- Search by Order ID or Customer Name
  
💳 Billing & Transactions
- Track payment records and statuses
- Billing list with search functionality
- Pay Button – Redirects to detailed invoice
  
🧾 Invoice Generation
- Displays comprehensive order breakdown:
- Order details
- Customer information
- Itemized total
- Payment status
  
💬 Feedback Management
- View customer feedback and ratings:
- Customer Name
- Order ID
- Message
- Rating

🛠️ Tech Stack 

Frontend: React.js / HTML / CSS / JavaScript / Tailwind css
Backend: Node.js / Express.js
Database: PostgreSQL
Tools: Axios, REST API, JSON


📦 Installation & Setup
- Clone the repository:
git clone https://github.com/your-repo/restaurant-management-system.git

Configure your MySQL database:
Database Name: library_db

- Install dependencies:
cd backend
npm install
npm run dev

cd ../frontend
npm install
npm run dev

