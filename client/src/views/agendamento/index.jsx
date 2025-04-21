import React, { useEffect, useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

function AgendamentoReuniao() {
  const [colaboradores, setColaboradores] = useState([]);  // Estado para armazenar colaboradores
  const [formData, setFormData] = useState({
    assunto: '',
    descricao: '',
    data_hora: '',
    colaboradores: [],  // IDs dos colaboradores selecionados
  });

  // Buscar colaboradores cadastrados ao carregar o componente
  useEffect(() => {
    fetch('http://localhost:5000/colaboradores')
      .then((response) => response.json())
      .then((data) => setColaboradores(data))  // Salva os colaboradores no estado
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
    const selectedOptions = Array.from(e.target.selectedOptions).map((opt) => opt.value);  // Pega os valores dos colaboradores selecionados
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
      colaboradores: formData.colaboradores,  // Envia os colaboradores selecionados
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
          colaboradores: [],  // Limpa os dados do formulário após o envio
        });
      })
      .catch((error) => console.error('Erro ao agendar reunião:', error));
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center">Agendar Reunião</h2>
          <br />
          <Form id="formReuniao" onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Assunto da Reunião"
                name="assunto"
                value={formData.assunto}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                as="textarea"
                placeholder="Descrição"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Control
                type="datetime-local"
                name="data_hora"
                value={formData.data_hora}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <br />
            <Form.Group>
              <Form.Label>Selecione os Colaboradores</Form.Label>
              <Form.Control
                as="select"
                multiple
                name="colaboradores"
                value={formData.colaboradores}
                onChange={handleSelectChange}
                required
              >
                {colaboradores.map((colab) => (
                  <option key={colab.id} value={colab.id}>
                    {colab.nome} - {colab.cargo}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <br />
            <Button type="submit" variant="primary" className="w-100">
              Agendar
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default AgendamentoReuniao;
