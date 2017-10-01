import React, { Component } from 'react';
import './App.css';
import NewGame from './game/NewGame'
import Game from './game/Hangman'
import Title from './components/Title'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Title content="Hangman"/>
        <Game />
        <NewGame />
      </div>
    );
  }
}

export default App;
