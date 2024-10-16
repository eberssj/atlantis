import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Endereco from "../../modelos/endereco";
import Telefone from "../../modelos/telefone";
import CadastrarDocumentosCliente from "./cadastroDocumentosCliente";

export default class CadastroClienteDependente extends Processo {
  private clientes: Cliente[];

  constructor() {
    super();
    this.clientes = Armazem.InstanciaUnica.Clientes;
  }

  processar(): void {
    console.log("Iniciando o cadastro de clientes dependentes...");

    const cpfTitular = this.entrada.receberTexto("Qual o CPF do titular?");

    const clienteTitular = this.clientes.find(cliente =>
      cliente.Documentos.some(dadosCPF =>
        dadosCPF.Numero === cpfTitular && dadosCPF.Tipo === TipoDocumento.CPF
      )
    );

    if (clienteTitular) {
      this.execucao = true;

      while (this.execucao) {
        const nome = this.entrada.receberTexto("Qual o nome do dependente?");
        const nomeSocial = this.entrada.receberTexto("Qual o nome social do dependente?");
        const dataNascimento = this.entrada.receberData("Qual a data de nascimento do dependente?");

        const clienteDependente = new Cliente(nome, nomeSocial, dataNascimento);
        clienteTitular.Dependentes.push(clienteDependente);

        clienteDependente.Endereco = clienteTitular.Endereco.clonar() as Endereco;
        clienteDependente.Telefones = clienteTitular.Telefones.map(telefone => ({ ...telefone })) as Telefone[];

        this.processo = new CadastrarDocumentosCliente(clienteDependente);
        this.processo.processar();

        const cadastrarOutro = this.entrada.receberTexto("Deseja cadastrar outro dependente? (s/n)").trim().toLowerCase();
        if (cadastrarOutro !== 's') {
          this.execucao = false;
        }
      }

      console.log("Finalizando o cadastro dos dependentes...");
    } else {
      console.log("Cliente titular não encontrado :(");
    }
  }
}
