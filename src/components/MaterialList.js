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

  return (
    <div className="material-list">
      {showFinalMaterials ? (
        <div className="material-list-container">
          <Sandwich
            materialList={mapToSelected(selectedMaterials)}
            bread={mapToSelected(selectedBread)}
          />
        </div>
      ) : (
        <div className="material-list-container">
          {nextMaterial
            ? selectedBread.map((material) => {
                const { id, isSelected, src, name } = material;
                return (
                  <Material
                    key={id}
                    onClick={() => toggleSelected(id, "bread")}
                    isSelected={isSelected}
                    src={src}
                    name={name}
                  />
                );
              })
            : selectedMaterials.map((material) => {
                const { id, isSelected, src, name } = material;
                return (
                  <Material
                    key={id}
                    onClick={() => toggleSelected(id, "material")}
                    isSelected={isSelected}
                    src={src}
                    name={name}
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
