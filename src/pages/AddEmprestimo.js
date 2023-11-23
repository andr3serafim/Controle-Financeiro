import React, { useState } from 'react';
import api from '../services/Api';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css'
import ReactDatePicker from 'react-datepicker';
import { Button, Form, FormGroup, Label, Input, Container, Row, Col } from 'reactstrap';
import NavbarMenu from '../components/NavBarMenu';
import { ContainerPrincipal } from './DashbordStyles/DashboardStyle';

function AddEmprestimo() {
    const [descricao, setDescricao] = useState('');
    const [valor, setValor] = useState(0);
    const [juros, setJuros] = useState(0);
    const [qtdParcelas, setQtdParcelas] = useState(0);
    const [diaVencimento, setDiaVencimento] = useState(0);
    const [dataCriacao, setDataCriacao] = useState(new Date());

    async function handleSubmit(e) {
        e.preventDefault();

        const dataFormatada = dataCriacao.toLocaleDateString('pt-BR');
        const valorFormatado = parseFloat(valor.replace(',', '.')).toFixed(2);

        const emprestimoData = {
            descricao: descricao,
            valor: valorFormatado,
            juros: parseFloat(juros),
            quantidadeParcela: parseFloat(qtdParcelas),
            diaVencimento: parseFloat(diaVencimento),
            dataCriacao: dataFormatada
        }

        try {
            await api.post('/emprestimos', emprestimoData);

            alert('Empréstimo adicionada com sucesso!');
        } catch (error) {
            console.error("Erro ao salvar a empréstimo: ", error);
            alert('Erro ao salvar. Verifique os dados e tente novamente.');
        }
    }

    return (
        <ContainerPrincipal>
            <NavbarMenu />
            <Container>
            <h2 style={{ border: '1px #ddd solid'}} className="mb-4">Adicionar Empréstimo</h2>
            </Container>
            <Container className='container-add'>
                <Form onSubmit={handleSubmit}>

                    <FormGroup row>
                        <Label for="descricao" sm={2} style={{ fontSize: '1.1rem' }}><strong>Descrição:</strong></Label>
                        <Col sm={10}>
                            <Input
                                type="text"
                                id="descricao"
                                value={descricao}
                                required
                                onChange={e => setDescricao(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="valor" sm={2} style={{ fontSize: '1.1rem' }}><strong>Valor:</strong></Label>
                        <Col sm={10}>
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
                        <Label for="juros" sm={2} style={{ fontSize: '1.1rem' }}><strong>Juros:</strong></Label>
                        <Col sm={10}>
                            <Input
                                type="number"
                                id="juros"
                                value={juros}
                                min="0"
                                onChange={e => setJuros(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="parcelas" sm={2} style={{ fontSize: '1.1rem' }}><strong>Número de parcelas:</strong></Label>
                        <Col sm={10}>
                            <Input
                                type="number"
                                id="parcelas"
                                value={qtdParcelas}
                                min="0"
                                onChange={e => setQtdParcelas(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="cadastro" sm={2} style={{ fontSize: '1.1rem' }}><strong>Cadastro:</strong></Label>
                        <Col sm={10}>
                            <ReactDatePicker
                                className="form-control"
                                dateFormat="dd/MM/yyyy"
                                selected={dataCriacao ? new Date(dataCriacao) : null}
                                onChange={date => setDataCriacao(date)}
                                required
                            />
                        </Col>
                    </FormGroup>

                    <FormGroup row>
                        <Label for="vencimento" sm={2} style={{ fontSize: '1.1rem' }}><strong>Dia de vencimento:</strong></Label>
                        <Col sm={10}>
                            <Input
                                type="number"
                                id="vencimento"
                                value={diaVencimento}
                                min="1"
                                max="31"
                                onChange={e => setDiaVencimento(e.target.value)}
                            />
                        </Col>
                    </FormGroup>

                    <Row className="mb-3">
                        <Col sm={{ size: 10, offset: 2 }}>
                            <Button color="primary" type="submit">Salvar</Button>{' '}
                            <Link to="/" className="btn btn-secondary">Voltar</Link>
                        </Col>
                    </Row>
                </Form>
            </Container>
        </ContainerPrincipal>
    );
}

export default AddEmprestimo;