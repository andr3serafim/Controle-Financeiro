import React, { useState } from 'react';
import api from '../services/Api';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function AddCategoria() {
    const [nome, setNome] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post('/categorias', { nome });
            alert('Categoria adicionada com sucesso!');
            setNome('');  // Limpa o campo após o envio.
        } catch (error) {
            console.error('Erro ao adicionar categoria:', error);
            alert('Erro ao adicionar categoria. Por favor, tente novamente.');
        }
    };

    return (
        <ContainerPrincipal>
        <NavbarMenu />
        <Container >
        <h2 style={{ border: '1px #ddd solid'}} className="mb-4">Adicionar Categoria</h2>
        </Container>
        <Container className='container-add'>
            <Form onSubmit={handleSubmit}>

                <FormGroup row>
                    <Label for="categoriaNome" sm={1} style={{ fontSize: '1.2rem' }}><strong>Nome:</strong></Label>
                    <Col sm={5}>
                        <Input 
                            type="text"
                            name="nome"
                            id="categoriaNome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            required
                            style={{ width: '500px' }}
                        />
                    </Col>
                </FormGroup>

                <Row>
                    <Col sm={{ size: 10, offset: 1 }}>
                        <Button color="primary" type="submit" className='btn-salvar'>Adicionar</Button>{' '}
                        <Link to="/categorias" className="btn btn-secondary btn-voltar">Voltar</Link>
                    </Col>
                </Row>
            </Form>
        </Container>
        </ContainerPrincipal>
    );
}

export default AddCategoria;
