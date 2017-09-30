import { GUESS } from '../actions/guess'
import { NEW_GAME } from '../actions/newGame'

export default (state = [], { type, payload } = {}) => {
  switch (type) {

    case GUESS :
      return state.concat(payload)

    case NEW_GAME :
      return []

    default :
      return state
  }
}
