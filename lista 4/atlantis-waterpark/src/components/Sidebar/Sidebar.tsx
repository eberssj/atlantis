import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SubMenu from '../SubMenu/SubMenu';
import SubMenuHospedagem from '../SubMenu/SubMenuHospedagem'; 
import logo from '../../assets/img/logo.png';
import rectangleMenu from '../../assets/img/rectangle-menu.png';
import '../Sidebar/Sidebar.css';

const Sidebar: React.FC = () => {
  const [isSubMenuVisible, setSubMenuVisible] = useState(false);
  const [isSubMenuHospedagemVisible, setSubMenuHospedagemVisible] = useState(false); 

  return (
    <div className="sidebar">
      <img src={logo} alt="Logo Atlantis" className="logo" />
      <div className="menu-container">
        <img src={rectangleMenu} alt="Decoração do Menu" className="menu-decorativo" />
        <ul className="menu-list">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <span onClick={() => setSubMenuVisible(!isSubMenuVisible)}>Gerenciar Clientes</span>
          </li>
          {isSubMenuVisible && <SubMenu />}
          <li>
            <span onClick={() => setSubMenuHospedagemVisible(!isSubMenuHospedagemVisible)}>Gerenciar Hospedagem</span>
          </li>
          {isSubMenuHospedagemVisible && <SubMenuHospedagem />}
        </ul>
      </div>
      <div className="vertical-line"></div> {/* Linha de separação */}
    </div>
  );
};

export default Sidebar;
