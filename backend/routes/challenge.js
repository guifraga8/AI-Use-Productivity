import express from "express";
import pool from "../db.js";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import upload from "../middleware/upload.js";
import { insertDeveloperChallenge } from "./developerChallenge.js";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.post("/challenge/start", async (req, res) => {
  const { developer_id } = req.body;

  try {
    const result = await pool.query(
      "INSERT INTO Challenge (developer_id) VALUES ($1) RETURNING *",
      [developer_id]
    );

    res.status(201).json({
      message: "Desafio iniciado com sucesso!",
      challenge: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao iniciar desafio: ", error);
    res.status(500).json({ error: "Erro ao iniciar desafio" });
  }
});

router.post("/challenge/upload", upload.single("solution"), (req, res) => {
  const { oldTmpFile } = req.body;

  try {
    if (oldTmpFile) {
      const oldPath = path.join(__dirname, "../tmp", oldTmpFile);
      console.log("Tentando deletar arquivo antigo: ", oldPath);

      if (fs.existsSync(oldPath)) {
        fs.unlinkSync(oldPath);
        console.log("Arquivo deletado: ", oldPath);
      } else {
        console.warn("Arquivo antigo não encontrado: ", oldPath);
      }
    }

    if (!req.file) {
      return res.status(400).json({ error: "Nenhum arquivo enviado." });
    }

    console.log("Novo arquivo salvo na tmp: ", req.file.filename);

    res.status(200).json({
      message: "Upload temporário realizado com sucesso.",
      tmpFile: req.file.filename,
    });
  } catch (error) {
    console.error("Erro no upload temporário: ", error);
    res.status(500).json({ error: "Erro no upload temporário." });
  }
});

router.post("/challenge/end", async (req, res) => {
  const { developer_id, tmpFile } = req.body;

  try {
    const challengeRes = await pool.query(
      `SELECT * FROM Challenge
             WHERE developer_id = $1 AND end_time IS NULL
             ORDER BY start_time DESC
             LIMIT 1`,
      [developer_id]
    );

    const challenge = challengeRes.rows[0];

    if (!challenge) {
      return res
        .status(404)
        .json({ error: "Desafio em andamento não encontrado." });
    }

    const endTime = new Date();
    const totalTimeMs = endTime - new Date(challenge.start_time);

    await pool.query(
      `UPDATE Challenge
             SET end_time = $1, total_time_ms = $2
             WHERE id = $3`,
      [endTime, totalTimeMs, challenge.id]
    );

    if (tmpFile) {
      const tmpPath = path.join(__dirname, "../tmp", tmpFile);
      const uploadsDir = path.join(__dirname, "../uploads");

      if (!fs.existsSync(uploadsDir)) {
        fs.mkdirSync(uploadsDir, { recursive: true });
      }

      const finalPath = path.join(uploadsDir, tmpFile);

      if (fs.existsSync(tmpPath)) {
        fs.renameSync(tmpPath, finalPath);
        console.log(`Arquivo movido de tmp para uploads: ${finalPath}`);
      } else {
        console.warn(`Arquivo temporário não encontrado: ${tmpPath}`);
      }
    }

    await insertDeveloperChallenge({
      developer_id,
      challenge_id: challenge.id,
      file_name: tmpFile,
    });

    res.status(200).json({
      message: "Desafio finalizado com sucesso. Arquivo movido para uploads.",
      challenge_id: challenge.id,
      end_time: endTime,
      total_time_ms: totalTimeMs,
    });
  } catch (error) {
    console.error("Erro ao finalizar desafio: ", error);
    res.status(500).json({ error: "Erro ao finalizar desafio." });
  }
});

router.get("/challenge/challenges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Challenge ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar desafios: ", error);
    res.status(500).json({ error: "Erro ao buscar desafios." });
  }
});

router.get("/challenge/download", (req, res) => {
  const filePath = path.resolve(
    __dirname,
    "../challenge/desafio_transportadora.zip"
  );

  res.download(filePath, "desafio_transportadora.zip", (error) => {
    if (error) {
      console.error("Erro ao enviar o arquivo: ", error);
      res.status(500).send("Erro ao baixar o arquivo.");
    }
  });
});

export default router;
