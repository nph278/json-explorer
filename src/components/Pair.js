import React from "react";
import Indent from "./Indent";
import styled from "styled-components";

const SelectAll = styled.span`
  user-select: all;
`;

const SelectNone = styled.span`
  user-select: none;
`;

const typeColors = {
  number: "yellow",
  string: "purple",
  object: "gray",
  boolean: "blue",
};

const Pair = (props) => {
  return (
    <>
      <Indent deep={props.indent} />
      <SelectAll>{props.name}</SelectAll>
      <SelectNone>: </SelectNone>
      <SelectAll
        style={{
          color:
            typeof props.value === "boolean"
              ? ["red", "green"][+props.value]
              : typeColors[typeof props.value],
        }}
      >
        {JSON.stringify(props.value)}
      </SelectAll>
      <br />
    </>
  );
};

export default Pair;
