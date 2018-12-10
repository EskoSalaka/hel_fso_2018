import React from 'react';
import PropTypes from 'prop-types';

const NewBlogForm = ({ handleSubmit, handleChange, title, author, url }) => {
  return (
    <div>
      <h2>Post new blog</h2>
      <form onSubmit={handleSubmit}>
        <div>
          Title{' '}
          <input
            name="title"
            type="text"
            value={title}
            onChange={handleChange}
          />
        </div>
        <div>
          Author{' '}
          <input
            name="author"
            type="text"
            value={author}
            onChange={handleChange}
          />
        </div>
        <div>
          Url{' '}
          <input name="url" type="text" value={url} onChange={handleChange} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

NewBlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired
};

export default NewBlogForm;
