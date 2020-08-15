import React from "react"
import styled from "styled-components";
import {View, Text} from "react-native";
import Card from "./Card";

const DeckList = ({navigation}) => {
  return (
    <View>
      <Card onPress={()=>(navigation.navigate("Individual Card"))}/>
    </View>
  )
};

export default DeckList;
