import React from "react";

import MaterialList from "./components/MaterialList";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Header />
      <MaterialList />
    </div>
  );
};

export default App;
