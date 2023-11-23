import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/Api';
import './DashbordStyles/Style.css'
import { Button, ListGroup, ListGroupItem, Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function ListarEmprestimos() {
    const [emprestimos, setEmprestimos] = useState([]);

    const valorFormatado = (valor) => {
        return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        async function fetchEmprestimos() {
            try {
                const response = await api.get('/emprestimos');
                setEmprestimos(response.data);
            } catch (error) {
                console.error("Erro ao buscar as emprestimos: ", error);
            }
        }

        fetchEmprestimos();
    }, []);

    async function deleteEmprestimo(id) {
        if (window.confirm('Tem certeza que deseja excluir este empréstimo?')) {
            try {
                await api.delete(`/emprestimos/${id}`);
                alert('Empréstimo excluído com sucesso!');
                // Atualizando a lista após a exclusão
                const updatedEmprestimos = emprestimos.filter(emprestimo => emprestimo.id !== id);
                setEmprestimos(updatedEmprestimos);
            } catch (error) {
                console.error("Erro ao excluir o empréstimo: ", error);
                alert('Erro ao excluir. Tente novamente.');
            }
        }
    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container >
            <h2 style={{ border: '1px #ddd solid'}} className="mb-4">Lista de Empréstimos</h2>
            </Container>
                <Container>
                    <ListGroup>
                        {emprestimos.map(emprestimo => (
                            <ListGroupItem key={emprestimo.id}>
                                <Card>
                                    <CardBody>
                                        <CardTitle style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Descrição:</strong> {emprestimo.descricao}</CardTitle>
                                        <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }} className="card-text-spacing"><strong>Valor:</strong> {valorFormatado(emprestimo.valor)}</CardText>
                                        <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }} className="card-text-spacing"><strong>Parcelas:</strong> {emprestimo.quantidadeParcela}x</CardText>
                                        <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }} className="card-text-spacing"><strong>Juros: </strong>{emprestimo.juros}% do total devido</CardText>
                                        <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }} className="card-text-spacing"><strong>Data do Empréstimo:</strong> {emprestimo.dataCriacao}</CardText>
                                        <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }} className="card-text-spacing"><strong>Dia do vencimento:</strong> {emprestimo.diaVencimento}</CardText><br></br>
                                        <Row>
                                            <Col>
                                                <Button style={{ marginRight: '5px', backgroundColor: '#fff', border: '2px #0dcaf0 solid' }} color="info" tag={Link} to={`/emprestimos/${emprestimo.id}/parcelas`} className="mr-2">Ver parcelas</Button>
                                                <Button style={{ marginRight: '5px' }} color="primary" tag={Link} to={`/editar-emprestimo/${emprestimo.id}`} className="mr-2">Editar</Button>
                                                <Button color="danger" onClick={() => deleteEmprestimo(emprestimo.id)}>Excluir</Button>
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

export default ListarEmprestimos;