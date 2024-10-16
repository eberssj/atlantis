import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";

export default class AtualizarNomeSocial extends Processo {

  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar() {
    let nomeSocialAtualizado= this.entrada.receberTexto("Digite o nome social atualizado: ");
    this.cliente.NomeSocial = nomeSocialAtualizado;
  }

}