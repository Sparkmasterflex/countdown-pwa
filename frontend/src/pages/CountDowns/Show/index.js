import React from 'react';
import { HMR } from '@pwa/preset-react';
import style from '../index.styl';
import CountDown from '@components/CountDowns/show';

function CountDownShow(page_obj) {
  return (
    <CountDown slug={page_obj.match.params.slug} />
  )
}

export default HMR(CountDownShow, module);
