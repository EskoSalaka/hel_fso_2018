import React from 'react';
import PropTypes from 'prop-types';
import Blog from './Blog';

const Blogs = ({ blogs, addLike, deleteBlog, userName }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <div>
        {blogs.map(b => (
          <Blog
            key={b._id}
            blog={b}
            addLike={addLike}
            deleteBlog={deleteBlog}
            isUserBlog={
              b.user === undefined || b.user.username === userName
                ? true
                : false
            }
          />
        ))}
      </div>
    </div>
  );
};

Blogs.propTypes = {
  blogs: PropTypes.array.isRequired,
  addLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  userName: PropTypes.string.isRequired
};

export default Blogs;
