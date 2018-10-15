import React from 'react';
import Timer from '@components/Timer';

import style from './index.styl';


export default class Show extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countdown: null,
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/countdowns/${this.props.slug}`)
      .then(response => response.json())
      .then(data => this.setState({countdown: data}));
  }

  render() {
    console.log(this.state.countdown)
    // var when = this.state.when,
    //     date = new Date(when.year, (when.month-1), when.day, when.hour, when.minute);

    return(
      <div>
        Give me a second, would ya?!
      </div>
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
