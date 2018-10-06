import React from 'react';
import Timer from '@components/Timer';

import style from './index.styl';


export default class Item extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.data;
  }

  render() {
    var when = this.state.when,
        date = new Date(when.year, (when.month-1), when.day, when.hour, when.minute);

    return(
      <div className={style.item}>
        <div className={style.title}>{this.state.title}</div>
        <div className={style.date}>TBA</div>
        <Timer when={date} />
      </div>
    );
  }
}
