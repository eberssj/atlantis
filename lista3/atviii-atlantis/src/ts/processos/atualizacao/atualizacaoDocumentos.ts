import Processo from "../../abstracoes/processo";
import ImpressorDocumento from "../../impressores/impressorDocumento";
import Cliente from "../../modelos/cliente";

export default class AtualizarDocumento extends Processo {
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
    this.execucao = true;
  }

  processar() {
    console.clear();
    console.log(`Documentos cadastrados:`);
    this.cliente.Documentos.forEach((documento, index) => {
      const impressor = new ImpressorDocumento(documento);
      console.log(`${index + 1} - ${impressor.imprimir()}`);
    });

    const indice = this.entrada.receberNumero("Digite o número do índice do documento que deseja editar: ") - 1;

    if (indice >= 0 && indice < this.cliente.Documentos.length) {
      const numeroAtualizado = this.entrada.receberTexto("Digite o novo número do documento: ");
      const dataAtualizada = this.entrada.receberData("Digite a nova data de expedição do documento: ");
      
      this.cliente.Documentos[indice].Numero = numeroAtualizado;
      this.cliente.Documentos[indice].DataExpedicao = dataAtualizada;

      console.log("Documento atualizado com sucesso!");
    } else {
      console.log("Índice inválido. Por favor, tente novamente.");
    }
  }
}
