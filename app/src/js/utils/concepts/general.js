import {
	buildFields,
	buildPropTypes,
	buildEmpty,
	buildEmptyWithContributor,
} from 'bauhaus-library/src/utils/build-general-proptypes';

export const fieldsWithRequired = [
	['prefLabelLg1', false],
	['prefLabelLg2', false],
	['altLabelLg1', false, 'array'],
	['altLabelLg2', false, 'array'],
	['disseminationStatus', false],
	['additionalMaterial', false],
	['valid', false],
	['creator', false],
	['contributor', false],
	['isValidated', false],
	['conceptVersion', true],
	['created', false],
];

export const fields = buildFields(fieldsWithRequired);

export const propTypes = buildPropTypes(fieldsWithRequired);

export const empty = () => buildEmpty(fieldsWithRequired);

export const emptyWithContributor = defaultContributor =>
	buildEmptyWithContributor(fieldsWithRequired, defaultContributor);
