import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col, Card, FloatingLabel } from 'react-bootstrap';
import { FaUsers, FaCalendarAlt, FaAlignLeft, FaRegCommentDots } from 'react-icons/fa';
import './agendamento.css';

function AgendamentoReuniao() {
  const [colaboradores, setColaboradores] = useState([]);
  const [formData, setFormData] = useState({
    assunto: '',
    descricao: '',
    data_hora: '',
    colaboradores: [],
  });

  useEffect(() => {
    fetch('http://localhost:5000/colaboradores')
      .then((response) => response.json())
      .then((data) => setColaboradores(data))
      .catch((error) => console.error('Erro ao buscar colaboradores:', error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);
    setFormData({
      ...formData,
      colaboradores: selectedOptions,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const reuniao = {
      assunto: formData.assunto,
      descricao: formData.descricao,
      data_hora: formData.data_hora,
      colaboradores: formData.colaboradores,
    };

    fetch('http://localhost:5000/reunioes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reuniao),
    })
      .then((response) => response.json())
      .then((data) => {
        alert('Reunião agendada com sucesso!');
        setFormData({
          assunto: '',
          descricao: '',
          data_hora: '',
          colaboradores: [],
        });
      })
      .catch((error) => console.error('Erro ao agendar reunião:', error));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8} lg={6}>
          <Card className="p-4 shadow">
            <Card.Body>
              <h3 className="text-center mb-4">📅 Agendamento de Reunião</h3>
              <Form id="formReuniao" onSubmit={handleSubmit}>
                <FloatingLabel label="Assunto da Reunião" className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Assunto"
                    name="assunto"
                    value={formData.assunto}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

                <FloatingLabel label="Descrição da Reunião" className="mb-3">
                  <Form.Control
                    as="textarea"
                    placeholder="Descrição"
                    style={{ height: '100px' }}
                    name="descricao"
                    value={formData.descricao}
                    onChange={handleChange}
                    required
                  />
                </FloatingLabel>

                <Form.Group className="mb-3">
                  <Form.Label><FaCalendarAlt className="me-2" />Data e Hora</Form.Label>
                  <Form.Control
                    type="datetime-local"
                    name="data_hora"
                    value={formData.data_hora}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label><FaUsers className="me-2" />Participantes</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    name="colaboradores"
                    value={formData.colaboradores}
                    onChange={handleSelectChange}
                    required
                    className="select-multiple"
                  >
                    {colaboradores.map((colab) => (
                      <option key={colab.id} value={colab.id}>
                        {colab.nome} ({colab.cargo})
                      </option>
                    ))}
                  </Form.Control>
                  <Form.Text muted>Segure Ctrl (Windows) ou ⌘ Command (Mac) para selecionar vários.</Form.Text>
                </Form.Group>

                <Button type="submit" variant="primary" className="w-100">
                  Agendar Reunião
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default AgendamentoReuniao;
