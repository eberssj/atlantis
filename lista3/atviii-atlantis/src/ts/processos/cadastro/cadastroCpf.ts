import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";

export default class CadastroCpf extends Processo {
  private cliente: Cliente;
  private clientes: Cliente[];

  constructor(cliente: Cliente) {
    super();
    this.cliente = cliente;
    this.clientes = Armazem.InstanciaUnica.Clientes;
  }

  processar(): void {
    let numero = this.entrada.receberTexto('Qual o número do documento?');

    const cpfExistente = this.clientes.some(cliente =>
      cliente.Documentos.some(doc =>
        doc.Tipo === TipoDocumento.CPF && doc.Numero === numero
      )
    );

    if (cpfExistente) {
      console.log('CPF já cadastrado. Não é possível cadastrar um CPF duplicado.');
        return
    } else {
      let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?');
      let cpf = new Documento(numero, TipoDocumento.CPF, dataExpedicao);
      this.cliente.Documentos.push(cpf);
      console.log('CPF cadastrado com sucesso.');
    }
  }
}
