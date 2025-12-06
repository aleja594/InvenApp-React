import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import productosRoutes from "./routes/productos.js";
import dashboardRoutes from "./routes/dashboard.js"; 
import tercerosRoutes from "./routes/terceros.js";
import movimientosRoutes from "./routes/movimientos.js";
import usuariosRoutes from "./routes/usuarios.js";
import informesRoutes from "./routes/informes.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/productos", productosRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/terceros", tercerosRoutes);
app.use("/api/movimientos", movimientosRoutes);
app.use("/api/usuarios", usuariosRoutes);
app.use("/api/informes", informesRoutes);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

