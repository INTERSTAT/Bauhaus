import React, { useState, useEffect } from 'react';
import {
	NewButton,
	SearchableList,
	PageTitle,
	VerticalMenu,
	Loading,
} from '@inseefr/wilco';
import './component-list.scss';
import { FilterToggleButtons } from 'bauhaus-utilities';
import {
	MEASURE_TYPE,
	DIMENSION_TYPE,
	ATTRIBUTE_TYPE,
} from '../../utils/constants/dsd-components';
import api from '../../apis/structure-api';
import D from '../../i18n/build-dictionary';

const ALL = 'ALL';
function ComponentsList() {
	const [items, setItems] = useState([]);
	const [loading, setLoading] = useState(true);
	const [filter, setFilter] = useState(ALL);
	const filteredItems = items.filter(item => {
		return filter === ALL || item?.type === filter;
	});

	useEffect(() => {
		api
			.getMutualizedComponents()
			.then(components => {
				setItems(components);
			})
			.finally(() => setLoading(false));
	}, []);

	if (loading) {
		return <Loading />;
	}
	return (
		<div className="container structures-components-list">
			<div className="row">
				<VerticalMenu>
					<NewButton action="/structures/components/create" wrapper={false} />
				</VerticalMenu>
				<div className="col-md-8 text-center pull-right">
					<PageTitle title={D.componentTitle} col={12} offset={0} />
					<FilterToggleButtons
						currentValue={filter}
						handleSelection={setFilter}
						options={[
							[ALL, D.all],
							[MEASURE_TYPE, D.measureTitle],
							[DIMENSION_TYPE, D.dimensionTitle],
							[ATTRIBUTE_TYPE, D.attributeTitle],
						]}
					/>
					<SearchableList
						items={filteredItems}
						childPath="structures/components"
						searchUrl="/structures/components/search"
						advancedSearch={true}
						label="label"
						autoFocus={true}
					/>
				</div>
			</div>
		</div>
	);
}

export default ComponentsList;
