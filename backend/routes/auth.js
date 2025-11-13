// backend/routes/auth.js
import express from "express";
import connection from "../db.js"; // ✅ Importación corregida (sin llaves)

const router = express.Router();

// Ruta de inicio de sesión
router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  // Validar que se envíen ambos campos
  if (!correo || !contrasena) {
    return res.status(400).json({ success: false, message: "Faltan datos" });
  }

  try {
    // Consulta para verificar usuario
    const [rows] = await connection
      .promise()
      .query("SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?", [
        correo,
        contrasena,
      ]);

    // Validar si hay resultados
    if (rows.length > 0) {
      res.json({ success: true, user: rows[0] });
    } else {
      res
        .status(401)
        .json({ success: false, message: "Correo o contraseña incorrectos" });
    }
  } catch (error) {
    console.error("❌ Error en la consulta:", error);
    res.status(500).json({ success: false, message: "Error en el servidor" });
  }
});

export default router;

