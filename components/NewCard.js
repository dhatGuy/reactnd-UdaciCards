import React, { useState } from "react";
import { addCardToDeck } from "../utils/api";
import { useDispatch } from "react-redux";
import { addCard } from "../actions";
import styled from "styled-components/native";
import { Button, TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

const Container = styled.View`
  justify-content: center;
  margin: 0 auto;
  margin-top: 10px;
  width: 95%;
`;

const NewCard = ({ route, navigation }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const dispatch = useDispatch();
  const theme = useTheme();

  const onSubmit = () => {
    const title = route.params.title;
    addCardToDeck(title, {
      question,
      answer,
    }).then(() => {
      dispatch(addCard(title, { question, answer }));
    });
    setQuestion("");
    setAnswer("");
    navigation.goBack();
  };

  return (
    <Container>
      <TextInput
        mode="outlined"
        placeholder="What is your question?"
        onChangeText={(que) => setQuestion(que)}
        value={question}
      />
      <TextInput
        mode="outlined"
        placeholder="What is the answer"
        onChangeText={(ans) => setAnswer(ans)}
        value={answer}
      />
      <Button
        disabled={question === "" || answer === ""}
        onPress={onSubmit}
        style={{ marginTop: 10 }}
        // dark={true}
        mode="contained"
      >
        Submit
      </Button>
    </Container>
  );
};

export default NewCard;
