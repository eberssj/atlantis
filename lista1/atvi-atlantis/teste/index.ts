import readlineSync from 'readline-sync';
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";
import Telefone from "../modelos/telefone";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/tipoDocumento";

// Função para criar um cliente com dados fornecidos pelo usuário
function criarCliente(): Cliente {
    let cliente = new Cliente();
    cliente.nome = readlineSync.question('Digite o nome do cliente: ');
    cliente.nomeSocial = readlineSync.question('Digite o nome social do cliente: ');
    cliente.dataCadastro = new Date();
    cliente.dataNascimento = new Date(readlineSync.question('Digite a data de nascimento do cliente (yyyy-mm-dd): '));

    // Endereço do cliente
    let endereco = new Endereco();
    endereco.rua = readlineSync.question('Digite a rua do cliente: ');
    endereco.bairro = readlineSync.question('Digite o bairro do cliente: ');
    endereco.cidade = readlineSync.question('Digite a cidade do cliente: ');
    endereco.estado = readlineSync.question('Digite o estado do cliente: ');
    endereco.pais = readlineSync.question('Digite o país do cliente: ');
    endereco.codigoPostal = readlineSync.question('Digite o CEP do cliente: ');
    cliente.endereco = endereco;

    // Telefone do cliente
    let telefone = new Telefone();
    telefone.ddd = readlineSync.question('Digite o DDD do telefone do cliente: ');
    telefone.numero = readlineSync.question('Digite o número do telefone do cliente: ');
    cliente.telefones.push(telefone);

    // Documento do cliente
    let documento = new Documento();
    documento.numero = readlineSync.question('Digite o número do documento do cliente: ');
    let tipoDoc = readlineSync.question('Digite o tipo de documento (1 - RG, 2 - CPF): ');
    documento.tipo = tipoDoc === '1' ? TipoDocumento.RG : TipoDocumento.CPF;
    documento.dataExpedicao = new Date(readlineSync.question('Digite a data de expedição do documento (yyyy-mm-dd): '));
    cliente.documentos.push(documento);

    return cliente;
}

// Função para criar um dependente com dados fornecidos pelo usuário
function criarDependente(): Cliente {
    let dependente = new Cliente();
    dependente.nome = readlineSync.question('Digite o nome do dependente: ');
    dependente.nomeSocial = readlineSync.question('Digite o nome social do dependente: ');
    dependente.dataCadastro = new Date();
    dependente.dataNascimento = new Date(readlineSync.question('Digite a data de nascimento do dependente (yyyy-mm-dd): '));

    // Documento do dependente
    let documento = new Documento();
    documento.numero = readlineSync.question('Digite o número do documento do dependente: ');
    let tipoDoc = readlineSync.question('Digite o tipo de documento (1 - RG, 2 - CPF): ');
    documento.tipo = tipoDoc === '1' ? TipoDocumento.RG : TipoDocumento.CPF;
    documento.dataExpedicao = new Date(readlineSync.question('Digite a data de expedição do documento (yyyy-mm-dd): '));
    dependente.documentos.push(documento);

    return dependente;
}

// Função para exibir informações formatadas de um cliente
function exibirInformacoesCliente(cliente: Cliente) {
    console.log(`Nome: ${cliente.nome}`);
    console.log(`Nome Social: ${cliente.nomeSocial}`);
    console.log(`Data de Nascimento: ${cliente.dataNascimento.toLocaleDateString()}`);
    console.log(`Data de Cadastro: ${cliente.dataCadastro.toLocaleDateString()}`);
    console.log(`Endereço: ${cliente.endereco.rua}, ${cliente.endereco.bairro}, ${cliente.endereco.cidade} - ${cliente.endereco.estado}, ${cliente.endereco.pais}, CEP: ${cliente.endereco.codigoPostal}`);
    console.log(`Telefones:`);
    
    cliente.telefones.forEach(telefone => {
        console.log(`  (${telefone.ddd}) ${telefone.numero}`);
    });

    console.log(`Documentos:`);
    cliente.documentos.forEach(doc => {
        console.log(`  Tipo: ${TipoDocumento[doc.tipo]}, Número: ${doc.numero}, Data de Expedição: ${doc.dataExpedicao.toLocaleDateString()}`);
    });

    if (cliente.titular) {
        console.log(`Titular: ${cliente.titular.nome}`);
    }

    if (cliente.dependentes.length > 0) {
        console.log(`Dependentes:`);
        cliente.dependentes.forEach(dependente => {
            console.log(`  - ${dependente.nome} (${dependente.nomeSocial})`);
        });
    }

    console.log('------------------------------');
}

// Função para exibir informações formatadas de um dependente
function exibirInformacoesDependente(dependente: Cliente) {
    console.log(`Nome: ${dependente.nome}`);
    console.log(`Nome Social: ${dependente.nomeSocial}`);
    console.log(`Data de Nascimento: ${dependente.dataNascimento.toLocaleDateString()}`);
    console.log(`Data de Cadastro: ${dependente.dataCadastro.toLocaleDateString()}`);
    console.log(`Endereço associado ao cliente: ${dependente.endereco.rua}, ${dependente.endereco.bairro}, ${dependente.endereco.cidade} - ${dependente.endereco.estado}, ${dependente.endereco.pais}, CEP: ${dependente.endereco.codigoPostal}`);
    console.log(`Telefones associados ao cliente:`);
    
    dependente.telefones.forEach(telefone => {
        console.log(`  (${telefone.ddd}) ${telefone.numero}`);
    });

    console.log(`Documentos:`);
    dependente.documentos.forEach(doc => {
        console.log(`  Tipo: ${TipoDocumento[doc.tipo]}, Número: ${doc.numero}, Data de Expedição: ${doc.dataExpedicao.toLocaleDateString()}`);
    });

    if (dependente.titular) {
        console.log(`Titular: ${dependente.titular.nome}`);
    }

    console.log('------------------------------');
}

// Criando o cliente
console.log("Vamos cadastrar o cliente? :3");
let cliente = criarCliente();

// Perguntando se deseja cadastrar um dependente
let cadastrarDependente = readlineSync.keyInYNStrict('Deseja cadastrar um dependente para este cliente? ');

if (cadastrarDependente) {
    do {
        let dependente = criarDependente();
        dependente.endereco = cliente.endereco.clonar() as Endereco;
        dependente.telefones.push(cliente.telefones[0].clonar() as Telefone);
        dependente.titular = cliente;

        // Adicionando o dependente ao cliente
        cliente.dependentes.push(dependente);
        
        cadastrarDependente = readlineSync.keyInYNStrict('Deseja cadastrar mais um dependente? ');

    } while (cadastrarDependente);
}



// Exibindo as informações do cliente
console.log("Informações do Cliente:");
exibirInformacoesCliente(cliente);

// Exibindo as informações de cada dependente logo após o cliente
cliente.dependentes.forEach(dependente => {
    console.log("Informações do Dependente:");
    exibirInformacoesDependente(dependente);
});

console.log("Deu tudo certo! :)");
