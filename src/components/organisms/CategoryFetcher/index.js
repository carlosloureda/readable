import React from 'react'
import { FormControl, FormHelperText } from 'material-ui/Form';
import { InputLabel } from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';

const CategoryFetcher = ({ classes, categories, selectedCategory, onCategorySelected }) => {
  return (
    <FormControl >
      <InputLabel
         className={classes.sortSelectorLabel}
        htmlFor="category">Category:
      </InputLabel>
      <Select
        className={classes.sortSelectorInput}
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
    </FormControl>
  )
}

export default CategoryFetcher
