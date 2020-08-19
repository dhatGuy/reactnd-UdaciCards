import React, { useState, useEffect, useLayoutEffect } from "react";
import { View, Button } from "react-native";
import Card from "./Card";
import { getDeck, removeDeck } from "../utils/api";
import { HeaderBackButton } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { deleteDeck } from "../actions";

const IndividualCard = ({ route, navigation }) => {
  const deck = useSelector((state) => state[route.params.id]);
  const dispatch = useDispatch();

  getDeck(route.params.id);
  const remove = (title) => {
    removeDeck(title).then((response) => {
      dispatch(deleteDeck(title));
      navigation.navigate("Home");
    });
  };
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderBackButton onPress={() => navigation.navigate("Flashcards")} />
      ),
    });
  }, [navigation]);
  if (!deck) return null;
  return (
    <View>
      <Card title={deck.title} question={deck.questions} />
      <View>
        <Button
          title="Add Card"
          onPress={() => navigation.navigate("New Card", { title: deck.title })}
        />
        <Button
          title="Start Quiz"
          onPress={() => navigation.navigate("Quiz", { id: deck.title })}
        />
        <Button title="Delete Deck" onPress={() => remove(deck.title)} />
      </View>
    </View>
  );
};

export default IndividualCard;
