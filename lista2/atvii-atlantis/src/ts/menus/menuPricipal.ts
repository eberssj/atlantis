import Menu from "../interfaces/menu";
import CadastrarCliente from "../processos/cadastroClienteTitular";
import CadastrarDependente from "../processos/cadastrarDependente";
import ListarClientes from "../processos/tipoListagemClientes";
import ListarDependentes from "../processos/listarDependentes";
import ExcluirCliente from "../processos/ExcluirCliente";
import EditarCliente from "../processos/editarCliente"; 
import Entrada from "../io/entrada"; 

export default class MenuPrincipal implements Menu {
    private entrada: Entrada;

    constructor() {
        this.entrada = new Entrada(); 
    }

    mostrar(): void {
        let opcao = -1;

        while (opcao !== 0) {
            console.log(`****************************`);
            console.log(`| Por favor, selecione uma opção...`);
            console.log(`----------------------`);
            console.log(`| Opções para cliente:`);
            console.log(`----------------------`);
            console.log(`| 1 - Cadastrar cliente`);
            console.log(`| 2 - Cadastrar dependente`);
            console.log(`| 3 - Listar cliente(s)`);
            console.log(`| 4 - Listar dependente(s) de um cliente titular`);
            console.log(`| 5 - Excluir cliente`);
            console.log(`| 6 - Editar cliente`); // Adicionando a opção de editar cliente
            console.log(`****************************`);
            console.log(`| 0 - Sair`);
            console.log(`----------------------`);

            opcao = this.entrada.receberNumero('Escolha uma opção:');

            switch (opcao) {
                case 1:
                    new CadastrarCliente().processar();
                    break;
                case 2:
                    new CadastrarDependente().processar();
                    break;
                case 3:
                    new ListarClientes().processar();
                    break;
                case 4:
                    new ListarDependentes().processar();
                    break;
                case 5:
                    new ExcluirCliente().processar();
                    break;
                case 6:
                    new EditarCliente().processar(); 
                    break;
                case 0:
                    console.log('Saindo do sistema...');
                    break;
                default:
                    console.log('Opção inválida. Tente novamente.');
            }
        }
    }
}
