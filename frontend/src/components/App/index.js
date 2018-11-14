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
const CountDownEdit = load(() => import('@pages/CountDowns/Edit'));
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
				<header className={style.header}>
				  <h3 className={style.h3}>PWA Countdowns</h3>
				</header>
				<main className={ style.wrapper }>
					<Route path="/" exact component={ Home } />
					<Route path="/countdowns/new" exact component={ CountDownNew } />
					<Route exact path="/:slug/edit" component={ CountDownEdit } />
					<Route exact path="/:slug" component={ CountDownShow } />
				</main>
				<Nav current={this.props.match} />
			</div>
		);
	}
}

export default HMR(withRouter(App), module);
