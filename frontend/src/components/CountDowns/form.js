import React from 'react';
import { Link } from 'react-router-dom';

import style from './index.styl';

export default class Form extends React.Component {

  render() {
    let cd = this.props.countdown
    let t = new Date();
    let tmrw = cd['date'];
    return(
      <div>
        <div className={style.field}>
          <input
            onChange={this.update_value.bind(this)}
            type='text'
            name='name'
            defaultValue={cd['name']}
            placeholder='Countdown for...'
          />
        </div>

        <div className={style.field}>
          <input
            onChange={this.update_value.bind(this)}
            type='datetime-local'
            name='date'
            defaultValue={this.date_string(tmrw)}
            min={this.date_string(t)}
          />
        </div>

        <div className={style.field}>
          <textarea
            onChange={this.update_value.bind(this)}
            name='description'
            placeholder='Description'
            defaultValue={cd['description']}
          ></textarea>
        </div>

      </div>
    );
  }

  date_string(t) {
    let format = (val) => {
      return val.toString().length > 1 ? val : `0${val}`;
    }
    return `${t.getFullYear()}-${format(t.getMonth()+1)}-${format(t.getDate())}T${t.getHours()}:${format(t.getMinutes())}:00.0`;
  }

  validate_date(val) {
    var dt = new Date(val);
    if(dt < new Date())
      return "Must be a future date"
  }

  //====================\\
  //      EVENTS
  //====================\\
  update_value(e) {
    var field  = e.target,
        attr   = field.getAttribute('name'),
        val    = field.value,
        error;

    if(val == "" || val == null)
      error = "Can't be blank"

    if(attr == 'date') {
      error = this.validate_date(val);
      val = new Date(val)
    }

    if(error == null)
      this.props.update(attr, val);
    this.props.append_error(attr, error)
  }

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