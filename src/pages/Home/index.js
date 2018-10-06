import React from 'react';
import Code from '@components/Code';
import { HMR } from '@pwa/preset-react';
import Window from '@components/Window';
import Item from '@components/CountDowns/item';
import style from './index.styl';

import data from '../../lib/data.json';

function Home() {
  return (
    <div>
      <h1>Count Downs</h1>
      <div className={style.list}>
        { data.map( (item, index) => {
          return <Item key={item.slug} data={item} index={index} />
        } ) }
      </div>
    </div>
  );
}

export default HMR(Home, module);
