import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import ImpressorReserva from "../../impressores/impressorReserva";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";

export default class ListagemReservas extends Processo {
    private clientes: Cliente[]
    private impressor!: Impressor
    constructor() {
        super()
        this.clientes = Armazem.InstanciaUnica.Clientes
    }

    processar(): void {
        console.clear()
        console.log('Iniciando a listagem das reservas...')
        this.clientes.forEach(cliente => {
            if (this.titular(cliente) && cliente.Acomodacao !== undefined) {
                this.impressor = new ImpressorReserva(cliente)
                console.log(this.impressor.imprimir())
            }
        })
    }
    private titular(cliente: Cliente): boolean {
        let verificacao = false
        if (cliente.Titular == undefined) {
            verificacao = true
        }
        return verificacao
    }
}