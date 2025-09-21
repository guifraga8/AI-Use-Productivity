import express from "express";
import pool from "../db.js";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function insertDeveloperChallenge({ developer_id, challenge_id, file_name }) {
  const result = await pool.query(
    `INSERT INTO DeveloperChallenge (developer_id, challenge_id, file_name)
     VALUES ($1, $2, $3) RETURNING *`,
    [developer_id, challenge_id, file_name]
  );
  return result.rows[0];
}

router.post("developer_challenge/developer_challenge", async (req, res) => {
  try {
    const { developer_id, challenge_id, file_name } = req.body;
    const record = await insertDeveloperChallenge({ developer_id, challenge_id, file_name });
    res.status(201).json(record);
  } catch (error) {
    console.error("Erro ao inserir registro do arquivo do desafio: ", error);
    res.status(500).json({ error: "Erro ao inserir registro do arquivo do desafio." });
  }
});

router.get("/developer_challenge/developers_challenges", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM DeveloperChallenge ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar arquivos dos desafios dos desenvolvedores: ", error);
    res.status(500).json({ error: "Erro ao buscar arquivos dos desafios dos desenvolvedores." });
  }
});

router.get("/developer_challenge/download/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, "../uploads", fileName);

  res.download(filePath, (err) => {
    if (err) {
      console.error("Erro ao baixar arquivo:", err);
      res.status(404).send("Arquivo não encontrado");
    }
  });
});

export default router;
