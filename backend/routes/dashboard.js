// backend/routes/dashboard.js
import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/resumen", async (req, res) => {
  try {
    // 1. Total de Productos
    const [totalProd] = await pool.query("SELECT COUNT(*) as total FROM productos");
    
    // 2. Valor Total del Inventario (Precio * Stock)
    const [totalValor] = await pool.query("SELECT SUM(precio * stock) as valor FROM productos");
    
    // 3. Productos con Stock Bajo (menos de 5 unidades)
    const [bajoStock] = await pool.query("SELECT COUNT(*) as total FROM productos WHERE stock < 5");

    // 4. Lista de productos con stock bajo (para mostrar en detalle)
    const [listaBajoStock] = await pool.query("SELECT nombre, stock FROM productos WHERE stock < 5 LIMIT 5");

    res.json({
      totalProductos: totalProd[0].total,
      valorInventario: totalValor[0].valor || 0, // Si es null, pon 0
      productosBajoStock: bajoStock[0].total,
      detallesBajoStock: listaBajoStock
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error calculando estadísticas" });
  }
});

export default router;