import React from 'react';
import { HMR } from '@pwa/preset-react';
import { Link } from 'react-router-dom';
import EditForm from '@components/CountDowns/edit-form';
import style from '../index.styl';

function CountDownEdit(page_obj) {
  return (
    <div>
      <h1 className={style.h1}>Edit Count Down</h1>
      <EditForm countdown={page_obj.location.state} />
    </div>
  )
}

export default HMR(CountDownEdit, module);
