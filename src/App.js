import React, { useState } from "react";
import Fold from "./components/Fold";
import Pair from "./components/Pair";
import InputBox from "./components/InputBox";

const isObject = (obj) => {
  return typeof obj === "object" && obj !== null;
};

export default function App(props) {
  const [json, setJson] = useState("");
  const [url, setUrl] = useState("");

  function updateJson(event) {
    setJson(event.target.value);
  }

  const sortJson = (obj) => (key1, key2) =>
    (!isObject(obj[key1]) && isObject(obj[key1])) ||
    (isObject(obj[key1]) && !isObject(obj[key1]))
      ? key1 > key2
        ? 1
        : -1
      : typeof obj[key1] === "object"
      ? 1
      : -1;

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
      File:{" "}
      <input
        type="file"
        onChange={(e) => e.target.files?.item(0).text().then(setJson)}
      />
      <br />
      URL:{" "}
      <input
        type="url"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          backgroundColor: "gray",
          border: "none",
          marginRight: "3px",
        }}
      />
      <button
        onClick={() =>
          fetch(url)
            .then((a) => a.text())
            .then(setJson)
        }
        style={{
          backgroundColor: "gray",
          border: "black",
        }}
      >
        Get
      </button>
      <InputBox
        onChange={updateJson}
        placeholder="Paste or type JSON here"
        value={json}
        spellCheck="false"
        autoFocus="autofocus"
      />
      <br />
      <p style={{ color: err ? "red" : "green" }}>
        {err ? err : "Parse succesful"}
      </p>
      <div>{objToHTML(parsed, 0)}</div>
    </div>
  );
}
