import React from 'react';
import { HMR } from '@pwa/preset-react';
import { Link } from 'react-router-dom';
import NewForm from '@components/CountDowns/new-form';
import style from '../index.styl';

function CountDownNew() {
  return (
    <div>
      <h1 className={style.h1}>New Count Down</h1>
      <NewForm />
    </div>
  )
}

export default HMR(CountDownNew, module);
