const db = require('../models/db');

exports.getAll = (req, res) => {
    db.query('SELECT * FROM colaboradores', (err, results) => {
        if (err) return res.status(500).send(err);
        res.json(results);
    });
};

exports.create = (req, res) => {
    const { nome, cpf, telefone, email, cargo, setor_id } = req.body;
    const query = 'INSERT INTO colaboradores (nome, cpf, telefone, email, cargo, setor_id) VALUES (?, ?, ?, ?, ?, ?)';
    db.query(query, [nome, cpf, telefone, email, cargo, setor_id], (err, result) => {
        if (err) return res.status(500).send(err);
        res.status(201).send({ id: result.insertId });
    });
};
