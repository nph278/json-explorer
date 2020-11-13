import React, { useState } from 'react'

export default function App(props) {
  const [err, setErr] = useState("");
  const [json, setJson] = useState({});
  const [jsonStr, setJsonStr] = useState("");
  
  function updateJson(event) {
    setJsonStr(event.target.value)
    try {
      setJson(JSON.parse(event.target.value))
      setErr("")
    } catch (error) {
      setJson({})
      setErr(error.toString())
    }
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
    
  return (
        <div>
          <textarea
            onChange={updateJson}
            placeholder="Paste or type JSON here"
            value={jsonStr}
            spellCheck="false"
            autoFocus="autofocus"
          /><br />
          <p
            style={{ color: err ? "red" : "green" }}
          >
            {err ? err : "Parse succesful"}
          </p>
          <div>
            { objToHTML(json) }
          </div>
      </div>
    )
}
