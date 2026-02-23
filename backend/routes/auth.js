const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Simple auth handler without Express framework
async function authHandler(req, res, pathname, method, sendJSON) {
    const pool = req.pool;
    
    // POST /api/auth/register
    if (pathname === '/api/auth/register' && method === 'POST') {
        const { email, password, firstName, lastName, phone } = req.body;
        
        try {
            const [existing] = await pool.query(
                'SELECT user_id FROM users WHERE email = ?',
                [email]
            );

            if (existing.length > 0) {
                return sendJSON(res, 400, { success: false, message: 'User already exists' });
            }

            const passwordHash = await bcrypt.hash(password, 10);

            const [result] = await pool.query(
                'INSERT INTO users (first_name, last_name, email, phone, password_hash) VALUES (?, ?, ?, ?, ?)',
                [firstName, lastName, email, phone || null, passwordHash]
            );

            return sendJSON(res, 201, {
                success: true,
                message: 'Registration successful!',
                userId: result.insertId
            });
        } catch (error) {
            console.error('Registration error:', error);
            return sendJSON(res, 500, {
                success: false,
                message: 'Registration failed'
            });
        }
    }
    
    // POST /api/auth/login
    if (pathname === '/api/auth/login' && method === 'POST') {
        const { email, password } = req.body;
        
        try {
            const [users] = await pool.query(
                'SELECT user_id, first_name, last_name, email, password_hash FROM users WHERE email = ?',
                [email]
            );

            if (users.length === 0) {
                return sendJSON(res, 401, { success: false, message: 'Invalid credentials' });
            }

            const user = users[0];
            const passwordMatch = await bcrypt.compare(password, user.password_hash);

            if (!passwordMatch) {
                return sendJSON(res, 401, { success: false, message: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user.user_id, email: user.email },
                process.env.JWT_SECRET || 'fallback-secret',
                { expiresIn: '24h' }
            );

            return sendJSON(res, 200, {
                success: true,
                message: 'Login successful',
                token,
                user: {
                    userId: user.user_id,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            return sendJSON(res, 500, {
                success: false,
                message: 'Login failed'
            });
        }
    }
    
    return sendJSON(res, 404, { success: false, message: 'Auth route not found' });
}

module.exports = authHandler;
