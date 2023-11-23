import React, { useEffect, useState } from 'react';
import api from '../services/Api';
import { Link } from 'react-router-dom';
import './DashbordStyles/Style.css'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';


function AddDespesas() {
    const [valor, setValor] = useState('');
    const [categoriaId, setCategoriaId] = useState(1);
    const [categorias, setCategorias] = useState([]);
    const [descricao, setDescricao] = useState('');
    const [dataCriacao, setDataCriacao] = useState(new Date());


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

    async function handleSubmit(e) {
        e.preventDefault();

        const dataFormatada = dataCriacao.toLocaleDateString('pt-BR');
        const valorFormatado = parseFloat(valor.replace(',', '.')).toFixed(2);

        const expenseData = {
            valor: valorFormatado,
            descricao: descricao,
            dataCriacao: dataFormatada,
            categoria: {
                id: parseInt(categoriaId)
            }
        };

        try {
            await api.post('/despesas', expenseData);

            alert('Despesa adicionada com sucesso!');
        } catch (error) {
            console.error("Erro ao salvar a despesa: ", error);
            alert('Erro ao salvar. Verifique os dados e tente novamente.');
        }
    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container >
            <h2 style={{ border: '1px #ddd solid'}} className="mb-4">Adicionar Despesa</h2>
            </Container>
            <Container className='container-add'>
                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label for="descricao" sm={1} style={{ fontSize: '1.2rem' }}><strong>Descrição:</strong></Label>
                        <Col sm={5}>
                            <Input
                                type="text"
                                id="descricao"
                                value={descricao}
                                required
                                onChange={e => setDescricao(e.target.value)}
                                style={{ width: '500px' }}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="cadastro" sm={1} style={{ fontSize: '1.1rem' }}><strong>Cadastro:</strong></Label>
                        <Col sm={3}>
                            <DatePicker
                                className="form-control"
                                selected={dataCriacao}
                                dateFormat="dd/MM/yyyy"
                                onChange={date => setDataCriacao(date)}
                                locale="pt-BR"
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="valor" sm={1} style={{ fontSize: '1.1rem' }}><strong>Valor:</strong></Label>
                        <Col sm={2}>
                            <Input
                                type="text"
                                id="valor"
                                value={valor}
                                required
                                onChange={e => setValor(e.target.value)}
                                style={{ width: '206px' }}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="categoria" sm={1} style={{ fontSize: '1.1rem' }}><strong>Categoria:</strong></Label>
                        <Col sm={4}>
                            <Input type="select" name="categoria" id="categoria" value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
                                {categorias.map(categoria => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </Input>
                        </Col>
                        <Col sm={3}>
                            <Link to="/categorias" className="btn btn-secondary btnAddCategoria">Gerenciar categorias</Link>
                        </Col>
                    </FormGroup>

                    <Row>
                        <Col sm={{ size: 10, offset: 1 }}>
                            <Button color="primary" type="submit" className='btn-salvar'>Salvar</Button>{' '}
                            <Link to="/" className="btn btn-secondary btn-voltar">Voltar</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </ContainerPrincipal>
    );
}

export default AddDespesas;

