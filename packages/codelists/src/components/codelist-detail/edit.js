import React, { useState, useCallback, useEffect } from 'react';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { default as ReactSelect } from 'react-select';
/* import { getFlatDataFromTree } from 'react-sortable-tree'; */
import {
	CancelButton,
	SaveButton,
	ActionToolbar,
	ErrorBloc,
	LabelRequired,
	Select,
} from '@inseefr/wilco';
import { Stores, useTitle } from 'bauhaus-utilities';
import { validateCodelist, treedData } from '../../utils';
import D, { D1, D2 } from '../../i18n/build-dictionary';
import CodesTreeEdit from './codes-tree-edit';
import './edit.scss';
import { CollapsiblePanel } from '../collapsible-panel';

const defaultCodelist = {
	contributor: 'DG75-L201',
	created: dayjs(),
};
const DumbCodelistDetailEdit = ({
	codelist: initialCodelist,
	handleSave,
	handleBack,
	disseminationStatusListOptions,
	stampListOptions,
	serverSideError,
}) => {
	const [codelist, setCodelist] = useState(defaultCodelist);
	const [codes, setCodes] = useState(
		Object.values(defaultCodelist.codes || {})
	);


	const { field, message } = validateCodelist(codelist);

	useTitle(D.codelistsTitle, codelist?.labelLg1 || D.codelistsCreateTitle);

	useEffect(() => {
		setCodelist({ ...initialCodelist, ...defaultCodelist });
		setCodes(initialCodelist.codes ? Object.values(initialCodelist.codes) : []);
	}, [initialCodelist]);

	const handleChange = useCallback(
		(e) => {
			const { name, value } = e.target;
			setCodelist({
				...codelist,
				[name]: value,
			});
		},
		[codelist]
	);
	/* const handleChangeTree = useCallback(
		(tree) => {
			const flat = getFlatDataFromTree(tree);
			console.log(flat);

			flat.reduce();
			setCodelist({
				...codelist,
				codes: {
					// boucle sur les codes : on garde le key, on modifie le value.parents
					// flat.filter(id == key) pour avoir les éléments qui ont le bon identifiant
					// on .reduce pour avoir le tableau des parents
					// on compare avec le tableau actuel ? Puis on met à jour
				},
			});
		},
		[codelist]
	); */
	const handleSaveClick = useCallback(() => {
		handleSave(codelist);
	}, [codelist, handleSave]);

	return (
		<React.Fragment>
			<ActionToolbar>
				<CancelButton action={handleBack} col={3} />
				<SaveButton disabled={message} action={handleSaveClick} col={3} />
			</ActionToolbar>
			{message && <ErrorBloc error={message} />}
			{serverSideError && <ErrorBloc error={serverSideError} />}
			<form>
				<div className="row">
					<div className={`col-md-12 form-group`}>
						<LabelRequired htmlFor="lastListUriSegment">
							{D1.lastListUriSegmentTitle}
						</LabelRequired>
						<input
							type="text"
							className="form-control"
							id="lastListUriSegment"
							name="lastListUriSegment"
							onChange={handleChange}
							value={codelist.uriListe}
						/>
					</div>
				</div>
				<div className="row">
					<div className={`col-md-12 form-group`}>
						<LabelRequired htmlFor="lastClassUriSegment">
							{D1.lastClassUriSegmentTitle}
						</LabelRequired>
						<input
							type="text"
							className="form-control"
							id="lastClassUriSegment"
							name="lastClassUriSegment"
							onChange={handleChange}
							value={codelist.uriClassOwl}
						/>
					</div>
				</div>
				<div className="row">
					<div className="col-md-12 form-group">
						<LabelRequired htmlFor="id">{D1.idTitle}</LabelRequired>
						<input
							type="text"
							className="form-control"
							id="id"
							name="id"
							value={codelist.id || ''}
							onChange={handleChange}
							aria-invalid={field === ''}
						/>
					</div>
				</div>
				<div className="row">
					<div className={`col-md-6 form-group`}>
						<LabelRequired htmlFor="labelLg1">{D1.labelTitle}</LabelRequired>
						<input
							type="text"
							className="form-control"
							id="labelLg1"
							name="labelLg1"
							onChange={handleChange}
							value={codelist.labelLg1 || ''}
							aria-invalid={field === ''}
						/>
					</div>
					<div className="col-md-6 form-group">
						<LabelRequired htmlFor="labelLg2">{D2.labelTitle}</LabelRequired>
						<input
							type="text"
							className="form-control"
							id="labelLg2"
							name="labelLg2"
							onChange={handleChange}
							value={codelist.labelLg2 || ''}
							aria-invalid={field === ''}
						/>
					</div>
				</div>
				<div className="form-group">
					<LabelRequired htmlFor="creator">{D1.creator}</LabelRequired>
					<Select
						className="form-control"
						placeholder={D1.stampsPlaceholder}
						value={stampListOptions.find(
							({ value }) => value === codelist.creator
						)}
						options={stampListOptions}
						onChange={(value) => setCodelist({ ...codelist, creator: value })}
						searchable={true}
					/>
				</div>
				<div className="form-group">
					<label>{D1.contributor}</label>
					<ReactSelect
						placeholder={D1.stampsPlaceholder}
						value={stampListOptions.find(
							({ value }) => value === codelist.contributor
						)}
						options={stampListOptions}
						onChange={(value) =>
							setCodelist({ ...codelist, contributor: value })
						}
						isDisabled={true}
					/>
				</div>
				<div className="form-group">
					<LabelRequired htmlFor="disseminationStatus">
						{D1.disseminationStatusTitle}
					</LabelRequired>
					<Select
						className="form-control"
						placeholder={D1.disseminationStatusPlaceholder}
						value={disseminationStatusListOptions.find(
							({ value }) => value === codelist.disseminationStatus
						)}
						options={disseminationStatusListOptions}
						onChange={(value) =>
							setCodelist({ ...codelist, disseminationStatus: value })
						}
						searchable={true}
					/>
				</div>
				<div className="row">
					<div className="col-md-6 form-group">
						<label htmlFor="descriptionLg1">{D1.descriptionTitle}</label>
						<textarea
							type="text"
							value={codelist.descriptionLg1}
							className="form-control"
							id="descriptionLg1"
							name="descriptionLg1"
							onChange={handleChange}
						/>
					</div>
					<div className="col-md-6 form-group">
						<label htmlFor="descriptionLg2">{D2.descriptionTitle}</label>
						<textarea
							type="text"
							value={codelist.descriptionLg2}
							className="form-control"
							id="descriptionLg2"
							name="descriptionLg2"
							onChange={handleChange}
						/>
					</div>
				</div>
				<div className="code-zone">
					<CollapsiblePanel
						id="code-picker"
						hidden={false}
						title={D.codesTreeTitle}
						children={
							<CodesTreeEdit
								codes={codes}
								handleAdd={true}
								readOnly={false}
							></CodesTreeEdit>
						}>

					</CollapsiblePanel>
				</div>

			</form>
		</React.Fragment>
	);
};

DumbCodelistDetailEdit.propTypes = {
	component: PropTypes.object,
	disseminationStatusListOptions: PropTypes.array,
	stampListOptions: PropTypes.array,
	handleSave: PropTypes.func,
	handleBack: PropTypes.func,
	secondLang: PropTypes.bool,
};

DumbCodelistDetailEdit.defaultProps = {
	disseminationStatusListOptions: [],
	stampListOptions: [],
};

export const CodeListDetailEdit =
	Stores.DisseminationStatus.withDisseminationStatusListOptions(
		DumbCodelistDetailEdit
	);
