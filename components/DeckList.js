import React, { useEffect, useLayoutEffect } from "react";
import { Text, ScrollView } from "react-native";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { handleInitialData } from "../actions";
import styled from "styled-components/native";
import { Button } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderBackButton } from "@react-navigation/stack";

const Empty = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const DeckList = ({ navigation }) => {
  const decks = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderBackButton onPress={() => navigation.navigate("Flashcards")} />
      ),
    });
  }, [navigation]);

  if (Object.keys(decks).length === 0) {
    return (
      <Empty>
        <MaterialCommunityIcons
          name="delete-empty-outline"
          size={60}
          color="black"
        />
        <Text>Deck List is empty.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("New Deck")}
        >
          add deck
        </Button>
      </Empty>
    );
  }

  return (
    <ScrollView>
      {Object.keys(decks).map((key) => (
        <Card
          key={key}
          title={decks[key].title}
          questions={decks[key].questions}
          onPress={() => navigation.navigate("Individual Card", { id: key })}
        />
      ))}
    </ScrollView>
  );
};

export default DeckList;
