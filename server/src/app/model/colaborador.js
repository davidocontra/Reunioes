const mysql = require("mysql2");
const dbConfig = require("../config");

class CadastroUsuario {
    constructor() {
        this.conexao = mysql.createConnection(dbConfig.db);
    }

    inserir(nome, cpf, telefone, email, cargo, setor_id) {
        return new Promise((resolve, reject) => {
            let sql = `INSERT INTO colaboradores (nome, cpf, telefone, email, cargo, setor_id) VALUES (?, ?, ?, ?, ?, ?)`;
            this.conexao.query(sql, [nome, cpf, telefone, email, cargo, setor_id], function (erro, retorno) {
                if (erro) reject([400, erro]);  // erro

                resolve([201, "Inserido"]);
            });
        });
    }

    // Método para buscar todos os colaboradores
    buscarTodos() {
        return new Promise((resolve, reject) => {
            const sql = 'SELECT * FROM colaboradores';  // SQL para pegar todos os colaboradores
            this.conexao.query(sql, (erro, resultados) => {
                if (erro) {
                    reject(erro);
                } else {
                    resolve(resultados);  // Retorna todos os colaboradores encontrados
                }
            });
        });
    }
    
    cadastrarReuniao(assunto, descricao, data_hora, colaboradores) {
        return new Promise((resolve, reject) => {
            // Armazenar os IDs dos colaboradores como uma string separada por vírgulas
           // const colaboradoresStr = colaboradores.join(",");  // Converte o array de colaboradores em uma string

            // SQL para inserir a reunião
            const sql = `INSERT INTO reunioes (assunto, descricao, data_hora) VALUES (?, ?, ?, ?)`;

            // Executa a query
            this.conexao.query(sql, [assunto, descricao, data_hora, colaboradores], (erro, resultado) => {
                if (erro) {
                    reject(erro);  // Em caso de erro
                } else {
                    resolve(resultado);  // Retorna o resultado da inserção
                }
            });
        });
    }

}

module.exports = new CadastroUsuario();
