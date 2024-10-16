import Processo from "../abstracoes/processo";
import MenuEditarTipoCliente from "../menus/menuEditarTipoCliente";
import AtualizarClienteDependente from "./atualizacao/atualizacaoClienteDependente";
import AtualizarClienteTitular from "./atualizacao/atualizacaoClienteTitular";

export default class TipoEdicaoCliente extends Processo {

    constructor() {
        super()
        this.menu = new MenuEditarTipoCliente()
    }

    processar(): void {
        this.menu.mostrar()
        this.opcao = this.entrada.receberNumero("Qual opção desejada?")

        switch (this.opcao) {
            case 1:
                this.processo = new AtualizarClienteTitular()
                this.processo.processar()
                break
            case 2:
                this.processo = new AtualizarClienteDependente()
                this.processo.processar()
                break
            default:
                console.log("Opção não entendida :(")
        }
    }
}