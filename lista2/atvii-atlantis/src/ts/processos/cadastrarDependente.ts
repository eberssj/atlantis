import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Armazem from "../dominio/armazem";

export default class CadastrarDependente extends Processo {
    processar(): void {
        console.log('Iniciando o cadastro de dependente...');

        const clientes = Armazem.InstanciaUnica.Clientes;

        console.log('Clientes disponíveis para associar o dependente:');
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        const opcaoCliente = this.entrada.receberNumero('Selecione o cliente titular para associar o dependente:');
        const clienteTitular = clientes[opcaoCliente - 1];

        if (!clienteTitular) {
            console.log('Cliente inválido. Tente novamente.');
            return;
        }

        const nome = this.entrada.receberTexto('Nome do dependente:');
        const nomeSocial = this.entrada.receberTexto('Nome social do dependente:');
        const dataNascimento = new Date(this.entrada.receberTexto('Data de nascimento do dependente (dd/mm/yyyy):'));

        const dependente = new Cliente(nome, nomeSocial, dataNascimento);
        dependente.Titular = clienteTitular; 

        clienteTitular.Dependentes.push(dependente);

        console.log(`Dependente ${nome} associado ao cliente ${clienteTitular.Nome} com sucesso!`);
    }
}
