import { AsyncStorage } from "react-native";

export const STORAGE_KEY = "Udacity:flashcards";
export const GET_DECKS = "GET_DECKS";
export const ADD_DECK = "ADD_DECK";
export const ADD_CARD = "ADD_CARD";

export const setInitialData = () => {
  const initialData = {
    React: {
      title: "React",
      questions: [
        {
          question: "What is React?",
          answer: "A library for managing user interfaces"
        },
        {
          question: "Where do you make Ajax requests in React?",
          answer: "The componentDidMount lifecycle event"
        }
      ]
    },
    JavaScript: {
      title: "JavaScript",
      questions: [
        {
          question: "What is a closure?",
          answer:
            "The combination of a function and the lexical environment within which that function was declared."
        }
      ]
    }
  };

  AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initialData));

  return initialData;
};

export function fetchData(decks) {
  return {
    type: GET_DECKS,
    decks
  };
}

export function createDeck(deck) {
  AsyncStorage.mergeItem(
    STORAGE_KEY,
    JSON.stringify({
      [deck]: {
        title: deck,
        questions: []
      }
    })
  );
  return {
    type: ADD_DECK,
    deck
  };
}

export function createCard(deck, card) {
  AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
    let currentDeck = JSON.parse(result)[deck.title];
    let questions = currentDeck.questions;
    questions[questions.length] = card;
    currentDeck.questions = questions;
    AsyncStorage.mergeItem(
      STORAGE_KEY,
      JSON.stringify({ [deck.title]: currentDeck })
    );
  });
  return {
    type: ADD_CARD,
    card,
    deck
  };
}
