import React from 'react';

const BlogLine = ({ blog }) => {
  return (
    <tr>
      <td>{blog.title}</td>
      <td>{blog.author}</td>
    </tr>
  );
};

const Blogs = ({ blogs }) => {
  return (
    <div>
      <h2>Blogs</h2>
      <table>
        <tbody>
          {blogs.map(b => (
            <BlogLine key={b._id} blog={b} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Blogs;
