import React, { useState, useEffect } from 'react';
import api from '../services/Api';
import { Link, useParams } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css'
import ReactDatePicker from 'react-datepicker';
import './DashbordStyles/Style.css';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function EditDespesa() {
    const { id } = useParams();
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState('');
    const [categoriaId, setCategoriaId] = useState(1);
    const [categorias, setCategorias] = useState([]);
    const [dataCriacao, setDataCriacao] = useState('');

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
            const response = await api.get(`/despesas/${id}`);

            setDescricao(response.data.descricao);
            setValor(response.data.valor);
            setDataCriacao(new Date(response.data.dataCriacao));
            setCategoriaId(response.data.categoria.id);

            function convertStringToDate(dataStr) {
                const [day, month, year] = dataStr.split("/");
                return new Date(year, month - 1, day);
            }

            function convertValor(valorStr) {  //função para modelar valor para formato BR com vírgula
                if (typeof valorStr !== 'string') {
                    valorStr = valorStr.toString();
                }
                const valorNumerico = parseFloat(valorStr.replace(',', '.'));
                return valorNumerico.toFixed(2).replace('.',',');
            }
            

            setDataCriacao(convertStringToDate(response.data.dataCriacao));
            // Continue com a recuperação de dados conforme necessário

            setValor(convertValor(response.data.valor))
        }
        fetchData();
    }, [id]);

    async function handleSubmit(e) {
        e.preventDefault();

        const dataFormatada = dataCriacao.toLocaleDateString('pt-BR');
        const valorFormatado = parseFloat(valor.replace(',', '.')).toFixed(2);

        const despesaData = {
            descricao: descricao,
            valor: valorFormatado,
            dataCriacao: dataFormatada,
            categoria: {
                id: parseInt(categoriaId)
            }
            // Continue com a definição dos dados conforme necessário
        };

        try {
            await api.put(`/despesas/${id}`, despesaData);
            alert('Despesa atualizada com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar a despesa: ", error);
            alert('Erro ao atualizar. Verifique os dados e tente novamente.');
        }

    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container>
                <h2 style={{ border: '1px #ddd solid' }} className="mb-4">Editar Despesa</h2>
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
                        <Label for="cadastro" sm={1} style={{ fontSize: '1.1rem' }}><strong>Data:</strong></Label>
                        <Col sm={3}>
                            <ReactDatePicker
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                selected={dataCriacao}
                                onChange={date => setDataCriacao(date)}
                                locale="pt-BR"
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="categoria" sm={1} style={{ fontSize: '1.1rem' }}><strong>Categoria:</strong></Label>
                        <Col sm={3}>
                            <Input type="select" value={categoriaId} onChange={e => setCategoriaId(e.target.value)}>
                                {categorias.map(categoria => (
                                    <option key={categoria.id} value={categoria.id}>
                                        {categoria.nome}
                                    </option>
                                ))}
                            </Input>
                        </Col>
                    </FormGroup>

                    <Row>
                        <Col sm={{ size: 10, offset: 1 }}>
                            <Button color="primary" type="submit" className='btn-salvar'>Atualizar</Button>{' '}
                            <Link to="/listar-despesas" className="btn btn-secondary btn-voltar">Voltar</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </ContainerPrincipal>
    );
}

export default EditDespesa;
