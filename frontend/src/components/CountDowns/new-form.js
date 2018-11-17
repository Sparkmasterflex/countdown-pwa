import React from 'react';
import { Link } from 'react-router-dom';

import Form from '@components/CountDowns/form';

import style from './index.styl';

export default class NewForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countdown: this.countdown_defaults(),
      errors: {}
    }
  }

  render() {
    return(
      <form>
        {this.render_errors()}
        <Form
          countdown={this.state.countdown || {}}
          append_error={this.append_error.bind(this)}
          update={this.update_attributes.bind(this)}
        />
        <div className={style.buttons}>
          <button
            onClick={this.save.bind(this)}
            type='button'
            className={style.button}
          >
            Create
          </button>
          <Link to='/' className={style.cancel}>Cancel</Link>
        </div>
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
            return(<li className={style.error} key={k}>
              <strong className={style.strong}>{attr}:</strong>
              {errors[attr]}
            </li>)
          }) }
        </ul>
      )
    } else {
      return "";
    }
  }

  countdown_defaults() {
    var t = new Date(),
        tmrw = t.setDate(t.getDate() + 1);
    return {
      name: "",
      description: "",
      date: new Date(tmrw)
    }
  }

  append_error(attr, msg) {
    var errors = this.state.errors || {};
    if(msg)
      errors[attr] = msg;
    else
      delete errors[attr]

    this.setState({errors: errors})
  }

  update_attributes(attr, value) {
    var countdown = this.state.countdown;
    countdown[attr] = value;
    this.setState(countdown: countdown);
  }

  //====================\\
  //      EVENTS
  //====================\\
  save(e) {
    fetch("http://localhost:5000/create", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(this.state.countdown)
    })
    .then(resp => resp.json())
    .then(data => {

    })
  }
}
