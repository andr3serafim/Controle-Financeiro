import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/Api';
import { Button, ListGroup, ListGroupItem, Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function ListarReceitas() {
    const [receitas, setReceitas] = useState([]);

    const valorFormatado = (valor) => {
        return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        async function fetchReceitas() {
            try {
                const response = await api.get('/receitas');
                setReceitas(response.data);
            } catch (error) {
                console.error("Erro ao buscar as receitas: ", error);
            }
        }

        fetchReceitas();
    }, []);

    async function deleteReceita(id) {
        if (window.confirm('Tem certeza que deseja excluir esta receita?')) {
            try {
                await api.delete(`/receitas/${id}`);
                alert('Receita excluída com sucesso!');
                const updatedReceitas = receitas.filter(receita => receita.id !== id);
                setReceitas(updatedReceitas);
            } catch (error) {
                console.error("Erro ao excluir a receita: ", error);
                alert('Erro ao excluir. Tente novamente.');
            }
        }
    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container>
                <h2 style={{ border: '1px #ddd solid' }} className="mb-4">Lista de Receitas</h2>

                <ListGroup>
                    {receitas.map(receita => (
                        <ListGroupItem key={receita.id}>
                            <Card>
                                <CardBody>
                                    <CardTitle style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Descrição:</strong> {receita.tipo}</CardTitle>
                                    <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>
                                        <strong>Valor:</strong> {valorFormatado(receita.valor)}
                                    </CardText>

                                    <CardText style={{ fontSize: '1.1rem' }}><strong>Data de cadastro:</strong> {receita.dataCriacao}</CardText>
                                    <Row>
                                        <Col>
                                            <Button style={{ marginRight: '5px' }} color="primary" tag={Link} to={`/editar-receita/${receita.id}`} className="mr-2">Editar</Button>
                                            <Button color="danger" onClick={() => deleteReceita(receita.id)}>Excluir</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                        </ListGroupItem>
                    ))}
                </ListGroup>

                <Row className="mt-4">
                    <Col>
                        <Button color="secondary" tag={Link} to="/">Voltar</Button>
                    </Col>
                </Row>
            </Container>
        </ContainerPrincipal>
    );
}

export default ListarReceitas;
