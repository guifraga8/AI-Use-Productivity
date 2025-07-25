const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/challenge/start', async (req, res) => {
    const { developer_id } = req.body;

    try {
        const result = await pool.query(
            'INSERT INTO Challenge (developer_id) VALUES ($1) RETURNING *',
            [developer_id]
        );

        res.status(201).json({
            message: 'Desafio iniciado com sucesso!',
            challenge: result.rows[0],
        });
    } catch (error) {
        console.error('Erro ao iniciar desafio: ', error);
        res.status(500).json({ error: 'Erro ao iniciar desafio' });
    }
});

router.post('/challenge/end', async (req, res) => {
    const { developer_id } = req.body;

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
            return res.status(404).json({ error: 'Desafio em andamento não encontrado.' });
        }

        const endTime = new Date();
        const totalTimeMs = endTime - new Date(challenge.start_time);

        await pool.query(
            `UPDATE Challenge
             SET end_time = $1, total_time_ms = $2
             WHERE id = $3`,
             [endTime, totalTimeMs, challenge.id]
        );

        res.status(200).json({
            message: 'Desafio finalizado com sucesso.',
            challenge_id: challenge.id,
            end_time: endTime,
            total_time_ms: totalTimeMs
        });
    } catch (error) {
        console.error('Erro ao finalizar desafio: ', error);
        res.status(500).json({error: 'Erro ao finalizar desafio.' });
    }
});

router.get('/challenge/challenges', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Challenge ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar desafios: ', error);
        res.status(500).json({ error: 'Erro ao buscar desafios.' });
    }
});

module.exports = router;
