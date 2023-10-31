import React from 'react';
import logo from './logo.svg';
import './App.css';
import DogDashboard from './components/DogDashboard/DogDashboard';
import { DogListProvider } from './contexts/DogListContext';

function App() {
  return (
    <DogListProvider>
      <DogDashboard title="Dog Dashboard"></DogDashboard>
    </DogListProvider>
  );
}

export default App;
