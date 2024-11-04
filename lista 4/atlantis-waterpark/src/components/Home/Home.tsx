import React from 'react';
import retangulo from '../../assets/img/retangulo.png'; 
import telefoneIcon from '../../assets/img/telefone.png'; // Imagem do ícone de telefone
import emailIcon from '../../assets/img/email.png';       // Imagem do ícone de email
import chatbotIcon from '../../assets/img/chatbot.png';   // Imagem do ícone de chatbot
import '../Home/Home.css';

const Home: React.FC = () => {
  return (
    <div className="home">
      <img src={retangulo} alt="Banner Topo" className="banner-topo" />
      <div className="conteudo">
        <h2>Seja bem-vindo ao sistema <span className="atlantis-text">Atlantis</span></h2>
        <p className="descricao">Aqui está o painel de controle, caso queira acessar outras partes do sistema, use o menu ao lado.</p>
        <p className="descricao">Em caso de dúvidas, entre em contato conosco! Acesse:</p>
        <ul>
          <li>
            <img src={telefoneIcon} alt="Telefone" className="icon" />
            <div className="info-text">
              <span className="titulo">Central de atendimento:</span>
              <a href="tel:+55129822222222" className="contato">+55 (12) 98222222222</a>
            </div>
          </li>
          <li>
            <img src={emailIcon} alt="Email" className="icon" />
            <div className="info-text">
              <span className="titulo">Email:</span>
              <a href="mailto:atlantis@ebermail.com" className="contato">atlantis@ebermail.com</a>
            </div>
          </li>
          <li>
            <img src={chatbotIcon} alt="ChatBot" className="icon" />
            <div className="info-text">
              <span className="titulo">ChatBot:</span>
              <a href="https://support.atlantis.com/pt-br/contact-us" target="_blank" className="contato">https://support.atlantis.com/pt-br/contact-us</a>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;
