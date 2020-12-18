import React from "react";

import { TiThumbsUp } from "react-icons/ti";

const Material = ({ src, name, isSelected, onClick, fee }) => {
  return (
    <div className="material-container" onClick={onClick}>
      <img className="material-image" src={src} alt={name} />
      <span className="material-name">{name}</span>
      {isSelected ? (
        <div className="fee-container">
          <span className="material-fee isSelected ">{fee}</span>
          <TiThumbsUp className="material-icon isSelected" />
        </div>
      ) : (
        <div className="fee-container">
          <span className="material-fee notSelected">{fee}</span>
          <TiThumbsUp className="material-icon notSelected" />
        </div>
      )}
    </div>
  );
};

export default Material;
