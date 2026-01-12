# HairHarmony Studio

A premium, high-performance portfolio website designed for a luxury makeup artist brand. This project combines aesthetic excellence with robust functionality, featuring a dynamic public interface and a secure, fully featured admin dashboard for content management.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

## 🌟 Key Features

### Public Interface
-   **Premium Aesthetics**: Curated "Nude & Gold" color palette, serif typography, and glassmorphism effects to convey luxury.
-   **Cinematic Experience**: 
    -   **Smooth Scrolling**: Integrated `Lenis` for high-end inertial scrolling.
    -   **Page Transitions**: Seamless fade-and-glide navigation using `Framer Motion` and `AnimatePresence`.
    -   **Micro-interactions**: Custom Bezier curve animations, staggered reveals, and hover effects.
-   **Dynamic Portfolio**: Filterable gallery (Bridal, Editorial, Party) with smooth layout animations.
-   **Service Showcase**: Detailed service cards with pricing and "Book Now" flows.
-   **Client Reviews**: Verified review display with rating stars.

### Admin Dashboard (CMS)
-   **Secure Authentication**: Simulated JWT-based login system with session management and auto-expiry.
-   **Booking Management**: View, confirm, complete, or cancel appointment requests.
-   **Content Management**:
    -   **Portfolio Manager**: Add/Delete images and videos, categorize work.
    -   **Service Editor**: Update prices, descriptions, and images for services.
    -   **Review Moderator**: Edit or delete client reviews.
    -   **Music Settings**: Control background music, volume, and autoplay preferences.

## 🛠 Technology Stack

-   **Frontend Framework**: [React](https://react.dev/)
-   **Build Tool**: [Vite](https://vitejs.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Animations**: [Framer Motion](https://www.framer.com/motion/)
-   **Smooth Scroll**: [Lenis](https://lenis.studiofreight.com/)
-   **Routing**: [React Router DOM](https://reactrouter.com/)
-   **Icons**: [Lucide React](https://lucide.dev/)

## 📂 Project Structure

```
src/
├── components/       # Reusable UI components (Hero, Navbar, SmoothScroll)
├── context/          # Global state (ContentContext) handling data & auth
├── data/             # Mock data and initial content configuration
├── pages/            # Application pages (Home, Portfolio, AdminDashboard)
├── utils/            # Utility functions (Auth service, JWT simulation)
├── App.jsx           # Main router & layout configuration with animations
└── main.jsx          # Entry point
```

## 🚀 Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Run Development Server**
    ```bash
    npm run dev
    ```

3.  **Build for Production**
    ```bash
    npm run build
    ```

## 🎨 Design System

-   **Colors**:
    -   *Primary*: Nude-900 (Dark Brown/Black)
    -   *Accent*: Gold-500/600
    -   *Background*: Nude-50 (Soft Cream)
-   **Typography**:
    -   *Headings*: Serif (Playfair Display / Custom)
    -   *Body*: Sans-serif (Inter / System)


---
© 2024 HairHarmony Studio. All rights reserved.
