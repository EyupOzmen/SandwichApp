import React from "react";

const Sandwich = ({ materialList, bread }) => {
  return (
    <div className="sandwich-container">
      {console.log(materialList)}
      <div className="material">
        {materialList.map((item) => {
          const { src, id, name } = item;
          return (
            <img
              className="sandwich-image small"
              src={src}
              key={id}
              alt={name}
            />
          );
        })}
      </div>
      <div className="bread">
        {bread.map((item) => {
          const { src, id, name } = item;
          return (
            <img className="sandwich-image big" src={src} key={id} alt={name} />
          );
        })}
      </div>
    </div>
  );
};

export default Sandwich;
