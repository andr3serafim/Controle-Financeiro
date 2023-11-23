import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/Api';
import { Button, ListGroup, ListGroupItem, Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function ListarDespesas() {
    const [despesas, setDespesas] = useState([]);

    const valorFormatado = (valor) => {
        return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        async function fetchDespesas() {
            try {
                const response = await api.get('/despesas');
                setDespesas(response.data);
            } catch (error) {
                console.error("Erro ao buscar as despesas: ", error);
            }
        }

        fetchDespesas();
    }, []);

    async function deleteDespesa(id) {
        if (window.confirm('Tem certeza que deseja excluir esta despesa?')) {
            try {
                await api.delete(`/despesas/${id}`);
                alert('Despesa excluída com sucesso!');
                const updatedDespesas = despesas.filter(despesa => despesa.id !== id);
                setDespesas(updatedDespesas);
            } catch (error) {
                console.error("Erro ao excluir a despesa: ", error);
                const errorMessage = error.response && error.response.data.message ? error.response.data.message : 'Erro ao excluir. Verifique os dados e tente novamente.';
                alert(errorMessage);
            }
        }
    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container>
                <h2 style={{ border: '1px #ddd solid' }} className="mb-4">
                    Lista de Despesas
                    <Link to="/categorias/total" style={{ marginLeft: "30px", border: '1px #282c34 solid', marginRight: '10px', padding: "10px 25px", color: "#232323", fontWeight: "500" }} className="btn btn-warning">
                        Total por Categoria
                    </Link>
                </h2>
                <ListGroup>
                    {despesas.map(despesa => (
                        <ListGroupItem key={despesa.id}>
                            <Card>
                                <CardBody>
                                    <CardTitle style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Descrição:</strong> {despesa.descricao}</CardTitle>
                                    <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Valor:</strong> {valorFormatado(despesa.valor)}</CardText>
                                    <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Categoria:</strong> {despesa.categoria.nome}</CardText>
                                    <CardText style={{ fontSize: '1.1rem' }}><strong>Data de cadastro:</strong> {despesa.dataCriacao}</CardText>
                                    <Row>
                                        <Col>
                                            <Button style={{ marginRight: '5px' }} color="primary" tag={Link} to={`/editar-despesa/${despesa.id}`} className="mr-2">Editar</Button>
                                            <Button color="danger" onClick={() => deleteDespesa(despesa.id)}>Excluir</Button>
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

export default ListarDespesas;