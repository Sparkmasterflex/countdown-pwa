import React from 'react';
import { HMR } from '@pwa/preset-react';
import { Link } from 'react-router-dom';
import style from './index.styl';

function CountDownNew() {
  return (
    <div>
      <h2>New Count Down</h2>

      <form>
        <input type='text' name='title' placeholder='Countdown Title' />
        <input type='datetime' name='date' placeholder='Event Date and Time' />
        <textarea name='notes' placeholder='Notes'></textarea>

        <button type='button'>Save</button>
      </form>
    </div>
  )
}

export default HMR(CountDownNew, module);
