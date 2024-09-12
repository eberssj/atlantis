import Menu from "../interfaces/menu";

export default class MenuPrincipal implements Menu {
    mostrar(): void {
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
        console.log(`****************************`);
        console.log(`| 0 - Sair`);
        console.log(`----------------------`);
    }
}
