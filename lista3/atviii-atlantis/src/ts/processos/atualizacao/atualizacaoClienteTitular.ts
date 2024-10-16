import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import MenuEditarClienteTitular from "../../menus/menuEditarClienteTitular";
import Cliente from "../../modelos/cliente";
import CadastrarDocumentosCliente from "../cadastro/cadastroDocumentosCliente";
import CadastroTelefoneTitular from "../cadastro/cadastroTelefoneTitular";
import DelecaoDocumento from "../delecao/delecaoDocumento";
import DelecaoTelefone from "../delecao/delecaoTelefone";
import AtualizarDataNascimento from "./atualizacaoDataNascimento";
import AtualizarDocumento from "./atualizacaoDocumentos";
import AtualizarEndereco from "./atualizacaoEndereco";
import AtualizarNome from "./atualizacaoNome";
import AtualizarNomeSocial from "./atualizacaoNomeSocial";
import AtualizarTelefone from "./atualizacaoTelefone";

export default class AtualizarClienteTitular extends Processo {
  private clientes: Cliente[];

  constructor() {
    super();
    this.menu = new MenuEditarClienteTitular();
    this.clientes = Armazem.InstanciaUnica.Clientes;
  }

  processar(): void {
    console.clear();
    let cpfTitular = this.entrada.receberTexto("Digite o CPF do titular para editar:");

    let clienteTitular = this.clientes.find(cliente =>
      cliente.Documentos.some(dadosCPF =>
        dadosCPF.Numero === cpfTitular && dadosCPF.Tipo === TipoDocumento.CPF
      )
    );

    if (!clienteTitular) {
      console.log("Cliente titular não encontrado.");
      return;
    }

    let execucao = true;

    while (execucao) {
      this.menu.mostrar();
      let opcao = this.entrada.receberNumero("Escolha uma opção:");

      switch (opcao) {
        case 1:
          this.processo = new AtualizarNome(clienteTitular);
          this.processo.processar();
          break;
        case 2:
          this.processo = new AtualizarNomeSocial(clienteTitular);
          this.processo.processar();
          break;
        case 3:
          this.processo = new AtualizarDataNascimento(clienteTitular);
          this.processo.processar();
          break;
        case 4:
          this.processo = new AtualizarEndereco(clienteTitular);
          this.processo.processar();
          break;
        case 5:
          this.processo = new AtualizarDocumento(clienteTitular);
          this.processo.processar();
          break;
        case 6:
          this.processo = new AtualizarTelefone(clienteTitular);
          this.processo.processar();
          break;
        case 7:
          this.processo = new CadastrarDocumentosCliente(clienteTitular);
          this.processo.processar();
          break;
        case 8:
          this.processo = new CadastroTelefoneTitular(clienteTitular);
          this.processo.processar();
          break;
        case 9:
          this.processo = new DelecaoDocumento(clienteTitular);
          this.processo.processar();
          break;
        case 10:
          this.processo = new DelecaoTelefone(clienteTitular);
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
