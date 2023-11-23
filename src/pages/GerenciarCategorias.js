import React, { useState, useEffect } from 'react';
import api from '../services/Api';
import { Link, useNavigate } from 'react-router-dom';
import { Button, ListGroup, ListGroupItem, Container, Row, Col } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function GerenciarCategorias() {
    const [categorias, setCategorias] = useState([]);
    const navigate = useNavigate();

    // Função para buscar as categorias na API.
    useEffect(() => {
        async function fetchCategorias() {
            try {
                const response = await api.get('/categorias');
                setCategorias(response.data);
            } catch (error) {
                console.error("Erro ao buscar as categorias: ", error);
            }
        }

        fetchCategorias();
    }, []);

    // Função para excluir uma categoria.
    async function handleDelete(categoriaId) {
        try {
            await api.delete(`/categorias/${categoriaId}`);
            // Atualizar o state local removendo a categoria excluída.
            setCategorias(categorias.filter(categoria => categoria.id !== categoriaId));
            alert('Categoria excluída com sucesso!');
        } catch (error) {
            console.error("Erro ao excluir categoria: ", error);
            const errorMessage = error.response && error.response.data.message ? error.response.data.message : 'Erro ao atualizar. Verifique os dados e tente novamente.';
            alert(errorMessage);
        }
    }

    // Função para editar (redirecionar para a página de edição).
    function handleEdit(categoriaId) {
        navigate(`/editar-categoria/${categoriaId}`);
    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container >
                <h2 style={{ border: '1px #ddd solid' }} className="mb-4">Gerenciar Categorias</h2>
            </Container>
            <Container>
                <ListGroup>
                    {categorias.map(categoria => (
                        <ListGroupItem key={categoria.id}>
                            <Row>
                                <Col style={{ fontSize: '1.2rem', fontWeight: '500' }} md="0" className="mb-2">
                                    {categoria.nome}
                                </Col>
                                <Col md="4" className="d-flex align-items-center"> {/* Mudança aqui, alterei md="3" para md="4" */}
                                    <Button style={{ border: '1px #282c34 solid', marginRight: '10px', padding: "3px 15px" }} color="warning" onClick={() => handleEdit(categoria.id)}>Editar</Button>
                                    <Button style={{ border: '1px #282c34 solid', padding: "3px 15px" }} color="danger" onClick={() => handleDelete(categoria.id)}>Excluir</Button>
                                </Col>
                                <Col md="3"></Col> {/* Coluna vazia para preencher o espaço */}
                            </Row>
                        </ListGroupItem>
                    ))}
                </ListGroup>
                <Row className="mt-4">
                    <Col md="3">
                        <Button color="primary" tag={Link} to="/add-categorias">Adicionar nova categoria</Button>
                    </Col>
                    <Col md="4" className="text-right">
                        <Button color="secondary" tag={Link} to="/despesas">Voltar</Button>
                    </Col>
                </Row>
            </Container>
        </ContainerPrincipal>
    );

}

export default GerenciarCategorias;