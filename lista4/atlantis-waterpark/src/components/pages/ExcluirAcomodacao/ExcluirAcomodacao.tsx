import React, { useState } from 'react';
import { mockBuscarCliente, removerAcomodacao } from '../../../services/mockApi';
import './ExcluirAcomodacao.css';

const ExcluirAcomodacao: React.FC = () => {
  const [idCliente, setIdCliente] = useState<string>('');
  const [cliente, setCliente] = useState<any>(null);
  const [erro, setErro] = useState<string>('');
  const [popupMensagem, setPopupMensagem] = useState<string>(''); // Estado para o popup

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

  const handleRemoverAcomodacao = async () => {
    if (cliente && cliente.acomodacao) {
      try {
        await removerAcomodacao(cliente.id); // Chama a função para desassociar a acomodação
        setCliente({ ...cliente, acomodacao: null });
        setPopupMensagem(`Acomodação removida do cliente ${cliente.nome}.`);
        setErro('');
      } catch (e) {
        setErro('Erro ao remover a acomodação do cliente.');
      }
    } else {
      setErro('Este cliente não possui uma acomodação associada.');
    }
  };

  return (
    <div className="excluir-acomodacao">
      <h2>Excluir Acomodação Associada</h2>

      <div className="campo-pesquisa">
        <label htmlFor="idCliente">Digite o ID do Cliente:</label>
        <input
          id="idCliente"
          type="text"
          value={idCliente}
          onChange={(e) => setIdCliente(e.target.value)}
          placeholder="ID do Cliente"
        />
        <button onClick={handleBuscarCliente}>Buscar Cliente</button>
      </div>

      {erro && <div className="erro">{erro}</div>}

      {cliente && !erro && (
        <div className="resultado">
          <h3>Cliente: {cliente.nome}</h3>
          <p>Tipo de Acomodação Atual: {cliente.acomodacao || 'Nenhuma acomodação associada'}</p>
          
          {/* Só exibe o botão se o cliente tiver uma acomodação associada */}
          {cliente.acomodacao && (
            <button onClick={handleRemoverAcomodacao}>Remover Acomodação</button>
          )}
        </div>
      )}

      {/* Popup de mensagem */}
      {popupMensagem && (
        <div className="popup-mensagem show">
          {popupMensagem}
        </div>
      )}
    </div>
  );
};

export default ExcluirAcomodacao;
