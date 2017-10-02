import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import actionGuess from '../actions/guess'
import { connect } from 'react-redux'
import Winner from '../images/hangmanWinner.png'
import Dead from '../images/hangmanLost.png'
import HM1 from '../images/hangman1.png'
import HM2 from '../images/hangman2.png'
import HM3 from '../images/hangman3.png'
import HM4 from '../images/hangman4.png'
import HM5 from '../images/hangman5.png'
import HM6 from '../images/hangman6.png'

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

export class Game extends PureComponent {
  static propTypes = {
    word: PropTypes.string.isRequired,
    guesses: PropTypes.array,
  }

  isWinner(word, guesses) {
    const guess = this.props.guesses[guesses.length - 1]
    const thisWord = this.props.word
    if ((wrongGuessCount(word, guesses) <= 6) && (showGuess(word, guesses)  === word.split("").join(" "))) return true
    else if (guess === thisWord) return true
  }

  addGuess(event) {
    event.preventDefault()
    const guess = this.refs.guess.value
    this.props.actionGuess(guess)
    document.getElementById("guessForm").reset()
  }

  chooseHM() {
    const currentGuesses = this.props.guesses
    const thisWord = this.props.word
    const thisRoundCount = wrongGuessCount(thisWord, currentGuesses)
    if (thisRoundCount === 0) return <img src={ HM1 } alt="hangman"/>
    if (thisRoundCount === 1) return <img src={ HM1 } alt="hangman"/>
    if (thisRoundCount === 2) return <img src={ HM2 } alt="hangman"/>
    if (thisRoundCount === 3) return <img src={ HM3 } alt="hangman"/>
    if (thisRoundCount === 4) return <img src={ HM4 } alt="hangman"/>
    if (thisRoundCount === 5) return <img src={ HM5 } alt="hangman"/>
    if (thisRoundCount === 6) return <img src={ HM6 } alt="hangman"/>
  }

  render () {
    const currentGuesses = this.props.guesses
    const thisWord = this.props.word
    const thisRoundWord = showGuess(thisWord, currentGuesses)
    const thisRoundCount = wrongGuessCount(thisWord, currentGuesses)
    const thisRoundWinner = this.isWinner(thisWord, currentGuesses)

    if (thisRoundCount <= 6 && thisRoundWinner === true)
      return (
        <div className="Game">
          <img src={ Winner } alt="hangmanWinner"/>
          <h1>Winner!</h1>
        </div>
      )
    else if (thisRoundCount > 6)
      return (
        <div className="Game">
          <img src={ Dead } alt="hangmanDead"/>
          <h1>You lost</h1>
          <h3>the word was { thisWord }</h3>
        </div>
      )
    else if (thisWord === "start")
      return (
        <div className="welcome">
          <img src={ Dead } alt="hangmanDead"/>
          <h2>Welcome to hangman</h2>
        </div>
      )
    else
      return(
        <div className="Game">
          <p>{ this.chooseHM() }</p>
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
