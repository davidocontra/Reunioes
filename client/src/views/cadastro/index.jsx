import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function Index() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    cargo: '',
    setor: '',
  });

  // Função para lidar com a mudança nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Função para submeter o formulário
  const handleSubmit = (e) => {
    e.preventDefault();

    const colaborador = { ...formData };

    fetch('http://localhost:5000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(colaborador),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Colaborador cadastrado com sucesso!');
        setFormData({
          nome: '',
          cpf: '',
          telefone: '',
          email: '',
          cargo: '',
          setor: '',
        });
      })
      .catch((error) => console.error('Erro:', error));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <header>
            <h2 className="text-center">Cadastrar Colaborador</h2>
          </header>
          <Form id="formColaborador" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                id="nome"
                name="nome"
                value={formData.nome}
                onChange={handleChange}
                placeholder="Nome Completo"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                id="cpf"
                name="cpf"
                value={formData.cpf}
                onChange={handleChange}
                placeholder="CPF"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                id="telefone"
                name="telefone"
                value={formData.telefone}
                onChange={handleChange}
                placeholder="Telefone"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="text"
                id="cargo"
                name="cargo"
                value={formData.cargo}
                onChange={handleChange}
                placeholder="Cargo"
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Selecione o Setor</Form.Label>
              <Form.Control
                as="select"
                id="setor"
                name="setor"
                value={formData.setor}
                onChange={handleChange}
                required
              >
                <option value="">Selecione o Setor</option>
                <option value="1">Recebimento</option>
                <option value="2">Expedição</option>
                <option value="3">Garantia</option>
                <option value="4">Devolução</option>
              </Form.Control>
            </Form.Group>
            <br />
            <Button type="submit" variant="success" className="w-100">
              Salvar Colaborador
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;
