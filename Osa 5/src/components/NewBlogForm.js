import React from 'react';

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

export default NewBlogForm;
