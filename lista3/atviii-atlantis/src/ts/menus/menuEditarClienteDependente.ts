import Menu from "../interfaces/menu";

export default class MenuEditarClienteDependente implements Menu {
    mostrar(): void {
        console.clear()
        console.log(`****************************`)
        console.log(`| O que procura para editar? `)
        console.log(`----------------------`)
        console.log(`| 1 - Nome`)
        console.log(`| 2 - Nome Social`)
        console.log(`| 3 - Data de Nascimento`)
        console.log(`| 4 - Documentos`)
        console.log(`| 5 - Adicionar documentos`)
        console.log(`| 6 - Remover documentos`)
        console.log(`| 0 - Sair`)
        console.log(`----------------------`)
    }
}