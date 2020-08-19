import React, { useState } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FlipCard from "react-native-flip-card";
import { deleteCard } from "../actions";
import { removeCard, resetStore } from "../utils/api";

const Quiz = ({ route, navigation }) => {
  const deck = useSelector((state) => state[route.params.id]);
  const dispatch = useDispatch()
  const [count, setCount] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [incorrect, setIncorrect] = useState(0);
  const { length } = deck.questions;
  const [flip, setFlip] = useState(false);

  const handleCorrect = () => {
    setCorrect(correct + 1);
    setCount(() => count + 1);
    setFlip(false);
  };
  const handleIncorrect = () => {
    setIncorrect(incorrect + 1);
    setCount(() => count + 1);
    setFlip(false);
  };

  const handleDeleteCard = (title, index) => {
    removeCard(title, index).then((data)=>{
      dispatch(deleteCard(title, index))
    })
    // resetStore().then(()=> console.log("Success"))
  }

  if (length === 0) {
    return (
      <View>
        <Text>No Question is available. Add question</Text>
      </View>
    );
  }

  if (incorrect + correct === length) {
    return (
      <View>
        <Text>Quiz done</Text>
        <Text>You got {((correct / length) * 100).toFixed(0)}%</Text>
        <Button
          title="reset quiz"
          onPress={() => {
            setCount(0);
            setCorrect(0);
            setIncorrect(0);
          }}
        />
      </View>
    );
  }
  return (
    // <View>
    <>
      <View>
        <Text>{`${count + 1}/${length}`}</Text>
      </View>
      <View style={{ height: 50, justifyContent: "space-between", flex: 1 }}>
        <FlipCard
          style={styles.card}
          friction={6}
          flip={flip}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          clickable={false}
        >
          <View style={styles.face}>
            <Text>Question: {deck.questions[count].question}</Text>
          </View>
          <View style={styles.back}>
            <Text>answer: {deck.questions[count].answer}</Text>
          </View>
        </FlipCard>
        <Button title="flip" onPress={() => setFlip(!flip)} />
        <View style={{ flex: 1 }}>
          <Button title="correct" onPress={handleCorrect} />
          <Button title="incorrect" onPress={handleIncorrect} />
          <Button title="delete" onPress={()=>handleDeleteCard(deck.title, count)}/>
        </View>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  card: {
    width: "100%",
  },
  face: {
    flex: 1,
    backgroundColor: "#2ecc71",
    justifyContent: "center",
    alignItems: "center",
  },
  back: {
    flex: 1,
    backgroundColor: "#f1c40f",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Quiz;
