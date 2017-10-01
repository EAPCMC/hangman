export const GUESS = 'GUESS'

export default (guess) => {
  return {
    type: GUESS,
    payload: guess
  }
}
