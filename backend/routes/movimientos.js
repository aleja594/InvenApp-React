// backend/routes/movimientos.js
import { Router } from "express";
import pool from "../db.js";

const router = Router();

// GET: Obtener historial de movimientos
router.get("/", async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT m.id, m.tipo, m.cantidad, m.fecha, p.nombre as producto, t.nombre as tercero 
      FROM movimientos m
      JOIN productos p ON m.producto_id = p.id
      LEFT JOIN terceros t ON m.tercero_id = t.id
      ORDER BY m.fecha DESC
    `);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST: Registrar movimiento y ACTUALIZAR STOCK
router.post("/", async (req, res) => {
  const { producto_id, tipo, cantidad, tercero_id } = req.body;
  const cant = Number(cantidad);

  if (!producto_id || !cant || cant <= 0) {
    return res.status(400).json({ message: "Datos inválidos" });
  }

  try {
    // 1. Verificar si hay stock suficiente (solo para salidas)
    if (tipo === 'salida') {
      const [prod] = await pool.query("SELECT stock FROM productos WHERE id = ?", [producto_id]);
      if (prod[0].stock < cant) {
        return res.status(400).json({ message: "❌ No hay suficiente stock para realizar la venta" });
      }
    }

    // 2. Registrar el movimiento en el historial
    await pool.query(
      "INSERT INTO movimientos (producto_id, tipo, cantidad, tercero_id) VALUES (?, ?, ?, ?)",
      [producto_id, tipo, cant, tercero_id || null]
    );

    // 3. ACTUALIZAR EL STOCK AUTOMÁTICAMENTE
    // Si es entrada SUMA (+), si es salida RESTA (-)
    const operador = tipo === 'entrada' ? '+' : '-';
    await pool.query(
      `UPDATE productos SET stock = stock ${operador} ? WHERE id = ?`,
      [cant, producto_id]
    );

    res.json({ message: "Movimiento registrado y stock actualizado" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en la transacción" });
  }
});

export default router;