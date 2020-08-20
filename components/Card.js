import React from "react";
import styled from "styled-components/native";

const Container = styled.TouchableHighlight`
  border: 1px solid tomato;
  border-radius: 5px;
  justify-content: center;
  align-items: center;
  width: 80%;
  margin: 10px auto;
  height: 100px;
`;

const CardContainer = styled.View`
  width: 100%;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 26px;
`;

const TotalCard = styled.Text``;

const Card = (props) => {
  return (
    <Container underlayColor="#fff" onPress={props.onPress}>
      <CardContainer>
        <Title>{props.title}</Title>
        <TotalCard>
          {props.questions.length >= 2
            ? `${props.questions.length} Cards`
            : `${props.questions.length} Card`}
        </TotalCard>
      </CardContainer>
    </Container>
  );
};

export default Card;
