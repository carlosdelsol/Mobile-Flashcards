import { GET_DECKS, ADD_DECK, ADD_CARD } from "../actions";

export default function decks(state = {}, action) {
  const { deck, card, data } = action;
  switch (action.type) {
    case GET_DECKS:
      return {
        ...state,
        ...action.decks
      };

    case ADD_DECK:
      return {
        ...state,
        [deck]: {
          title: deck,
          questions: []
        }
      };
    case ADD_CARD:
      return {
        ...state,
        [deck.title]: {
          ...state[deck.title],
          questions: [...state[deck.title].questions, card]
        }
      };
    default:
      return state;
  }
}
