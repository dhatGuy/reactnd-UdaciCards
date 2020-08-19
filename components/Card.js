import React from "react";
import styled from "styled-components";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Card = (props) => {
  const navigation = useNavigation();
  return (
    <View>
      <TouchableOpacity onPress={props.onPress}>
        <View>
          <Text>{props.title}</Text>
          <Text>
            {props.questions.length >= 2
              ? `${props.questions.length} Cards`
              : `${props.questions.length} Card`}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Card;
