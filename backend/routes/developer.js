import express from "express";
import pool from "../db.js";

const router = express.Router();

router.post("/developer/admin", async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Nome é obrigatório." });
  }

  try {
    const result = await pool.query(
      "SELECT * FROM Developer WHERE name = $1 AND group_type = $2",
      [name, "admin"]
    );

    if (result.rows.length === 0) {
      return res
        .status(403)
        .json({ error: "Acesso negado. Não é um administrador." });
    }

    res.status(200).json({
      message: "Acesso autorizado",
      admin: result.rows[0],
    });
  } catch (error) {
    console.error("Erro ao verificar admin: ", error);
    res.status(500).json({ error: "Erro ao verificar admin." });
  }
});

router.post("/developer/with_ai", async (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Nome e cargo são obrigatórios." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Developer (name, role, group_type) VALUES ($1, $2, $3) RETURNING *",
      [name, role, "with_ai"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao cadastrar desenvolvedor do grupo COM IA: ", error);
    res
      .status(500)
      .json({ error: "Erro ao cadastrar desenvolvedor do grupo COM IA." });
  }
});

router.post("/developer/without_ai", async (req, res) => {
  const { name, role } = req.body;

  if (!name || !role) {
    return res.status(400).json({ error: "Nome e cargo são obrigatórios." });
  }

  try {
    const result = await pool.query(
      "INSERT INTO Developer (name, role, group_type) VALUES ($1, $2, $3) RETURNING *",
      [name, role, "without_ai"]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Erro ao cadastrar desenvolvedor do grupo SEM IA: ", error);
    res
      .status(500)
      .json({ error: "Erro ao cadastrar desenvolvedor do grupo SEM IA." });
  }
});

router.get("/developer/developers", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Developer ORDER BY id ASC");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Erro ao buscar desenvolvedores: ", error);
    res.status(500).json({ error: "Erro ao buscar desenvolvedores." });
  }
});

router.get("/developer/challenges/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          d.id AS developer_id,
          d.name AS developer_name,
          d.role AS developer_role,
          d.group_type AS developer_group,
          d.created_at AS developer_created_at,
          c.id AS challenge_id,
          c.developer_id AS challenge_developer_id,
          c.start_time,
          c.end_time,
          c.total_time_ms,
          dc.id AS devchallenge_id,
          dc.file_name,
          dc.created_at AS devchallenge_created_at
      FROM Developer d
      LEFT JOIN Challenge c ON c.developer_id = d.id
      LEFT JOIN DeveloperChallenge dc ON dc.challenge_id = c.id
      ORDER BY d.id, c.id, dc.id
    `);

    const data = {};

    result.rows.forEach(row => {
      const devId = row.developer_id;

      if (!data[devId]) {
        data[devId] = {
          developer: {
            id: row.developer_id,
            name: row.developer_name,
            role: row.developer_role,
            group: row.developer_group,
            created_at: row.developer_created_at
          },
          challenges: []
        };
      }

      if (row.challenge_id) {
        let challengeObj = {
          id: row.challenge_id,
          start_time: row.start_time,
          end_time: row.end_time,
          total_time_ms: row.total_time_ms,
          developerChallenge: row.devchallenge_id
            ? {
                id: row.devchallenge_id,
                file_name: row.file_name,
                created_at: row.devchallenge_created_at
              }
            : null
        };

        data[devId].challenges.push(challengeObj);
      }
    });

    res.status(200).json(Object.values(data));
  } catch (error) {
    console.error("Erro ao buscar dados completos de developers + challenges: ", error);
    res.status(500).json({ error: "Erro ao buscar dados completos." });
  }
});

router.get("/developer/challenges/with_ai", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          d.id AS developer_id,
          d.name AS developer_name,
          d.role AS developer_role,
          d.group_type AS developer_group,
          d.created_at AS developer_created_at,
          c.id AS challenge_id,
          c.developer_id AS challenge_developer_id,
          c.start_time,
          c.end_time,
          c.total_time_ms,
          dc.id AS devchallenge_id,
          dc.file_name,
          dc.created_at AS devchallenge_created_at
      FROM Developer d
      LEFT JOIN Challenge c ON c.developer_id = d.id
      LEFT JOIN DeveloperChallenge dc ON dc.challenge_id = c.id
      WHERE d.group_type = 'with_ai'
      ORDER BY d.id, c.id, dc.id
    `);

    const data = {};

    result.rows.forEach(row => {
      const devId = row.developer_id;

      if (!data[devId]) {
        data[devId] = {
          developer: {
            id: row.developer_id,
            name: row.developer_name,
            role: row.developer_role,
            group: row.developer_group,
            created_at: row.developer_created_at
          },
          challenges: []
        };
      }

      if (row.challenge_id) {
        let challengeObj = {
          id: row.challenge_id,
          start_time: row.start_time,
          end_time: row.end_time,
          total_time_ms: row.total_time_ms,
          developerChallenge: row.devchallenge_id
            ? {
                id: row.devchallenge_id,
                file_name: row.file_name,
                created_at: row.devchallenge_created_at
              }
            : null
        };

        data[devId].challenges.push(challengeObj);
      }
    });

    res.status(200).json(Object.values(data));
  } catch (error) {
    console.error("Erro ao buscar dados completos de developers + challenges: ", error);
    res.status(500).json({ error: "Erro ao buscar dados completos." });
  }
});

