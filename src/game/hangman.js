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

function wrongGuessCount(word, guesses) {
  return guesses.reduce(function(sum, guess) {
    return sum + (word.indexOf(guess, 0) === -1)
  }, 0);
}

function isWinner(word, guesses) {
    if ((wrongGuessCount(word, guesses) <= 6) && (showGuess(word, guesses)  === word.split("").join(" "))) return true
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
    const thisRoundCount = wrongGuessCount(thisWord, currentGuesses)
    const thisRoundWinner = isWinner(thisWord, currentGuesses)

    if (thisRoundCount <= 6 && thisRoundWinner === true)
      return (
        <div className="Game">
          <h1>Winner!</h1>
        </div>
      )
    else if (thisRoundCount > 6)
      return (
        <div className="Game">
          <h1>You lost</h1>
        </div>
      )
    else if (thisWord === "start")
      return (
        <h2>Welcome to hangman</h2>
      )
    else
      return(
        <div className="Game">
          <h2>{ thisRoundWord }</h2>
          <p>Your guesses: { currentGuesses.join(" ") }</p>
          <p>Wrong guesses: { thisRoundCount }/6</p>
          <div className="guess">
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
