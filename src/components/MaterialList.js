import React, { useState } from "react";

import Material from "./Material";
import Sandwich from "./Sandwich";
import { materials } from "../data/materialData";
import { breads } from "../data/materialData";

const MaterialList = () => {
  const [selectedMaterials, setSelectedMaterials] = useState(materials);
  const [selectedBread, setSelectedBread] = useState(breads);
  const [nextMaterial, setNextMaterial] = useState(false);
  const [showFinalMaterials, setShowFinalMaterials] = useState(false);

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
      {showFinalMaterials ? (
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
