import React, { useState } from "react";
import Fold from "./components/Fold";
import Pair from "./components/Pair";

export default function App(props) {
  const [json, setJson] = useState("");

  function updateJson(event) {
    setJson(event.target.value);
  }

  const sortJson = (obj) => (key1, key2) =>
    (typeof obj[key1] !== "object" && typeof obj[key2] !== "object") ||
    (typeof obj[key1] === "object" && typeof obj[key2] === "object")
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
      .map((key) => (
        <span key={++keyInt}>
          {typeof obj[key] === "object" && obj[key] !== null ? (
            <Fold
              entries={Object.keys(obj[key]).length}
              isarr={Array.isArray(obj[key]).toString()}
              name={key}
              indent={indent}
              array={Array.isArray(obj[key])}
            >
              {objToHTML(obj[key], indent + 1)}
            </Fold>
          ) : (
            <Pair name={key} value={obj[key]} indent={indent} />
          )}
        </span>
      ));
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
      <input
        type="file"
        onChange={(e) => e.target.files?.item(0).text().then(setJson)}
      />
      <textarea
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
