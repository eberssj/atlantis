import Processo from "../../abstracoes/processo";
import Cliente from "../../modelos/cliente";

export default class AtualizarTelefone extends Processo {
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar() {
    console.log("Telefones cadastrados:");
    this.cliente.Telefones.forEach((telefone, index) => {
      console.log(`${index + 1} - (${telefone.Ddd}) ${telefone.Numero}`);
    });

    const indice = this.entrada.receberNumero("Digite o número do índice do telefone que deseja editar: ") - 1;
    
    if (indice >= 0 && indice < this.cliente.Telefones.length) {
      const novoDdd = this.entrada.receberTexto("Digite o novo DDD: ");
      const novoNumero = this.entrada.receberTexto("Digite o novo número: ");

      this.cliente.Telefones[indice].Ddd = novoDdd;
      this.cliente.Telefones[indice].Numero = novoNumero;

      console.log("Telefone atualizado com sucesso!");
    } else {
      console.log("Índice inválido. Por favor, tente novamente.");
    }
  }
}
