import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Button } from "react-native";
import Card from "./Card";
import { getDeck } from "../utils/api";
import { HeaderBackButton } from "@react-navigation/stack";
import { useSelector } from "react-redux";

const IndividualCard = ({route, navigation}) => {
  const deck = useSelector(state=> state[route.params.id])
  // const [deck, setDeck] = useState(null);

    getDeck(route.params.id)
  
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={()=>navigation.navigate("Flashcards")} />
      ),
    });
  }, [navigation]);
  if (deck === null) return null;
  return (
    <View>
      <Card title={deck.title} question={deck.questions} />
      <View>
        <Button
          title="Add Card"
          onPress={() => navigation.navigate("New Card", {title: deck.title})}
        />
        <Button
          title="Start Quiz"
          onPress={() => navigation.navigate("Quiz")}
        />
        <Button title="Delete Deck" />
      </View>
    </View>
  );
};

export default IndividualCard;
