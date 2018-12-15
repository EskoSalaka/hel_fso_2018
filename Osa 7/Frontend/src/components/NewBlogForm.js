import React from 'react'
import PropTypes from 'prop-types'
import { ControlLabel, FormGroup, FormControl, Button } from 'react-bootstrap'

const NewBlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>Post new blog</h2>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <ControlLabel>Title</ControlLabel>
          <FormControl
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
          />
          <ControlLabel>Author</ControlLabel>
          <FormControl
            name="author"
            type="text"
            value={author}
            onChange={handleChange}
          />
          <ControlLabel>Url</ControlLabel>
          <FormControl
            name="url"
            type="text"
            value={url}
            onChange={handleChange}
          />
          <Button bsStyle="success" type="submit">
            Submit
          </Button>
        </FormGroup>
      </form>
    </div>
  )
}

NewBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
}

export default NewBlogForm
