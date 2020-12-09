import React from "react";
import Indent from "./Indent";

const typeColors = {
  number: "yellow",
  string: "purple",
  object: "gray",
  boolean: "blue",
};

const Fold = (props) => {
  return (
    <>
      <Indent deep={props.indent} />
      {props.name}:{" "}
      <span
        style={{
          color:
            typeof props.value === "boolean"
              ? ["red", "green"][+props.value]
              : typeColors[typeof props.value],
        }}
      >
        {JSON.stringify(props.value)}
      </span>
      <br />
    </>
  );
};

export default Fold;
