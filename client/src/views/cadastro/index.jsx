import React, { useState } from 'react';
import { Button, Form, Container, Row, Col, Card, FloatingLabel } from 'react-bootstrap';
import { FaUser, FaIdCard, FaPhone, FaEnvelope, FaBriefcase, FaBuilding } from 'react-icons/fa';
import './cadastro.css';

function Index() {
  const [formData, setFormData] = useState({
    nome: '',
    cpf: '',
    telefone: '',
    email: '',
    cargo: '',
    setor: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:5000/cadastro', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
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
        <Col md={8} lg={6}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="text-center mb-4">👤 Cadastro de Colaborador</h3>
              <Form id="formColaborador" onSubmit={handleSubmit}>
                <FloatingLabel label="Nome Completo" className="mb-3">
                  <Form.Control
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleChange}
                    placeholder="Nome"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="CPF" className="mb-3">
                  <Form.Control
                    type="text"
                    name="cpf"
                    value={formData.cpf}
                    onChange={handleChange}
                    placeholder="CPF"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Telefone" className="mb-3">
                  <Form.Control
                    type="text"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleChange}
                    placeholder="Telefone"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="E-mail" className="mb-3">
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="E-mail"
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Cargo" className="mb-3">
                  <Form.Control
                    type="text"
                    name="cargo"
                    value={formData.cargo}
                    onChange={handleChange}
                    placeholder="Cargo"
                    required
                  />
                </FloatingLabel>

                <Form.Group className="mb-3">
                  <Form.Label><FaBuilding className="me-2" />Setor</Form.Label>
                  <Form.Control
                    as="select"
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

                <Button type="submit" variant="success" className="w-100 fw-bold">
                  Salvar Colaborador
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Index;
