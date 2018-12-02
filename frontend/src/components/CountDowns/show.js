import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'

import Timer    from '@components/Timer';
import GooseEgg from '@components/App/goose-egg';

import json from '../../lib/data.json';

import style from './index.styl';


export default class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.countdown
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/${this.props.slug}`)
      .then(response => response.json())
      .then(data => this.setState( {data} ));
  }

  render() {
    return(
      <div>
        {this.display_loading()}
        {this.render_countdown()}
      </div>
    );
  }

  display_loading() {
    if(this.state.data) {
      return "";
    } else {
      return <p>And now for something... completely different!</p>;
    }
  }

  render_countdown() {
    if(this.state.deleted) {
      return(<Redirect to='/' />);
    }

    if(this.state.data) {
      var data = this.state.data,
          when = data.when,
          date = new Date(when.year, (when.month-1), when.day, when.hour, when.minute),
          edit_path = `/${data.slug}/edit`;

      return(
        <div className={style.show}>
          <h1>
            {data.name}
            <Link
              to={{
                pathname: edit_path,
                state: data
              }}
            ><FontAwesomeIcon icon={faEdit} /></Link>
            <a className={style.delete} href="#delete" onClick={this.delete.bind(this)}><FontAwesomeIcon icon={faTrash} /></a>
          </h1>
          <p>{data.description}</p>
          <Timer size="large" when={date} />
          <div className={style.altdate}>{this.format(date)}</div>
        </div>
      );
    } else {
      return <GooseEgg />;
    }
  }

  format(date) {
    var month, day, year;
    month = json.months[date.getMonth()];
    day = date.getDate();
    year = date.getFullYear();

    return `${month} ${day}, ${year}`;
  }

  delete(e) {
    e.preventDefault();
    var cd = this.state.data;
    let msg = `Deleting "${cd.name}". Are you sure?`;
    let url = `http://localhost:5000/${cd.slug}/delete`;

    if(confirm(msg)) {
      fetch(url, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
      .then(resp => resp.json())
      .then(data => { this.setState({ deleted: data.deleted }) })
    }
  }
}
