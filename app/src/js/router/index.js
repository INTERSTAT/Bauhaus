import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './routes';
import bauhausLogo from 'img/logo_noir.svg';
import { getEnvVar } from 'js/utils/env';

import 'react-app-polyfill/stable';

const Root = () => {
	const footer = `${getEnvVar('NAME')} - ${getEnvVar('VERSION')}`;
	return (
		<>
			<div id="root-app">
				<Router basename={process.env.PUBLIC_URL}>
					<Routes />
				</Router>
			</div>
			<footer className="text-center" style={{ marginTop: '50px' }}>
				<p>
					<img width="100" src={bauhausLogo} alt="application logo" />

					{footer}
				</p>
			</footer>
		</>
	);
};

export default Root;
