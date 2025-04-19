const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const colaboradorRoutes = require('./routes/colaboradorRoutes');
const reuniaoRoutes = require('./routes/reuniaoRoutes');

app.use(bodyParser.json());

app.use('/api/colaboradores', colaboradorRoutes);
app.use('/api/reunioes', reuniaoRoutes);

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
