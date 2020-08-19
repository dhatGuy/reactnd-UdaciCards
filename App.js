import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import DeckList from "./components/DeckList";
import IndividualCard from "./components/IndividualCard";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import {Platform} from 'react-native'; 
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator, HeaderBackButton } from "@react-navigation/stack";
import Card from "./components/Card";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares/logger";
import { setNotification } from "./utils/notifications";

const store = createStore(reducers, middlewares);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();



const Tabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={DeckList} />
      <Tab.Screen name="New Deck" component={NewDeck} />
    </Tab.Navigator>
  );
};

const Navigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Flashcards" component={Tabs} />
      <Stack.Screen
        name="Individual Card"
        component={IndividualCard}
      />
      <Stack.Screen name="New Card" component={NewCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Card" component={Card} />
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(()=>{
    setNotification()
  },[])
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator />
      </NavigationContainer>
    </Provider>
  );
}
