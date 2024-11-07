import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Home/Home';
import CadastrarCliente from './components/CadastroCliente/CadastroCliente';

const App: React.FC = () => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cadastrar-cliente" element={<CadastrarCliente />} />
          {/* Adicione outras rotas aqui conforme for desenvolvendo */}
        </Routes>
      </div>
    </div>
  );
};

export default App;
