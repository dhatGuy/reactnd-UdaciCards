import {
  GET_DECKS,
  SAVE_DECK,
  RECEIVE_DECKS,
  ADD_DECK,
  ADD_CARD,
  DELETE_DECK,
  DELETE_CARD,
} from "../actions";

export default (state = {}, action) => {
  switch (action.type) {
    case RECEIVE_DECKS:
      return {
        ...state,
        ...action.decks,
      };
    case ADD_DECK:
      const { deck } = action;
      return {
        ...state,
        [deck]: {
          title: deck,
          questions: [],
        },
      };
    case ADD_CARD:
      const { title, card } = action;
      return {
        ...state,
        [title]: {
          ...state[title],
          questions: [...state[title].questions].concat(card),
        },
      };
    case DELETE_DECK:
      const { [action.deck]: deleted, ...newDecks } = state;
      return newDecks;

    case DELETE_CARD:
      return {
        ...state,
        [action.title]: {
          ...state[action.title],
          questions: [...state[action.title].questions].filter(
            (item, index) => index !== action.index
          ),
        },
      };
    default:
      return state;
  }
};
