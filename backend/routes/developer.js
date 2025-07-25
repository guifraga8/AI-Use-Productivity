const express = require('express');
const pool = require('../db');
const router = express.Router();

router.post('/developer/admin', async (req, res) => {
    const { name } = req.body;
    
    if (!name) {
        return res.status(400).json({ error: 'Nome é obrigatório.' });
    }

    try {
        const result = await pool.query(
            'SELECT * FROM Developer WHERE name = $1 AND group_type = $2',
            [name, 'admin'] 
        );

        if (result.rows.length === 0) {
            return res.status(403).json({ error: 'Acesso negado. Não é um administrador.' });
        }

        res.status(200).json({
            message: 'Acesso autorizado',
            admin: result.rows[0]
        });
    } catch (error) {
        console.error('Erro ao verificar admin: ', error);
        res.status(500).json({ error: 'Erro ao verificar admin.' });
    }
});

router.post('/developer/with_ai', async (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ error: 'Nome e cargo são obrigatórios.'});
    }

    try {
        const result = await pool.query(
            'INSERT INTO Developer (name, role, group_type) VALUES ($1, $2, $3) RETURNING *',
            [name, role, 'with_ai']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar desenvolvedor do grupo COM IA: ', error);
        res.status(500).json({ error: 'Erro ao cadastrar desenvolvedor do grupo COM IA.' });
    }
});

router.post('/developer/without_ai', async (req, res) => {
    const { name, role } = req.body;

    if (!name || !role) {
        return res.status(400).json({ error: 'Nome e cargo são obrigatórios.'});
    }

    try {
        const result = await pool.query(
            'INSERT INTO Developer (name, role, group_type) VALUES ($1, $2, $3) RETURNING *',
            [name, role, 'without_ai']
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao cadastrar desenvolvedor do grupo SEM IA: ', error);
        res.status(500).json({ error: 'Erro ao cadastrar desenvolvedor do grupo SEM IA.' });
    }
});

router.get('/developer/developers', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM Developer ORDER BY id ASC');
        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar desenvolvedores: ', error);
        res.status(500).json({ error: 'Erro ao buscar desenvolvedores.' });
    }
});

router.get('/developer/:developer_id/challenges', async (req, res) => {
    const { developer_id } = req.params;

    try {
        const result = await pool.query(
            'SELECT * FROM Challenge WHERE developer_id = $1 ORDER BY start_time DESC',
            [developer_id]
        );

        res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar desafios do desenvolvedor: ', error);
        res.status(500).json({ error: 'Erro ao buscar desafios do desenvolvedor.' });
    }
});

router.get('/developer/challenges', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT cha.id,
                    cha.developer_id,
                    dev.name,
                    dev.role,
                    cha.total_time_ms
             FROM Challenge cha JOIN Developer dev on cha.developer_id = dev.id`);
            res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar desenvevolders e desafios atrelados: ', error);
        res.status(500).json({ error: 'Erro ao buscar desenvolvedores e desafios atrelados.' });
    }
});

router.get('/developer/challenges/with_ai', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT cha.id,
                    cha.developer_id,
                    dev.name,
                    dev.role,
                    dev.group_type,
                    cha.total_time_ms
             FROM Challenge cha JOIN Developer dev on cha.developer_id = dev.id
             WHERE group_type = 'with_ai'`);
            res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar desenvolvedores do grupo COM IA e desafios atrelados: ', error);
        res.status(500).json({ error: 'Erro ao buscar desenvolvedores do grupo COM IA e desafios atrelados.' });
    }
});

router.get('/developer/challenges/without_ai', async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT cha.id,
                    cha.developer_id,
                    dev.name,
                    dev.role,
                    dev.group_type,
                    cha.total_time_ms
             FROM Challenge cha JOIN Developer dev on cha.developer_id = dev.id
             WHERE group_type = 'without_ai'`);
            res.status(200).json(result.rows);
    } catch (error) {
        console.error('Erro ao buscar desenvolvedores do grupo SEM IA e desafios atrelados: ', error);
        res.status(500).json({ error: 'Erro ao buscar desenvolvedores do grupo SEM IA e desafios atrelados.' });
    }
});

module.exports = router;
