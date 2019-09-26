import { isOutOfDate } from 'js/utils/moment';
import { stringToDate } from 'js/utils/moment';

export const getModalMessage = array =>
	array.reduce((message, { prefLabelLg1, valid }) => {
		message += `<p>Le concept " <b>${prefLabelLg1}</b> " ayant une date de fin de validité au <b>${stringToDate(
			valid
		)}</b>, vous ne pourrez plus le modifier`;
		message += isOutOfDate(valid) ? `.</p>` : ` après cette date.</p>`;
		return message;
	}, '');
