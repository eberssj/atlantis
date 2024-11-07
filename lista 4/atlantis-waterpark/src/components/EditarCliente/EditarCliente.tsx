import React, { useState, useEffect } from 'react';
import '../EditarCliente/EditarCliente.css';
import { mockBuscarCliente, mockEditarCliente, Cliente, Dependente } from '../../services/mockApi';

const EditarCliente = () => {
  const [id, setId] = useState('');
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState<'RG' | 'CPF' | 'Passaporte'>('RG');
  const [documento, setDocumento] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [temDependente, setTemDependente] = useState(false);
  const [dependente, setDependente] = useState<Dependente>({
    id: '',
    nome: '',
    dataNascimento: '',
    documento: { tipo: 'RG', numero: '' },
    telefone: '',
  });

  const [mensagem, setMensagem] = useState('');

  // Função para carregar dados do cliente
  const carregarCliente = async (id: string) => {
    try {
      const cliente = await mockBuscarCliente(id);
      if (cliente) {
        setNome(cliente.nome);
        setNomeSocial(cliente.nomeSocial || '');
        setDataNascimento(cliente.dataNascimento);
        setTipoDocumento(cliente.documento.tipo);
        setDocumento(cliente.documento.numero);
        setEndereco(cliente.endereco);
        setTelefone(cliente.telefone);
        setTemDependente((cliente.dependentes || []).length > 0);
        if (cliente.dependentes && cliente.dependentes.length > 0) {
          setDependente(cliente.dependentes[0]);
        }
      } else {
        setMensagem('Cliente não encontrado.');
      }
    } catch (error) {
      setMensagem(String(error));
    }
  };

  useEffect(() => {
    if (id) {
      carregarCliente(id);
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const clienteAtualizado: Cliente = {
      id,
      nome,
      nomeSocial,
      dataNascimento,
      documento: { tipo: tipoDocumento, numero: documento },
      endereco,
      telefone,
      dependentes: temDependente ? [{ ...dependente, id: 'novo-id' }] : [],
    };

    try {
      const response = await mockEditarCliente(id, clienteAtualizado);
      setMensagem(response);
      setTimeout(() => setMensagem(''), 3000);  // Limpa a mensagem após 3 segundos
    } catch (error) {
      setMensagem('Erro ao editar cliente.');
      setTimeout(() => setMensagem(''), 3000);  // Limpa a mensagem após 3 segundos
    }
  };

  return (
    <div className="editar-cliente">
      <h1>Editar Cliente</h1>

      {/* Popup da Mensagem */}
      {mensagem && (
        <div className={`popup-mensagem ${mensagem ? 'show' : ''}`}>
          {mensagem}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="flex-container">
          <div>
            <label>ID do Cliente:</label>
            <input
              className="id-cliente"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Nome Social:</label>
            <input
              type="text"
              value={nomeSocial}
              onChange={(e) => setNomeSocial(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-container">
          <div>
            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Tipo de Documento:</label>
            <select
              value={tipoDocumento}
              onChange={(e) => setTipoDocumento(e.target.value as 'RG' | 'CPF' | 'Passaporte')}
            >
              <option value="RG">RG</option>
              <option value="CPF">CPF</option>
              <option value="Passaporte">Passaporte</option>
            </select>
          </div>
          <div>
            <label>Número do Documento:</label>
            <input
              type="text"
              value={documento}
              onChange={(e) => setDocumento(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="flex-container endereco-telefone">
          <div>
            <label>Endereço:</label>
            <input
              type="text"
              value={endereco}
              onChange={(e) => setEndereco(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Telefone:</label>
            <input
              type="text"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <label>Possui Dependente?</label>
          <input
            type="checkbox"
            checked={temDependente}
            onChange={(e) => setTemDependente(e.target.checked)}
          />
        </div>

        {temDependente && (
          <div className="formulario-dependente">
            <h3>Editar Dependente</h3>
            <div>
              <label>Nome do Dependente:</label>
              <input
                type="text"
                value={dependente.nome}
                onChange={(e) => setDependente({ ...dependente, nome: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Data de Nascimento do Dependente:</label>
              <input
                type="date"
                value={dependente.dataNascimento}
                onChange={(e) => setDependente({ ...dependente, dataNascimento: e.target.value })}
                required
              />
            </div>
            <div>
              <label>Tipo de Documento do Dependente:</label>
              <select
                value={dependente.documento.tipo}
                onChange={(e) =>
                  setDependente({
                    ...dependente,
                    documento: { ...dependente.documento, tipo: e.target.value as 'RG' | 'CPF' | 'Passaporte' },
                  })
                }
              >
                <option value="RG">RG</option>
                <option value="CPF">CPF</option>
                <option value="Passaporte">Passaporte</option>
              </select>
            </div>
            <div>
              <label>Número do Documento do Dependente:</label>
              <input
                type="text"
                value={dependente.documento.numero}
                onChange={(e) =>
                  setDependente({ ...dependente, documento: { ...dependente.documento, numero: e.target.value } })
                }
                required
              />
            </div>
          </div>
        )}

        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditarCliente;
