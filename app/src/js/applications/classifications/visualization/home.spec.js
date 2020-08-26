import React from 'react';
import { render } from '@testing-library/react';
import Home from './home';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const store = mockStore({
	app: {
		secondLang: true,
	},
});

const classification = {
	general: { prefLabelLg1: 'Label' },
	levels: [{ id: '1', label: 'Member 1' }],
	notes: {
		scopeNoteLg1: 'scopeNoteLg1',
		scopeNoteLg2: 'scopeNoteLg2',
		changeNoteLg1: 'changeNoteLg1',
		changeNoteLg2: 'changeNoteLg2',
	},
};

const langs = { lg1: 'fr', lg2: 'en' };

describe('classification-home', () => {
	it('renders without crashing', () => {
		render(
			<Provider store={store}>
				<Home
					classification={classification}
					langs={langs}
					secondLang={false}
				/>
			</Provider>,
			{ wrapper: MemoryRouter }
		);
	});
});
