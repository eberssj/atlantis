import React, { useState } from 'react';
import { mockBuscarCliente, editarAcomodacao, AcomodacaoTipo, associarAcomodacao } from '../../../services/mockApi';
import './CadastrarAcomodacao.css';

const CadastroAcomodacao: React.FC = () => {
  const [idCliente, setIdCliente] = useState<string>('');
  const [acomodacao, setAcomodacao] = useState<string>(''); 
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

  const handleAssociarAcomodacao = async () => {
    if (cliente && acomodacao) {
      try {
        if (!cliente.acomodacao) {
          // Se o cliente não tem acomodação, associamos uma
          await associarAcomodacao(cliente.id, acomodacao as AcomodacaoTipo);
        } else {
          // Se já tem acomodação, editamos
          await editarAcomodacao(cliente.id, acomodacao as AcomodacaoTipo);
        }
        
        // Atualizar cliente com a nova acomodação
        setCliente({ ...cliente, acomodacao });
        setErro('');
        setPopupMensagem(`Acomodação associada ao cliente ${cliente.nome}: ${acomodacao}`); // Exibe o popup
      } catch (e) {
        setErro('Erro ao associar acomodação ao cliente.');
      }
    } else {
      setErro('Selecione um cliente e uma acomodação.');
    }
  };



  return (
    <div className="cadastro-acomodacao">
      <h2>Cadastrar Acomodação</h2>

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

          <label htmlFor="acomodacao">Escolha a Acomodação:</label>
          <select 
            id="acomodacao" 
            value={acomodacao} 
            onChange={(e) => setAcomodacao(e.target.value)}>
            <option value="">Selecione uma acomodação</option>
            <option value="Casal Simples">Casal Simples</option>
            <option value="Família Simples">Família Simples</option>
            <option value="Família Mais">Família Mais</option>
            <option value="Família Super">Família Super</option>
            <option value="Solteiro Simples">Solteiro Simples</option>
            <option value="Solteiro Mais">Solteiro Mais</option>
          </select>

          <button onClick={handleAssociarAcomodacao}>Associar Acomodação</button>

          
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

export default CadastroAcomodacao;
