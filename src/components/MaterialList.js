import React, { useState, useEffect } from "react";

import Material from "./Material";
import Sandwich from "./Sandwich";
import { materials } from "../data/materialData";
import { breads } from "../data/materialData";
import tick from "../assets/tick.gif";

const MaterialList = () => {
  const [selectedMaterials, setSelectedMaterials] = useState(materials);
  const [selectedBread, setSelectedBread] = useState(breads);
  const [nextMaterial, setNextMaterial] = useState(false);
  const [showFinalMaterials, setShowFinalMaterials] = useState(false);
  const [showCheck, setShowCheck] = useState(true);

  const toggleSelected = (id, type) => {
    if (type === "material") {
      let updatedMaterials = selectedMaterials.map((material) =>
        material.id === id
          ? {
              ...material,
              isSelected: !material.isSelected,
            }
          : material
      );

      setSelectedMaterials(updatedMaterials);
    } else {
      let updatedBreads = selectedBread.map((bread) =>
        bread.id === id
          ? {
              ...bread,
              isSelected: true,
            }
          : {
              ...bread,
              isSelected: false,
            }
      );

      setSelectedBread(updatedBreads);
    }
  };

  useEffect(() => {
    let interval = null;
    if (showFinalMaterials) {
      if (showCheck) {
        interval = setInterval(() => {
          setShowCheck(false);
        }, 3500);
      }
    }

    console.log(interval, showCheck);
    return () => clearInterval(interval);
  }, [showFinalMaterials, showCheck]);

  const totalNumberOfSelected = (thingsArray) => {
    let totalNumber = 0;
    thingsArray.map((thing) => {
      if (thing.isSelected) {
        totalNumber++;
      }
    });

    return totalNumber;
  };

  const handleNextMaterial = () => {
    if (!nextMaterial) {
      if (totalNumberOfSelected(selectedMaterials)) {
        setNextMaterial(true);
      }
    } else {
      if (totalNumberOfSelected(selectedBread)) {
        setShowFinalMaterials(true);
      }
    }
  };

  const mapToSelected = (arrayWillBeFiltered) => {
    let arrayFiltered = arrayWillBeFiltered.filter(
      (item) => item.isSelected === true
    );

    return arrayFiltered;
  };

  const totalFeeCalculator = (selectedMaterialArray, selectedBreadArray) => {
    let selectedAll = [...selectedMaterialArray, ...selectedBreadArray];
    let selectedFee = selectedAll.map((item) => {
      return parseInt(item.fee.substr(0, item.fee.indexOf("₺")));
    });

    const reducer = (accumulator, item) => {
      return accumulator + item;
    };

    let totalFee = selectedFee.reduce(reducer, 0);

    return totalFee + "₺";
  };

  return (
    <div className="material-list">
      {!showFinalMaterials ? (
        nextMaterial ? (
          <div className="prompt">
            <p>Sandviç Ekmeğini Seçiniz</p>
          </div>
        ) : (
          <div className="prompt">
            <p>Sandviç Malzemelerini Seçiniz</p>
          </div>
        )
      ) : showCheck ? null : (
        <div className="prompt">
          <p>Afiyet Olsun</p>
        </div>
      )}
      {showFinalMaterials ? (
        showCheck ? (
          <div className="image-tick-container">
            <img className="image-tick" src={tick} alt="tick" />
            <p className="tick-text">Sandviçiniz Hazırlanıyor </p>
          </div>
        ) : (
          <div className="material-list-container sandwich-container">
            <Sandwich
              materialList={mapToSelected(selectedMaterials)}
              bread={mapToSelected(selectedBread)}
              totalFee={totalFeeCalculator(
                mapToSelected(selectedMaterials),
                mapToSelected(selectedBread)
              )}
            />
          </div>
        )
      ) : (
        <div className="material-list-container">
          {nextMaterial
            ? selectedBread.map((material) => {
                const { id, isSelected, src, name, fee } = material;
                return (
                  <Material
                    key={id}
                    onClick={() => toggleSelected(id, "bread")}
                    isSelected={isSelected}
                    src={src}
                    name={name}
                    fee={fee}
                  />
                );
              })
            : selectedMaterials.map((material) => {
                const { id, isSelected, src, name, fee } = material;
                return (
                  <Material
                    key={id}
                    onClick={() => toggleSelected(id, "material")}
                    isSelected={isSelected}
                    src={src}
                    name={name}
                    fee={fee}
                  />
                );
              })}
        </div>
      )}

      {!showFinalMaterials && (
        <div className="button-container">
          <button className="button-material" onClick={handleNextMaterial}>
            Onayla
          </button>
        </div>
      )}
    </div>
  );
};

export default MaterialList;
