import React from 'react';
import { Link } from 'react-router-dom';
import iconCadastroHosp from '../../assets/img/cadastrohosp.png';
import iconEdicao from '../../assets/img/edicao.png';
import iconVerHosp from '../../assets/img/verclihosp.png';
import iconExclusao from '../../assets/img/exclusao.png';
import iconListagem from '../../assets/img/listagem.png';
import '../SubMenu/SubMenu.css';

const SubMenuHospedagem: React.FC = () => {
  return (
    <ul className="submenu">
      <li>
        <Link to="/cadastrar-acomodacao">
          <img src={iconCadastroHosp} alt="Cadastrar Acomodação" className="menu-icon" /> Cadastrar Acomodação
        </Link>
      </li>
      <li>
        <Link to="/editar-acomodacao">
          <img src={iconEdicao} alt="Editar Acomodação" className="menu-icon" /> Editar Acomodação
        </Link>
      </li>
      <li>
        <Link to="/ver-acomodacao">
          <img src={iconVerHosp} alt="Ver Acomodação" className="menu-icon" /> Ver Acomodação
        </Link>
      </li>
      <li>
        <Link to="/excluir-acomodacao">
          <img src={iconExclusao} alt="Exclusão" className="menu-icon" /> Exclusão
        </Link>
      </li>
      <li>
        <Link to="/listar-acomodacao">
          <img src={iconListagem} alt="Listagem" className="menu-icon" /> Listagem
        </Link>
      </li>
    </ul>
  );
};

export default SubMenuHospedagem;
