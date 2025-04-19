const db = require('../models/db');

exports.createReuniao = (req, res) => {
    const { assunto, descricao, data_hora, colaboradores } = req.body;
    db.query('INSERT INTO reunioes (assunto, descricao, data_hora) VALUES (?, ?, ?)',
    [assunto, descricao, data_hora],
    (err, result) => {
        if (err) return res.status(500).send(err);
        
        const reuniao_id = result.insertId;
        const values = colaboradores.map(id => [reuniao_id, id]);
        
        db.query('INSERT INTO reunioes_colaboradores (reuniao_id, colaborador_id) VALUES ?', [values], (err) => {
            if (err) return res.status(500).send(err);
            res.status(201).send({ message: 'Reunião criada e colaboradores adicionados.' });
        });
    });
};
