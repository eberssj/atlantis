import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";

export default class CadastroRg extends Processo {
    private cliente: Cliente
    private clientes: Cliente[];

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }

    processar(): void {
        let numero = this.entrada.receberTexto('Qual o número do documento?')

        const rgExistente = this.clientes.some(cliente =>
            cliente.Documentos.some(doc =>
              doc.Tipo === TipoDocumento.RG && doc.Numero === numero
            )
          );

        if (rgExistente) {
            console.log('RG já cadastrado. Não é possível cadastrar um RG duplicado.')
            return
        } else {
            let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
            let rg = new Documento(numero, TipoDocumento.RG, dataExpedicao)
            this.cliente.Documentos.push(rg)
            console.log('RG cadastrado com sucesso.')
        }
    }
}