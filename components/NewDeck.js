import React, { useState } from "react";
import { View, Text, Button, TextInput } from "react-native";
import {saveDeckTitle, STORAGE_KEY} from "../utils/api"
import {AsyncStorage} from "react-native"

const NewDeck = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const handleChange = (e) => {
    setTitle(e);
  };
  const onPress = () => {
    saveDeckTitle(title)
    navigation.navigate("Home")
    setTitle("")
  }
  AsyncStorage.getItem(STORAGE_KEY).then(data=> console.log(JSON.parse(data)))
  return (
    <View>
      <Text>What is your deck title?</Text>
      <TextInput value={title} onChangeText={handleChange} />
      <Button
        title="submit"
        onPress={onPress}
      >
        Submit
      </Button>
    </View>
  );
};

export default NewDeck;
