import { useState, createContext } from 'react';
import './App.css';
import FieldsSection from './components/FieldsSection';
import TweetsSection from './components/TweetsSection';

// Create Context Object
export const CounterContext = createContext();

function App() {
  const [word1, setWord1] = useState("");
  const [word2, setWord2] = useState("");
  return (
    <CounterContext.Provider value={[word1, setWord1, word2, setWord2]}>
      <div className="App">
        <FieldsSection />
        <TweetsSection /> 
    </div>
    </CounterContext.Provider>
  );
}

export default App;
