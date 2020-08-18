import { AsyncStorage } from "react-native"

export const STORAGE_KEY = "flashcards"
// return all of the decks along with their titles, questions, and answers. 
export const getDecks = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY)
    return data
  } catch (error) {
    alert("An error occurred while fetching the data.")
  }
}

// take in a single id argument and return the deck associated with that id. 
export const getDeck = async (id) => {
    const data = await AsyncStorage.getItem(STORAGE_KEY)
    const deck = JSON.parse(data)
    return deck[id]
  
};

// take in a single title argument and add it to the decks.
export const saveDeckTitle = async(deck) => {
  await AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [deck]:{
      title: deck,
      questions:[

      ]
    }
  }))
}

// take in two arguments, title and card, and will add the card to the list of questions for the deck with the associated title. 
export const addCardToDeck = async (title,card)=>{
  // console.log(title);
  const deck = await getDeck(title)
  const newDeck = {
    [title]: {
      questions: [...deck.questions, card]
    }
  }
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify(newDeck));
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
