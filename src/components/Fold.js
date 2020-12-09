import React, { useState } from "react";
import Indent from "./Indent";

const Fold = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="fold" onClick={() => setOpen(!open)}>
        <Indent deep={props.indent} />
        <span style={{ color: "blue" }}>{open ? "V" : ">"}</span>{" "}
        <span style={{ color: props.array ? "yellow" : "white" }}>
          {props.name}
        </span>
      </div>
      <br />
      <div className="rest" style={{ display: open ? "inline" : "none" }}>
        {props.children}
      </div>
    </>
  );
};

export default Fold;
