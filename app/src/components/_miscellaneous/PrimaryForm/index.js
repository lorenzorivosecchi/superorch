import React from "react";
import styled from "styled-components/macro";

const StyledWrap = styled.div`
  padding: 10px;
`;

const StyledTitle = styled.h1`
  text-align: center;
  font-size: 25px;
  font-weight: bold;
`;

function PrimaryForm(props) {
  return (
    <StyledWrap className={props.className}>
      <StyledTitle>{props.title}</StyledTitle>
      {props.children}
    </StyledWrap>
  );
}

export default PrimaryForm;

//
//  Export Form Styles
//

export const Field = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
`;

export const Input = styled.input`
  margin-top: 5px;
`;

export const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  cursor: pointer;
`;

export const RiskyButton = styled(Button)`
  background: red;
  color: white;
`;

export const SubmitButton = styled(Button)`
  background: black;
  color: white;
`;

export const Error = styled.p`
  margin-top: 5px;
  color: red;
`;

export const Textarea = styled.textarea`
  margin-top: 5px;
  min-height: 50px;
`;
