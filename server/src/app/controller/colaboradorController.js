const CadastroUsuario = require("../model/colaborador");

class CadastroController {
    // Método para cadastrar um colaborador
    create(req, res) {
        console.log(req.body);
        let { nome, cpf, telefone, email, cargo, setor_id } = req.body;

        CadastroUsuario.inserir(nome, cpf, telefone, email, cargo, setor_id)
            .then(resposta => {
                res.status(resposta[0]).json(resposta[1]);
            })
            .catch(resposta => {
                console.debug(resposta[1]);
                res.status(resposta[0]).json("Erro: " + resposta[1].errno);
            });
    }

    // Novo método para buscar todos os colaboradores
    getAllColaboradores(req, res) {
        CadastroUsuario.buscarTodos()  // Método novo no Model para pegar todos os colaboradores
            .then(resposta => {
                res.status(200).json(resposta);  // Retorna os colaboradores encontrados
            })
            .catch(resposta => {
                res.status(500).json("Erro ao buscar colaboradores: " + resposta);
            });
    }

    createReuniao(req, res) {
        const { assunto, descricao, data_hora, colaboradores } = req.body;  // Desestrutura os dados da reunião

        // Validação simples
        if (!assunto || !descricao || !data_hora || colaboradores.length === 0) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios!" });
        }
        
        CadastroUsuario.cadastrarReuniao(assunto, descricao, data_hora, colaboradores)  // Chama o método para inserir a reunião
            .then((response) => {
                res.status(201).json({ message: "Reunião agendada com sucesso!" });  // Sucesso
            })
            .catch((error) => {
                console.error(error);
                res.status(500).json({ message: "Erro ao agendar reunião!" });  // Erro no banco de dados
            });
    }

}

module.exports = new CadastroController();
