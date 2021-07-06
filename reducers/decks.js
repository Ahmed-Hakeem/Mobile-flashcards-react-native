import { ADD_CARD } from "../actions/Cards";

import { GET_DECKS, DELETE_DECK, ADD_DECK } from "../actions/decks.js";

export default function decks(state = {}, action) {
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case DELETE_DECK:
      //using immutable datastructure ...we replace the state with the new state
      //instead of mutating it
      const StateClone = { ...state };
      delete StateClone[action.deck];
      return {
        ...StateClone,
      };
    case ADD_DECK:
      return {
        ...state,
        [action.title]: {
          title: action.title,
          questions: [],
        },
      };
    case ADD_CARD:
      return {
        ...state,
        [action.deck]: {
          ...state[action.deck],
          questions: state[action.deck].questions.concat([action.card]),
        },
      };
    default:
      return state;
  }
}
