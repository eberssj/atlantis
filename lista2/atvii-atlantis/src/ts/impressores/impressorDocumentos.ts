import Impressor from "../interfaces/impressor";
import Documento from "../modelos/documento";
import ImpressorDocumento from "./impressorDocumento";

export default class ImpressorDocumentos implements Impressor {
    private documentos: Documento[];

    constructor(documentos: Documento[]) {
        this.documentos = documentos;
    }

    imprimir(): string {
        if (this.documentos.length === 0) {
            return "Nenhum documento cadastrado.";
        }

        let impressao = this.documentos
            .map((documento, index) => {
                const impressor = new ImpressorDocumento(documento);
                return impressor.imprimir(); 
            })
            .join("\n");

        return impressao;
    }
}
