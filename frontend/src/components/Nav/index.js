import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStopwatch, faPlusCircle } from '@fortawesome/free-solid-svg-icons'
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
					<li className={this.is_active("/")}>
				  	<Link to="/"><FontAwesomeIcon icon={faStopwatch} /></Link>
					</li>
					<li className={this.is_active("/countdowns/new")}>
						<Link to="/countdowns/new"><FontAwesomeIcon icon={faPlusCircle} /></Link>
					</li>
				</ul>
			</nav>
		);
	}

	is_active(route) {
		var path = this.props.current.path;
		if(route == path) {
			return style.active;
		}
		return null;
	}
}
