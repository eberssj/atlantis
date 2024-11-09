import React, { useState, useEffect } from 'react';
import { Cliente, mockBuscarClientes } from '../../../services/mockApi';
import './ListarAcomodacoes.css'; 

const ListarAcomodacao: React.FC = () => {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtros, setFiltros] = useState({
    id: '',
    nome: '',
    tipoDocumento: '',
    cidade: '',
  });
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
        (filtros.tipoDocumento === '' || cliente.documento.tipo === filtros.tipoDocumento) &&
        (filtros.cidade === '' || cliente.endereco.includes(filtros.cidade))
      );
    });
    setClientesFiltrados(filtroClientes);
  }, [filtros, clientes]);

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
          <select
            name="tipoDocumento"
            value={filtros.tipoDocumento}
            onChange={handleChange}
            className="filtro-pequeno"
          >
            <option value="">Filtrar por tipo de documento</option>
            <option value="CPF">CPF</option>
            <option value="RG">RG</option>
            <option value="Passaporte">Passaporte</option>
          </select>
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
