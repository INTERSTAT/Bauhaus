import React from 'react';
import {
	Note,
	UpdateButton,
	ActionToolbar,
	ReturnButton,
	DeleteButton,
	ErrorBloc,
	Table,
} from '@inseefr/wilco';
import { D1, D2 } from '../../i18n/build-dictionary';
import {
	HTMLUtils,
	ValidationButton,
	DateUtils,
	PublicationMale,
} from 'bauhaus-utilities';
import PropTypes from 'prop-types';
import { rowParams } from './code-detail';

export const canBeDeleted = (component) => {
	const withoutStructuresUsingThisComponent =
		!component.structures || component.structures?.length === 0;
	const forbidden = ['Validated', 'Modified'];
	return (
		withoutStructuresUsingThisComponent &&
		!forbidden.includes(component.validationState)
	);
};
export const ComponentDetailView = ({
	component,
	handleUpdate,
	handleDelete,
	handleBack,
	updatable,
	secondLang = false,
	col = 3,
	publishComponent,
	serverSideError,
}) => {
	const descriptionLg1 = HTMLUtils.renderMarkdownElement(
		component.descriptionLg1
	);
	const descriptionLg2 = HTMLUtils.renderMarkdownElement(
		component.descriptionLg2
	);

	const publish = () => {
		publishComponent();
	};

	return (
		<React.Fragment>
			<ActionToolbar>
				<ReturnButton action={handleBack} col={col} />
				{canBeDeleted(component) && (
					<DeleteButton action={handleDelete} col={col} />
				)}
				<ValidationButton callback={publish} object={component} />
				{updatable && <UpdateButton action={handleUpdate} col={col} />}
			</ActionToolbar>
			<ErrorBloc error={serverSideError} />
			{
				<div className="row">
					<Note
						text={
							<ul>
								<li>
									{D1.idTitle} : {component.notation}
								</li>
								<li>
									{D1.createdDateTitle} :{' '}
									{DateUtils.stringToDate(component.created)}
								</li>
								<li>
									{D1.modifiedDateTitle} :{' '}
									{DateUtils.stringToDate(component.modified)}
								</li>
								<li>
									{D1.componentValididationStatusTitle} :{' '}
									<PublicationMale object={component} />
								</li>
								<li>
									{D1.creator} : {component.creator}
								</li>
								<li>
									{D1.contributor} : {component.contributor}
								</li>
							</ul>
						}
						title={D1.globalInformationsTitle}
						alone={true}
					/>
				</div>
			}
			<div className="row">
				<Note
					text={descriptionLg1}
					title={D1.descriptionTitle}
					alone={!secondLang}
					allowEmpty={true}
					md
				/>
				{secondLang && (
					<Note
						text={descriptionLg2}
						title={D2.descriptionTitle}
						alone={false}
						allowEmpty={true}
					/>
				)}
			</div>
			<div className="row">
				<Note
					text={<Table rowParams={rowParams} data={component.codes} />}
					title={D1.listElements}
					alone={true}
				/>
			</div>
		</React.Fragment>
	);
};

ComponentDetailView.propTypes = {
	component: PropTypes.object,
	concepts: PropTypes.array,
	codesLists: PropTypes.array,
	handleUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	handleBack: PropTypes.func,
	updatable: PropTypes.bool,
	structureComponents: PropTypes.array,
};

ComponentDetailView.defaultProps = {
	structureComponents: [],
	concepts: [],
	codesLists: [],
};
