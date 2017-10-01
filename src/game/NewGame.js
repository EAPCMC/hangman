import React, { PureComponent } from 'react'
import actionGame from '../actions/newGame'
import { connect } from 'react-redux'
import words from '../fixtures/words'

export class NewGame extends PureComponent {

  newGame(event) {
    event.preventDefault()
    this.props.actionGame(words[Math.floor(Math.random()*words.length)])
  }

  render () {
    return(
      <div className="newGame">
        <button className="primary" onClick={this.newGame.bind(this)}>New Game</button>
      </div>
    )
  }
}

const mapDispatchToProps = { actionGame }

export default connect(null, mapDispatchToProps)(NewGame)
