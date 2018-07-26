import React, { Component } from 'react';
import CheckSecondLang from 'js/components/shared/second-lang-checkbox';
import PageSubtitle from 'js/components/shared/page-subtitle';
import PageTitle from 'js/components/shared/page-title';
import D from 'js/i18n';
import { goBack } from 'js/utils/redirection';
import NoteFlag from 'js/components/shared/note-flag';
import PropTypes from 'prop-types';
import EditorMarkdown from 'js/components/shared/editor-markdown';

const defaultSerie = {
	id: '',
	prefLabelLg1: '',
	prefLabelLg2: '',
	altLabel1: '',
	altLabel2: '',
	abstractLg1: '',
	abstractLg2: '',
	historyNoteLg1: '',
	historyNoteLg2: '',
};
class OperationsSerieEdition extends Component {
	constructor(props) {
		super(props);
		this.state = {
			serie: {
				...defaultSerie,
				...props.serie,
			},
		};
		this.onChange = this.onChange.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}
	componentWillReceiveProps(nextProps) {
		this.setState({
			serie: {
				...defaultSerie,
				...nextProps.serie,
			},
		});
	}
	onChange(e) {
		this.setState({
			serie: {
				...this.state.serie,
				[e.target.id]: e.target.value,
			},
		});
	}
	onSubmit() {
		this.props.saveSerie(this.state.serie);
		goBack(this.props, '/operations/series/' + this.state.serie.id)();
	}

	render() {
		const {
			secondLang,
			langs: { lg1, lg2 },
			saveSecondLang,
			frequencies,
			categories,
		} = this.props;

		const { serie } = this.state;
		const cl = secondLang ? 'col-md-6' : 'col-md-12';
		return (
			<div className="container">
				<CheckSecondLang secondLang={secondLang} onChange={saveSecondLang} />
				<button
					onClick={this.onSubmit}
					type="button"
					className="btn btn-success btn-lg pull-right"
				>
					{D.btnValid}
				</button>

				<div className="row">
					<div className="col-md-2">
						<button
							className="btn btn-primary btn-lg col-md-12"
							onClick={goBack(this.props, '/operations/families')}
						>
							{D.btnReturn}
						</button>
					</div>
				</div>
				<PageTitle
					title={this.props.serie.prefLabelLg1}
					context="operations"
					col="12"
					offset="0"
				/>
				{secondLang &&
					serie.prefLabelLg2 && (
						<PageSubtitle subTitle={this.props.serie.prefLabelLg2} />
					)}
				<form>
					<div className={cl}>
						<div className="form-group">
							<label htmlFor="prefLabelLg1">
								<NoteFlag text={D.title} lang={lg1} />
							</label>
							<input
								type="text"
								className="form-control input-lg"
								id="prefLabelLg1"
								value={serie.prefLabelLg1}
								onChange={this.onChange}
								disabled
							/>
						</div>
						<div className="form-group">
							<label htmlFor="altLabelLg1">
								<NoteFlag text={D.altLabel} lang={lg1} />
							</label>
							<input
								type="text"
								className="form-control input-lg"
								id="altLabelLg1"
								value={serie.altLabelLg1}
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="abstractLg1">
								<NoteFlag text={D.summary} lang={lg1} />
							</label>
							<EditorMarkdown
								text={serie.abstractLg1}
								handleChange={value =>
									this.onChange({ target: { value, id: 'abstractLg1' } })
								}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="historyNoteLg1">
								<NoteFlag text={D.history} lang={lg1} />
							</label>
							<EditorMarkdown
								text={serie.historyNoteLg1}
								handleChange={value =>
									this.onChange({ target: { value, id: 'historyNoteLg1' } })
								}
							/>
						</div>
					</div>
					{secondLang && (
						<div className="col-md-6">
							<div className="form-group">
								<label htmlFor="prefLabelLg2">
									<NoteFlag text={D.title} lang={lg2} />
								</label>
								<input
									type="text"
									className="form-control input-lg"
									id="prefLabelLg2"
									value={serie.prefLabelLg2}
									onChange={this.onChange}
									disabled
								/>
							</div>
							<div className="form-group">
								<label htmlFor="altLabel2">
									<NoteFlag text={D.altLabel} lang={lg2} />
								</label>
								<input
									type="text"
									className="form-control input-lg"
									id="altLabel2"
									value={serie.altLabelLg2}
									onChange={this.onChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="abstractLg2">
									<NoteFlag text={D.summary} lang={lg2} />
								</label>
								<textarea
									value={serie.abstractLg2}
									className="form-control"
									id="abstractLg1"
									rows="10"
									onChange={this.onChange}
								/>
							</div>
							<div className="form-group">
								<label htmlFor="historyNoteLg2">
									<NoteFlag text={D.history} lang={lg2} />
								</label>
								<textarea
									value={serie.historyNoteLg2}
									className="form-control"
									id="historyNoteLg2"
									rows="10"
									onChange={this.onChange}
								/>
							</div>
						</div>
					)}
					<div className="col-md-12">
						<div className="form-group">
							<label htmlFor="typeOperation">{D.operationType}</label>
							<select
								className="form-control input-lg"
								id="typeCode"
								value={serie.typeCode}
								onChange={this.onChange}
							>
								{categories.codes.map(category => (
									<option value={category.code}>{category.labelLg1}</option>
								))}
							</select>
						</div>
						<div className="form-group">
							<label htmlFor="accrualPeriodicity">
								{D.dataCollectFrequency}
							</label>
							{
								<select
									className="form-control input-lg"
									id="accrualPeriodicityCode"
									value={serie.accrualPeriodicityCode}
									onChange={this.onChange}
								>
									{frequencies.codes.map(category => (
										<option value={category.code}>{category.labelLg1}</option>
									))}
								</select>
							}
						</div>
						<div className="form-group">
							<label htmlFor="creator">{D.organisation}</label>
							<input
								type="text"
								className="form-control input-lg"
								id="creator"
								value={serie.creator}
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="contributor">{D.stakeholders}</label>
							<input
								value={serie.stakeHolder}
								className="form-control input-lg"
								id="contributor"
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="serviceCollector">{D.dataCollector}</label>
							<input
								value={serie.dataCollector}
								className="form-control input-lg"
								id="serviceCollector"
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="serviceCollector">{D.contributorTitle}</label>
							<input
								value={serie.contributor}
								className="form-control input-lg"
								id="serviceCollector"
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="replaces">{D.replaces}</label>
							<textarea
								value={serie.replaces}
								className="form-control"
								id="replaces"
								rows="10"
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="replacedBy">{D.replacedBy}</label>
							<textarea
								value={serie.replacedBy}
								className="form-control"
								id="replacedBy"
								rows="10"
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="indicators">{D.indicators}</label>
							<textarea
								value={serie.indicators}
								className="form-control"
								id="indicators"
								rows="10"
								onChange={this.onChange}
							/>
						</div>
						<div className="form-group">
							<label htmlFor="seeAlso">{D.seeAlso}</label>
							<textarea
								value={serie.seeAlso}
								className="form-control"
								id="seeAlso"
								rows="10"
								onChange={this.onChange}
							/>
						</div>
					</div>
				</form>
			</div>
		);
	}
}

OperationsSerieEdition.propTypes = {
	serie: PropTypes.object.isRequired,
	langs: PropTypes.object.isRequired,
	saveSecondLang: PropTypes.func.isRequired,
	saveSerie: PropTypes.func.isRequired,
	categories: PropTypes.object.isRequired,
	frequencies: PropTypes.object.isRequired,
};

export default OperationsSerieEdition;
