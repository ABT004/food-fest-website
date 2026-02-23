const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrateDatabase() {
    let connection;
    
    try {
        connection = await mysql.createConnection({
            host: process.env.DB_HOST || 'localhost',
            user: process.env.DB_USER || 'root',
            password: process.env.DB_PASSWORD || '',
            database: 'food_fest'
        });

        console.log('Connected to food_fest database');

        const [columns] = await connection.query(
            "SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'users' AND COLUMN_NAME = 'avatar'"
        );

        if (columns.length > 0) {
            console.log('✅ Avatar column already exists in users table');
            return;
        }

        console.log('⏳ Adding avatar column to users table...');
        await connection.query(
            'ALTER TABLE users ADD COLUMN avatar LONGTEXT AFTER date_of_birth'
        );

        console.log('✅ Avatar column added successfully!');
        
    } catch (error) {
        console.error('❌ Migration error:', error.message);
        throw error;
    } finally {
        if (connection) {
            await connection.end();
        }
    }
}

if (require.main === module) {
    migrateDatabase()
        .then(() => {
            console.log('\n🎉 Migration complete!');
            process.exit(0);
        })
        .catch((error) => {
            console.error('\n❌ Migration failed:', error);
            process.exit(1);
        });
}

module.exports = migrateDatabase;
