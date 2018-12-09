import React from 'react';

class Blog extends React.Component {
  constructor(props) {
    super(props);
    console.log(props.isUserBlog);
    console.log(props.blog);

    this.state = {
      expanded: false
    };

    this.toggleExpanded = this.toggleExpanded.bind(this);
  }

  toggleExpanded = () => {
    this.setState({ expanded: !this.state.expanded });
  };

  render() {
    const blogStyle = {
      paddingTop: 5,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 3,
      marginBottom: 5
    };

    return (
      <div style={blogStyle}>
        <BlogTitle
          blog={this.props.blog}
          handleTitleClick={this.toggleExpanded}
        />
        {this.state.expanded ? (
          <HiddenLines
            blog={this.props.blog}
            addLike={this.props.addLike}
            deleteBlog={this.props.deleteBlog}
            isUserBlog={this.props.isUserBlog}
          />
        ) : null}
      </div>
    );
  }
}

const BlogTitle = ({ blog, handleTitleClick }) => {
  return (
    <p onClick={handleTitleClick}>
      {blog.title} {blog.author}
    </p>
  );
};

const HiddenLines = ({ blog, addLike, deleteBlog, isUserBlog }) => {
  let uName = blog.user === undefined ? 'Anonymous' : blog.user.name;

  return (
    <div>
      <a href={'//' + blog.url}>{blog.url}</a>

      <p>
        {' '}
        {blog.likes} Likes{' '}
        <button type="like" onClick={addLike} value={blog._id}>
          Like
        </button>
      </p>
      <p> Added by {uName}</p>
      {isUserBlog ? (
        <button type="delete" onClick={deleteBlog} value={blog._id}>
          Delete Blog
        </button>
      ) : null}
    </div>
  );
};

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

export default Blogs;
