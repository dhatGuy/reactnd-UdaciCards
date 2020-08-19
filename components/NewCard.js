import React, { useState } from "react";
import { View, TextInput, Button } from "react-native";
import { addCardToDeck } from "../utils/api";
import { useDispatch } from "react-redux";
import { addCard } from "../actions";

const NewCard = ({route, navigation }) => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState("")
  const dispatch = useDispatch()

  const onSubmit = () => {
    const title = route.params.title
    addCardToDeck(title, {
      question,
      answer,
    }).then(()=> {
      dispatch(addCard(title, {question, answer}))
    })
    setQuestion("")
    setAnswer("")
    navigation.goBack()
  }
  
  return (
    <View>
      <TextInput placeholder="What is your question?" onChangeText={que=> setQuestion(que)} value={question} />
      <TextInput placeholder="What is the answer" onChangeText={ans=> setAnswer(ans)} value={answer}/>
      <Button title="submit" 
      disabled={question === "" || answer === ""}
      onPress={onSubmit}>
        Submit
      </Button>
    </View>
  );
};

export default NewCard;
