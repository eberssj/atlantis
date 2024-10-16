import Processo from "../../abstracoes/processo";
import Armazem from "../../dominio/armazem";
import MenuTipoCadastroAcomodacao from "../../menus/menuTipoCadastroAcomodacao";
import Acomodacao from "../../modelos/acomodacao";
import Cliente from "../../modelos/cliente";

export default class CadastrarAcomodacaoCliente extends Processo {
    private acomodacoes: Acomodacao[];
  private cliente: Cliente;

  constructor(cliente: Cliente) {
    super();
    this.acomodacoes = Armazem.InstanciaUnica.Acomodacoes;
    this.cliente = cliente;
    this.menu = new MenuTipoCadastroAcomodacao();
  }

  processar(): void {
    this.menu.mostrar();
    const entrada = this.entrada.receberNumero("Digite o numero do quarto");
    
    const acomodacaoSelecionada = this.acomodacoes[entrada - 1];
    
    if (acomodacaoSelecionada) {
      const acomodacao = new Acomodacao(
        acomodacaoSelecionada.NomeAcomadacao,
        acomodacaoSelecionada.CamaSolteiro,
        acomodacaoSelecionada.CamaCasal,
        acomodacaoSelecionada.Suite,
        acomodacaoSelecionada.Climatizacao,
        acomodacaoSelecionada.Garagem
      );
      this.cliente.Acomodacao = acomodacao;
    } else {
      console.log("Número de quarto inválido.");
    }
  }
}
