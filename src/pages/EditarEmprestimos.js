import React, { useState, useEffect } from 'react';
import api from '../services/Api';
import { Link, useParams } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import './DashbordStyles/Style.css';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';


function EditEmprestimo() {
    const { id } = useParams();

    const [descricao, setDescricao] = useState('')
    const [valor, setValor] = useState('');
    const [juros, setJuros] = useState('');
    const [quantidadeParcela, setQuantidadeParcela] = useState('')
    const [diaVencimento, setDiaVencimento] = useState('');
    const [dataCriacao, setDataCriacao] = useState('');

    // Adicione mais estados conforme necessário, como descrição, data, etc.

    useEffect(() => {
        async function fetchData() {
            const response = await api.get(`/emprestimos/${id}`);

            setDescricao(response.data.descricao);
            setValor(response.data.valor);
            setJuros(response.data.juros);
            setDiaVencimento(response.data.diaVencimento);
            setQuantidadeParcela(response.data.quantidadeParcela);
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

        // Aqui você irá atualizar a emprestimo utilizando a API.
        const emprestimoData = {

            descricao: descricao,
            valor: valor,
            juros: juros,
            quantidadeParcela: quantidadeParcela,
            diaVencimento: diaVencimento,
            dataCriacao: dataFormatada
            // Outros campos
        };

        try {
            await api.put(`/emprestimos/${id}`, emprestimoData);
            alert('emprestimo atualizada com sucesso!');
        } catch (error) {
            console.error("Erro ao atualizar a emprestimo: ", error);
            alert('Erro ao atualizar. Verifique os dados e tente novamente.');
        }
    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container>
                <h2 style={{ border: '1px #ddd solid'}} className="mb-4">Editar Empréstimo</h2>
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
                        <Label for="juros" sm={1} style={{ fontSize: '1.1rem' }}><strong>Juros:</strong></Label>
                        <Col sm={2}>
                            <Input
                                type="number"
                                id="juros"
                                value={juros}
                                min={1}
                                onChange={e => setJuros(e.target.value)}
                                style={{ width: '206px' }}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="quantidadeParcela" sm={2} style={{ fontSize: '1.1rem' }}><strong>Número parcelas:</strong></Label>
                        <Col sm={2}>
                            <Input
                                type="number"
                                id="quantidadeParcela"
                                value={quantidadeParcela}
                                min={1}
                                onChange={e => setQuantidadeParcela(e.target.value)}
                                style={{ width: '206px' }}
                            />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="diaVencimento" sm={2} style={{ fontSize: '1.1rem' }}><strong>Dia do Vencimento:</strong></Label>
                        <Col sm={2}>
                            <Input
                                type="number"
                                id="diaVencimento"
                                value={diaVencimento}
                                min={1}
                                max={31}
                                onChange={e => setDiaVencimento(e.target.value)}
                                style={{ width: '206px' }}
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
                    <Row>
                        <Col sm={{ size: 10, offset: 1 }}>
                            <Button color="primary" type="submit" className='btn-salvar'>Atualizar</Button>{' '}
                            <Link to="/listar-emprestimos" className="btn btn-secondary btn-voltar">Voltar</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </ContainerPrincipal>
    );
}

export default EditEmprestimo;
