import React from 'react'
import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const PostsSortSelector = ({sortedBy, sortOptions, onSortingSelection}) => {
  return (
    <FormControl >
      <InputLabel htmlFor="sortBy">Sorted by:</InputLabel>
      <Select
        // input={<Input name="age" id="age-helper" />}
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
      {/* <FormHelperText>Sorted by</FormHelperText> */}
    </FormControl>
  )
}

export default PostsSortSelector
