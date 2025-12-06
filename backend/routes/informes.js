// backend/routes/informes.js
import { Router } from "express";
import pool from "../db.js";

const router = Router();

// 1. TOP PRODUCTOS MÁS VENDIDOS
// Sumamos todas las 'salidas' de la tabla movimientos agrupadas por producto
router.get("/mas-vendidos", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT p.nombre, SUM(m.cantidad) as total_vendido 
      FROM movimientos m
      JOIN productos p ON m.producto_id = p.id
      WHERE m.tipo = 'salida'
      GROUP BY p.id, p.nombre
      ORDER BY total_vendido DESC
      LIMIT 5
    `);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener ventas" });
  }
});

// 2. VALOR DEL INVENTARIO ACTUAL
// Multiplicamos Stock * Precio de cada producto
router.get("/inventario-valorizado", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT nombre, stock, precio, (stock * precio) as valor_total 
      FROM productos 
      ORDER BY valor_total DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error al valorizar inventario" });
  }
});

export default router;