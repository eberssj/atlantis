import Impressor from "../interfaces/impressor";
import Documento from "../modelos/documento";


export default class ImpressorDocumento {
    private documento: Documento;

    constructor(documento: Documento) {
        this.documento = documento;
    }

    public imprimir(): string {
        return `Documento:\n`
            + `| Tipo: ${this.documento.Tipo}\n`
            + `| Data expedição: ${this.documento.DataExpedicao.toLocaleDateString()}\n`
            + `| Número: ${this.documento.Numero}`;
    }
}