import React from "react"
import { View, TextInput, Button } from "react-native";

const NewCard = ({navigation}) => {
  return (
    <View>
      <TextInput placeholder="What is your question?"/>
      <TextInput placeholder="What is the answer" />
      <Button title="submit" onPress={()=> navigation.goBack()}>Submit</Button>
    </View>
  )
};

export default NewCard;
