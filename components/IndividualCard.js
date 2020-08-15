import React from "react"
import { View, Button } from "react-native";
import Card from "./Card";

const IndividualCard = ({navigation}) => {
  return (
    <View>
      <Card/>
      <View>
        <Button title="Add Card" onPress={()=> navigation.navigate("New Card")}/>
        <Button title="Start Quiz" onPress={()=> navigation.navigate("Quiz")}/>
        <Button title="Delete Deck"/>
      </View>
    </View>
  )
};

export default IndividualCard;
