import Processo from "../../abstracoes/processo";
import ImpressorEndereco from "../../impressores/impressorEndereco";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";

export default class AtualizarEndereco extends Processo {
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
  }

  processar(): void {
    console.clear();
    console.log("Endereço atual:");
    const impressor = new ImpressorEndereco(this.cliente.Endereco);
    console.log(impressor.imprimir());

    console.log("Atualizando os dados de endereço...");
    let rua = this.entrada.receberTexto("Qual a nova rua?");
    let bairro = this.entrada.receberTexto("Qual o novo bairro?");
    let cidade = this.entrada.receberTexto("Qual a nova cidade?");
    let estado = this.entrada.receberTexto("Qual o novo estado?");
    let pais = this.entrada.receberTexto("Qual o novo país?");
    let codigoPostal = this.entrada.receberTexto("Qual o novo código postal?");

    let novoEndereco = new Endereco(rua, bairro, cidade, estado, pais, codigoPostal);
    this.cliente.Endereco = novoEndereco;

    console.log("Endereço atualizado com sucesso!");
  }
}
