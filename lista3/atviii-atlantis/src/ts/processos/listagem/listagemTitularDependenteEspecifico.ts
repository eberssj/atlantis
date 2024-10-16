import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";

export default class ListagemTitularDependenteEspecifico extends Processo {
    private clientes: Cliente[];
    private impressor!: Impressor;
    
    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }
    
    processar(): void {
        console.clear();
        const cpfDependente = this.entrada.receberTexto("Digite o CPF do dependente:");
        
        let clienteTitular: Cliente | null = null;

        for (const cliente of this.clientes) {
            for (const dependente of cliente.Dependentes) {
                if (dependente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === cpfDependente)) {
                    clienteTitular = cliente;
                    break;
                }
            }
            if (clienteTitular) break;
        }

        if (!clienteTitular) {
            console.log("Dependente não encontrado ou não possui titular.");
            return;
        }

        this.impressor = new ImpressaorCliente(clienteTitular);
        console.log(`Titular do dependente encontrado:`);
        console.log(this.impressor.imprimir());
    }
}
