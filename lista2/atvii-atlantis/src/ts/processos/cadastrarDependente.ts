import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
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

        clienteTitular.adicionarDependente(dependente);

        console.log(`Dependente ${nome} associado ao cliente ${clienteTitular.Nome} com sucesso!`);

        // Adicionando documentos ao dependente
        let adicionarDocumentos = true;
        while (adicionarDocumentos) {
            console.log('Iniciando cadastro de documentos do dependente...');
            const tipoDocumento = this.entrada.receberTexto('Informe o tipo de documento (RG, CPF, Passaporte):');
            const numeroDocumento = this.entrada.receberTexto(`Informe o número do ${tipoDocumento}:`);
            const dataExpedicao = new Date(this.entrada.receberTexto(`Informe a data de expedição do ${tipoDocumento} (dd/mm/yyyy):`));

            // Agora passando o terceiro parâmetro: dataExpedicao
            const documento = new Documento(tipoDocumento, numeroDocumento, dataExpedicao);
            dependente.adicionarDocumento(documento);

            const adicionarMais = this.entrada.receberTexto('Deseja adicionar mais documentos? (s/n):');
            adicionarDocumentos = adicionarMais.toLowerCase() === 's';
        }

        console.log('Cadastro de documentos concluído.');
    }
}
