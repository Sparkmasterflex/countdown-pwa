import React from 'react';
import Loadable from 'react-loadable';
import { HMR } from '@pwa/preset-react';
import { Route, withRouter } from 'react-router-dom';
import Nav from '@components/Nav';
// import Footer from '@components/Footer';
import style from './index.styl';

// Route-Split Components
const loading = () => <div>Loading...</div>;
const load = loader => Loadable({ loader, loading });

const Home = load(() => import('@pages/Home'));
const CountDownNew = load(() => import('@pages/CountDowns/New'));
const CountDownShow = load(() => import('@pages/CountDowns/Show'));

class App extends React.Component {
	componentDidMount() {
		if (process.env.NODE_ENV === 'production') {
			this.props.history.listen(obj => {
				if (window.ga) ga.send('pageview', { dp:obj.pathname });
			});
		}
	}

	render() {
		return (
			<div className={ style.app }>
				<Nav />
				<main className={ style.wrapper }>
					<Route path="/" exact component={ Home } />
					<Route path="/countdowns/new" exact component={ CountDownNew } />
					<Route path="/countdowns/:title" component={ CountDownShow } />
				</main>
				<Nav />
			</div>
		);
	}
}

export default HMR(withRouter(App), module);
