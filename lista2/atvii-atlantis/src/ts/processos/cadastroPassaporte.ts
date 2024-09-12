import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class CadastroPassaporte extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.execucao = true;
    }

    processar(): void {
        console.log('Iniciando o cadastro de Passaporte...');
        let numero = this.entrada.receberTexto('Digite o número do Passaporte: ');
        let dataExpedicao = this.entrada.receberData('Digite a data de expedição do Passaporte (dd/MM/yyyy): ');

        let passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao);
        this.cliente.Documentos.push(passaporte);

        console.log('Passaporte cadastrado com sucesso!');
        this.execucao = false;
    }
}
