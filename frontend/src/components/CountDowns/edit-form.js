import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import Form from '@components/CountDowns/form';

import style from './index.styl';

export default class EditForm extends React.Component {
  constructor(props) {
    super(props)
    let cd_attrs = props.countdown;
    cd_attrs.date = new Date(cd_attrs.happens_at);
    this.state = {
      countdown: cd_attrs,
      errors: {}
    }
  }

  render() {
    let show_path = `/${this.state.countdown.slug}`;
    if(this.state.updated) {
      return(<Redirect to={show_path} />);
    } else {
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
              onClick={this.update.bind(this)}
              type='button'
              className={style.button}
            >
              Update
            </button>
            <Link to={show_path} className={style.cancel}>Cancel</Link>
          </div>
        </form>
      )
    }
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
  update(e) {
    let url = `http://localhost:5000/${this.state.slug}/update`;
    console.log(url)

    fetch(url, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(this.state.countdown)
    })
    .then(resp => resp.json())
    .then(data => {
      if(data.fail) {
        alert('something happened');
      } else {
        data.date = new Date(data.happens_at);
        this.setState({
          countdown: data,
          updated: true
        });
      }
    })
  }
}
