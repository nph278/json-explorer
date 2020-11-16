import React, { useState } from 'react'

export default function App(props) {
  const [json, setJson] = useState("");

  function updateJson(event) {
    setJson(event.target.value)
  }

  const sortJson = obj => (key1, key2) => (
    (typeof obj[key1] !== "object" && typeof obj[key2] !== "object") ||
    (typeof obj[key1] === "object" && typeof obj[key2] === "object")
  ) ?
    (key1 > key2 ? 1 : -1) :
    (typeof obj[key1] === "object" ? 1 : -1)

  let keyInt = 0

  function objToHTML(obj) {
    return Object.keys(obj)
      .sort(sortJson(obj))
      .map(key => (
        <span key={++keyInt}>
          &nbsp;&nbsp;&nbsp;&nbsp;
          {
            ((typeof obj[key] === "object" && obj[key] !== null) ?
              <details>
                <summary
                  entries={Object.keys(obj[key]).length}
                  isarr={Array.isArray(obj[key]).toString()}
                >
                  {key}
                </summary>
                {objToHTML(obj[key], key)}
              </details> :
              <span>
                {key + ": "}
                <span
                  typeof={typeof obj[key]}
                  val={obj[key] === null ? null : obj[key].toString()}
                >
                  {JSON.stringify(obj[key])}
                </span>
              </span>
            )
          }
          <br />
        </span>
      ))
  }

  let err
  let parsed
  try {
    parsed = JSON.parse(json)
  } catch (e) {
    err = e.toString()
    parsed = {}
    console.log("err!")
  }

  return (
    <div>
      <textarea
        onChange={updateJson}
        placeholder="Paste or type JSON here"
        value={json}
        spellCheck="false"
        autoFocus="autofocus"
      /><br />
      <p
        style={{ color: err ? "red" : "green" }}
      >
        {err ? err : "Parse succesful"}
      </p>
      <div>
        {objToHTML(parsed)}
      </div>
    </div>
  )
}
