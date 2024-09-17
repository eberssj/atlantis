import Menu from "../interfaces/menu";

export default class MenuTipoDocumento implements Menu {
    mostrar(): void {
        console.clear();
        console.log(`****************************`);
        console.log(`| Qual o tipo do documento para cadastro? `);
        console.log(`----------------------`);
        console.log(`| 1 - Cadastro de Pessoa Física (CPF)`); 
        console.log(`| 2 - Registro Geral (RG)`); 
        console.log(`| 3 - Passaporte`);
        console.log(`| 0 - Finalizar cadastro de documentos`);
        console.log(`----------------------`);
    }
}
