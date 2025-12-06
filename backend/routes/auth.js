// backend/routes/auth.js
import { Router } from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs"; // Necesario para comparar contraseñas

const router = Router();

router.post("/login", async (req, res) => {
  const { correo, contrasena } = req.body;

  try {
    // 1. Buscar usuario por correo
    const [users] = await pool.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);

    // Si no existe el usuario
    if (users.length === 0) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const usuario = users[0];

    // 2. Comparar contraseñas (La que escribes vs La encriptada)
    const passwordEsCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);

    if (!passwordEsCorrecta) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // 3. ¡Éxito! Devolvemos datos del usuario (menos la contraseña)
    res.json({
      message: "Login exitoso",
      user: {
        id: usuario.id,
        nombre: usuario.nombre,
        correo: usuario.correo,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;

