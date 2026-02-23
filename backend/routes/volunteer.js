// Simple validation helper
function validateVolunteerData(data) {
    const errors = [];
    
    if (!data.fullName || data.fullName.trim().length === 0) {
        errors.push({ field: 'fullName', message: 'Full name is required' });
    }
    
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.push({ field: 'email', message: 'Valid email is required' });
    }
    
    if (!data.phone || data.phone.trim().length === 0) {
        errors.push({ field: 'phone', message: 'Phone number is required' });
    }
    
    const age = parseInt(data.age);
    if (!age || age < 16 || age > 80) {
        errors.push({ field: 'age', message: 'Age must be between 16 and 80' });
    }
    
    if (!data.city || data.city.trim().length === 0) {
        errors.push({ field: 'city', message: 'City is required' });
    }
    
    if (!data.availability || data.availability.trim().length === 0) {
        errors.push({ field: 'availability', message: 'Availability is required' });
    }
    
    if (!data.role || data.role.trim().length === 0) {
        errors.push({ field: 'role', message: 'Preferred role is required' });
    }
    
    if (!data.shirtSize || data.shirtSize.trim().length === 0) {
        errors.push({ field: 'shirtSize', message: 'Shirt size is required' });
    }
    
    if (!data.emergency || data.emergency.trim().length === 0) {
        errors.push({ field: 'emergency', message: 'Emergency contact is required' });
    }
    
    if (!data.consent) {
        errors.push({ field: 'consent', message: 'Consent is required' });
    }
    
    return errors;
}

const createTableSql = `
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
`;

async function volunteerHandler(req, res, pathname, method, sendJSON) {
    const pool = req.pool;

    // Only handle POST to /api/volunteer
    if (pathname === '/api/volunteer' && method === 'POST') {
        const errors = validateVolunteerData(req.body);
        
        if (errors.length > 0) {
            return sendJSON(res, 400, { success: false, errors });
        }

        const {
            fullName,
            email,
            phone,
            age,
            city,
            availability,
            role,
            shirtSize,
            experience,
            emergency,
            consent
        } = req.body;

        try {
            await pool.query(createTableSql);

            await pool.query(
                `INSERT INTO volunteer_applications
                    (full_name, email, phone, age, city, availability, preferred_role, shirt_size, experience, emergency_contact, consent)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                    fullName,
                    email,
                    phone,
                    age,
                    city,
                    availability,
                    role,
                    shirtSize,
                    experience || null,
                    emergency,
                    consent === 'on' || consent === true
                ]
            );

            return sendJSON(res, 201, {
                success: true,
                message: 'Volunteer application received.'
            });
        } catch (error) {
            console.error('Volunteer application error:', error);
            return sendJSON(res, 500, {
                success: false,
                message: 'Failed to submit application. Please try again.'
            });
        }
    }

    return sendJSON(res, 404, { success: false, message: 'Route not found' });
}

module.exports = volunteerHandler;
