import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      jsonStr: "",
      err:""
    }
    this.updateJson = this.updateJson.bind(this)
    this.objToHTML = this.objToHTML.bind(this)
  }
  
  updateJson(event) {
    this.setState({
      jsonStr: event.target.value
    })
    try {
      this.setState({
        json: JSON.parse(event.target.value),
        err:""
      })
    } catch (err) {
      this.setState({
        json: {},
        err: String(err)
      })
    }
  }

  keyInt = 0

  objToHTML(obj) {
    return Object.keys(obj)
      .sort((key1, key2) => typeof obj[key1] === typeof obj[key2] ? ( key1 > key2 ? 1 : -1 ) : (typeof obj[key1] === "object" ? 1 : -1))
      .map(key => (
        <span key={++this.keyInt}>&nbsp;&nbsp;&nbsp;&nbsp;{((typeof obj[key] === "object" && obj[key] !== null) ?
          <details>
            <summary
              entries={Object.keys(obj[key]).length}
              isarr={Array.isArray(obj[key]).toString()}
            >
              {key}
            </summary>
            {this.objToHTML(obj[key], key)}
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
      )}<br/></span>))
  }

  render() {
    return (
      <div>
        <textarea
          onChange={this.updateJson}
          placeholder="Paste or type JSON here"
          value={this.state.jsonStr}
          spellCheck="false"
          autoFocus="autofocus"
        /><br />
        <p style={{ color: this.state.err ? "red" : "green" }}>{this.state.err ? this.state.err : "Parse succesful"}</p>
        <div>
          { this.objToHTML(this.state.json) }
        </div>
      </div>
    )
  }
}

export default App;
