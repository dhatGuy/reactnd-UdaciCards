import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { View, Text, FlatList, ScrollView } from "react-native";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { handleInitialData } from "../actions";

const DeckList = ({ navigation }) => {
  const decks = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(handleInitialData())
  }, []);

  return (
    <ScrollView>
      {Object.keys(decks).map((key) => (
        <Card
          key={key}
          title={decks[key].title}
          question={decks[key].questions}
          onPress={() => navigation.navigate("Individual Card", {id: key})}
        />
      ))}
    </ScrollView>
  )
};

export default DeckList;
