# 🛒 Bazar Dor — বাজার দর

### 🇧🇩 Your Daily Essential Price Tracker

**Bazar Dor** is a responsive web application designed to help people explore daily essential product prices across Bangladesh. Compare price changes, discover market-wise prices, and stay informed about everyday necessities—all in one place.

<p align="center">
  <strong>📈 Track Prices&nbsp; • &nbsp;🛍️ Explore Products&nbsp; • &nbsp;💚 Shop Smarter</strong>
</p>

---

## ✨ Features

| Feature                     | Description                                           |
| --------------------------- | ----------------------------------------------------- |
| 📊 **Daily Price Overview** | Explore essential product prices and daily changes.   |
| 📈 **Top Risers**           | Discover products with increasing prices.             |
| 📉 **Top Fallers**          | Find products with decreasing prices.                 |
| 🗂️ **Product Categories**   | Browse products by category.                          |
| 🏷️ **Product Details**      | View current prices and price summaries.              |
| 🏪 **Market-wise Prices**   | Compare minimum and maximum prices across markets.    |
| ↕️ **Product Sorting**      | Sort category listings by price.                      |
| 🔐 **Authentication**       | Sign in and sign up using supported methods.          |
| 🛡️ **Protected Routes**     | Restrict access to product details and profile pages. |
| 👤 **Profile Management**   | Update your account name and sign out.                |
| 📱 **Responsive UI**        | Designed for mobile, tablet, and desktop screens.     |
| 🚧 **Friendly Error Pages** | Helpful not-found pages with a route back home.       |

---

## 🧰 Tech Stack

<p>
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Better_Auth-111827?style=for-the-badge&logoColor=white" alt="Better Auth" />
</p>

- **Framework:** Next.js
- **UI Library:** React
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Authentication:** Better Auth
- **Data:** External product and price API

---

## 🚀 Getting Started

### 📋 Prerequisites

Make sure you have these installed:

- [Node.js](https://nodejs.org/)
- npm

### 1️⃣ Clone the repository

```bash
git clone https://github.com/tanvir134338/bazar-dor-a7-B14
```

### 2️⃣ Open the project folder

```bash
cd bazar-dor-a7-B14
```

### 3️⃣ Install dependencies

```bash
npm install
```

### 4️⃣ Configure environment variables

Set up the environment variables required by Better Auth and any other services used by the project. Keep private credentials out of Git.

### 5️⃣ Start the development server

```bash
npm run dev
```

Open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## 🏗️ Project Structure

```text
bazar-dor-a7-B14/
├── app/
│   ├── category/
│   │   └── [slug]/
│   ├── product/
│   │   └── [slug]/
│   ├── profile/
│   │   └── update/
│   ├── signin/
│   ├── signup/
│   ├── layout.tsx
│   ├── page.tsx
│   └── not-found.tsx
├── lib/
│   ├── auth.ts
│   └── auth-client.ts
├── public/
├── package.json
└── README.md
```

---

## 🧪 Production Build

Check the project with a production build:

```bash
npm run build
```

Run the production server after a successful build:

```bash
npm run start
```

---

## 🌐 Data Source

Product information and market prices are retrieved from the external API integrated into the application.

---

## ☁️ Deployment

This project can be deployed on [Vercel](https://vercel.com/).

Before deployment, configure all required environment variables in the hosting platform and verify authentication and dynamic routes on the live website.

---

## 🎯 Project Goal

To make everyday market-price information easier to explore through a simple, accessible, and responsive interface.

---

<p align="center">
  <strong>🛒 Bazar Dor — বাজার দর</strong>
  <br />
  <sub>Built with ❤️ using Next.js and TypeScript</sub>
</p>
