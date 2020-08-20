import React, { useState } from "react";
import { View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FlipCard from "react-native-flip-card";
import { deleteCard } from "../actions";
import { removeCard } from "../utils/api";
import {
  cancelAllNotifications,
  setNotification,
} from "../utils/notifications";
import { Text, Button } from "react-native-paper";
import styled from "styled-components/native";

const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const QuizWrapper = styled.View`
  flex: 1;
  width: 90%;
  margin: 0 auto;
`;

const QueAns = styled.Text`
  font-size: 30px;
`;

const Score = styled.View`
  justify-content: center;
  align-items: center;
`;

const Face = styled.View`
  flex: 1;
  background-color: rgb(255, 255, 255);
  justify-content: center;
  align-items: center;
  border: 2px solid tomato;
  border-radius: 10px;
`;

const Back = styled.View`
  flex: 1;
  background-color: #f1c40f;
  justify-content: center;
  align-items: center;
  border: 2px solid tomato;
  border-radius: 10px;
`;

const BtnWrapper = styled.View`
  flex: 1;
  margin-top: 10px;
`;

const Quiz = ({ route, navigation }) => {
  const deck = useSelector((state) => state[route.params.id]);
  const dispatch = useDispatch();
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
    removeCard(title, index).then(() => {
      dispatch(deleteCard(title, index));
    });
  };

  const reset = () => {
    setCount(0);
    setCorrect(0);
    setIncorrect(0);
    cancelAllNotifications().then(setNotification());
  };

  if (length === 0) {
    return (
      <Wrapper>
        <Text>This deck is empty.</Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate("New Card", { id: deck.title })}
        >
          Add card
        </Button>
      </Wrapper>
    );
  }

  if (incorrect + correct === length) {
    return (
      <Wrapper>
        <Text style={{ fontSize: 23 }}>Quiz done</Text>
        <Text style={{ fontSize: 25 }}>
          You got {((correct / length) * 100).toFixed(0)}%
        </Text>
        <Button mode="contained" onPress={reset}>
          reset quiz
        </Button>
      </Wrapper>
    );
  }
  return (
    <QuizWrapper>
      <Score>
        <Text style={{ fontSize: 20 }}>{`${count + 1}/${length}`}</Text>
      </Score>
      <View style={{ height: 50, justifyContent: "space-between", flex: 1 }}>
        <FlipCard
          style={{ width: "100%", marginBottom: 10 }}
          friction={6}
          flip={flip}
          perspective={1000}
          flipHorizontal={true}
          flipVertical={false}
          clickable={false}
        >
          <Face>
            <QueAns>{deck.questions[count].question}</QueAns>
          </Face>
          <Back>
            <QueAns>{deck.questions[count].answer}</QueAns>
          </Back>
        </FlipCard>
        <Button mode="contained" onPress={() => setFlip(!flip)}>
          flip
        </Button>
        <BtnWrapper>
          <Button
            style={{ marginBottom: 10 }}
            mode="outlined"
            onPress={handleCorrect}
          >
            Correct
          </Button>
          <Button
            style={{ marginBottom: 10 }}
            mode="outlined"
            onPress={handleIncorrect}
          >
            Incorrect
          </Button>
          <Button
            style={{ marginBottom: 10 }}
            onPress={() => handleDeleteCard(deck.title, count)}
          >
            delete card
          </Button>
        </BtnWrapper>
      </View>
    </QuizWrapper>
  );
};
export default Quiz;
