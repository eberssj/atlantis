import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";
import Prototipo from "../interfaces/prototipo";

export default class Cliente implements Prototipo {
    public nome: string;
    public nomeSocial: string;
    public dataNascimento: Date;
    public dataCadastro: Date;
    public telefones: Telefone[] = [];
    public endereco: Endereco;
    public documentos: Documento[] = [];
    public dependentes: Cliente[] = [];
    public titular: Cliente;

    public clonar(): Prototipo {
        let cliente = new Cliente();
        cliente.nome = this.nome;
        cliente.nomeSocial = this.nomeSocial;
        cliente.dataNascimento = new Date(this.dataNascimento.getTime());
        cliente.dataCadastro = new Date(this.dataCadastro.getTime());
        cliente.endereco = this.endereco.clonar() as Endereco;
        cliente.telefones = this.telefones.map(tel => tel.clonar() as Telefone);
        cliente.documentos = this.documentos.map(doc => doc.clonar() as Documento);
        cliente.dependentes = this.dependentes.map(dep => dep.clonar() as Cliente);
        cliente.titular = this.titular ? this.titular.clonar() as Cliente : undefined;
        return cliente;
    }
}
