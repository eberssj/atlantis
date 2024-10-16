import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";
import Cliente from "../../modelos/cliente";
import Documento from "../../modelos/documento";

export default class CadastroPassaporte extends Processo {
    private cliente: Cliente
    private clientes: Cliente[];

    constructor(cliente: Cliente) {
        super()
        this.cliente = cliente
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        let numero = this.entrada.receberTexto('Qual o número do documento?')

        const passaporteExistente = this.clientes.some(cliente =>
            cliente.Documentos.some(doc =>
              doc.Tipo === TipoDocumento.Passaporte && doc.Numero === numero
            )
          );

        if (passaporteExistente) {
            console.log('Passaporte já cadastrado. Não é possível cadastrar um passaporte duplicado.')
            return
        } else {
            let dataExpedicao = this.entrada.receberData('Qual a data de expedição do documento?')
            let passaporte = new Documento(numero, TipoDocumento.Passaporte, dataExpedicao)
            this.cliente.Documentos.push(passaporte)
            console.log('Passaporte cadastrado com sucesso.')
        }
    }
}