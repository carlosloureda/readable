import React from 'react'
import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const CategoryFetcher = ({ categories, selectedCategory, onCategorySelected }) => {
  return (
    <FormControl >
      <InputLabel htmlFor="category">Category:</InputLabel>
      <Select
        // input={<Input name="age" id="age-helper" />}
        name="category"
        value={selectedCategory ? selectedCategory : 'all'}
        onChange={(e) => onCategorySelected(e)}
      >
        <MenuItem value='all'>All</MenuItem>
        {categories && categories.map(category =>
          <MenuItem key={category.name} value={category.name}>
            {category.name}
          </MenuItem>
        )}
      </Select>
      {/* <FormHelperText>Sorted by</FormHelperText> */}
    </FormControl>
  )
}

export default CategoryFetcher
