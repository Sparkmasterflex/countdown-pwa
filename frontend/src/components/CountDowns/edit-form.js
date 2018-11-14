import React from 'react';
import { Link } from 'react-router-dom';

import style from './index.styl';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    return(
      <form>
        {this.render_errors()}
      </form>
    )
  }

  render_errors() {
    if(this.state.errors) {
      var errors = this.state.errors;
      return(
        <ul className={style.errors}>

          { Object.keys(errors).map( (attr) => {
            var k = `error-${attr}`;
            return(<li key={k}>{errors[attr]}</li>)
          }) }
        </ul>
      )
    } else {
      return "";
    }
  }

  set_errors(key, msg) {
    var errors = {};
    errors[key] = msg;
    this.setState({errors: errors})
  }

  //====================\\
  //      EVENTS
  //====================\\
  save(e) {
    fetch("http://localhost:5000/countdown/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(this.state)
    }).then(resp => resp.json())
  }
}
