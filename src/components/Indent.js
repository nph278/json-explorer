import React from "react";

const repeatNbsp = (n) => {
  return n ? <>&nbsp;&nbsp;{repeatNbsp(n - 1)}</> : <></>;
};

const Indent = (props) => {
  return <span style={{ userSelect: "none" }}>{repeatNbsp(props.deep)}</span>;
};

export default Indent;
