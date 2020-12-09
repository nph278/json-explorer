import styled from "styled-components";

const InputBox = styled.textarea`
  font-family: inherit;
  font-size: small;
  box-sizing: border-box;
  width: 100%;
  height: 100px;
  color: rgb(247, 247, 247);
  background-color: rgb(19, 19, 19);
  border: none;
  padding: 10px;
  overflow-y: scroll;
  transition: 0.1s;
  border-left: 0px solid white;

  &::selection {
    background-color: rgb(190, 190, 190);
    color: black;
  }

  &:focus {
    outline: none;
    border-left: 3px solid white;
  }
`;

export default InputBox;
