// backend/routes/terceros.js
import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET: Obtener todos (Clientes y Proveedores)
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM terceros ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Crear nuevo
router.post("/", async (req, res) => {
  const { nombre, tipo, telefono, email } = req.body;
  try {
    const [result] = await pool.query(
      "INSERT INTO terceros (nombre, tipo, telefono, email) VALUES (?, ?, ?, ?)",
      [nombre, tipo, telefono, email]
    );
    res.json({ id: result.insertId, nombre, tipo, telefono, email });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar" });
  }
});

// DELETE: Eliminar
router.delete("/:id", async (req, res) => {
  try {
    await pool.query("DELETE FROM terceros WHERE id = ?", [req.params.id]);
    res.json({ message: "Eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

export default router;