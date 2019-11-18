import React from 'react';
import { withRouter } from 'react-router-dom';
import { Button } from 'bauhaus-library';
import buildExtract from 'bauhaus-library/src/utils/build-extract';
import { cleanId } from 'bauhaus-library/src/utils/string-utils';
import D from 'js/i18n';

const Controls = ({ creation, save, disabledSave, ...props }) => {
	const dsdId = buildExtract('dsdId')(props);
	return (
		<div className="row btn-line">
			<Button
				label={D.btnReturn}
				action={creation ? '/dsds' : `/dsds/${cleanId(dsdId)}`}
			/>
			<div className="col-md-8" />
			<Button label={D.btnSave} action={save} disabled={disabledSave} />
		</div>
	);
};

export default withRouter(Controls);
