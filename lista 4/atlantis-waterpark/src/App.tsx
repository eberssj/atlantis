import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/pages/Home/Home';
import CadastrarCliente from './components/pages/CadastroCliente/CadastroCliente';
import EditarCliente from './components/pages/EditarCliente/EditarCliente';
import VerCliente from './components/pages/VerCliente/VerCliente';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
          <Route path="/editar-cliente" element={<EditarCliente />} />
          <Route path="/ver-cliente" element={<VerCliente />} />
          {/* Adicione outras rotas aqui conforme for desenvolvendo */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
