import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";

export default class ExcluirCliente extends Processo {
    processar(): void {
        const clientes = Armazem.InstanciaUnica.Clientes;

        if (clientes.length === 0) {
            console.log('Nenhum cliente cadastrado.');
            return;
        }

        console.log('Clientes disponíveis:');
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.Nome}`);
        });

        const opcaoCliente = this.entrada.receberNumero('Selecione o cliente a ser excluído:');
        const cliente = clientes[opcaoCliente - 1];

        if (!cliente) {
            console.log('Cliente inválido.');
            return;
        }

        // Exclui o titular e seus dependentes
        const index = clientes.indexOf(cliente);
        clientes.splice(index, 1);

        console.log(`Cliente ${cliente.Nome} e seus dependentes foram excluídos com sucesso!`);
    }
}