router.get("/developer/challenges/without_ai", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
          d.id AS developer_id,
          d.name AS developer_name,
          d.role AS developer_role,
          d.group_type AS developer_group,
          d.created_at AS developer_created_at,
          c.id AS challenge_id,
          c.developer_id AS challenge_developer_id,
          c.start_time,
          c.end_time,
          c.total_time_ms,
          dc.id AS devchallenge_id,
          dc.file_name,
          dc.created_at AS devchallenge_created_at
      FROM Developer d
      LEFT JOIN Challenge c ON c.developer_id = d.id
      LEFT JOIN DeveloperChallenge dc ON dc.challenge_id = c.id
      WHERE d.group_type = 'without_ai'
      ORDER BY d.id, c.id, dc.id
    `);

    const data = {};

    result.rows.forEach(row => {
      const devId = row.developer_id;

      if (!data[devId]) {
        data[devId] = {
          developer: {
            id: row.developer_id,
            name: row.developer_name,
            role: row.developer_role,
            group: row.developer_group,
            created_at: row.developer_created_at
          },
          challenges: []
        };
      }

      if (row.challenge_id) {
        let challengeObj = {
          id: row.challenge_id,
          start_time: row.start_time,
          end_time: row.end_time,
          total_time_ms: row.total_time_ms,
          developerChallenge: row.devchallenge_id
            ? {
                id: row.devchallenge_id,
                file_name: row.file_name,
                created_at: row.devchallenge_created_at
              }
            : null
        };

        data[devId].challenges.push(challengeObj);
      }
    });

    res.status(200).json(Object.values(data));
  } catch (error) {
    console.error("Erro ao buscar dados completos de developers + challenges: ", error);
    res.status(500).json({ error: "Erro ao buscar dados completos." });
  }
});

router.get("/developer/:developer_id/challenge", async (req, res) => {
  const { developer_id } = req.params;
  
  try {
    const result = await pool.query(`
      SELECT 
          d.id AS developer_id,
          d.name AS developer_name,
          d.role AS developer_role,
          d.group_type AS developer_group,
          d.created_at AS developer_created_at,
          c.id AS challenge_id,
          c.developer_id AS challenge_developer_id,
          c.start_time,
          c.end_time,
          c.total_time_ms,
          dc.id AS devchallenge_id,
          dc.file_name,
          dc.created_at AS devchallenge_created_at
      FROM Developer d
      LEFT JOIN Challenge c ON c.developer_id = d.id
      LEFT JOIN DeveloperChallenge dc ON dc.challenge_id = c.id
      WHERE d.id = $1
      ORDER BY d.id, c.id, dc.id
    `, [developer_id]);

    const data = {};

    result.rows.forEach(row => {
      const devId = row.developer_id;

      if (!data[devId]) {
        data[devId] = {
          developer: {
            id: row.developer_id,
            name: row.developer_name,
            role: row.developer_role,
            group: row.developer_group,
            created_at: row.developer_created_at
          },
          challenges: []
        };
      }

      if (row.challenge_id) {
        let challengeObj = {
          id: row.challenge_id,
          start_time: row.start_time,
          end_time: row.end_time,
          total_time_ms: row.total_time_ms,
          developerChallenge: row.devchallenge_id
            ? {
                id: row.devchallenge_id,
                file_name: row.file_name,
                created_at: row.devchallenge_created_at
              }
            : null
        };

        data[devId].challenges.push(challengeObj);
      }
    });

    res.status(200).json(Object.values(data));
  } catch (error) {
    console.error("Erro ao buscar dados completos de developers + challenges: ", error);
    res.status(500).json({ error: "Erro ao buscar dados completos." });
  }
});

export default router;
