import React from 'react';
import style from './index.styl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGrimace } from '@fortawesome/free-solid-svg-icons'

export default class GooseEgg extends React.Component {
  render() {
    return(
      <div className={style.gooseegg_container}>
        <FontAwesomeIcon className={style.gooseegg} icon={faGrimace} />
        <p>I got nothing...</p>
      </div>
    )
  }
}