import Processo from "../abstracoes/processo";
import MenuTipoDocumento from "../menus/menuTipoDocumento";
import Cliente from "../modelos/cliente";
import CadastroRg from "./cadastroRg";
import CadastroPassaporte from "./cadastroPassaporte"; 

export default class CadastrarDocumentosCliente extends Processo {
    private cliente: Cliente;

    constructor(cliente: Cliente) {
        super();
        this.cliente = cliente;
        this.menu = new MenuTipoDocumento();
        this.execucao = true;
    }

    processar(): void {
        console.log('Iniciando o cadastro de documentos...');
        while (this.execucao) {
            this.menu.mostrar();
            this.opcao = this.entrada.receberNumero('Qual opção desejada?');
            switch (this.opcao) {
                case 1: // Cadastro de CPF
                    this.processo = new CadastroRg(this.cliente); // Assumindo que "CadastroRg" também cobre CPF.
                    this.processo.processar();
                    break;
                case 2: // Registro Geral
                    this.processo = new CadastroRg(this.cliente);
                    this.processo.processar();
                    break;
                case 3: // Passaporte
                    this.processo = new CadastroPassaporte(this.cliente); // Nova classe para cadastro de passaporte.
                    this.processo.processar();
                    break;
                case 0: // Finalizar cadastro
                    this.execucao = false;
                    break;
                default:
                    console.log('Opção não entendida :(');
            }
        }
    }
}
