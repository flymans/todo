import React from 'react';
import AddTaskBar from './components/AddTaskBar';
import Header from './components/Header'
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AddTaskBar />
    </div>
  );
}

export default App;
