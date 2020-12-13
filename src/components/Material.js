import React from "react";

import { TiThumbsUp } from "react-icons/ti";

const Material = ({ src, name, isSelected, onClick }) => {
  return (
    <div className="material-container" onClick={onClick}>
      <img className="material-image" src={src} alt={name} />
      <span className="material-name">{name}</span>
      {isSelected ? (
        <TiThumbsUp className="material-icon isSelected" />
      ) : (
        <TiThumbsUp className="material-icon notSelected" />
      )}
    </div>
  );
};

export default Material;
