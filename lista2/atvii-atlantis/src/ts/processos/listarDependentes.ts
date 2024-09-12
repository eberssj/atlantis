import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";

export default class ListarDependentes extends Processo {
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

        const opcaoCliente = this.entrada.receberNumero('Selecione o cliente titular para listar os dependentes:');
        const clienteTitular = clientes[opcaoCliente - 1];

        if (!clienteTitular || clienteTitular.Dependentes.length === 0) {
            console.log('Cliente inválido ou não possui dependentes.');
        } else {
            console.log(`Dependentes do cliente ${clienteTitular.Nome}:`);
            clienteTitular.Dependentes.forEach(dependente => {
                console.log(`- ${dependente.Nome}`);
            });
        }
    }
}
