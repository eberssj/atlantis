import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";

export default class DelecaoClienteDependente extends Processo {
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

    const numeroCpf = this.entrada.receberTexto("Digite o número do CPF do dependente a ser excluído (ou 0 para cancelar):");

    if (numeroCpf.toLowerCase() === "0") {
      console.log("Operação cancelada.");
      return;
    }

    let clienteDependenteEncontrado: Cliente | null = null;
    let clienteTitular: Cliente | null = null;

    for (const cliente of this.clientes) {
      for (const dependente of cliente.Dependentes) {
        for (const documento of dependente.Documentos) {
          if (documento.Tipo === TipoDocumento.CPF && documento.Numero === numeroCpf) {
            clienteDependenteEncontrado = dependente;
            clienteTitular = cliente;
            break;
          }
        }
        if (clienteDependenteEncontrado) break;
      }
      if (clienteDependenteEncontrado) break;
    }

    if (clienteDependenteEncontrado && clienteTitular) {
      const confirmacao = this.entrada.receberTexto(`Você deseja mesmo deletar o dependente ${clienteDependenteEncontrado.Nome}? (s/n):`);
      if (confirmacao.toLowerCase() === "s") {
        this.deletarDependente(clienteTitular, clienteDependenteEncontrado);
        console.log(`Dependente ${clienteDependenteEncontrado.Nome} excluído com sucesso!`);
      } else {
        console.log("Operação cancelada.");
      }
    } else {
      console.log("Dependente não encontrado.");
    }
  }

  private deletarDependente(titular: Cliente, dependente: Cliente): void {
    const indexDependente = titular.Dependentes.indexOf(dependente);
    if (indexDependente > -1) {
      titular.Dependentes.splice(indexDependente, 1);
    }

    const indexGlobal = this.clientes.indexOf(dependente);
    if (indexGlobal > -1) {
      this.clientes.splice(indexGlobal, 1);
    }
  }
}
