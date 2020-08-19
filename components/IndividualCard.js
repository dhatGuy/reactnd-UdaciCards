import React, { useLayoutEffect } from "react";
import { View } from "react-native";
import Card from "./Card";
import { getDeck, removeDeck } from "../utils/api";
import { HeaderBackButton } from "@react-navigation/stack";
import { useSelector, useDispatch } from "react-redux";
import { deleteDeck } from "../actions";
import { Button } from "react-native-paper";
import styled from "styled-components/native";

const Container = styled.View`
  margin: 0 auto;
  width: 80%;
`;

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
      <Card title={deck.title} questions={deck.questions} />
      <Container>
        <Button
          mode="contained"
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate("Quiz", { id: deck.title })}
        >
          Start Quiz
        </Button>
        <Button
          mode="outlined"
          style={{ marginBottom: 10 }}
          onPress={() => navigation.navigate("New Card", { title: deck.title })}
        >
          Add Card
        </Button>
        <Button style={{ marginBottom: 10 }} onPress={() => remove(deck.title)}>
          Delete Deck
        </Button>
      </Container>
    </View>
  );
};

export default IndividualCard;
