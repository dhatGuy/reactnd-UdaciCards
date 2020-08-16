import { AsyncStorage } from "react-native"

export const STORAGE_KEY = "flashcards"
// return all of the decks along with their titles, questions, and answers. 
export const getDecks = async () => {
  const data = await AsyncStorage.getItem(STORAGE_KEY)
  return JSON.parse(data)
}

// take in a single id argument and return the deck associated with that id. 
export const getDeck = async (id) => {
  const data = await AsyncStorage.getItem(STORAGE_KEY)
  const deck = JSON.parse(data)
  return deck[id]
};

// take in a single title argument and add it to the decks.
export const saveDeckTitle = async(title) => {
  const decks = getDecks()
  if(Object.keys(decks).includes(title)) return false
  await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [title]:{
      title: title,
      questions:[

      ]
    }
  }))
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export const addCardToDeck = async (title,card)=>{
  const decks = await AsyncStorage.getItem(STORAGE_KEY);
  const data = JSON.parse(decks);
  const newDecks = {
    ...data,
    [title]: {
      questions: [...title.questions, card]
    }
  };
  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newDecks));
}

// {
//   React: {
//     title: 'React',
//     questions: [
//       {
//         question: 'What is React?',
//         answer: 'A library for managing user interfaces'
//       },
//       {
//         question: 'Where do you make Ajax requests in React?',
//         answer: 'The componentDidMount lifecycle event'
//       }
//     ]
//   },
//   JavaScript: {
//     title: 'JavaScript',
//     questions: [
//       {
//         question: 'What is a closure?',
//         answer: 'The combination of a function and the lexical environment within which that function was declared.'
//       }
//     ]
//   }
// }
