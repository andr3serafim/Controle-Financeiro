import React, { useState, useEffect } from 'react';
import api from '../services/Api';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DashbordStyles/Style.css';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function EditReceita() {
    const { id } = useParams();

    const [valor, setValor] = useState('');
    const [tipo, setTipo] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');

       useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/receitas/${id}`);

            setValor(response.data.valor);
            setTipo(response.data.tipo);
            setDataCriacao(new Date(response.data.dataCriacao));

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

        const receitaData = {
            valor: valorFormatado,
            tipo: tipo,
            dataCriacao: dataFormatada,
        };

        try {
            await api.put(`/receitas/${id}`, receitaData);
            alert('Receita atualizada com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar a receita: ", error);
            alert('Erro ao atualizar. Verifique os dados e tente novamente.');
        }
    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container>
                <h2 style={{ border: '1px #ddd solid'}} className="mb-4">Editar Receita</h2>
            </Container>
            <Container className='container-add'>
                <Form onSubmit={handleSubmit}>
                    <FormGroup row>
                        <Label for="descricao" sm={1} style={{ fontSize: '1.2rem' }}><strong>Descrição:</strong></Label>
                        <Col sm={5}>
                            <Input
                                type="text"
                                id="descricao"
                                value={tipo}
                                required
                                onChange={e => setTipo(e.target.value)}
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
                    <Row>
                        <Col sm={{ size: 10, offset: 1 }}>
                            <Button color="primary" type="submit" className='btn-salvar'>Atualizar</Button>{' '}
                            <Link to="/listar-receitas" className="btn btn-secondary btn-voltar">Voltar</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </ContainerPrincipal>
    );
}

export default EditReceita;
