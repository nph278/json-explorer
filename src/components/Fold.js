import React, { useState } from "react";
import Indent from "./Indent";
import styled from "styled-components";

const FoldStyle = styled.div`
  display: inline;
  cursor: pointer;
  user-select: none;
`;

const Fold = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <FoldStyle onClick={() => setOpen(!open)}>
        <Indent deep={props.indent} />
        <span style={{ color: "blue" }}>{open ? "v" : ">"}</span>{" "}
        <span style={{ color: props.array ? "yellow" : "white" }}>
          <span style={{ color: props.entries ? "green" : "red" }}>
            [{props.entries}]
          </span>
          {" " + props.name}
        </span>
      </FoldStyle>
      <br />
      <div style={{ display: open ? "inline" : "none" }}>{props.children}</div>
    </>
  );
};

export default Fold;
