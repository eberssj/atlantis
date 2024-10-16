import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import { TipoDocumento } from "../enumeracoes/TipoDocumento";
import MenuPrincipal from "../menus/menuPrincipal";
import Cliente from "../modelos/cliente";
import CadastrarAcomodacaoCliente from "./cadastro/cadastroAcomodacaoCliente";
import CadastroAcomodacoes from "./cadastro/cadastroAcomodacoes";
import ListagemAcomodacoes from "./listagem/listagemAcomodacoes";
import ListagemReservas from "./listagem/listagemReservas";
import TipoCadastroCliente from "./tipoCadastroCliente";
import TipoDelecaoCliente from "./tipoDelecaoCliente";
import TipoEdicaoCliente from "./tipoEdicaoCliente";
import TipoListagemClientes from "./tipoListagemClientes";

export default class Principal extends Processo {
    private clientes: Cliente[];

    constructor() {
        super();
        this.execucao = true;
        this.menu = new MenuPrincipal();
        this.clientes = Armazem.InstanciaUnica.Clientes;
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
                this.processo = new TipoEdicaoCliente();
                this.processo.processar();
                break;
            case 3:
                this.processo = new TipoListagemClientes();
                this.processo.processar();
                break;
            case 4:
                this.processo = new TipoDelecaoCliente();
                this.processo.processar();
                break;
            case 5:
                this.processo = new ListagemAcomodacoes();
                this.processo.processar();
                break;
            case 6:
                let cpfTitular = this.entrada.receberTexto("Digite o CPF do titular para fazer a reserva:");

                let clienteTitular = this.clientes.find(cliente =>
                    cliente.Documentos.some(dadosCPF =>
                        dadosCPF.Numero === cpfTitular && dadosCPF.Tipo === TipoDocumento.CPF
                    )
                );

                if (!clienteTitular) {
                    console.log("Cliente titular não encontrado.");
                    return;
                }

                this.processo = new CadastrarAcomodacaoCliente(clienteTitular);
                this.processo.processar();
                break;
            case 7:
                this.processo = new ListagemReservas();
                this.processo.processar();
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
