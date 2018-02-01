import PropTypes from 'prop-types';
import objectFromKeys from 'js/utils/object-from-keys';

export const fieldsWithRequired = [
	['id', false],
	['prefLabelLg1', false],
	['prefLabelLg2', false],
	['descriptionLg1', false],
	['descriptionLg2', false],
	['created', false],
	['modified', false],
	['creator', false],
	['contributor', false],
	['isValidated', false],
];

export const fields = fieldsWithRequired.map(([fieldName]) => fieldName);

export const propTypes = PropTypes.shape(
	fieldsWithRequired.reduce((propTypes, [fieldName, isRequired]) => {
		propTypes[fieldName] = isRequired
			? PropTypes.string.isRequired
			: PropTypes.string;
		return propTypes;
	}, {})
);

export const emptyWithContributor = defaultContributor => {
	const general = objectFromKeys(fields, '');
	general.contributor = defaultContributor;
	return general;
};

export const empty = () => {
	const general = objectFromKeys(fields, '');
	return general;
};
