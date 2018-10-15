import React from 'react';
import { Link } from 'react-router-dom';
import style from './index.styl';

export default class Nav extends React.Component {
	state = {
		stuck: false,
	};

	componentDidMount() {
		addEventListener('scroll', () => {
			let stuck = window.pageYOffset > 0;
			this.setState({ stuck });
		}, { passive:true });
	}

	shouldComponentUpdate(_, nxt) {
		let now = this.state;
		return now.stuck !== nxt.stuck;
	}

	render() {
		let cls = style.nav;
		if (this.state.stuck) {
			cls += ` ${style.stuck}`;
		}

		return (
			<nav className={ cls }>
				<ul className={ style.links }>
					<li><Link to="/">Count Downs</Link></li>
					<li><Link to="/countdowns/new">Create New</Link></li>
				</ul>
			</nav>
		);
	}
}
