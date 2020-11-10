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
    return Object.keys(obj).sort(key => typeof obj[key] === "object" ? 1 : -1).map(key => (
      <span key={++this.keyInt}>&nbsp;&nbsp;&nbsp;&nbsp;{((typeof obj[key] === "object" && obj[key] !== null) ?
        <details><summary entries={Object.keys(obj[key]).length}>{key}</summary>{this.objToHTML(obj[key], key)}</details> :
        <span>{key + ": " + JSON.stringify(obj[key])}</span>
      )}<br/></span>))
  }

  render() {
    return (
      <div>
        <textarea
          onChange={this.updateJson}
          placeholder="Paste or type JSON here"
          value={this.state.jsonStr}
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
