import React from 'react';
import { HMR } from '@pwa/preset-react';
import { Link } from 'react-router-dom';
import style from './index.styl';

function CountDownShow() {
  return (
    <div>
      <h2>Show that shit</h2>
      <p>Not Yet</p>
    </div>
  )
}

export default HMR(CountDownShow, module);
