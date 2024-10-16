import Impressor from "../interfaces/impressor"
import Cliente from "../modelos/cliente"
import ImpressorAcomodacao from "./impressorAcomodacao"
import ImpressorDocumentos from "./impressorDocumentos"

export default class ImpressorReserva {
    private cliente: Cliente
    private impressor!: Impressor

    constructor(cliente: Cliente) {
        this.cliente = cliente
    }

    imprimir(): string {
        let impressao = `****************************\n`
            + `| Nome: ${this.cliente.Nome}\n`

        this.impressor = new ImpressorDocumentos(this.cliente.Documentos)
        impressao = impressao + `\n${this.impressor.imprimir()}`

        this.impressor = new ImpressorAcomodacao(this.cliente.Acomodacao);
        impressao = impressao + `\n${this.impressor.imprimir()}`;
        
        return impressao
    }
}