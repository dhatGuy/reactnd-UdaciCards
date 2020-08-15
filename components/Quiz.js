import React from "react"
import { View, Text, Button } from "react-native";

const Quiz = (props) => {
  return (
    <View>
      <View>
        <Text>What is an object?</Text>
        <Button title="flip">Answer(flip)</Button>
      </View>
      <View>
        <Button title="correct">Correct</Button>
        <Button title="incorrect">Incorrect</Button>
      </View>
    </View>
  )
};

export default Quiz;
