import mysql from "mysql2/promise";
import dotenv from "dotenv";

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

const testConnection = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Database connection was successful.");
    connection.release();
  } catch (err) {
    console.error("Database connection failed: " + err.stack);
  }
};

// Teszteljük a kapcsolatot a szerver indítása előtt
testConnection();

export default pool;