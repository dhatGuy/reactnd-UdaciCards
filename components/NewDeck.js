import React, { useState } from "react";
import { saveDeckTitle } from "../utils/api";
import { useDispatch } from "react-redux";
import { addDeck } from "../actions";
import { TextInput, Button } from "react-native-paper";
import styled from "styled-components/native";

const StyledText = styled.Text`
  text-align: center;
  font-size: 20px;
`;
const Container = styled.View`
  margin: 0 5px;
`;
const NewDeck = ({ navigation }) => {
  const dispatch = useDispatch();
  const [deck, setDeck] = useState("");
  const handleChange = (e) => {
    setDeck(e);
  };
  const onPress = () => {
    saveDeckTitle(deck).then(() => dispatch(addDeck(deck)));
    setDeck("");
    navigation.navigate("Individual Card", { id: deck });
  };
  return (
    <Container>
      <StyledText>What is your deck title?</StyledText>
      <TextInput
        style={{ marginBottom: 10 }}
        placeholder="Deck title..."
        mode="outlined"
        value={deck}
        onChangeText={handleChange}
      />
      <Button
        mode="contained"
        title="submit"
        onPress={onPress}
        disabled={deck === ""}
      >
        Submit
      </Button>
    </Container>
  );
};

export default NewDeck;
