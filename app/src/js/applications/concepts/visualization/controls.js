import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { goBack, Button, ActionToolbar } from '@inseefr/wilco';
import check from 'js/utils/auth';
import { propTypes as permissionOverviewPropTypes } from 'js/utils/auth/permission-overview';
import D from 'js/i18n';

class ConceptVisualizationControls extends Component {
	static propTypes = {
		id: PropTypes.string.isRequired,
		permission: permissionOverviewPropTypes,
		creator: PropTypes.string.isRequired,
		isValidated: PropTypes.bool.isRequired,
		conceptVersion: PropTypes.string.isRequired,
		handleValidation: PropTypes.func.isRequired,
	};

	render() {
		const {
			isValidated,
			isValidOutOfDate,
			conceptVersion,
			id,
			permission: { authType, roles, stamp },
			creator: conceptCreator,
			handleValidation,
			handleDeletion,
		} = this.props;

		const authImpl = check(authType);
		const admin = authImpl.isAdmin(roles);
		const contributor = authImpl.isContributor(roles);
		const creator = authImpl.isConceptCreator(roles, stamp, conceptCreator);
		const adminOrCreator = admin || creator;
		//const adminOrContributorOrCreator = admin || contributor || creator;

		let btns;

		const cancel = [goBack(this.props, `/concepts`), D.btnReturn];
		const send = [`/concept/${id}/send`, D.btnSend];
		const validate = adminOrCreator && [handleValidation, D.btnValid];
		const update = [`/concept/${id}/modify`, D.btnUpdate];
		const compare =
			!conceptVersion || conceptVersion <= 1
				? null
				: [`/concept/${id}/compare`, D.btnCompare];
		const erase = adminOrCreator && [handleDeletion, D.btnDelete];

		if (admin || (creator && contributor)) {
			if (isValidOutOfDate) {
				btns = isValidated
					? [cancel, compare, send, erase]
					: [cancel, compare, send, update, validate, erase];
			} else {
				btns = isValidated
					? [cancel, compare, send, update, erase]
					: [cancel, compare, send, update, validate, erase];
			}
		} else if (contributor) {
			if (isValidOutOfDate) {
				btns = isValidated
					? [cancel, compare, send]
					: [cancel, compare, send, update];
			} else {
				btns = [cancel, compare, send, update];
			}
		} else if (creator) {
			if (isValidOutOfDate) {
				btns = isValidated
					? [cancel, compare, send]
					: [cancel, compare, send, validate];
			} else {
				btns = isValidated
					? [cancel, compare, send]
					: [cancel, compare, send, validate];
			}
		} else {
			btns = [cancel, compare];
		}

		return (
			<ActionToolbar>
				{btns.map((btn, i) => {
					if (!btn) return null;
					const [action, label] = btn;
					return btn && <Button key={label} action={action} label={label} />;
				})}
			</ActionToolbar>
		);
	}
}

export default withRouter(ConceptVisualizationControls);
