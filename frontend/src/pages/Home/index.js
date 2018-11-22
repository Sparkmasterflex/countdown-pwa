import React from 'react';
import { HMR } from '@pwa/preset-react';
import Window from '@components/Window';
import CountDowns from '@components/CountDowns';
// import Item from '@components/CountDowns/item';
import style from './index.styl';

import data from '../../lib/data.json';

function Home() {
  return (
    <div className={style.container}>
      <h1>Count Downs</h1>
      <CountDowns />
    </div>
  );
}

export default HMR(Home, module);
