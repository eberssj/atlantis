import Documento from "./documento";
import Endereco from "./endereco";
import Telefone from "./telefone";

export default class Cliente {
    private nome: string;
    private nomeSocial: string;
    private dataNascimento: Date;
    private dataCadastro: Date;
    private telefones: Telefone[] = [];
    private endereco!: Endereco;
    private documentos: Documento[] = [];
    private dependentes: Cliente[] = [];
    private titular?: Cliente; 

    constructor(nome: string, nomeSocial: string, dataNascimento: Date) {
        this.nome = nome;
        this.nomeSocial = nomeSocial;
        this.dataNascimento = dataNascimento;
        this.dataCadastro = new Date();
    }

    // Getters
    public get Nome() { return this.nome; }
    public get NomeSocial() { return this.nomeSocial; }
    public get DataNascimento() { return this.dataNascimento; }
    public get DataCadastro() { return this.dataCadastro; }
    public get Telefones() { return this.telefones; }
    public get Endereco() { return this.endereco; }
    public get Documentos() { return this.documentos; }
    public get Dependentes() { return this.dependentes; }
    public get Titular() { return this.titular; }

    // Setter para Titular 
    public set Titular(titular: Cliente | undefined) {
        this.titular = titular;
    }

    // Setter para Endereco
    public set Endereco(endereco: Endereco) {
    this.endereco = endereco;
}

    // Métodos de CRUD
    public adicionarDocumento(documento: Documento): void {
        this.documentos.push(documento);
    }

    public adicionarTelefone(telefone: Telefone): void {
        this.telefones.push(telefone);
    }

    public adicionarDependente(dependente: Cliente): void {
        this.dependentes.push(dependente);
        dependente.Titular = this; // Agora isso funcionará corretamente
    }

    // Atualizar dados do cliente
    public atualizarDados(nome?: string, nomeSocial?: string, dataNascimento?: Date): void {
        if (nome) this.nome = nome;
        if (nomeSocial) this.nomeSocial = nomeSocial;
        if (dataNascimento) this.dataNascimento = dataNascimento;
    }

    // Listar detalhes do cliente
    public listarDetalhes(): void {
        console.log(`Nome: ${this.nome}`);
        console.log(`Nome Social: ${this.nomeSocial}`);
        console.log(`Data de Nascimento: ${this.dataNascimento}`);
        console.log(`Data de Cadastro: ${this.dataCadastro}`);
        console.log(`Telefones: ${this.telefones.map(t => t.Numero).join(", ")}`);
        console.log(`Endereço: ${this.endereco.Rua}`);
        console.log(`Documentos: ${this.documentos.map(d => d.Numero).join(", ")}`);
        console.log(`Dependentes: ${this.dependentes.map(d => d.Nome).join(", ")}`);
    }

    // Listar dependentes do cliente
    public listarDependentes(): void {
        if (this.dependentes.length > 0) {
            console.log(`Dependentes de ${this.nome}:`);
            this.dependentes.forEach(dep => console.log(`- ${dep.Nome}`));
        } else {
            console.log(`${this.nome} não tem dependentes.`);
        }
    }

    // Listar titular do dependente
    public listarTitular(): void {
        if (this.titular) {
            console.log(`Titular de ${this.nome}: ${this.titular.Nome}`);
        } else {
            console.log(`${this.nome} não possui titular.`);
        }
    }

    // Remover um dependente
    public removerDependente(nome: string): void {
        this.dependentes = this.dependentes.filter(dep => dep.Nome !== nome);
    }
}
