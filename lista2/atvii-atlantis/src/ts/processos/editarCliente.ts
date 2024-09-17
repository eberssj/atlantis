import Processo from "../abstracoes/processo";
import Armazem from "../dominio/armazem";
import Cliente from "../modelos/cliente";
import Endereco from "../modelos/endereco";

export default class EditarCliente extends Processo {
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

        const opcaoCliente = this.entrada.receberNumero('Selecione o cliente a ser editado:');
        const cliente = clientes[opcaoCliente - 1];

        if (!cliente) {
            console.log('Cliente inválido.');
            return;
        }

        console.log(`Editando informações do cliente ${cliente.Nome}...`);

        // Editar dados pessoais
        const nome = this.entrada.receberTexto(`Novo nome (${cliente.Nome}): `) || cliente.Nome;
        const nomeSocial = this.entrada.receberTexto(`Novo nome social (${cliente.NomeSocial}): `) || cliente.NomeSocial;
        const dataNascimento = new Date(this.entrada.receberTexto(`Nova data de nascimento (${cliente.DataNascimento.toLocaleDateString()} - dd/mm/yyyy): `)) || cliente.DataNascimento;

        cliente.atualizarDados(nome, nomeSocial, dataNascimento);

        console.log('Agora vamos editar o endereço do cliente:');

        // Editar endereço (não há campo Numero, então removemos)
        const rua = this.entrada.receberTexto(`Nova rua (${cliente.Endereco?.Rua}): `) || cliente.Endereco?.Rua || '';
        const bairro = this.entrada.receberTexto(`Novo bairro (${cliente.Endereco?.Bairro}): `) || cliente.Endereco?.Bairro || '';
        const cidade = this.entrada.receberTexto(`Nova cidade (${cliente.Endereco?.Cidade}): `) || cliente.Endereco?.Cidade || '';
        const estado = this.entrada.receberTexto(`Novo estado (${cliente.Endereco?.Estado}): `) || cliente.Endereco?.Estado || '';
        const codigoPostal = this.entrada.receberTexto(`Novo código postal (${cliente.Endereco?.CodigoPostal}): `) || cliente.Endereco?.CodigoPostal || '';

        const novoEndereco = new Endereco(rua, bairro, cidade, estado, cliente.Endereco?.Pais || '', codigoPostal);
        cliente.Endereco = novoEndereco; // Usando o setter do endereço

        console.log(`Cliente ${cliente.Nome} e endereço atualizado com sucesso!`);
    }
}
