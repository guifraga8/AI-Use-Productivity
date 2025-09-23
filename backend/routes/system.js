import express from "express";
import pool from "../db.js";
import fs from "fs";
import path from "path";

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

router.post("/system/cleanup", (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    const dirs = ["tmp", "uploads"];

    dirs.forEach((dir) => {
      const fullPath = path.resolve(dir);

      if (fs.existsSync(fullPath)) {
        fs.readdirSync(fullPath).forEach((file) => {
          if (file.endsWith(".zip")) {
            const filePath = path.join(fullPath, file);
            fs.rmSync(filePath, { force: true });
            console.log(`Arquivo removido: ${filePath}`);
          }
        });
      } else {
        console.warn(`Pasta não encontrada: ${fullPath}`);
      }
    });

    res.json({ message: "Arquivos .zip removidos das pastas tmp e uploads." });
  } catch (error) {
    console.error("Erro ao limpar pastas:", error);
    res.status(500).json({ error: "Erro ao limpar pastas." });
  }
});

router.post("/system/truncate", async (req, res) => {
  try {
    const adminKey = req.headers["x-admin-key"];

    if (!adminKey || adminKey !== process.env.ADMIN_KEY) {
      return res.status(403).json({ error: "Acesso negado" });
    }

    await pool.query(`
      TRUNCATE TABLE Developer, Challenge, DeveloperChallenge 
      RESTART IDENTITY CASCADE;
    `);

    res.json({ message: "Tabelas truncadas com sucesso." });
  } catch (error) {
    console.error("Erro ao truncar tabelas:", error);
    res.status(500).json({ error: "Erro ao truncar tabelas." });
  }
});

export default router;
