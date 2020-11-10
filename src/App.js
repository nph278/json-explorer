import React, { Component } from 'react'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      json: {},
      err:""
    }
    this.updateJson = this.updateJson.bind(this)
    this.objToHTML = this.objToHTML.bind(this)
  }
  
  updateJson(event) {
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

  objToHTML(obj, name) {
    return Object.keys(obj).sort(key => typeof obj[key] === "object" ? 1 : -1).map(key => (
      <span>&nbsp;&nbsp;{((typeof obj[key] === "object" && obj[key] !== null) ?
        <details><summary entries={Object.keys(obj[key]).length}>{key}</summary>{this.objToHTML(obj[key], key)}</details> :
        <span>{key + ": " + JSON.stringify(obj[key])}</span>
      )}<br/></span>))
  }

  render() {
    return (
      <div>
        <textarea onChange={this.updateJson} placeholder="Paste or type JSON here" /><br />
        <p style={{ color: this.state.err ? "red" : "green" }}>{this.state.err ? this.state.err : "Parse succesful"}</p>
        <div>
          { this.objToHTML(this.state.json, "object") }
        </div>
      </div>
    )
  }
}

export default App;
