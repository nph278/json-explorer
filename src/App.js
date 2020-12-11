import React, { useState } from "react";
import Fold from "./components/Fold";
import Pair from "./components/Pair";
import InputBox from "./components/InputBox";

const isObject = (obj) => {
  return typeof obj === "object" && obj !== null;
};

const sortJson = (obj) => (key1, key2) =>
  (!isObject(obj[key1]) && !isObject(obj[key2])) ||
  (isObject(obj[key1]) && isObject(obj[key2]))
    ? key1 > key2
      ? 1
      : -1
    : isObject(obj[key1])
    ? 1
    : -1;

const App = () => {
  const [json, setJson] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function updateJson(event) {
    setJson(event.target.value);
  }

  let keyInt = 0;

  function objToHTML(obj, indent) {
    return Object.keys(obj)
      .sort(sortJson(obj))
      .map((key) => {
        keyInt++;
        return (
          <div style={{ display: "inline" }} key={keyInt}>
            {typeof obj[key] === "object" && obj[key] !== null ? (
              <Fold
                entries={Object.keys(obj[key]).length}
                name={key}
                indent={indent}
                array={Array.isArray(obj[key])}
              >
                {objToHTML(obj[key], indent + 1)}
              </Fold>
            ) : (
              <Pair name={key} value={obj[key]} indent={indent} />
            )}
          </div>
        );
      });
  }

  let err;
  let parsed;
  try {
    parsed = JSON.parse(json);
  } catch (e) {
    err = e.toString();
    parsed = {};
  }

  return (
    <div>
      <label
        htmlFor="upload-file"
        style={{
          cursor: "pointer",
          padding: "0 5px",
          userSelect: "none",
        }}
      >
        {">"} From file
      </label>
      <input
        type="file"
        onChange={(e) => {
          setIsLoading(true);
          e.target.files
            ?.item(0)
            .text()
            .then(setJson)
            .then(() => setIsLoading(false));
        }}
        style={{ opacity: 0, position: "absolute", zIndex: -1 }}
        id="upload-file"
      />
      <br />
      <span
        onClick={() => {
          setIsLoading(true);
          fetch(prompt("Enter URL:"))
            .then((a) => a.text())
            .then(setJson)
            .then(() => setIsLoading(false));
        }}
        style={{
          cursor: "pointer",
          padding: "0 5px",
          userSelect: "none",
        }}
      >
        {">"} From link
      </span>
      <br />
      <br />
      <InputBox
        onChange={updateJson}
        placeholder="Paste or type JSON here"
        value={json}
        spellCheck="false"
        autoFocus="autofocus"
      />
      <br />
      <p style={{ color: err ? "red" : "green" }}>
        {isLoading ? "Loading..." : err ? err : "Parse succesful"}
      </p>
      <div>{objToHTML(parsed, 0)}</div>
    </div>
  );
};

export default App;
