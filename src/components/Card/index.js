import React from 'react';
import style from './index.styl';

export default function (props) {
	return (
		<div className={ style.card }>
			{ props.children }
		</div>
	);
}
