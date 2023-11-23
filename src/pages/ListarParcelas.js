import React, { useState, useEffect } from 'react';

import { Link, useParams } from 'react-router-dom';

import api from '../services/Api';

import { Button, ListGroup, ListGroupItem, Container, Row, Col, Card, CardBody, CardTitle, CardText } from 'reactstrap';


function ListarParcelas() {
    const [parcelas, setParcelas] = useState([]);
    const [descricaoEmprestimo, setDescricaoEmprestimo] = useState('');
    const { id: emprestimoId } = useParams();  // Aqui, nós desestruturamos o id diretamente dos parâmetros da URL

    useEffect(() => {
        async function fetchParcelas() {
            try {
                const response = await api.get(`/emprestimos/${emprestimoId}/parcelas`);
                setParcelas(response.data);
                const responseEmprestimo = await api.get(`/emprestimos/${emprestimoId}`);
                setDescricaoEmprestimo(responseEmprestimo.data.descricao);
            } catch (error) {
                console.error("Erro ao buscar as parcelas: ", error);
            }
        }

        fetchParcelas();
    }, [emprestimoId]);

    return (
        <Container>
            <h2 style={{ marginTop: '20px', border: '1px #ddd solid' }} className="mb-4">Parcelas: <strong>{descricaoEmprestimo}</strong></h2>
    
            <ListGroup>
                {parcelas.map((parcela, index) => (
                    <ListGroupItem key={index}>
                        <Card>
                            <CardBody>
                                <CardTitle style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}><strong>Parcela</strong> {index + 1}</CardTitle>
                                <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }} className="card-text-spacing"><strong>Valor:</strong> R$ {parcela.valor}</CardText>
                                <CardText style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }} className="card-text-spacing"><strong>Data de Vencimento:</strong> {parcela.dataVencimento}</CardText>
                            </CardBody>
                        </Card>
                    </ListGroupItem>
                ))}
            </ListGroup>
            
            <Row className="mt-4">
                <Col>
                    <Button color="secondary" tag={Link} to="/listar-emprestimos">Voltar</Button>
                </Col>
            </Row>
        </Container>
    );
}

export default ListarParcelas;