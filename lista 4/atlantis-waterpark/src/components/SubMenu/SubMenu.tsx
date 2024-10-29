import React from 'react';
import iconCadastro from '../../assets/img/cadastrocli.png';
import iconEdicao from '../../assets/img/edicao.png';
import iconVerCliente from '../../assets/img/verclihosp.png';
import iconExclusao from '../../assets/img/exclusao.png';
import iconListagem from '../../assets/img/listagem.png';
import '../SubMenu/SubMenu.css';

const SubMenu: React.FC = () => {
  return (
    <ul className="submenu">
      <li><img src={iconCadastro} alt="Cadastro" className="menu-icon" /> Cadastrar</li>
      <li><img src={iconEdicao} alt="Edição" className="menu-icon" /> Editar</li>
      <li><img src={iconVerCliente} alt="Ver Cliente" className="menu-icon" /> Ver Cliente</li>
      <li><img src={iconExclusao} alt="Exclusão" className="menu-icon" /> Exclusão</li>
      <li><img src={iconListagem} alt="Listagem" className="menu-icon" /> Listagem</li>
    </ul>
  );
};

export default SubMenu;
