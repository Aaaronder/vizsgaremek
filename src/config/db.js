import mysql from 'mysql2';
import dotenv from 'dotenv';

// Betölti a .env fájlban lévő változókat
dotenv.config(); 

// Adatbázis kapcsolat létrehozása
const dbConnection = mysql.createConnection({
    port: process.env.PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

dbConnection.connect((err) => {
    if (err) {
        console.error('Error connection to MySql server: ' + err.stack);
        return;
    }
    console.log('Successfully connected to MySql server');
});

const promisePool = dbConnection.promise();

export default promisePool;