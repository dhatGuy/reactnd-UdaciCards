import React from "react";
import styled from "styled-components";
import { View, Text, Button,TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = (props) => {
  const navigation = useNavigation()
  // console.log("props ", props);
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <View>
          {/* <Text>Hello</Text> */}
          <Text>{props.title}</Text> 
   <Text>{`${props.question.length || 0} cards`}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
