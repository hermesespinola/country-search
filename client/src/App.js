import React from 'react';

import Label from './components/presentational/Label';
import CountryAutocomplete from './components/container/CountryAutocomplete';
import './App.css';

function App() {
  return (
    <div className="App">
      <CountryAutocomplete />
    </div>
  );
}

export default App;
