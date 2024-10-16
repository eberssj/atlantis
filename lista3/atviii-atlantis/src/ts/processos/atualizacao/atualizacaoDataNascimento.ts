import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";

export default class AtualizarDataNascimento extends Processo {

  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar() {
    let dataNascimentoAtualizada= this.entrada.receberData("Digite a data de nascimento atualizada: ");
    this.cliente.DataNascimento = dataNascimentoAtualizada;
  }

}