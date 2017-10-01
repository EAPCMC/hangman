import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import actionGuess from '../actions/guess'
import { connect } from 'react-redux'

function showGuess(word, guesses) {
  var wordArray = word.split("")
  var guess = wordArray.map(function(letter){
    if (guesses.includes(letter) === false) return "_"
    else return letter
  })
  var showGuess = guess.join(" ")
  return showGuess
}

export class Game extends PureComponent {
  static propTypes = {
    word: PropTypes.string.isRequired,
    guesses: PropTypes.array,
  }

  addGuess(event) {
    event.preventDefault()
    const guess = this.refs.guess.value
    this.props.actionGuess(guess)
    document.getElementById("guessForm").reset()
  }

  render () {
    const currentGuesses = this.props.guesses
    const thisWord = this.props.word
    const thisRoundWord = showGuess(thisWord, currentGuesses)

    return(
      <div className="Game">
        <h2>{ thisRoundWord }</h2>
        <p>Your guesses: { currentGuesses.join(" ") }</p>
        <div className="guess">
          <h2>Enter a letter</h2>
          <form id="guessForm" onSubmit={this.addGuess.bind(this)}>
            <div className="input">
              <input ref="guess" type="guess" />
            </div>
            <input type="submit" value="Guess!" />
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({ word, guesses }) => ({ word, guesses })
const mapDispatchToProps = { actionGuess }

export default connect(mapStateToProps, mapDispatchToProps)(Game)
