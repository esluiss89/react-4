import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <div className="header">
      <div className="logo">
        <img src="./img/star.png" class="img-thumbnail" alt="logo"/>
      </div>
      <h1>Api de Valores</h1>
      <input type="text" placeholder="Buscar en el banco" />
    </div>
  );
};

export default Header;
