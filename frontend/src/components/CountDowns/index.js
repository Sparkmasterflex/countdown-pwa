import React from 'react';
import Item from '@components/CountDowns/item';

import style from './index.styl';

export default class CountDowns extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
    };
  }

  componentDidMount() {
    fetch("http://localhost:5000")
      .then(response => response.json())
      .then(data => this.setState({data}));
  }

  render() {
    return (
      <div className={style.list}>
        {this.display_loading()}
        {this.display_data()}
      </div>
    )
  }

  display_loading() {
    if(this.state.data) {
      return "";
    } else {
      return <p>And now for something... completely different!</p>;
    }
  }

  display_data() {
    if(this.state.data) {
      return this.state.data.map( (item, index) => {
        return <Item key={item.slug} data={item} index={index} />
      } );
    } else {
      return "";
    }
  }
}