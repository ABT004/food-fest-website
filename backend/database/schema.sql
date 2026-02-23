-- Food Fest Database Schema
-- Create database
CREATE DATABASE IF NOT EXISTS food_fest;
USE food_fest;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    user_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    phone VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    date_of_birth DATE,
    avatar LONGTEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    INDEX idx_email (email),
    INDEX idx_phone (phone)
);

-- OTP verification table
CREATE TABLE IF NOT EXISTS otp_verification (
    otp_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    email VARCHAR(100) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    purpose ENUM('registration', 'password_reset') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_email_otp (email, otp_code)
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    event_id INT PRIMARY KEY AUTO_INCREMENT,
    event_name VARCHAR(100) NOT NULL,
    location VARCHAR(200) NOT NULL,
    address TEXT,
    event_date DATE NOT NULL,
    start_time TIME,
    end_time TIME,
    description TEXT,
    image_url VARCHAR(255),
    vip_price DECIMAL(10, 2) NOT NULL,
    normal_price DECIMAL(10, 2) NOT NULL,
    vip_tickets_available INT DEFAULT 0,
    normal_tickets_available INT DEFAULT 0,
    total_vip_tickets INT DEFAULT 0,
    total_normal_tickets INT DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE,
    is_expired BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_event_date (event_date),
    INDEX idx_location (location)
);

-- Orders table
CREATE TABLE IF NOT EXISTS orders (
    order_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    event_id INT NOT NULL,
    vip_ticket_count INT DEFAULT 0,
    normal_ticket_count INT DEFAULT 0,
    total_amount DECIMAL(10, 2) NOT NULL,
    payment_method ENUM('esewa', 'khalti', 'card') NOT NULL,
    payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
    order_status ENUM('confirmed', 'cancelled', 'refunded') DEFAULT 'confirmed',
    transaction_id VARCHAR(100),
    billing_first_name VARCHAR(50) NOT NULL,
    billing_last_name VARCHAR(50) NOT NULL,
    billing_email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (event_id) REFERENCES events(event_id) ON DELETE CASCADE,
    INDEX idx_user_orders (user_id),
    INDEX idx_event_orders (event_id),
    INDEX idx_payment_status (payment_status)
);

-- Tickets table
CREATE TABLE IF NOT EXISTS tickets (
    ticket_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    ticket_type ENUM('vip', 'normal') NOT NULL,
    ticket_code VARCHAR(50) UNIQUE NOT NULL,
    qr_code_url VARCHAR(255),
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    INDEX idx_ticket_code (ticket_code),
    INDEX idx_order_tickets (order_id)
);

-- Returns/Cancellations table
CREATE TABLE IF NOT EXISTS returns_cancellations (
    return_id INT PRIMARY KEY AUTO_INCREMENT,
    order_id INT NOT NULL,
    user_id INT NOT NULL,
    reason TEXT,
    status ENUM('pending', 'approved', 'rejected', 'completed') DEFAULT 'pending',
    refund_amount DECIMAL(10, 2),
    requested_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    processed_at TIMESTAMP NULL,
    processed_by VARCHAR(100),
    FOREIGN KEY (order_id) REFERENCES orders(order_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_user_returns (user_id),
    INDEX idx_status (status)
);

-- Password reset tokens table
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    token_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    reset_token VARCHAR(255) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
    INDEX idx_reset_token (reset_token)
);

-- Admin/Vendor users table
CREATE TABLE IF NOT EXISTS admin_users (
    admin_id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role ENUM('admin', 'vendor', 'sponsor') NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Session logs for security
CREATE TABLE IF NOT EXISTS session_logs (
    log_id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE SET NULL,
    INDEX idx_user_logs (user_id),
    INDEX idx_created_at (created_at)
);

-- Volunteer applications table
CREATE TABLE IF NOT EXISTS volunteer_applications (
    application_id INT PRIMARY KEY AUTO_INCREMENT,
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    age INT NOT NULL,
    city VARCHAR(100) NOT NULL,
    availability VARCHAR(100) NOT NULL,
    preferred_role VARCHAR(50) NOT NULL,
    shirt_size VARCHAR(10) NOT NULL,
    experience TEXT,
    emergency_contact VARCHAR(150) NOT NULL,
    consent BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample events
INSERT INTO events (event_name, location, address, event_date, start_time, end_time, description, vip_price, normal_price, vip_tickets_available, normal_tickets_available, total_vip_tickets, total_normal_tickets) VALUES
('Food Fest Kathmandu', 'Basantapur, Kathmandu', 'Basantapur Durbar Square, Kathmandu', '2025-11-08', '10:00:00', '22:00:00', 'Grand food festival at the heart of Kathmandu with cuisines from all over Nepal', 2500.00, 500.00, 100, 500, 100, 500),
('Bhaktapur Food Carnival', 'Durbar Square, Bhaktapur', 'Bhaktapur Durbar Square', '2025-05-25', '09:00:00', '21:00:00', 'Experience authentic Newari cuisine and traditional food culture', 2500.00, 500.00, 80, 400, 80, 400),
('Jawalakhel Food Fair', 'Jawalakhel, Kathmandu', 'Jawalakhel Chowk, Lalitpur', '2025-04-20', '11:00:00', '20:00:00', 'Modern fusion food festival with live cooking demonstrations', 2500.00, 500.00, 50, 300, 50, 300),
('Tokha Street Food Festival', 'Tokha, Kathmandu', 'Tokha Municipality Ground', '2025-01-02', '12:00:00', '23:00:00', 'Street food paradise with vendors from across the valley', 2500.00, 500.00, 60, 350, 60, 350);
