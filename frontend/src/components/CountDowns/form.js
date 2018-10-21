import React from 'react';
import { Link } from 'react-router-dom';

import style from './index.styl';

export default class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    let t = new Date();
    let min_date = `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}T${t.getHours()}:${t.getMinutes()}:00.0`;
    return(
      <form>
        {this.render_errors()}
        <div className={style.field}>
          <input onChange={this.update_value.bind(this)} type='text' name='name' placeholder='Countdown for...' />
        </div>

        <div className={style.field}>
          <input
            onChange={this.update_value.bind(this)}
            type='datetime-local'
            name='date'
            placeholder='Event Date and Time'
            min={min_date}
          />
        </div>

        <div className={style.field}>
          <textarea onChange={this.update_value.bind(this)} name='description' placeholder='Description'></textarea>
        </div>

        <div className={style.buttons}>
          <button onClick={this.save.bind(this)} type='button' className={style.button}>Save</button>
          <Link to='/' className={style.cancel}>Cancel</Link>
        </div>
      </form>
    );
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

  date_string(t) {
    return `${t.getFullYear()}-${t.getMonth()+1}-${t.getDate()}T${t.getHours()}:${t.getMinutes()}:00.0`;
  }

  update_value(e) {
    var field  = e.target,
        attr   = field.getAttribute('name'),
        val    = field.value,
        update = {};
    update[attr] = val;

    if(attr == 'date') {
      var dt = new Date(val),
          today = new Date();

      if(dt < today) {
        today.setDate(today.getDate() + 1);
        var dt_str = this.date_string(today),
            err = {};
        field.value = dt_str;
        update[attr] = dt_str;
        err[attr] = "Must be a future date"
        update.errors = err;
      } else {
        update.errors = null;
      }
    }

    this.setState(update);
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