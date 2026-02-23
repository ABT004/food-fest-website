# Food Fest Backend API

Complete backend API server for the Food Fest website with user authentication, ticket purchasing, and order management.

## Features

- ✅ User Registration & Login
- ✅ Email OTP Verification
- ✅ Password Reset
- ✅ Ticket Purchasing
- ✅ Order Management
- ✅ Profile Management
- ✅ Payment Integration (E-Sewa & Khalti)
- ✅ Email Notifications
- ✅ JWT Authentication
- ✅ MySQL Database

## Tech Stack

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MySQL** - Database
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Express Validator** - Input validation

## Installation

### Prerequisites

- Node.js (v14 or higher)
- MySQL (v8 or higher)
- npm or yarn

### Setup Steps

1. **Install Dependencies**
```bash
cd backend
npm install
```

2. **Configure Environment**

Create a `.env` file in the backend directory:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=food_fest
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASSWORD=your_app_password
```

3. **Initialize Database**
```bash
npm run init-db
```

This will:
- Create the database
- Create all tables
- Insert sample event data

4. **Start Server**

Development mode (with auto-restart):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

Server will run on `http://localhost:3000`

## API Endpoints

### Authentication

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9841234567",
  "dateOfBirth": "1995-05-15"
}
```

#### Verify OTP
```http
POST /api/auth/verify-otp
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Forgot Password
```http
POST /api/auth/forgot-password
Content-Type: application/json

{
  "email": "user@example.com"
}
```

#### Reset Password
```http
POST /api/auth/reset-password
Content-Type: application/json

{
  "email": "user@example.com",
  "otp": "123456",
  "newPassword": "newpassword123"
}
```

### Events

#### Get All Events
```http
GET /api/events
```

#### Get Event by ID
```http
GET /api/events/:eventId
```

#### Check Ticket Availability
```http
GET /api/events/:eventId/availability
```

### Tickets

#### Purchase Tickets
```http
POST /api/tickets/purchase
Authorization: Bearer {token}
Content-Type: application/json

{
  "eventId": 1,
  "vipTicketCount": 2,
  "normalTicketCount": 3,
  "paymentMethod": "esewa",
  "billingFirstName": "John",
  "billingLastName": "Doe",
  "billingEmail": "john@example.com"
}
```

#### Get Ticket Details
```http
GET /api/tickets/:ticketCode
```

### Orders

#### Get User Orders
```http
GET /api/orders/user/:userId
Authorization: Bearer {token}
```

#### Get Order Details
```http
GET /api/orders/:orderId
Authorization: Bearer {token}
```

#### Cancel Order
```http
POST /api/orders/:orderId/cancel
Authorization: Bearer {token}
Content-Type: application/json

{
  "reason": "Cannot attend the event"
}
```

#### Get Order Statistics
```http
GET /api/orders/user/:userId/statistics
Authorization: Bearer {token}
```

### Profile

#### Get User Profile
```http
GET /api/profile/:userId
Authorization: Bearer {token}
```

#### Update Profile
```http
PUT /api/profile/:userId
Authorization: Bearer {token}
Content-Type: application/json

{
  "firstName": "John",
  "lastName": "Doe",
  "phone": "9841234567",
  "dateOfBirth": "1995-05-15"
}
```

#### Change Password
```http
POST /api/profile/change-password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "oldpassword123",
  "newPassword": "newpassword123"
}
```

#### Get Returns/Cancellations
```http
GET /api/profile/:userId/returns
Authorization: Bearer {token}
```

### Payment

#### Initialize E-Sewa Payment
```http
POST /api/payment/esewa
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": 1,
  "amount": 3000
}
```

#### Initialize Khalti Payment
```http
POST /api/payment/khalti
Authorization: Bearer {token}
Content-Type: application/json

{
  "orderId": 1,
  "amount": 3000
}
```

#### Verify E-Sewa Payment
```http
POST /api/payment/esewa/verify
Content-Type: application/json

{
  "oid": "1",
  "amt": "3000",
  "refId": "0000AB1"
}
```

#### Get Payment Status
```http
GET /api/payment/:orderId/status
Authorization: Bearer {token}
```

## Database Schema

### Tables

- **users** - User accounts
- **otp_verification** - OTP codes for verification
- **events** - Food festival events
- **orders** - Ticket orders
- **tickets** - Individual tickets
- **returns_cancellations** - Order cancellations
- **password_reset_tokens** - Password reset tokens
- **admin_users** - Admin/vendor accounts
- **session_logs** - User activity logs

## Email Configuration

For Gmail:
1. Enable 2-factor authentication
2. Generate App Password: Google Account → Security → App Passwords
3. Use app password in `.env` file

## Payment Gateway Setup

### E-Sewa
1. Register merchant account at https://esewa.com.np
2. Get Merchant ID and Secret Key
3. Add to `.env` file

### Khalti
1. Register merchant account at https://khalti.com
2. Get Public and Secret Keys
3. Add to `.env` file

## Security Features

- Password hashing with bcrypt
- JWT token authentication
- Input validation
- SQL injection prevention
- CORS protection
- Session logging

## Error Handling

All endpoints return consistent error responses:
```json
{
  "success": false,
  "message": "Error description"
}
```

## Development

Run in development mode with auto-reload:
```bash
npm run dev
```

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Use strong JWT secret
3. Configure production database
4. Set up SSL/HTTPS
5. Configure production email service
6. Set up proper CORS origins

## Testing

Test the API health:
```http
GET /api/health
```

Response:
```json
{
  "status": "ok",
  "message": "Food Fest API is running"
}
```

## License

MIT
