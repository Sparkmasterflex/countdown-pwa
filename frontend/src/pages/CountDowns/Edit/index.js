import React from 'react';
import { HMR } from '@pwa/preset-react';
import { Link } from 'react-router-dom';
import EditForm from '@components/CountDowns/form';
import style from '../index.styl';

function CountDownEdit() {
  return (
    <div>
      <h1 className={style.h1}>Edit Count Down</h1>
      <EditForm />
    </div>
  )
}

export default HMR(CountDownEdit, module);
