# MyStore — E-commerce Web Application

A functional e-commerce web application where users can browse products, view detailed product information, and add or remove items from the cart. Built using **React**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and tested using **Cypress**.

---

## Live Demo

_You can host this using Vercel, Netlify, or any static site provider._

---

## Objective

Create a responsive and interactive e-commerce application that includes:

- Product listing (Home)
- Product details page
- Cart page
- Navigation between pages
- Dynamic API-based filtering/sorting
- E2E Testing

---

## Folder Structure
src/
├── components/ # UI components (Navbar, ProductCard, etc.)
├── context/ # CartContext (state management)
├── helpers/ # Reusable helpers like Loading, NoData
├── pages/ # Main views: Home, ProductDetail, Cart
├── types/ # TypeScript interfaces
└── App.tsx, main.tsx, index.css

## Tech Stack

| Tool           | Description                                    |
|----------------|------------------------------------------------|
| React          | Component-based UI                             |
| TypeScript     | Type safety                                    |
| React Router   | Page routing                                   |
| useContext API | Cart state management                          |
| Tailwind CSS   | Responsive design and utility-first styling    |
| Framer Motion  | Smooth animations                              |
| Cypress        | End-to-end testing                             |
| FakeStore API  | Product data: https://fakestoreapi.com         |


## Features & Implementation

### 1. Home Page (Product Listing)
- Grid layout of products (title, price, image).
- Filters by category (multi-select).
- Sort by price (low to high / high to low).
- Filter/sort reflected in **URL parameters**.
- Data always fetched from the API (not filtered locally).

> Example:  
`/home?category=electronics&category=men's clothing&sort=desc`

### 2. Product Detail Page
- Dynamic route using `React Router` (`/product/:id`)
- Fetches product details from API using the `id`.
- Shows product image, title, description, price.
- "Add to Cart" button adds the product to context.

### 3. Cart Functionality
- Products can be added/removed to/from cart.
- Quantity tracked per product.
- Total value and item count displayed.
- Cart data **persisted using `localStorage`**.
- Confirmation modal shown before removing items.

### 4. Navigation
- Navbar with:
  - Title
  - Home icon
  - Cart icon with item count
- Navigation with `Link` from `react-router-dom`
- Fully responsive navbar with icons (`react-icons`)


### 5. Technical Details

| Feature             | Tool / Approach                        |
|---------------------|----------------------------------------|
| Type Checking       | TypeScript                             |
| Routing             | React Router (`/`, `/product/:id`, `/cart`) |
| State Management    | `useContext` API with custom provider  |
| Animations          | Framer Motion                          |
| Styling             | Tailwind CSS                           |
| API                 | `axios` calls to `https://fakestoreapi.com` |
| Persistence         | `localStorage` for cart                |
| Responsive Design   | Tailwind media utilities               |
| Accessibility       | Semantic HTML + focus indicators       |


### 6. E2E Testing with Cypress

- Cypress configured for testing.
- Test file: `cypress/e2e/home.cy.ts`

**Test Cases:**
- Product grid loads correctly
- Clicking a product navigates to detail page
- Add to cart updates cart count
- Cart displays added items and total
- Remove confirmation modal works

---

## Bonus Features Implemented

- Cart state persists with `localStorage`
- Page and element animations using **Framer Motion**
- ARIA-friendly, semantic HTML
- Confirmation modal before item removal

## Installation & Running Locally

```bash
# 1. Clone the repo
git clone https://github.com/kaushalkumarkk/mystore.git
cd mystore


# 2. Install dependencies
npm install

# 3. Start development server
npm run dev

# 4. Run Cypress E2E tests (in a new terminal)
npm run cypress
