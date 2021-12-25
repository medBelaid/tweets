import { useState, createContext, useReducer } from 'react';
import './App.css';
import ChartSection from './components/ChartSection';
import FieldsSection from './components/FieldsSection';
import TweetsSection from './components/TweetsSection';
import TweetsReducer from "./reducers/TweetsReducer";

// Create Context Object
export const CounterContext = createContext();

function App() {
  const initialState = {
    word1: "",
    word2: "",
    counter1: 0,
    counter2: 0,
    tweets1: [],
    tweets2: [],
    error: {},
    isSubmitted: false,
    chartData: []
  };

  const [state, dispatch] = useReducer(TweetsReducer, initialState);
  return (
    <CounterContext.Provider value={{ state, dispatch }}>
      <div className="App">
        <FieldsSection />
        <TweetsSection />
        <ChartSection />
    </div>
    </CounterContext.Provider>
  );
}

export default App;
