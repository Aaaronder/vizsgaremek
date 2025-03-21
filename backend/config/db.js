// Modúlok importálása
import mysql from "mysql2/promise";
import dotenv from "dotenv";

// A .env fájlban található változókat betöltése a process.env objektumba
dotenv.config();

// Pool létrehozása
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Függvény a kapcsolat teszterlésére
const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection was successful.");
    connection.release();
  } catch (err) {
    console.error("Database connection failed: " + err.stack);
  }
};

// Tesztelő függvény meghívása
testConnection();

// Pool objektum exportálása
export default pool;