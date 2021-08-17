import React from 'react';
import SortableTree from 'react-sortable-tree';
import 'react-sortable-tree/style.css';
import {
	Note,
	UpdateButton,
	ActionToolbar,
	ReturnButton,
	ErrorBloc,
	Table,
} from '@inseefr/wilco';
import {
	HTMLUtils,
	ValidationButton,
	DateUtils,
	PublicationFemale, useTitle,
} from 'bauhaus-utilities';
import PropTypes from 'prop-types';
import { treedData } from '../../utils';
import D, { D1, D2 } from '../../i18n/build-dictionary';
import { rowParams } from './code-detail';
import CodesTree from '../codes-tree';

export const CodeListDetailView = ({
	codelist,
	handleUpdate,
	handleBack,
	updatable,
	secondLang,
	col = 3,
	publishComponent,
	serverSideError,
}) => {
	useTitle(D.codelistsTitle, codelist?.labelLg1)

	const descriptionLg1 = HTMLUtils.renderMarkdownElement(
		codelist.descriptionLg1
	);
	const descriptionLg2 = HTMLUtils.renderMarkdownElement(
		codelist.descriptionLg2
	);

	const publish = () => {
		publishComponent();
	};

	const unsortedCodes = Object.values(codelist.codes);
	const sortedCodes = unsortedCodes.sort((a, b) => (a.code > b.code ? 1 : -1));
	const codes = Object.values(codelist.codes);
	return (
		<React.Fragment>
			<ActionToolbar>
				<ReturnButton action={handleBack} col={col} />
				<ValidationButton callback={publish} object={codelist} />
				{updatable && <UpdateButton action={handleUpdate} col={col} />}
			</ActionToolbar>
			<ErrorBloc error={serverSideError} />
			{
				<div className="row">
					<Note
						text={
							<ul>
								<li>
									{D.idTitle} : {codelist.id}
								</li>
								<li>
									{D.createdDateTitle} :{' '}
									{DateUtils.stringToDate(codelist.created)}
								</li>
								<li>
									{D.modifiedDateTitle} :{' '}
									{DateUtils.stringToDate(codelist.modified)}
								</li>
								<li>
									{D.codelistValidationStatusTitle} :{' '}
									<PublicationFemale object={codelist} />
								</li>
								<li>
									{D.creator} : {codelist.creator}
								</li>
								<li>
									{D.contributor} : {codelist.contributor}
								</li>
							</ul>
						}
						title={D.globalInformationsTitle}
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
			{codelist.codes && (
				<div className="row">
					<Note
						text={<Table rowParams={rowParams} data={sortedCodes} />}
						title={D.listElements}
						alone={true}
					/>
				</div>
			)}
			{codelist.codes && codes.filter((code) => code.parents).length > 0 && (
				<div className="row">
					<CodesTree
						codes={codes}
						tree={treedData(codes)}
						handleAdd={false}
						readOnly={true}
					/>
				</div>
			)}
		</React.Fragment>
	);
};

CodeListDetailView.propTypes = {
	codelist: PropTypes.object,
	handleUpdate: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
	handleBack: PropTypes.func,
	updatable: PropTypes.bool,
};
