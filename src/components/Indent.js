import React from "react";

const repeatNbsp = (n) => {
  return n ? <>&nbsp;&nbsp;{repeatNbsp(n - 1)}</> : <></>;
};

const Indent = (props) => {
  return <>{repeatNbsp(props.deep)}</>;
};

export default Indent;
