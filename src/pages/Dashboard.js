import React, { useState, useEffect } from 'react';

import api from '../services/Api';

import { ContainerPrincipal, ReceitaSection, DespesaSection, EmprestimoSection } from './DashbordStyles/DashboardStyle';

import './DashbordStyles/Style.css'

import NavbarMenu from '../components/NavBarMenu';


function Dashboard() {
  const [receitaTotal, setReceitaTotal] = useState(0);
  const [receitaMesAtual, setReceitaMesAtual] = useState('');
  const [despesaTotal, setDespesaTotal] = useState(0);
  const [despesaMesAtual, setDespesaMesAtual] = useState('');
  const [emprestimoTotal, setEmprestimoTotal] = useState(0);
  const [emprestimoMesAtual, setEmprestimoMesAtual] = useState('');

  const mesAtual = new Date().toLocaleString('default', { month: 'long' });

  //Converte o valor para o padrão monetário BR
  const valorFormatado = (valor) => {
    return parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }

  useEffect(() => {
    api.get('/receitas/balanco').then(response => {
      setReceitaTotal(valorFormatado(response.data.balancoTotal));
    });

    api.get('/receitas/balanco/mes-atual').then(response => {
      setReceitaMesAtual(valorFormatado(response.data.valor));
    });

    api.get('/despesas/total').then(response => {
      setDespesaTotal(valorFormatado(response.data.total));
    });

    api.get('/despesas/total/mes-atual').then(response => {
      setDespesaMesAtual(valorFormatado(response.data.valor));
    });

    api.get('/emprestimos/total').then(response => {
      setEmprestimoTotal(valorFormatado(response.data.total));
    });

    api.get('/emprestimos/total/mes-atual').then(response => {
      setEmprestimoMesAtual(valorFormatado(response.data.valor));
    });
  }, []);

  return (
    <ContainerPrincipal>
      <NavbarMenu />

      <ReceitaSection>
        <div>
          <h2 className='titulo2'>Receitas Totais</h2>
          <div className="btnValor">{receitaTotal || 0} </div>
        </div>
        <div>
          <h2 className='titulo2'>Receitas {mesAtual.toUpperCase()}</h2>
          <div className="btnValor">{receitaMesAtual || 0} </div>
        </div>
      </ReceitaSection>

      <DespesaSection>
        <div>
          <h2 className='titulo2'>Despesas Totais</h2>
          <div className="btnValorDespesas">{despesaTotal || 0} </div>
        </div>
        <div>
          <h2 className='titulo2'>Despesas {mesAtual.toUpperCase()}</h2>
          <div className="btnValorDespesas">{despesaMesAtual || 0} </div>
        </div>
      </DespesaSection>

      <EmprestimoSection>
        <div>
          <h2 className='titulo2'>Empréstimos Totais</h2>
          <div className="btnValorDespesas">{emprestimoTotal || 0} </div>
        </div>
        <div>
          <h2 className='titulo2'>Empréstimos {mesAtual.toUpperCase()}</h2>
          <div className="btnValorDespesas">{emprestimoMesAtual || 0} </div>
        </div>
      </EmprestimoSection>

      {/* Adicione mais seções conforme necessário. */}
    </ContainerPrincipal>
  );
}

export default Dashboard;
