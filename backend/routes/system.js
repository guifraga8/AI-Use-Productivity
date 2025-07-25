const express = require("express");
const pool = require("../db");
const router = express.Router();

router.get("/system/ping", (req, res) => {
  res.json({ message: "pong" });
});

router.get("/system/status", async (req, res) => {
  try {
    await pool.query("SELECT 1");
    res.json({
      uptime: process.uptime(),
      timestamp: new Date(),
      database: "Banco de dados conectado",
      message: "API funcionando normalmente.",
    });
  } catch (error) {
    console.error("Erro na verificação do banco:", error);
    res.status(500).json({
      uptime: process.uptime(),
      timestamp: new Date(),
      database: "Erro ao conectar ao banco de dados",
      message: "API ativa, mas há problema com o banco de dados.",
    });
  }
});

module.exports = router;
