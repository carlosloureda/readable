import React from 'react'
import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const PostsSortSelector = ({classes, sortedBy, sortOptions, onSortingSelection}) => {
  return (
    <FormControl className={classes.sortSelector}>
      <InputLabel
        className={classes.sortSelectorLabel}
        htmlFor="sortBy">Sorted by:
      </InputLabel>
      <Select
        className={classes.sortSelectorInput}
        name="sortBy"
        value={sortedBy}
        onChange={(e) => onSortingSelection(e)}
      >
        {sortOptions && sortOptions.map(option =>
          <MenuItem key={option.slug} value={option.slug}>
            {option.name}
          </MenuItem>
        )}
      </Select>
    </FormControl>
  )
}

export default PostsSortSelector
