import React from 'react';
import { Link } from 'react-router-dom';
import iconCadastro from '../../assets/img/cadastrocli.png';
import iconEdicao from '../../assets/img/edicao.png';
import iconVerCliente from '../../assets/img/verclihosp.png';
import iconExclusao from '../../assets/img/exclusao.png';
import iconListagem from '../../assets/img/listagem.png';
import '../SubMenu/SubMenu.css';

const SubMenu: React.FC = () => {
  return (
    <ul className="submenu">
      <li>
        <Link to="/cadastrar-cliente">
          <img src={iconCadastro} alt="Cadastro" className="menu-icon" /> Cadastrar
        </Link>
      </li>
      <li>
        <Link to="/editar-cliente">
          <img src={iconEdicao} alt="Edição" className="menu-icon" /> Edição 
        </Link>
      </li>
      <li>
        <Link to="/ver-cliente">
          <img src={iconVerCliente} alt="Ver" className="menu-icon" /> Ver Cliente 
        </Link>
      </li>
      <li>
        <Link to="/exclusao-cliente">
          <img src={iconExclusao} alt="Excluir" className="menu-icon" /> Exclusão 
        </Link>
      </li>
      <li>
        <Link to="/listar-cliente">
          <img src={iconListagem} alt="Listar" className="menu-icon" /> Listagem 
        </Link>
      </li>
    </ul>
  );
};

export default SubMenu;
