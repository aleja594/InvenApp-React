// backend/db.js
import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config(); 

// --- ZONA DE DEPURACIÓN (Veremos esto en la terminal) ---
console.log("---- INTENTANDO CONECTAR A MYSQL ----");
console.log("Host:", process.env.DB_HOST);
console.log("Usuario:", process.env.DB_USER);
console.log("Base de Datos:", process.env.DB_NAME);
console.log("Password (longitud):", process.env.DB_PASSWORD ? process.env.DB_PASSWORD.length : "Sin password");
console.log("---------------------------------------");
// --------------------------------------------------------

const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "invenapp_db", // Aquí usará tu base correcta
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool