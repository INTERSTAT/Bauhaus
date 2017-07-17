import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Pagination from 'js/components/shared/pagination';
import { dictionary } from 'js/utils/dictionary';

class SearchConceptsByLabel extends Component {
  render() {
    const { searchLabel, handleSearch, hitEls } = this.props;
    return (
      <div>
        <input
          value={searchLabel}
          onChange={e => handleSearch(e.target.value)}
          type="text"
          placeholder={dictionary.concept.searchLabel}
          className="form-control"
        />
        <Pagination itemEls={hitEls} itemsPerPage="10" />
      </div>
    );
  }
}

SearchConceptsByLabel.propTypes = {
  searchLabel: PropTypes.string.isRequired,
  handleSearch: PropTypes.func.isRequired,
  hitEls: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default SearchConceptsByLabel;
