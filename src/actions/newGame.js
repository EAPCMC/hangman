export const NEW_GAME = 'NEW_GAME'

export default (word) => {
  return {
    type: NEW_GAME,
    payload: word
  }
}
