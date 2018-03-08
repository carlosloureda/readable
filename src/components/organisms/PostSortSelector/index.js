import React from 'react'

const PostsSortSelector = () => {
  return (
    <select
      name="sortBy"
      value="value"
      onChange={() => {}}
    >
    <option value="value1">Date ascendant</option>
    <option value="value2">Date descendant</option>
    <option value="value3">Score ascendant</option>
    <option value="value3">Score descendant</option>
  </select>
  )
}

export default PostsSortSelector
