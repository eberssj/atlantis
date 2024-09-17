import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";

export default class CadastroCpf extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        const numero = this.entrada.receberTexto('Digite o número do CPF:');
        const dataExpedicao = new Date(this.entrada.receberTexto('Digite a data de expedição (dd/mm/yyyy):'));

        const cpf = new Documento('CPF', numero, dataExpedicao);
        this.cliente.adicionarDocumento(cpf);

        console.log('CPF cadastrado com sucesso!');
    }
}
