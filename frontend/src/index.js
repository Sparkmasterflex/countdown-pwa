import React from 'react';
import ReactDOM from 'react-dom';
import GAnalytics from 'ganalytics';
import { BrowserRouter } from 'react-router-dom';
import App from '@components/App';
import './index.styl';

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('app')
);

if (process.env.NODE_ENV === 'production') {
	window.ga = new GAnalytics('UA-XXXXXXXX-X');

	// Service Worker registration
	require('offline-plugin/runtime').install();
}
