// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
} from 'components'

const Hero = ({post, handlers}) => {
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
        <input
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
          <option value="react">Reactjs</option>
          <option value="redux">Redux</option>
          <option value="udacity">Udacity</option>
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
      <button onClick={(e) => {}}>{buttonName}</button>
    </div>
  )
}

const AddPostPage = ({post, handlers}) => {
  // console.log("post: ", post);
  // console.log("handlers: ", handlers);
  return (
    <PageTemplate
      header={<Header />}
      hero={<Hero post={post} handlers={handlers}/>}
      footer={<Footer />}
      >
    </PageTemplate>
  )
}

export default AddPostPage;