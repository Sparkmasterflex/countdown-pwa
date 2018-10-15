import React from 'react';
import Calculate from '../../lib/Calculate'
import style from './index.styl';

export default class Timer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      now: new Date()
    }
  }

  componentDidMount() {
    this.interval = setInterval(() => this.setState({ now: new Date() }), 1000 );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var diff_obj = Calculate(this.props.when, this.state.now),
        klass = style.timer;

    switch(this.props.size) {
      case 'large':
        klass += ` ${style.large}`;
        break;
      case 'normal':
        klass += ` ${style.normal}`;
        break;
    }

    return(
      <div className={klass}>
        <div className={style.day}>{diff_obj.days}</div>
        <div className={style.hour}>{diff_obj.hours}</div>
        <div className={style.minute}>{diff_obj.minutes}</div>
        <div className={style.second}>{diff_obj.seconds}</div>
      </div>
    );
  }
}
