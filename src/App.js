import React, { Component } from 'react';
import './App.css';
import Title from './components/Title'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title content="Hangman"/>
      </div>
    );
  }
}

export default App;
