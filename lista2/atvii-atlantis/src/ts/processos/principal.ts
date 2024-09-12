import Processo from "../abstracoes/processo";
import MenuPrincipal from "../menus/menuPricipal";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoListagemClientes from "./tipoListagemClientes";
import CadastrarDependente from "./cadastrarDependente";
import ListarDependentes from "./listarDependentes";
import Armazem from "../dominio/armazem";

export default class Principal extends Processo {
    constructor() {
        super();
        this.execucao = true;
        this.menu = new MenuPrincipal();
    }

    processar(): void {
        this.menu.mostrar();
        this.opcao = this.entrada.receberNumero('Qual opção desejada?');
        switch (this.opcao) {
            case 1:
                this.processo = new TipoCadastroCliente();
                this.processo.processar();
                break;
            case 2:
                const clientes = Armazem.InstanciaUnica.Clientes;
                if (clientes.length === 0) {
                    console.log("Nenhum cliente cadastrado. Opção inválida.");
                } else {
                    this.processo = new CadastrarDependente();
                    this.processo.processar();
                }
                break;
            case 3:
                this.processo = new TipoListagemClientes();
                this.processo.processar();
                break;
            case 4:
                this.processo = new ListarDependentes();
                this.processo.processar();
                break;
            case 5:
                // Excluir cliente com dependentes (ver abaixo)
                break;
            case 0:
                this.execucao = false;
                console.log('Até logo!');
                console.clear();
                break;
            default:
                console.log('Opção não entendida :(');
        }
    }
}
