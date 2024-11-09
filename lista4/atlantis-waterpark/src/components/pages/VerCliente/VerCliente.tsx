import React, { useState } from 'react';
import { Cliente, Dependente, mockBuscarCliente } from '../../../services/mockApi';
import './VerCliente.css';

const VerCliente: React.FC = () => {
  const [id, setId] = useState<string>(''); 
  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const handleBuscarCliente = async (event: React.FormEvent) => {
    event.preventDefault();
    setErro(null); 

    console.log('Buscando cliente com o ID:', id); 

    try {
      const resultado = await mockBuscarCliente(id);
      if (resultado) {
        setCliente(resultado);
      } else {
        setErro('Cliente não encontrado.');
      }
    } catch (e) {
      console.error('Erro ao buscar cliente:', e); // Log do erro
      setErro('Ocorreu um erro ao buscar o cliente.');
    }
  };

  return (
    <div className="ver-cliente">
      <h2>Buscar Cliente</h2>
      <form onSubmit={handleBuscarCliente}>
        <input
          type="text"
          placeholder="ID do Cliente"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <button type="submit">Buscar</button>
      </form>

      {erro && <p className="erro">{erro}</p>}

      {cliente && (
        <div className="informacoes-cliente">
          <h3>Informações do Cliente</h3>
          <p><strong>Nome:</strong> {cliente.nome}</p>
          <p><strong>Nome Social:</strong> {cliente.nomeSocial || 'N/A'}</p>
          <p><strong>Data de Nascimento:</strong> {cliente.dataNascimento}</p>
          <p><strong>Documento:</strong> {cliente.documento.tipo} - {cliente.documento.numero}</p>
          <p><strong>Endereço:</strong> {cliente.endereco}</p>
          <p><strong>Telefone:</strong> {cliente.telefone}</p>

          {cliente.dependentes && cliente.dependentes.length > 0 && (
            <>
              <h4>Dependentes</h4>
              {cliente.dependentes.map((dependente: Dependente) => (
                <div key={dependente.id} className="dependente">
                  <p><strong>Nome:</strong> {dependente.nome}</p>
                  <p><strong>Nome Social:</strong> {dependente.nomeSocial || 'N/A'}</p>
                  <p><strong>Data de Nascimento:</strong> {dependente.dataNascimento}</p>
                  <p><strong>Documento:</strong> {dependente.documento.tipo} - {dependente.documento.numero}</p>
                  <p><strong>Telefone:</strong> {dependente.telefone}</p>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default VerCliente;
