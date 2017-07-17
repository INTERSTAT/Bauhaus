import React from 'react';
import PropTypes from 'prop-types';
import { dictionary } from 'js/utils/dictionary';

function ConceptCreatecontrolLayout({
  message,
  handleCancel,
  handleSave,
  saveEnabled,
}) {
  return (
    <div className="row btn-line">
      <div className="col-md-2">
        <button
          type="button"
          className="btn btn-primary btn-lg col-md-12"
          onClick={handleCancel}>
          <span
            className="glyphicon glyphicon-floppy-remove"
            aria-hidden="true"
          />{' '}
          {dictionary.buttons.cancel}
        </button>
      </div>
      {message &&
        <div className="col-md-8 centered">
          <div className="alert alert-danger bold" role="alert">
            {message}
          </div>
        </div>}
      <div className="col-md-2 pull-right">
        <button
          type="button"
          className="btn btn-primary btn-lg col-md-12"
          disabled={!saveEnabled}
          onClick={handleSave}>
          <span
            className="glyphicon glyphicon-floppy-disk"
            aria-hidden="true"
          />{' '}
          {dictionary.buttons.save}
        </button>
      </div>
    </div>
  );
}

ConceptCreatecontrolLayout.propTypes = {
  message: PropTypes.string,
  saveEnabled: PropTypes.bool.isRequired,
  handleCancel: PropTypes.func.isRequired,
  handleSave: PropTypes.func.isRequired,
};

export default ConceptCreatecontrolLayout;
