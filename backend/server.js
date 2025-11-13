// server.js
import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js"; // <== ESTA RUTA ES IMPORTANTE

const app = express();

app.use(cors({
  origin: "http://localhost:5173",
  methods: "GET,POST",
  credentials: true
}));

app.use(express.json());

// Rutas
app.use("/api/auth", authRoutes);

// Servidor
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

