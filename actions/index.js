import { getDecks } from "../utils/api";

export const RECEIVE_DECKS = "RECEIVE_DECKS";

export const receiveDecks = (decks) => ({
  type: RECEIVE_DECKS,
  decks,
});

export const ADD_DECK = "ADD_DECK";

export const addDeck = (deck) => ({
  type: ADD_DECK,
  deck,
});

export const ADD_CARD = "ADD_CARD";

export const addCard = (title, card) => ({
  type: ADD_CARD,
  title,
  card,
});

export const handleInitialData = () => {
  return async (dispatch) => {
    const decks = await getDecks();
    dispatch(receiveDecks(JSON.parse(decks)));
  };
};
