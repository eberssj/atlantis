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
  acomodacao?: AcomodacaoTipo; 
}

export type AcomodacaoTipo = 
  | 'Casal Simples'
  | 'Família Simples'
  | 'Família Mais'
  | 'Família Super'
  | 'Solteiro Simples'
  | 'Solteiro Mais';

const clientesExistentes: Cliente[] = [
  {
    id: '1',
    nome: 'Sophia Roncati',
    nomeSocial: 'Soso',
    dataNascimento: '1990-01-01',
    documento: { tipo: 'CPF', numero: '12345678900' },
    endereco: 'Rua A, 123',
    telefone: '(11) 1234-5678',
    acomodacao: 'Casal Simples',
    dependentes: [
      {
        id: '1.1',
        nome: 'Livia Faria',
        nomeSocial: 'Livinha',
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
  },
  {
    id: '3',
    nome: 'Pedro Souza',
    nomeSocial: 'Pedro',
    dataNascimento: '1992-04-30',
    documento: { tipo: 'CPF', numero: '98765432000' },
    endereco: 'Rua D, 123',
    telefone: '(11) 8765-4321',
    dependentes: [
      {
        id: '3.1',
        nome: 'Lucas Souza',
        nomeSocial: 'Lucas',
        dataNascimento: '2018-08-25',
        documento: { tipo: 'RG', numero: '12345678' },
        telefone: '(11) 9876-4321'
      }
    ]
  },
  {
    id: '4',
    nome: 'Laura Costa',
    nomeSocial: 'Laura',
    dataNascimento: '1988-12-12',
    documento: { tipo: 'RG', numero: '2345678' },
    endereco: 'Rua E, 789',
    telefone: '(11) 9999-1111'
  },
  {
    id: '5',
    nome: 'Lucca Santos',
    dataNascimento: '2000-02-28',
    documento: { tipo: 'CPF', numero: '98765432100' },
    endereco: 'Rua C, 789',
    telefone: '(11) 8765-4321'
  }
];

// Função para cadastrar um novo cliente com acomodação
export const mockCadastrarClienteNovo = async (novoCliente: Cliente): Promise<string> => {
  const clienteJaExiste = clientesExistentes.some(cliente =>
    cliente.nome === novoCliente.nome || cliente.documento.numero === novoCliente.documento.numero
  );

  if (clienteJaExiste) {
    return "Cliente já cadastrado.";
  }

  clientesExistentes.push(novoCliente);
  return "Cliente cadastrado com sucesso!";
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

// Função para buscar todos os clientes
export const mockBuscarClientes = async (): Promise<Cliente[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(clientesExistentes);
    }, 500);
  });
};

// Função para excluir um cliente pelo ID
export const mockExcluirCliente = async (id: string): Promise<string> => {
  console.log('ID do Cliente a ser excluído:', id);

  const clienteIndex = clientesExistentes.findIndex(cliente => cliente.id === id);

  if (clienteIndex === -1) {
    console.log('Cliente não encontrado!');
    return Promise.reject('Cliente não encontrado.');
  }

  console.log('Cliente encontrado:', clientesExistentes[clienteIndex]);

  clientesExistentes.splice(clienteIndex, 1);
  console.log('Clientes após a exclusão:', clientesExistentes);
  
  return 'Cliente excluído com sucesso!';
};

// Exemplo de uso para adicionar um novo dependente
const novoDependente: Dependente = {
  id: '1.2',
  nome: 'Carlos Silva',
  nomeSocial: 'Carlos',
  dataNascimento: '2018-06-10',
  documento: { tipo: 'RG', numero: '1122334' },
  telefone: '(11) 9345-6789'
};

adicionarDependente('1', novoDependente).then(console.log).catch(console.error);


const novoClienteExemplo: Cliente = {
  id: '6',
  nome: 'Joaquim Almeida',
  dataNascimento: '1985-08-20',
  documento: { tipo: 'CPF', numero: '12309874561' },
  endereco: 'Rua H, 101',
  telefone: '(11) 9345-4321'
};

// Função para associar um cliente a uma acomodação
export const associarAcomodacao = async (idCliente: string, acomodacao: AcomodacaoTipo): Promise<string> => {
  const cliente = clientesExistentes.find(c => c.id === idCliente);

  if (!cliente) {
    return Promise.reject('Cliente não encontrado.');
  }

  // Verifica se o cliente já tem uma acomodação associada
  if (cliente.acomodacao) {
    return Promise.reject('Esse cliente já possui uma acomodação associada.');
  }

  cliente.acomodacao = acomodacao;
  return 'Acomodação associada com sucesso!';
};

export const editarAcomodacao = async (idCliente: string, novaAcomodacao: AcomodacaoTipo): Promise<string> => {
  const cliente = clientesExistentes.find(c => c.id === idCliente);

  if (!cliente) {
    return Promise.reject('Cliente não encontrado.');
  }

  // Se o cliente não tiver acomodação, associa uma nova
  if (!cliente.acomodacao) {
    cliente.acomodacao = novaAcomodacao;
    return 'Acomodação associada com sucesso!';
  }

  // Se já houver acomodação, apenas edita
  cliente.acomodacao = novaAcomodacao;
  return 'Acomodação editada com sucesso!';
};

// Função para visualizar a acomodação de um cliente
export const verAcomodacao = async (idCliente: string): Promise<string> => {
  const cliente = clientesExistentes.find(c => c.id === idCliente);

  if (!cliente) {
    return Promise.reject('Cliente não encontrado.');
  }

  if (!cliente.acomodacao) {
    return Promise.reject('Esse cliente não possui acomodação associada.');
  }

  return `O cliente ${cliente.nome} está associado à acomodação: ${cliente.acomodacao}`;
};




