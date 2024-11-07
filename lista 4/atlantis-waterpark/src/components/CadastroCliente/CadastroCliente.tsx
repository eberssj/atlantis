import React, { useState, useEffect } from 'react';
import { Cliente, mockCadastrarCliente } from '../../services/mockApi';
import '../CadastroCliente/CadastroCliente.css';

interface Dependente {
  nome: string;
  dataNascimento: string;
  documento: { tipo: 'RG' | 'CPF' | 'Passaporte'; numero: string };
}

const CadastrarCliente: React.FC = () => {
  const [nome, setNome] = useState('');
  const [nomeSocial, setNomeSocial] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [documento, setDocumento] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState<'RG' | 'CPF' | 'Passaporte'>('RG');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [popupMensagem, setPopupMensagem] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);
  
  // Estados para o cadastro de dependente
  const [temDependente, setTemDependente] = useState(false);
  const [dependente, setDependente] = useState<Dependente>({
    nome: '',
    dataNascimento: '',
    documento: { tipo: 'RG', numero: '' },
  });

  // Controla a animação de entrada e saída do popup
  useEffect(() => {
    if (!showPopup) {
      setTimeout(() => setPopupMensagem(null), 400); // Limpa a mensagem após a animação de saída
    }
  }, [showPopup]);

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    const cliente: Cliente = {
      id: Math.random().toString(36).substr(2, 9), // Gera um ID aleatório para o cliente
      nome,
      nomeSocial,
      dataNascimento,
      documento: { tipo: tipoDocumento, numero: documento },
      endereco,
      telefone
    };

    try {
      const mensagem = await mockCadastrarCliente(cliente);
      setPopupMensagem(mensagem);
      setShowPopup(true); // Exibe o popup
    } catch (erro) {
      setPopupMensagem(erro as string); 
      setShowPopup(true);
      return;
    }

    if (temDependente) {
      setPopupMensagem('Cadastro do cliente e dependente concluído com sucesso!');
      setShowPopup(true);
    }

    // Oculta o popup após 3 segundos
    setTimeout(() => setShowPopup(false), 3000);
  };

  return (
    <div className="cadastrar-cliente">
      <h1>Cadastrar Cliente</h1>
      <form onSubmit={handleCadastro}>
        <div className="flex-container">
          <div>
            <label>Nome:</label>
            <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} required />
          </div>
          <div>
            <label>Nome Social:</label>
            <input type="text" value={nomeSocial} onChange={(e) => setNomeSocial(e.target.value)} />
          </div>
        </div>

        <div className="flex-container">
          <div>
            <label>Data de Nascimento:</label>
            <input type="date" value={dataNascimento} onChange={(e) => setDataNascimento(e.target.value)} required />
          </div>
          <div>
            <label>Tipo de Documento:</label>
            <select value={tipoDocumento} onChange={(e) => setTipoDocumento(e.target.value as 'RG' | 'CPF' | 'Passaporte')}>
              <option value="RG">RG</option>
              <option value="CPF">CPF</option>
              <option value="Passaporte">Passaporte</option>
            </select>
          </div>
          <div>
            <label>Número do Documento:</label>
            <input type="text" value={documento} onChange={(e) => setDocumento(e.target.value)} required />
          </div>
        </div>

        <div className="flex-container endereco-telefone">
          <div>
            <label>Endereço:</label>
            <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} required />
          </div>
          <div>
            <label>Telefone:</label>
            <input type="text" value={telefone} onChange={(e) => setTelefone(e.target.value)} required />
          </div>
        </div>

        {/* Opção para escolher se há dependente */}
        <div>
          <label>Possui Dependente?</label>
          <input
            type="checkbox"
            checked={temDependente}
            onChange={(e) => setTemDependente(e.target.checked)}
          />
        </div>

        {/* Formulário de cadastro de dependente, exibido se tiver dependente */}
        {temDependente && (
          <div className="formulario-dependente">
            <h3>Cadastrar Dependente</h3>
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
                  setDependente({ ...dependente, documento: { ...dependente.documento, tipo: e.target.value as 'RG' | 'CPF' | 'Passaporte' } })
                }
              >
                <option value="RG">RG</option>
                <option value="CPF">CPF</option>
                <option value="Passaporte">Passaporte</option>
              </select>
              
              <label>Número do Documento do Dependente:</label>
              <input
                type="text"
                value={dependente.documento.numero}
                onChange={(e) => setDependente({ ...dependente, documento: { ...dependente.documento, numero: e.target.value } })}
                required
              />
            </div>
          </div>
        )}

        <div className="button-container">
          <button type="submit">Cadastrar Cliente</button>
        </div>
      </form>

      {/* Popup de mensagem com animação */}
      {popupMensagem && (
        <div className={`popup-mensagem ${showPopup ? 'show' : ''}`}>
          {popupMensagem}
        </div>
      )}
    </div>
  );
};

export default CadastrarCliente;
