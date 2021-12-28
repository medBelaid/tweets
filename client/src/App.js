import { useState, createContext, useReducer } from 'react';
import { ThemeProvider } from 'styled-components';
import io from "socket.io-client";
import { theme } from './theme';
import './App.css';
import ChartSection from './components/ChartSection';
import FieldsSection from './components/FieldsSection';
import TweetsSection from './components/TweetsSection';
import TweetsReducer from "./reducers/TweetsReducer";

const socket = io(process.env.REACT_APP_SERVER_URL);
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
    <ThemeProvider theme={theme}>
      <CounterContext.Provider value={{ state, dispatch, socket }}>
        <div className="App">
          <FieldsSection />
          <TweetsSection />
          <ChartSection />
      </div>
      </CounterContext.Provider>
    </ThemeProvider>
  );
}

export default App;
