export interface Cliente {
    id: string;
    nome: string;
    nomeSocial?: string;
    dataNascimento: string;
    documento: { tipo: 'RG' | 'CPF' | 'Passaporte'; numero: string };
    endereco: string;
    telefone: string;
  }
  
  const clientesExistentes: Cliente[] = [
    {
      id: '1',
      nome: 'João Silva',
      nomeSocial: 'João',
      dataNascimento: '1990-01-01',
      documento: { tipo: 'CPF', numero: '12345678900' },
      endereco: 'Rua A, 123',
      telefone: '(11) 1234-5678'
    },
    {
      id: '2',
      nome: 'Maria Oliveira',
      nomeSocial: 'Maria',
      dataNascimento: '1985-05-15',
      documento: { tipo: 'RG', numero: '1234567' },
      endereco: 'Rua B, 456',
      telefone: '(11) 9876-5432'
    }
  ];
  
  // Função para simular o cadastro do cliente e verificar duplicidade
  export const mockCadastrarCliente = async (novoCliente: Cliente): Promise<string> => {
    const clienteJaExiste = clientesExistentes.some(cliente =>
      cliente.nome === novoCliente.nome || cliente.documento.numero === novoCliente.documento.numero
    );
  
    if (clienteJaExiste) {
      return Promise.reject('Erro: Cliente já cadastrado com esse nome ou documento.');
    }
  
    // Simula um tempo de processamento para parecer uma requisição
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Apenas retornamos uma mensagem de sucesso, sem adicionar o cliente de fato
    return 'Cadastro concluído com sucesso!';
  };
  