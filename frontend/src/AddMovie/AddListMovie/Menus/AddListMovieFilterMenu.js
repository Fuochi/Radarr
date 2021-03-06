import PropTypes from 'prop-types';
import React from 'react';
import { align } from 'Helpers/Props';
import FilterMenu from 'Components/Menu/FilterMenu';
import AddListMovieFilterModalConnector from 'AddMovie/AddListMovie/AddListMovieFilterModalConnector';

function AddListMovieFilterMenu(props) {
  const {
    selectedFilterKey,
    filters,
    customFilters,
    isDisabled,
    onFilterSelect
  } = props;

  return (
    <FilterMenu
      alignMenu={align.RIGHT}
      isDisabled={isDisabled}
      selectedFilterKey={selectedFilterKey}
      filters={filters}
      customFilters={customFilters}
      filterModalConnectorComponent={AddListMovieFilterModalConnector}
      onFilterSelect={onFilterSelect}
    />
  );
}

AddListMovieFilterMenu.propTypes = {
  selectedFilterKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  filters: PropTypes.arrayOf(PropTypes.object).isRequired,
  customFilters: PropTypes.arrayOf(PropTypes.object).isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onFilterSelect: PropTypes.func.isRequired
};

AddListMovieFilterMenu.defaultProps = {
  showCustomFilters: false
};

export default AddListMovieFilterMenu;
