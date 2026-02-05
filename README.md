# ShopSphere - Vanilla E-Commerce Website

A complete full-stack e-commerce website built with:
- **Frontend:** HTML, CSS, JavaScript (responsive/mobile-first, server-rendered pages)
- **Backend:** Node.js + Express
- **Database:** MongoDB + Mongoose
- **Templating:** EJS (no React or SPA framework)

## Features

1. Home page with product listing
2. Product details page
3. Session-based cart (add/update/remove)
4. Checkout and order placement (no payment gateway)
5. Admin panel to:
   - Add products
   - Edit product price
   - Delete products
6. SEO-friendly HTML structure and meta descriptions
7. Clean Amazon-like layout

## Project Structure

```text
.
├── public
│   ├── css/styles.css
│   └── js/main.js
├── src
│   ├── config/db.js
│   ├── controllers
│   │   ├── adminController.js
│   │   └── storeController.js
│   ├── middleware
│   │   ├── adminAuth.js
│   │   └── cart.js
│   ├── models
│   │   ├── Order.js
│   │   └── Product.js
│   ├── routes
│   │   ├── adminRoutes.js
│   │   └── storeRoutes.js
│   └── server.js
├── views
│   ├── admin/index.ejs
│   ├── partials
│   │   ├── footer.ejs
│   │   └── header.ejs
│   ├── 404.ejs
│   ├── cart.ejs
│   ├── checkout.ejs
│   ├── home.ejs
│   └── product-details.ejs
├── .env.example
├── package.json
└── README.md
```

## Setup Instructions

### 1. Clone and install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file based on `.env.example`:

```env
PORT=3000
MONGODB_URI=mongodb://127.0.0.1:27017/vanilla_ecommerce
SESSION_SECRET=change-this-secret
ADMIN_KEY=admin123
```

### 3. Start MongoDB

Make sure MongoDB is running locally, or replace `MONGODB_URI` with your MongoDB Atlas connection string.

### 4. Run the app

```bash
npm run dev
```

or

```bash
npm start
```

Visit `http://localhost:3000`

## Admin Access

Admin routes are protected via an admin key query parameter:

```text
http://localhost:3000/admin?adminKey=YOUR_ADMIN_KEY
```

Use that same `adminKey` value during admin actions.

## Notes

- Cart is session-based using `express-session`.
- Sessions are stored in MongoDB via `connect-mongo`.
- Checkout creates an order document in MongoDB.
