import { TipoDocumento } from "../enumeracoes/TipoDocumento"

export default class Documento {
    private tipo: string;
    private numero: string;
    private dataExpedicao: Date;

    constructor(tipo: string, numero: string, dataExpedicao: Date) {
        this.tipo = tipo;
        this.numero = numero;
        this.dataExpedicao = dataExpedicao;
    }

    // Getters
    public get Tipo() {
        return this.tipo;
    }

    public get Numero() {
        return this.numero;
    }

    public get DataExpedicao() {
        return this.dataExpedicao;
    }
}
