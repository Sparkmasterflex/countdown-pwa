import React from 'react';
import style from './index.styl';

export default function (props) {
	return (
		<header className={ style.intro }>
			{ props.children }
		</header>
	);
}
