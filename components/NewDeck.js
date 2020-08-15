import React from "react"
import { View, Text, Button, TextInput } from "react-native";

const NewDeck = ({navigation}) => {
  return (
    <View>
      <Text>What is your deck title?</Text>
      <TextInput/>
      <Button title="submit" onPress={()=>{
        navigation.navigate("Home")
      }}>Submit</Button>
    </View>
  )
};

export default NewDeck;
