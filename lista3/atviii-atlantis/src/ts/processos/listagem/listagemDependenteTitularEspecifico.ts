import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import ImpressaorCliente from "../../impressores/impressorCliente";
import Impressor from "../../interfaces/impressor";
import Cliente from "../../modelos/cliente";
import { TipoDocumento } from "../../enumeracoes/TipoDocumento";

export default class ListagemDependenteTitularEspecifico extends Processo {
    private clientes: Cliente[];
    private impressor!: Impressor;
    
    constructor() {
        super();
        this.clientes = Armazem.InstanciaUnica.Clientes;
    }
    
    processar(): void {
        console.clear();
        const cpfTitular = this.entrada.receberTexto("Digite o CPF do titular:");
        
        const clienteTitular = this.clientes.find(cliente => 
            cliente.Documentos.some(doc => doc.Tipo === TipoDocumento.CPF && doc.Numero === cpfTitular) && !cliente.Titular
        );

        if (!clienteTitular) {
            console.log("Titular não encontrado.");
            return;
        }

        if (clienteTitular.Dependentes.length === 0) {
            console.log("O titular não possui dependentes.");
            return;
        }

        console.log(`Listando dependentes do titular ${clienteTitular.Nome}:`);
        clienteTitular.Dependentes.forEach(dependente => {
            this.impressor = new ImpressaorCliente(dependente);
            console.log(this.impressor.imprimir());
        });
    }
}
