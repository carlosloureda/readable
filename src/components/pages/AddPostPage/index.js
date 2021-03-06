// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import {
  PageTemplate, Header, Footer,
} from 'components'
import { FormControl, FormHelperText } from 'material-ui/Form';
import Button from 'material-ui/Button';
import Input, { InputLabel } from 'material-ui/Input';
import Select from 'material-ui/Select';
import { MenuItem } from 'material-ui/Menu';

const Hero = ({post, validation, categories, handlers}) => {
  console.log("VALIDATION: ", validation);
  const title = (post && post.id) ? '' : 'Create a new post';
  const buttonName = (post && post.id) ? 'Save Post' : 'Add Post';
  return (
    <div>
      {/* <h1>{title}</h1> */}
        <FormControl error={validation.title} fullWidth={true} required>
          <InputLabel htmlFor="title">Title</InputLabel>
          <Input name="title" value={post.title} onChange={handlers.handleChange} />
        </FormControl>
        <FormControl error={validation.body} fullWidth={true} required>
          <InputLabel htmlFor="body">Post</InputLabel>
          <Input
              name="body" value={post.body}
              multiline={true}
              rows={5}
              fullWidth={true}
              onChange={handlers.handleChange}
          />
        </FormControl>
        {/* TODO: we can reuse the categoryFetcher */}
        <FormControl>
          <InputLabel htmlFor="category">Category</InputLabel>
          <Select
            name="category"
            value={post.category}
            onChange={ handlers.handleChange }
          >
            {categories && categories.map(category =>
              <MenuItem key={category.name} value={category.name}>
                {category.name}
              </MenuItem>
            )}
          </Select>
          {/* <FormHelperText>Category</FormHelperText> */}
        </FormControl>
        <FormControl error={validation.author} required fullWidth={true}>
          <InputLabel htmlFor="author">Author</InputLabel>
          <Input name="author" value={post.author} onChange={handlers.handleChange} />
        </FormControl>
        <FormControl>
          {post && post.id && <Button onClick={handlers.onEditPost} color="primary">Save Post</Button>}
          {(!post || !post.id) && <Button onClick={handlers.onAddPost} color="primary">Add Post</Button>}
        </FormControl>
    </div>
  )
}

const AddPostPage = ({post, validation, categories, handlers}) => {
  return (
    <PageTemplate
      header={<Header />}
      hero={<Hero post={post} validation={validation} categories={categories} handlers={handlers}/>}
      footer={<Footer />}
      >
    </PageTemplate>
  )
}

export default AddPostPage;