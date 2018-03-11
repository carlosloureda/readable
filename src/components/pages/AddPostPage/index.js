// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
} from 'components'

const Hero = ({post, categories, handlers}) => {
  const title = (post && post.id) ? 'Edit Post Page' : 'Add Post Page';
  const buttonName = (post && post.id) ? 'Save Post' : 'Add Post';
  return (
    <div>
      <h1>{title}</h1>
      <div>
        <label htmlFor="title">Title</label>
        <input
          name="title"
          value={post.title}
          onChange={ handlers.handleChange }
        />
      </div>
      <div>
        <label>Body</label>
        <textarea
          name="body"
          value={post.body}
          onChange={ handlers.handleChange }
        />
      </div>
      <div>
        <label>Category</label>
        <select
          name="category"
          value={post.category}
          onChange={ handlers.handleChange }
        >
          {categories && categories.map(category =>
            <option key={category.name} value={category.name}>{category.name}</option>
          )}
        </select>
      </div>
      <div>
        <label>Author</label>
        <input
          name="author"
          value={post.author}
          onChange={ handlers.handleChange }
        />
      </div>
        {post && post.id && <button onClick={ handlers.onEditPost }>Save Post</button>}
        {(!post || !post.id) && <button onClick={ handlers.onAddPost }>Add Post</button>}
    </div>
  )
}

const AddPostPage = ({post, categories, handlers}) => {
  return (
    <PageTemplate
      header={<Header />}
      hero={<Hero post={post} categories={categories} handlers={handlers}/>}
      footer={<Footer />}
      >
    </PageTemplate>
  )
}

export default AddPostPage;