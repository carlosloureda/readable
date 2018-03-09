import React from 'react'

const CategoryFetcher = ({ categories, selectedCategory, onCategorySelected }) => {
  return (
    <select
      name="category"
      value={selectedCategory ? selectedCategory : 'all'}
      onChange={(e) => onCategorySelected(e)}
    >
      <option value='all'>All</option>
      {categories && categories.map(category =>
        <option key={category.name} value={category.name}>{category.name}</option>
      )}
    </select>
  )
}

export default CategoryFetcher
