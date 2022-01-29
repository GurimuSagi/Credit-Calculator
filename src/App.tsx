import React from 'react';
import './App.css';
import CreditParameters from './components/creditParameters';
import MainResults from './components/mainResults';
import RefinancingDetails from './components/refinancingDetails';

function App() {
  return (
    <div className="App">
      <header>
        <h1>Кредитный калькулятор</h1>
      </header>
      <main>
        <CreditParameters />
        <MainResults />
        <RefinancingDetails />
      </main>
    </div>
  );
}

export default App;