import React, { useState } from 'react';
import { mockExcluirCliente } from '../../../services/mockApi'; 
import './ExclusaoCliente.css';

const ExcluirCliente: React.FC = () => {
  const [id, setId] = useState(''); 
  const [mensagem, setMensagem] = useState<string | null>(null); 

  
  const handleExcluirCliente = async (event: React.FormEvent) => {
    event.preventDefault(); 
    setMensagem(null); 

    try {
      
      const resultado = await mockExcluirCliente(id);
      
      
      setMensagem(resultado);
    } catch (e) {
      
      setMensagem('Ocorreu um erro ao tentar excluir o cliente.');
    }
  };

  return (
    <div className="excluir-cliente">
      <h2>Excluir Cliente</h2>
      <form onSubmit={handleExcluirCliente}>
        <input
          type="text"
          placeholder="ID do Cliente"
          value={id}
          onChange={(e) => setId(e.target.value)} 
        />
        <button type="submit">Excluir</button>
      </form>

      
      {mensagem && <p className="mensagem">{mensagem}</p>}
    </div>
  );
};

export default ExcluirCliente;
