const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function initializeDatabase() {
    let connection;
    
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            multipleStatements: true
        });

        console.log('Connected to MySQL server');

        const schemaPath = path.join(__dirname, 'schema.sql');
        const schema = fs.readFileSync(schemaPath, 'utf8');

        console.log('Executing database schema...');
        await connection.query(schema);

        console.log('✅ Database initialized successfully!');
        console.log('✅ Tables created');
        console.log('✅ Sample events inserted');
        
    } catch (error) {
        console.error('❌ Error initializing database:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

if (require.main === module) {
    initializeDatabase()
        .then(() => {
            console.log('\n🎉 Database setup complete!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n❌ Database setup failed:', error);
            process.exit(1);
        });
}

module.exports = initializeDatabase;
