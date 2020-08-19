import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import {saveDeckTitle, STORAGE_KEY} from "../utils/api"
import {AsyncStorage} from "react-native"
import { useSelector, useDispatch } from "react-redux";
import { SAVE_DECK, addDeck } from "../actions";

const NewDeck = ({ navigation }) => {
  const state = useSelector(state=> state)
  const dispatch = useDispatch()

  const [deck, setDeck] = useState("");
  const handleChange = (e) => {
    setDeck(e);
  };
  const onPress = () => {
    saveDeckTitle(deck)
    .then(()=> dispatch(addDeck(deck)))
    setDeck("")
    navigation.navigate("Individual Card", {id: deck})
  }
  return (
    <View>
      <Text>What is your deck title?</Text>
      <TextInput value={deck} onChangeText={handleChange} />
      <Button
        title="submit"
        onPress={onPress}
        disabled={deck === ""}
      >
        Submit
      </Button>
    </View>
  );
};

export default NewDeck;
