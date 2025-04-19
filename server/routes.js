const express = require("express");
const router = express.Router();  // Adicionei os parênteses

const Cadastro = require("./src/app/controller/colaboradorController");

// Rota para exibir o formulário (GET)
router.get("/getCadastroUs", (req, res) => {
    res.sendFile("usuario2.html", { root: './public' });
});

// Rota para cadastrar um colaborador (POST)
router.post("/cadastro", Cadastro.create);  // Corrigido para POST
router.post("/reunioes",Cadastro.createReuniao)

router.get("/colaboradores",Cadastro.getAllColaboradores)
module.exports = router;
