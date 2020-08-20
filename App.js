import React, { useEffect } from "react";
import DeckList from "./components/DeckList";
import IndividualCard from "./components/IndividualCard";
import NewDeck from "./components/NewDeck";
import NewCard from "./components/NewCard";
import Quiz from "./components/Quiz";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Card from "./components/Card";
import { Provider } from "react-redux";
import { createStore } from "redux";
import reducers from "./reducers";
import middlewares from "./middlewares/logger";
import { setNotification } from "./utils/notifications";
import { Provider as PaperProvider } from "react-native-paper";
import {
  FontAwesome,
  MaterialCommunityIcons,
  Ionicons,
} from "@expo/vector-icons";

const store = createStore(reducers, middlewares);
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Tabs = (props) => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "white",
        inactiveTintColor: "grey",
        showLabel: false,
        tabStyle: {
          backgroundColor: "tomato",
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: "Decks",
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons
              name="cards-outline"
              size={35}
              color={color}
            />
          ),
        }}
        name="Home"
        component={DeckList}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Ionicons name="md-add-circle-outline" size={35} color={color} />
          ),
        }}
        name="New Deck"
        component={NewDeck}
      />
    </Tab.Navigator>
  );
};

const Navigator = (props) => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: "tomato",
        },
      }}
    >
      <Stack.Screen name="Flashcards" component={Tabs} />
      <Stack.Screen
        name="Individual Card"
        options={{
          title: "Deck",
        }}
        component={IndividualCard}
      />
      <Stack.Screen name="New Card" component={NewCard} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Card" component={Card} />
    </Stack.Navigator>
  );
};

export default function App() {
  useEffect(() => {
    setNotification();
  }, []);
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <Navigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
