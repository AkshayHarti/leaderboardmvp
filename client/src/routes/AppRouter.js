import React from 'react';
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import Referee from '../components/referee/Referee';
import Competitor from '../components/competitor/Competitor';
import Subscriber from './../components/subscriber/Subscriber';
import Stage from '../components/Stage';
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import l10n from '../components/i18n/en';

//const Referee = () => (<h1>I am a Referee</h1>);

const NavBar = () => (
	<div className="row2" id="main-menu">
		<div>
			<Button name={l10n.referee} id="1" />
		</div>
		<div>
			<Button name={l10n.competitor} id="2" />
		</div>
		<div>
			<Button name={l10n.subscriber} id="3" />
		</div>
	</div>
);

const AppRouter = () => (
	<BrowserRouter>
		<div id="app-child">
			<Header />
			<Switch>
				<Route path="/" component={NavBar} exact={true} />
				<Route path="/stage/:id" component={Stage} />
				<Route path="/referee" component={Referee} />
				<Route path="/competitor" component={Competitor} />
				<Route path="/subscriber" component={Subscriber} />
			</Switch>
		</div>
	</BrowserRouter>
)

export default AppRouter;
