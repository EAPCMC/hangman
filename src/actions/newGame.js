import words from '../fixtures/words'

const word = words[Math.floor(Math.random()*words.length)];

export const NEW_GAME = 'NEW_GAME'

export default () => {
  return {
    type: NEW_GAME,
    payload: word
  }
}
