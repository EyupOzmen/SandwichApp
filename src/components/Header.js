import React from "react";

import sandwich from "../assets/sandwich.jpg";

const Header = () => {
  return (
    <div className="header-container">
      <svg
        className="header-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#0093e9"
          d="M0,192L60,208C120,224,240,256,360,245.3C480,235,600,181,720,176C840,171,960,213,1080,218.7C1200,224,1320,192,1380,176L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <div className="header-prop">
        <img className="header-image" src={sandwich} alt="sandwich" />
        <p className="header-tag">Dijital Sandviç Asistanı</p>
      </div>
    </div>
  );
};

export default Header;
