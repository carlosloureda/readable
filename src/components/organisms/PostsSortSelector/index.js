import React from 'react'

const PostsSortSelector = ({sortedBy, sortOptions, onSortingSelection}) => {
  return (
    <select
      name="sortBy"
      value={sortedBy}
      onChange={(e) => onSortingSelection(e)}
    >
    {sortOptions && sortOptions.map(option =>
      <option key={option.slug} value={option.slug}>
        {option.name}
      </option>
    )}
  </select>
  )
}

export default PostsSortSelector
