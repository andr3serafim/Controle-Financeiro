import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import { Container, Row, Col, Table, Button } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function ListarDespesasPorCategoria() {
    const [categoriasTotais, setCategoriasTotais] = useState([]);
    const [categorias, setCategorias] = useState([]);

    const valorFormatado = (valor) => {
        return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function transformarEmMaiusculas(palavra) {
        return palavra.toUpperCase();
    }

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

    useEffect(() => {
        async function fetchData() {
            const results = [];
    
            for (let categoria of categorias) {
                const response = await api.get(`/categorias/${categoria.id}/total`);
                if (response.data.total && response.data.total > 0) {
                    results.push({ nome: categoria.nome, total: response.data.total });
                }
            }
    
            setCategoriasTotais(results);
        }
    
        if (categorias.length > 0) {
            fetchData();
        }
    }, [categorias]);
    

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container>
                <h2 style={{ border: '1px #ddd solid', margin: '20px 0' }} className="mb-4">Despesas por Categoria</h2>
                <Table striped>

                    <tbody>
                        {categoriasTotais.map((categoria) => (
                            <tr key={categoria.nome}>
                                <td style={{fontSize:"1.1rem", color:"#232323", fontWeight:"bold"}}>{transformarEmMaiusculas(categoria.nome)}</td>
                                <td style={{fontSize:"1.1rem", color:"#232323", fontWeight:"bold"}}>{valorFormatado(categoria.total)}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <Row style={{ marginTop: '20px' }}>
                    <Col sm={{ size: 10 }}>
                        <Button color="secondary" href="/listar-despesas">Voltar</Button>
                    </Col>
                </Row>
            </Container>
        </ContainerPrincipal>
    );
}

export default ListarDespesasPorCategoria;
