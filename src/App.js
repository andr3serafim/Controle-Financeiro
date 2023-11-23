import React from 'react';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './pages/Dashboard';

import AddReceitas from './pages/AddReceitas'
import AddDespesas from './pages/AddDespesas'
import AddCategoria from './pages/AddCategoria';
import AddEmprestimo from './pages/AddEmprestimo';

import ListarReceitas from './pages/ListarReceitas';
import ListarDespesas from './pages/ListarDespesas';
import ListarEmprestimos from './pages/ListarEmprestimos';
import ListarParcelas from './pages/ListarParcelas';

import EditReceita from './pages/EditarReceitas';
import EditDespesa from './pages/EditarDespesas';
import EditCategoria from './pages/EditarCategoria';
import EditEmprestimo from './pages/EditarEmprestimos';

import GerenciarCategorias from './pages/GerenciarCategorias';
import ListarDespesasPorCategoria from './pages/ListarDespesasPorCategoria';

function App() {

return (
  <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        
        <Route path="/receitas" element={<AddReceitas />} />
        <Route path="/despesas" element={<AddDespesas />} />
        <Route path="/add-categorias" element={<AddCategoria />} />
        <Route path="/emprestimos" element={<AddEmprestimo />} />

        <Route path="/categorias" element={<GerenciarCategorias />} />
        <Route path="/listar-receitas" element={<ListarReceitas />} />
        <Route path="/listar-despesas" element={<ListarDespesas />} />
        <Route path="/listar-emprestimos" element={<ListarEmprestimos />} />
        <Route path="/emprestimos/:id/parcelas" element={<ListarParcelas/>} />
        <Route path="/categorias/total" element={<ListarDespesasPorCategoria/>} />

        <Route path="/editar-receita/:id" element={<EditReceita />} />
        <Route path="/editar-despesa/:id" element={<EditDespesa />} />
        <Route path="/editar-emprestimo/:id" element={<EditEmprestimo />} />
        <Route path="/editar-categoria/:categoriaId" element={<EditCategoria />} />

        {/* Outras rotas serão adicionadas aqui à medida que avançamos */}
      </Routes>
    </div>
  </Router>
);
}

export default App;