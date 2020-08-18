import { GET_DECKS, SAVE_DECK, RECEIVE_DECKS, ADD_DECK, ADD_CARD } from "../actions";

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
        const {title, card} = action
        return {
          ...state,
          [title]: {
            ...state[title],
            questions: [...state[title].questions].concat(card)
          }
        }
    default:
      // console.log(action);
      return state;
  }
};
