import React from 'react';
import './App.css';
import StockListPriceUpdater from "./components/StockListPriceUpdater";
import StockSinglePriceUpdater from "./components/StockSinglePriceUpdater";

function App() {
  return (
    <div className="App">
      <StockSinglePriceUpdater />
      <StockListPriceUpdater />
    </div>
  );
}

export default App;
