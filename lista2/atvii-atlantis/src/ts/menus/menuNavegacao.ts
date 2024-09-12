import MenuPrincipal from './menuPricipal';
import MenuTipoCadastroCliente from './menuTipoCadastroCliente';
import MenuTipoDocumento from './menuTipoDocumento';
import MenuTipoListagemClientes from './menuTipoListagemClientes';

// Função principal que controla o fluxo do sistema
function iniciarSistema(): void {
    let opcao = -1;
    const menuPrincipal = new MenuPrincipal();
    const menuTipoCadastro = new MenuTipoCadastroCliente();
    const menuTipoDocumento = new MenuTipoDocumento();
    const menuTipoListagem = new MenuTipoListagemClientes();

    while (opcao !== 0) {
        menuPrincipal.mostrar();
        opcao = Number(prompt("Escolha uma opção: "));

        switch(opcao) {
            case 1:
                // Cadastrar Cliente
                menuTipoCadastro.mostrar();
                let tipoCliente = Number(prompt("Escolha o tipo de cliente para cadastrar: "));
                if (tipoCliente === 1) {
                    // Chamar função de cadastro de titular
                    console.log("Cadastrando Titular...");
                } else if (tipoCliente === 2) {
                    // Chamar função de cadastro de dependente
                    console.log("Cadastrando Dependente...");
                }
                break;
            case 2:
                // Editar Cliente
                console.log("Editar Cliente...");
                break;
            case 3:
                // Listar Cliente(s)
                menuTipoListagem.mostrar();
                let tipoListagem = Number(prompt("Escolha o tipo de listagem: "));
                if (tipoListagem === 1) {
                    console.log("Listando todos os titulares...");
                } else if (tipoListagem === 2) {
                    console.log("Listando todos os dependentes de um titular...");
                }
                break;
            case 4:
                // Excluir Cliente
                console.log("Excluir Cliente...");
                break;
            case 0:
                console.log("Saindo...");
                break;
            default:
                console.log("Opção inválida. Tente novamente.");
        }
    }
}

iniciarSistema();
