import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { View, Text } from "react-native";
import Card from "./Card";
import { getDecks } from "../utils/api";

const DeckList = ({ navigation }) => {
  const [decks, setDecks] = useState(null);

  useEffect(() => {
    getDecks().then((data) => setDecks(data));
  }, []);
  
  if(decks === null) return null
  return (
    <View>
      {Object.keys(decks).map((key) => (
        <Card
          key={key}
          title={decks[key].title}
          question={decks[key].questions}
          onPress={() => navigation.navigate("Individual Card")}
        />
      ))}
    </View>
  );
};

export default DeckList;
