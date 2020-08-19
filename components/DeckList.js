import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { View, Text, FlatList, ScrollView, Button } from "react-native";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { handleInitialData } from "../actions";

const DeckList = ({ navigation }) => {
  const decks = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleInitialData())
  }, []);

  if(Object.keys(decks).length === 0){
    return (
      <View>
        <Text>Deck List is empty</Text>
        <Button title="Add deck" onPress={()=>navigation.navigate("New Deck")}/>
      </View>
    )
  }

  return (
    <ScrollView>
      {Object.keys(decks).map((key) => (
        <Card
          key={key}
          title={decks[key].title}
          questions={decks[key].questions}
          onPress={() => navigation.navigate("Individual Card", {id: key})}
        />
      ))}
    </ScrollView>
  )
};

export default DeckList;
