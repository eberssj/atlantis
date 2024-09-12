import Processo from "../abstracoes/processo";
import Cliente from "../modelos/cliente";
import Documento from "../modelos/documento";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";

export default class CadastroRg extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
    }

    processar(): void {
        console.log('Iniciando o cadastro de RG...');
        const numero = this.entrada.receberTexto('Informe o número do RG: ');
        const dataExpedicao = new Date(this.entrada.receberTexto('Informe a data de expedição (dd/mm/yyyy): '));
        
        const documento = new Documento(numero, TipoDocumento.RG, dataExpedicao);
        this.cliente.Documentos.push(documento);

        console.log('RG cadastrado com sucesso!');
    }
}
