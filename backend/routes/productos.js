// UBICACIÓN: backend/routes/productos.js
import { Router } from "express";
import pool from "../db.js"; // <--- Aquí SÍ funciona importar la DB

const router = Router();

// GET: Obtener productos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM productos ORDER BY id DESC");
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Guardar producto nuevo
router.post("/", async (req, res) => {
  const { nombre, precio, stock, categoria } = req.body;
  
  console.log("Guardando:", req.body); // Verás esto en la terminal negra

  try {
    const [result] = await pool.query(
      "INSERT INTO productos (nombre, precio, stock, categoria) VALUES (?, ?, ?, ?)", 
      [nombre, precio, stock, categoria]
    );
    res.json({ id: result.insertId, ...req.body });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al guardar en BD" });
  }
});

// ELIMINAR PRODUCTO (DELETE)
router.delete("/:id", async (req, res) => {
  const { id } = req.params; // Obtenemos el ID de la URL
  try {
    await pool.query("DELETE FROM productos WHERE id = ?", [id]);
    res.json({ message: "Producto eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar" });
  }
});

// ACTUALIZAR PRODUCTO (PUT)
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, stock, categoria } = req.body;

  try {
    await pool.query(
      "UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria = ? WHERE id = ?",
      [nombre, precio, stock, categoria, id]
    );
    res.json({ message: "Producto actualizado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar" });
  }
});

export default router;