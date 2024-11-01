import React from 'react';
import retangulo from '../../assets/img/retangulo.png'; 
import '../Home/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <img src={retangulo} alt="Banner Topo" className="banner-topo" />
      <div className="conteudo">
      <h2>Seja bem-vindo ao sistema <span className="atlantis-text">Atlantis</span></h2>
        <p>Aqui está o painel de controle, caso queira acessar outras partes do sistema, use o menu ao lado.</p>
        <p>Em caso de dúvidas, entre em contato conosco! Acesse:</p>
        <ul>
          <li>📞 Central de atendimento: +55 (12) 98222222222</li>
          <li>📧 Email: <a href="mailto:atlantis@ebermail.com">atlantis@ebermail.com</a></li>
          <li>💬 ChatBot: <a href="https://support.atlantis.com/pt-br/contact-us" target="_blank">https://support.atlantis.com/pt-br/contact-us</a></li>
        </ul>
      </div>
    </div>
  );
};

export default Home;