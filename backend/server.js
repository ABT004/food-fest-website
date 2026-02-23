const http = require('http');
const url = require('url');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 3000;

const { pool, transporter } = require('./config/database');

// Test database connection
pool.getConnection().then(connection => {
    console.log('✅ Database connected successfully');
    connection.release();
}).catch(error => {
    console.error('❌ Database connection failed:', error.message);
});

// Import route handlers
const authHandler = require('./routes/auth');
const ticketHandler = require('./routes/tickets');
const orderHandler = require('./routes/orders');
const profileHandler = require('./routes/profile');
const paymentHandler = require('./routes/payment');
const eventHandler = require('./routes/events');
const volunteerHandler = require('./routes/volunteer');

// Helper function to parse JSON body
function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(body ? JSON.parse(body) : {});
            } catch (e) {
                resolve({});
            }
        });
        req.on('error', reject);
    });
}

// Helper function to send JSON response
function sendJSON(res, statusCode, data) {
    res.writeHead(statusCode, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    res.end(JSON.stringify(data));
}

// Create HTTP server
const server = http.createServer(async (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // Handle CORS preflight
    if (method === 'OPTIONS') {
        res.writeHead(204, {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        });
        res.end();
        return;
    }

    // Attach pool and transporter to request
    req.pool = pool;
    req.transporter = transporter;
    req.query = parsedUrl.query;

    // Parse body for POST/PUT requests
    if (method === 'POST' || method === 'PUT') {
        req.body = await parseBody(req);
    }

    // Router
    try {
        if (pathname.startsWith('/api/auth')) {
            await authHandler(req, res, pathname, method, sendJSON);
        } else if (pathname.startsWith('/api/tickets')) {
            await ticketHandler(req, res, pathname, method, sendJSON);
        } else if (pathname.startsWith('/api/orders')) {
            await orderHandler(req, res, pathname, method, sendJSON);
        } else if (pathname.startsWith('/api/profile')) {
            await profileHandler(req, res, pathname, method, sendJSON);
        } else if (pathname.startsWith('/api/payment')) {
            await paymentHandler(req, res, pathname, method, sendJSON);
        } else if (pathname.startsWith('/api/events')) {
            await eventHandler(req, res, pathname, method, sendJSON);
        } else if (pathname.startsWith('/api/volunteer')) {
            await volunteerHandler(req, res, pathname, method, sendJSON);
        } else if (pathname === '/health' || pathname === '/') {
            sendJSON(res, 200, { status: 'ok', message: 'Server is running' });
        } else {
            sendJSON(res, 404, { success: false, message: 'Route not found' });
        }
    } catch (error) {
        console.error('Server error:', error);
        sendJSON(res, 500, { success: false, message: 'Internal server error' });
    }
});

server.listen(PORT, () => {
    console.log(`🚀 Food Fest API server running on port ${PORT}`);
});

module.exports = { pool, transporter };
