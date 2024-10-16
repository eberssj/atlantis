import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";

export default class DelecaoClienteTitular extends Processo {
  private clientes: Cliente[];

  constructor() {
    super();
    this.clientes = Armazem.InstanciaUnica.Clientes;
    this.execucao = true;
  }

  processar(): void {
    if (this.clientes.length === 0) {
      console.log("Não há clientes cadastrados.");
      return;
    }

    const numeroCpf = this.entrada.receberTexto("Digite o número do CPF a ser excluído (ou 0 para cancelar):");

    if (numeroCpf.toLowerCase() === "0") {
      console.log("Operação cancelada.");
      return;
    }

    let clienteEncontrado: Cliente | null = null;

    for (const cliente of this.clientes) {
      for (const documento of cliente.Documentos) {
        if (documento.Tipo === TipoDocumento.CPF && documento.Numero === numeroCpf) {
          clienteEncontrado = cliente;
          break;
        }
      }
      if (clienteEncontrado) break;
    }

    if (clienteEncontrado) {
      const confirmacao = this.entrada.receberTexto(`Você deseja mesmo deletar o cliente ${clienteEncontrado.Nome}? (s/n):`);
      if (confirmacao.toLowerCase() === "s") {
        this.deletarClienteETodosOsDependentes(clienteEncontrado);
        console.log(`Cliente ${clienteEncontrado.Nome} e seus dependentes foram excluídos com sucesso!`);
      } else {
        console.log("Operação cancelada.");
      }
    } else {
      console.log("Cliente não encontrado.");
    }
  }

  private deletarClienteETodosOsDependentes(cliente: Cliente): void {
    cliente.Dependentes.forEach(dependente => {
      const indexDependente = this.clientes.indexOf(dependente);
      if (indexDependente > -1) {
        this.clientes.splice(indexDependente, 1);
      }
    });

    const index = this.clientes.indexOf(cliente);
    if (index > -1) {
      this.clientes.splice(index, 1);
    }
  }
}
