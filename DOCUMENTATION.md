# Food Fest Website Documentation

## 1. Overview
The Food Fest Website is a responsive, multi-page festival site built with HTML, CSS, and vanilla JavaScript. It includes event listings, event details, volunteer signup, authentication flows, user profile pages, and a multi-step checkout experience. A lightweight backend built with native Node.js HTTP and MySQL provides authentication and data services.

## 2. Tech Stack
- Frontend: HTML5, CSS3, JavaScript (no framework)
- Backend: Node.js (native http module, no Express)
- Database: MySQL 8.x
- Auth: JWT-based sessions

## 3. Project Structure
- [html](html) - All HTML pages
- [css](css) - Page stylesheets
- [js](js) - Frontend scripts
- [backend](backend) - Node.js server and API routes
- [pictures](pictures) - Images
- [videos](videos) - Video assets

## 4. Pages and Purpose

### Public Pages
- [html/index.html](html/index.html) - Home page with hero video and sections
- [html/events.html](html/events.html) - Events list and highlights
- [html/tokha-events.html](html/tokha-events.html) - Tokha event details
- [html/tudikhel-events.html](html/tudikhel-events.html) - Tudikhel event details
- [html/kritipur-events.html](html/kritipur-events.html) - Kritipur event details
- [html/bouddha-events.html](html/bouddha-events.html) - Bouddha event details
- [html/event-expired.html](html/event-expired.html) - Expired event message
- [html/about-us.html](html/about-us.html) - About page
- [html/contact-us.html](html/contact-us.html) - Contact form
- [html/contact-us-vendor-sponsor.html](html/contact-us-vendor-sponsor.html) - Vendor/Sponsor form
- [html/volunteer.html](html/volunteer.html) - Volunteer application

### Auth and Account Pages
- [html/login.html](html/login.html) - Login
- [html/register.html](html/register.html) - Registration
- [html/forgot-password.html](html/forgot-password.html) - Reset password
- [html/verify-otp.html](html/verify-otp.html) - OTP verification
- [html/wrong-otp.html](html/wrong-otp.html) - Invalid OTP
- [html/password-change-confirmed.html](html/password-change-confirmed.html) - Password success
- [html/profile-page.html](html/profile-page.html) - Profile
- [html/profile-order.html](html/profile-order.html) - Orders
- [html/profile-cancel.html](html/profile-cancel.html) - Cancellations
- [html/profile-change-password.html](html/profile-change-password.html) - Change password

### Checkout Flow
- [html/checkout-1.html](html/checkout-1.html) - Ticket selection
- [html/checkout-2.html](html/checkout-2.html) - Billing and payment
- [html/checkout-confirmed.html](html/checkout-confirmed.html) - Confirmation
- [html/checkout-failed.html](html/checkout-failed.html) - Failure

## 5. Core Features

### Navigation
- Desktop navbar provides site-wide navigation and action buttons.
- Mobile navigation uses a hamburger menu that is injected by script.

### Events
- Upcoming and previous events are listed with detail pages.
- Event detail pages include a slider, description, and ticket actions.

### Checkout
- Step 1: Select VIP and normal ticket quantities.
- Step 2: Enter billing details and choose a payment option.
- Order summary is calculated from ticket quantities.

### Authentication
- Login, registration, OTP verification, and password reset flows.
- User data is stored in local storage for session personalization.

### Volunteer and Contact
- Volunteer and vendor/sponsor forms post data to the backend.

## 6. Frontend Data Handling
- `localStorage` is used for auth data (`token`, `userId`, `userName`, `userEmail`).
- `sessionStorage` is used to pass event and order context between checkout steps.

## 7. Backend Overview
The backend is built with the native Node.js `http` module. It handles routing, JSON parsing, and CORS manually. It provides authentication, user management, event data, order handling, and volunteer submission.

### Example API Endpoints
- `POST /api/auth/register`
- `POST /api/auth/login`
- `POST /api/auth/request-otp`
- `POST /api/auth/verify-otp`
- `POST /api/auth/reset-password`
- `GET /api/events`
- `POST /api/orders`
- `POST /api/volunteer`

## 8. Database Design (High-Level)
- `users` - user accounts
- `events` - event listings
- `orders` - order records
- `tickets` - ticket line items
- `volunteers` - volunteer applications
- `returns` - order returns and cancellations

## 9. Setup and Run

### Prerequisites
- Node.js v14+ and npm
- MySQL 8+

### Backend Setup
1. Install dependencies:
   ```bash
   cd backend
   npm install
   ```
2. Configure environment:
   ```bash
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password
   DB_NAME=food_fest
   JWT_SECRET=your_secret_key
   PORT=3000
   ```
3. Initialize database:
   ```bash
   npm run init-db
   ```
4. Start server:
   ```bash
   npm start
   ```

### Frontend Run
Open [html/index.html](html/index.html) directly or use a local server:
```bash
npx http-server -c-1 -o
```

## 10. Testing Checklist

### Responsive
- Desktop: 1440px
- Tablet: 1024px
- Mobile: 768px
- Small mobile: 480px

### Cross-Browser
- Chrome
- Edge
- Firefox
- Safari

## 11. Known Limitations
- Payment gateways are simulated and do not process real transactions.
- Some flows depend on local storage and session storage rather than server sessions.
- Certain pages require backend services running to complete flows.

## 12. Future Improvements
- Real payment gateway integration
- Centralized auth middleware
- Improved accessibility and ARIA coverage
- Analytics and event tracking
