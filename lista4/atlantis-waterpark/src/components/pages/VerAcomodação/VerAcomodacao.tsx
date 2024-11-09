import React, { useState } from 'react';
import { mockBuscarCliente } from '../../../services/mockApi'; 
import './VerAcomodacao.css';

const VerAcomodacao: React.FC = () => {
  const [idCliente, setIdCliente] = useState<string>('');  
  const [cliente, setCliente] = useState<any>(null);  
  const [erro, setErro] = useState<string>('');  

  // Função para buscar o cliente e mostrar a acomodação
  const handleBuscarCliente = async () => {
    try {
      const clienteEncontrado = await mockBuscarCliente(idCliente);  
      if (clienteEncontrado) {
        setCliente(clienteEncontrado);  
        setErro('');  
      } else {
        setCliente(null); 
        setErro('Cliente não encontrado.'); 
      }
    } catch (e) {
      setErro('Erro ao buscar cliente.');  
      setCliente(null);  
    }
  };

  return (
    <div className="ver-acomodacao">
      <h2>Ver Acomodação</h2>

      <div className="campo-pesquisa">
        <label htmlFor="idCliente">Digite o ID do Cliente:</label>
        <input
          id="idCliente"
          type="text"
          value={idCliente}
          onChange={(e) => setIdCliente(e.target.value)}  // Atualiza o ID do cliente à medida que o usuário digita
          placeholder="ID do Cliente"
        />
        <button onClick={handleBuscarCliente}>Buscar</button>  {/* Chama a função ao clicar no botão */}
      </div>

      {/* Exibe as mensagens de erro, caso haja */}
      {erro && <div className="erro">{erro}</div>}

      {/* Exibe os dados do cliente encontrado */}
      {cliente && !erro && (
        <div className="resultado">
          <h3>Cliente: {cliente.nome}</h3>
          <p>Tipo de Acomodação: {cliente.acomodacao || 'Nenhuma acomodação associada'}</p>
        </div>
      )}
    </div>
  );
};

export default VerAcomodacao;
