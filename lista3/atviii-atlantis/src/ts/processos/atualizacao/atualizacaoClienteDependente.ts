import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import MenuEditarClienteDependente from "../../menus/menuEditarClienteDependente";
import Cliente from "../../modelos/cliente";
import CadastrarDocumentosCliente from "../cadastro/cadastroDocumentosCliente";
import DelecaoDocumento from "../delecao/delecaoDocumento";
import AtualizarDataNascimento from "./atualizacaoDataNascimento";
import AtualizarDocumento from "./atualizacaoDocumentos";
import AtualizarNome from "./atualizacaoNome";
import AtualizarNomeSocial from "./atualizacaoNomeSocial";

export default class AtualizarClienteDependente extends Processo {
    private clientes: Cliente[];

    constructor() {
        super();
        this.menu = new MenuEditarClienteDependente();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        console.clear();
        let cpfDependente = this.entrada.receberTexto("Digite o CPF do dependente para editar:");

        let clienteDependente: Cliente | null = null;
        let clienteTitular: Cliente | null = null;

        for (const cliente of this.clientes) {
            for (const dependente of cliente.Dependentes) {
                for (const documento of dependente.Documentos) {
                    if (documento.Tipo === TipoDocumento.CPF && documento.Numero === cpfDependente) {
                        clienteDependente = dependente;
                        clienteTitular = cliente;
                        break;
                    }
                }
                if (clienteDependente) break;
            }
            if (clienteDependente) break;
        }

        if (!clienteDependente) {
            console.log("Cliente dependente não encontrado.");
            return;
        }

        let execucao = true;

        while (execucao) {
            this.menu.mostrar();
            let opcao = this.entrada.receberNumero("Escolha uma opção:");

            switch (opcao) {
                case 1:
                    this.processo = new AtualizarNome(clienteDependente);
                    this.processo.processar();
                    break;
                case 2:
                    this.processo = new AtualizarNomeSocial(clienteDependente);
                    this.processo.processar();
                    break;
                case 3:
                    this.processo = new AtualizarDataNascimento(clienteDependente);
                    this.processo.processar();
                    break;
                case 4:
                    this.processo = new AtualizarDocumento(clienteDependente);
                    this.processo.processar();
                    break;
                case 5:
                    this.processo = new CadastrarDocumentosCliente(clienteDependente);
                    this.processo.processar();
                    break;
                case 6:
                    this.processo = new DelecaoDocumento(clienteDependente);
                    this.processo.processar();
                    break;
                case 0:
                    execucao = false;
                    console.log("Edição finalizada.");
                    break;
                default:
                    console.log("Opção não entendida. Tente novamente.");
            }
        }
    }
}
