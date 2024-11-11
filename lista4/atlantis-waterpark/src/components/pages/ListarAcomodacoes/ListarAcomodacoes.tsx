import React, { useState, useEffect } from 'react';
import { Cliente, mockBuscarClientes } from '../../../services/mockApi';
import './ListarAcomodacoes.css';

type AcomodacaoTipo =
  | 'Casal Simples'
  | 'Família Simples'
  | 'Família Mais'
  | 'Família Super'
  | 'Solteiro Simples'
  | 'Solteiro Mais';

// Definindo a lista de opções de acomodação com base no tipo AcomodacaoTipo
const tiposDeAcomodacao: AcomodacaoTipo[] = [
  'Casal Simples',
  'Família Simples',
  'Família Mais',
  'Família Super',
  'Solteiro Simples',
  'Solteiro Mais',
];

const ListarAcomodacao: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtros, setFiltros] = useState({
    id: '',
    nome: '',
    cidade: '',
  });
  const [acomodacaoSelecionada, setAcomodacaoSelecionada] = useState<AcomodacaoTipo | "">("");
  const [clientesFiltrados, setClientesFiltrados] = useState<Cliente[]>(clientes);

  useEffect(() => {
    // Carregar todos os clientes quando o componente for montado
    const carregarClientes = async () => {
      const todosClientes = await mockBuscarClientes();
      // Filtra os clientes que possuem acomodação
      const clientesComAcomodacao = todosClientes.filter(cliente => cliente.acomodacao); 
      setClientes(clientesComAcomodacao);
      setClientesFiltrados(clientesComAcomodacao);
    };
    carregarClientes();
  }, []);

  useEffect(() => {
    // Filtra os clientes sempre que os filtros mudam
    const filtroClientes = clientes.filter(cliente => {
      return (
        (filtros.id === '' || cliente.id.toLowerCase().includes(filtros.id.toLowerCase())) &&
        (filtros.nome === '' || cliente.nome.toLowerCase().includes(filtros.nome.toLowerCase())) &&
        (filtros.cidade === '' || cliente.endereco.includes(filtros.cidade)) &&
        (acomodacaoSelecionada === '' || cliente.acomodacao === acomodacaoSelecionada)
      );
    });
    setClientesFiltrados(filtroClientes);
  }, [filtros, clientes, acomodacaoSelecionada]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="listar-acomodacao">
      <h2>Lista de Clientes com Acomodação</h2>

      <div className="filtros">
        <div className="filtro-linha">
          <input
            type="text"
            name="id"
            placeholder="Filtrar por ID"
            value={filtros.id}
            onChange={handleChange}
            className="filtro-pequeno"
          />
          <input
            type="text"
            name="nome"
            placeholder="Filtrar por nome"
            value={filtros.nome}
            onChange={handleChange}
            className="filtro-largo"
          />
        </div>

        <div className="filtro-linha">
          <input
            type="text"
            name="cidade"
            placeholder="Filtrar por Endereço"
            value={filtros.cidade}
            onChange={handleChange}
            className="filtro-largo"
          />
          <div className="campo-selecao">
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
        </div>
      </div>

      {clientesFiltrados.map(cliente => (
        <li key={cliente.id}>
          <div className="cliente-info">
            <h3>{cliente.nome}</h3>
            <p><strong>ID:</strong> {cliente.id}</p>
            <p><strong>{cliente.documento.tipo}:</strong> {cliente.documento.numero}</p>
            <p><strong>Endereço:</strong> {cliente.endereco}</p>
            <p><strong>Telefone:</strong> {cliente.telefone}</p>
            <p><strong>Acomodação:</strong> {cliente.acomodacao}</p> {/* Exibe a acomodação */}
          </div>
        </li>
      ))}
    </div>
  );
};

export default ListarAcomodacao;
