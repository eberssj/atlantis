import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirCliente extends Processo {
    processar(): void {
        const clientes = Armazem.InstanciaUnica.Clientes;

        if (clientes.length === 0) {
            console.log('Opção inválida. Nenhum cliente cadastrado.');
            this.voltarAoMenu();  // Função para retornar ao menu
            return;
        }

        console.log('Clientes disponíveis:');
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        const opcaoCliente = this.entrada.receberNumero('Selecione o cliente a ser excluído:');
        const cliente = clientes[opcaoCliente - 1];

        if (!cliente) {
            console.log('Opção inválida. Cliente não encontrado.');
            this.voltarAoMenu();  // Função para retornar ao menu
            return;
        }

        // Exclui o titular e seus dependentes
        const index = clientes.indexOf(cliente);
        clientes.splice(index, 1);

        console.log(`Cliente ${cliente.Nome} e seus dependentes foram excluídos com sucesso!`);
        this.voltarAoMenu();  // Retorna ao menu após a exclusão
    }

    // Função para voltar ao menu principal
    private voltarAoMenu(): void {
        // Aqui você pode chamar o sistema principal que exibe o menu novamente.
        // Exemplo: Sistema.menuPrincipal();
    }
}
