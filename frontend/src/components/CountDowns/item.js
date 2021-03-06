import React from 'react';
import { Link } from 'react-router-dom';
import Timer from '@components/Timer';

import style from './index.styl';


export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  render() {
    var when = this.state.when,
        date = new Date(when.year, (when.month-1), when.day, when.hour, when.minute),
        path = `/${this.state.slug}`

    return(
      <Link
        to={{
          pathname: path,
          state: this.state
        }}
        className={style.item}
      >
        <div className={style.title}>{this.state.name}</div>
        <div className={style.date}>{this.format(date)}</div>
        <Timer size="normal" when={date} />
      </Link>
    );
  }

  format(date) {
    var month, day, year;
    month = date.getMonth() + 1;
    day = date.getDate();
    year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
}
