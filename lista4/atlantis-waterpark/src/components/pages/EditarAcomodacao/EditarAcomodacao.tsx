import React, { useState, useEffect } from 'react';
import { Cliente, mockBuscarClientes } from '../../../services/mockApi';
import './EditarAcomodacao.css';

type AcomodacaoTipo =
  | 'Casal Simples'
  | 'Família Simples'
  | 'Família Mais'
  | 'Família Super'
  | 'Solteiro Simples'
  | 'Solteiro Mais';

const tiposDeAcomodacao: AcomodacaoTipo[] = [
  'Casal Simples',
  'Família Simples',
  'Família Mais',
  'Família Super',
  'Solteiro Simples',
  'Solteiro Mais',
];

const EditarAcomodacao: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteSelecionado, setClienteSelecionado] = useState<string>('');
  const [acomodacaoSelecionada, setAcomodacaoSelecionada] = useState<AcomodacaoTipo | ''>('');
  const [showPopup, setShowPopup] = useState<boolean>(false);

  useEffect(() => {
    const carregarClientes = async () => {
      const todosClientes = await mockBuscarClientes();
      setClientes(todosClientes);
    };
    carregarClientes();
  }, []);

  const handleSalvarAlteracoes = () => {
    if (clienteSelecionado && acomodacaoSelecionada) {
      console.log(`Cliente ${clienteSelecionado} agora está associado à acomodação: ${acomodacaoSelecionada}`);
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false); // Esconde o popup após 3 segundos
      }, 3000);

      setClienteSelecionado('');
      setAcomodacaoSelecionada('');
    } else {
      alert('Por favor, selecione um cliente e uma acomodação.');
    }
  };

  return (
    <div className="editar-acomodacao">
      <h2>Editar Acomodação</h2>

      <div className="campo-selecao">
        <label htmlFor="cliente">Selecione um Cliente:</label>
        <select
          id="cliente"
          value={clienteSelecionado}
          onChange={(e) => setClienteSelecionado(e.target.value)}
          className="select-cliente"
        >
          <option value="">-- Selecione um Cliente --</option>
          {clientes.map(cliente => (
            <option key={cliente.id} value={cliente.id}>
              {cliente.nome}
            </option>
          ))}
        </select>
      </div>

      <div className="campo-selecao">
        <label htmlFor="acomodacao">Tipo de Acomodação:</label>
        <select
          id="acomodacao"
          value={acomodacaoSelecionada}
          onChange={(e) => setAcomodacaoSelecionada(e.target.value as AcomodacaoTipo)}
          className="select-acomodacao"
        >
          <option value="">-- Selecione uma Acomodação --</option>
          {tiposDeAcomodacao.map((tipo, index) => (
            <option key={index} value={tipo}>{tipo}</option>
          ))}
        </select>
      </div>

      <button onClick={handleSalvarAlteracoes} className="botao-editar">
        Salvar Alterações
      </button>

      {/* Popup de sucesso */}
      {showPopup && (
        <div className="popup-mensagem show">
          Acomodação alterada com sucesso!
        </div>
      )}
    </div>
  );
};

export default EditarAcomodacao;
