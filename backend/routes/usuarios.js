// backend/routes/usuarios.js
import { Router } from "express";
import pool from "../db.js";
import bcrypt from "bcryptjs"; 

const router = Router();

// GET: Listar usuarios (usando tus columnas: id, nombre, correo, rol)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id, nombre, correo, rol FROM usuarios");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Crear usuario nuevo
router.post("/", async (req, res) => {
  // Recibimos los datos con los nombres que usará el Frontend
  const { nombre, correo, contrasena, rol } = req.body;

  try {
    // 1. Verificar si el correo ya existe
    const [userExist] = await pool.query("SELECT * FROM usuarios WHERE correo = ?", [correo]);
    if (userExist.length > 0) return res.status(400).json({ message: "El correo ya está registrado" });

    // 2. Encriptar contraseña
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(contrasena, salt);

    // 3. Guardar en TU tabla 'usuarios' con tus columnas
    await pool.query(
      "INSERT INTO usuarios (nombre, correo, contrasena, rol) VALUES (?, ?, ?, ?)",
      [nombre, correo, hashedPassword, rol || 'empleado']
    );

    res.json({ message: "Usuario creado exitosamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
});

// DELETE: Eliminar usuario
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM usuarios WHERE id = ?", [req.params.id]);
    res.json({ message: "Usuario eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

export default router;