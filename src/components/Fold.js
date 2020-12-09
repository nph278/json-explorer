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
          {props.name}
        </span>
      </FoldStyle>
      <br />
      <div className="rest" style={{ display: open ? "inline" : "none" }}>
        {props.children}
      </div>
    </>
  );
};

export default Fold;
