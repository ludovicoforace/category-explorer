import React from 'react';
import styled from 'styled-components';
import { ScaleLoader } from 'react-spinners';
import { colors } from './colors';

const DivContainer = styled.div`
width: 1040px;
padding: 0 20px;
@media only screen and (max-width: 1060px) {
  width: 100%;
}
`;

export const Container = (props) =>
  <DivContainer className="pend">{props.children}</DivContainer>;

const DivCoolInput = styled.div`
font-size: 22px;
`;

const DivTextInput = styled(DivCoolInput) `
input[type="text"] {
  border: solid 1px #ccc;
  font-size: 22px;
  padding: 10px;
  &.error {
    background-color: #ffe5e5;
    border-color: red;
  }
}
`;

export const TextInput = (props) => (
  <DivTextInput className="cool-input">
    <input type="text" {...props} />
  </DivTextInput>
);

const DivLoading = styled.div`
text-align: center;
`;

export const Loading = () =>
  <DivLoading>
    <ScaleLoader color={colors.main} />
  </DivLoading>;
