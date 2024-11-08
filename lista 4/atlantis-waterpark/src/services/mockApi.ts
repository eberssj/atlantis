export interface Dependente {
  id: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento: string;
  documento: { tipo: 'RG' | 'CPF' | 'Passaporte'; numero: string };
  telefone: string;
}

export interface Cliente {
  id: string;
  nome: string;
  nomeSocial?: string;
  dataNascimento: string;
  documento: { tipo: 'RG' | 'CPF' | 'Passaporte'; numero: string };
  endereco: string;
  telefone: string;
  dependentes?: Dependente[];
}

const clientesExistentes: Cliente[] = [
  {
    id: '1',
    nome: 'João Silva',
    nomeSocial: 'João',
    dataNascimento: '1990-01-01',
    documento: { tipo: 'CPF', numero: '12345678900' },
    endereco: 'Rua A, 123',
    telefone: '(11) 1234-5678',
    dependentes: [
      {
        id: '1.1',
        nome: 'Ana Silva',
        nomeSocial: 'Ana',
        dataNascimento: '2015-03-20',
        documento: { tipo: 'RG', numero: '9876543' },
        telefone: '(11) 9876-1234'
      }
    ]
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

// Função para cadastrar um novo cliente
export const mockCadastrarCliente = async (novoCliente: Cliente): Promise<string> => {
  const clienteJaExiste = clientesExistentes.some(cliente =>
    cliente.nome === novoCliente.nome || cliente.documento.numero === novoCliente.documento.numero
  );

  if (clienteJaExiste) {
    return Promise.reject('Erro: Cliente já cadastrado com esse nome ou documento.');
  }

  await new Promise(resolve => setTimeout(resolve, 500));

  clientesExistentes.push(novoCliente);  // Adiciona o novo cliente ao array de clientes
  return 'Cadastro concluído com sucesso!';
};

// Função para adicionar um dependente a um cliente
export const adicionarDependente = async (idCliente: string, dependente: Dependente): Promise<string> => {
  const cliente = clientesExistentes.find(c => c.id === idCliente);

  if (!cliente) {
    return Promise.reject('Cliente não encontrado.');
  }

  if (!cliente.dependentes) {
    cliente.dependentes = [];
  }

  const dependenteJaExiste = cliente.dependentes.some(dep =>
    dep.nome === dependente.nome || dep.documento.numero === dependente.documento.numero
  );

  if (dependenteJaExiste) {
    return Promise.reject('Erro: Dependente já cadastrado.');
  }

  cliente.dependentes.push(dependente);

  return 'Dependente cadastrado com sucesso!';
};

// Função para buscar um cliente pelo ID
export const mockBuscarCliente = async (id: string): Promise<Cliente | undefined> => {
  console.log('Procurando cliente com o ID:', id); 
  const cliente = clientesExistentes.find(cliente => cliente.id === id);
  if (!cliente) {
    console.error('Cliente não encontrado para o ID:', id); 
  }
  return cliente;
};

// Função para editar um cliente
export const mockEditarCliente = async (id: string, dadosAtualizados: Cliente): Promise<string> => {
  const clienteIndex = clientesExistentes.findIndex(cliente => cliente.id === id);
  
  if (clienteIndex === -1) {
    return Promise.reject('Cliente não encontrado.');
  }

  clientesExistentes[clienteIndex] = { ...clientesExistentes[clienteIndex], ...dadosAtualizados };
  
  return 'Cliente editado com sucesso!';
};

// Função para excluir um cliente pelo ID
export const mockExcluirCliente = async (id: string): Promise<string> => {
  console.log('ID do Cliente a ser excluído:', id);  // Log do ID recebido

  const clienteIndex = clientesExistentes.findIndex(cliente => cliente.id === id);

  if (clienteIndex === -1) {
    console.log('Cliente não encontrado!');  // Log de erro
    return Promise.reject('Cliente não encontrado.');
  }

  console.log('Cliente encontrado:', clientesExistentes[clienteIndex]);  // Log do cliente encontrado

  // Remove o cliente do array
  clientesExistentes.splice(clienteIndex, 1);

  console.log('Clientes após a exclusão:', clientesExistentes);  // Log de clientes restantes
  
  return 'Cliente excluído com sucesso!';
};

const novoDependente: Dependente = {
  id: '1.2',
  nome: 'Carlos Silva',
  nomeSocial: 'Carlos',
  dataNascimento: '2018-06-10',
  documento: { tipo: 'RG', numero: '1122334' },
  telefone: '(11) 9345-6789'
};

adicionarDependente('1', novoDependente).then(console.log).catch(console.error);

const novoCliente: Cliente = {
  id: '3',
  nome: 'Lucca Santos',
  dataNascimento: '2000-02-28',
  documento: { tipo: 'CPF', numero: '98765432100' },
  endereco: 'Rua C, 789',
  telefone: '(11) 8765-4321'
};

mockCadastrarCliente(novoCliente).then(console.log).catch(console.error);


