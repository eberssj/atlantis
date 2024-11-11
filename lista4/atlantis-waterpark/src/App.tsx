import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/pages/Home/Home';
import Dashboard from './components/pages/Dashboard/Dashboard';

import CadastrarCliente from './components/pages/CadastroCliente/CadastroCliente';
import EditarCliente from './components/pages/EditarCliente/EditarCliente';
import VerCliente from './components/pages/VerCliente/VerCliente';
import ExcluirCliente from './components/pages/Exclusão/ExclusaoCliente';
import ListarClientes from './components/pages/ListarCliente/ListarCliente';

import CadastrarAcomodacao from './components/pages/CadastrarAcomodacao/CadastrarAcomodacao';
import EditarAcomodacao from './components/pages/EditarAcomodacao/EditarAcomodacao';
import VerAcomodacao from './components/pages/VerAcomodação/VerAcomodacao';
import ExcluirAcomodacao from './components/pages/ExcluirAcomodacao/ExcluirAcomodacao';
import ListarAcomodacao from './components/pages/ListarAcomodacoes/ListarAcomodacoes';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
          <Route path="/editar-cliente" element={<EditarCliente />} />
          <Route path="/ver-cliente" element={<VerCliente />} />
          <Route path="/exclusao-cliente" element={<ExcluirCliente />} />
          <Route path="/listar-cliente" element={<ListarClientes />} />
          
          <Route path="/cadastrar-acomodacao" element={<CadastrarAcomodacao />} />
          <Route path="/editar-acomodacao" element={<EditarAcomodacao />} />
          <Route path="/ver-acomodacao" element={<VerAcomodacao />} />
          <Route path="/excluir-acomodacao" element={<ExcluirAcomodacao />} />
          <Route path="/listar-acomodacao" element={<ListarAcomodacao />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
