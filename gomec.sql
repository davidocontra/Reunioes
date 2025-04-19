CREATE TABLE setores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL
);

CREATE TABLE colaboradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    cpf VARCHAR(14) NOT NULL UNIQUE,
    telefone VARCHAR(15),
    email VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    setor_id INT,
    FOREIGN KEY (setor_id) REFERENCES setores(id)
);

CREATE TABLE reunioes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    assunto VARCHAR(255) NOT NULL,
    descricao TEXT,
    data_hora DATETIME NOT NULL
);

CREATE TABLE reunioes_colaboradores (
    id INT AUTO_INCREMENT PRIMARY KEY,
    reuniao_id INT,
    colaborador_id INT,
    FOREIGN KEY (reuniao_id) REFERENCES reunioes(id),
    FOREIGN KEY (colaborador_id) REFERENCES colaboradores(id)
);
